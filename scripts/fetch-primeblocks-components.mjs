#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const DEFAULT_BASE_URL = 'https://primeblocks.org';
const DEFAULT_OUTPUT_DIR = '../components';
const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

const CATEGORY_FOLDER_MAP = {
    application: 'Application',
    marketing: 'Marketing',
    ecommerce: 'Ecommerce'
};

function parseArgs(argv) {
    const options = {
        baseUrl: DEFAULT_BASE_URL,
        outputDir: DEFAULT_OUTPUT_DIR,
        framework: 'vue',
        extension: 'html',
        concurrency: 6,
        freeOnly: false,
        limit: null,
        overwrite: true,
        cookieFile: process.env.PRIMEBLOCKS_COOKIE_FILE || '',
        cookie: process.env.PRIMEBLOCKS_COOKIE || '',
        includeUserId: process.env.PRIMEBLOCKS_USER_ID || ''
    };

    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];

        if (arg === '--help' || arg === '-h') {
            printHelp();
            process.exit(0);
        }

        if (arg === '--base-url') {
            options.baseUrl = argv[++i];
            continue;
        }

        if (arg === '--output') {
            options.outputDir = argv[++i];
            continue;
        }

        if (arg === '--framework') {
            options.framework = (argv[++i] || '').toLowerCase();
            continue;
        }

        if (arg === '--extension' || arg === '--ext') {
            options.extension = (argv[++i] || '').replace(/^\./, '');
            continue;
        }

        if (arg === '--concurrency') {
            options.concurrency = Number(argv[++i]);
            continue;
        }

        if (arg === '--limit') {
            const v = argv[++i];
            options.limit = v ? Number(v) : null;
            continue;
        }

        if (arg === '--cookie') {
            options.cookie = argv[++i] || '';
            continue;
        }

        if (arg === '--cookie-file') {
            options.cookieFile = argv[++i] || '';
            continue;
        }

        if (arg === '--user-id') {
            options.includeUserId = argv[++i] || '';
            continue;
        }

        if (arg === '--free-only') {
            options.freeOnly = true;
            continue;
        }

        if (arg === '--no-overwrite') {
            options.overwrite = false;
            continue;
        }

        throw new Error(`Unknown argument: ${arg}`);
    }

    if (!['vue', 'angular'].includes(options.framework)) {
        throw new Error(`Unsupported --framework value: ${options.framework}. Use: vue | angular`);
    }

    if (!Number.isFinite(options.concurrency) || options.concurrency < 1) {
        throw new Error(`Invalid --concurrency value: ${options.concurrency}`);
    }

    if (options.limit !== null && (!Number.isFinite(options.limit) || options.limit < 1)) {
        throw new Error(`Invalid --limit value: ${options.limit}`);
    }

    return options;
}

function printHelp() {
    console.log(`PrimeBlocks scraper

Usage:
  node scripts/fetch-primeblocks-components.mjs [options]

Options:
  --output <dir>         Output root directory
                         Default: ${DEFAULT_OUTPUT_DIR}
  --base-url <url>       PrimeBlocks base URL
                         Default: ${DEFAULT_BASE_URL}
  --framework <name>     Code payload key to save (vue|angular)
                         Default: vue
  --extension <ext>      File extension (without dot)
                         Default: html
  --concurrency <n>      Parallel requests
                         Default: 6
  --limit <n>            Process only first n blocks
  --free-only            Save only free blocks
  --cookie <string>      Cookie header value for authenticated requests
                         (or set PRIMEBLOCKS_COOKIE)
  --cookie-file <path>   Cookie file path. Supports:
                         - Netscape cookie format
                         - raw Cookie header string in a text file
                         (or set PRIMEBLOCKS_COOKIE_FILE)
  --user-id <uuid>       Optional user_id query param
                         (or set PRIMEBLOCKS_USER_ID)
  --no-overwrite         Keep existing files untouched
  -h, --help             Show this help
`);
}

function sanitizeSegment(value) {
    return String(value)
        .replace(/[\\/:*?"<>|]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

class LockedBlockError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LockedBlockError';
    }
}

function extractCatalogFromHelperScript(scriptText) {
    const match = scriptText.match(/JSON\.parse\('((?:\\.|[^'])*)'\)/);

    if (!match) {
        throw new Error('Could not find embedded catalog JSON in helper script.');
    }

    return vm.runInNewContext(`JSON.parse('${match[1]}')`);
}

async function fetchText(url, headers = {}) {
    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} while fetching ${url}`);
    }

    return response.text();
}

async function fetchJsonWithRetry(url, headers = {}, retries = 2) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            const response = await fetch(url, { headers });
            const text = await response.text();

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${text.slice(0, 300)}`);
            }

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(`Invalid JSON response: ${text.slice(0, 300)}`);
            }

            if (data?.error) {
                if (data.error.code === 'internal_server_error') {
                    throw new LockedBlockError(`Locked or unauthorized block response: ${JSON.stringify(data.error)}`);
                }
                throw new Error(`API error: ${JSON.stringify(data.error)}`);
            }

            return data;
        } catch (error) {
            lastError = error;

            if (attempt < retries) {
                const delayMs = 400 * (attempt + 1);
                await new Promise((resolve) => setTimeout(resolve, delayMs));
                continue;
            }
        }
    }

    throw lastError;
}

function parseNetscapeCookieFile(content, hostFilter = 'primeblocks.org') {
    const pairs = [];
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            continue;
        }

        const normalized = trimmed.startsWith('#HttpOnly_') ? trimmed.slice('#HttpOnly_'.length) : trimmed;

        if (normalized.startsWith('#')) {
            continue;
        }

        const parts = normalized.split('\t');
        if (parts.length < 7) {
            continue;
        }

        const [domain, , , , , name, ...valueParts] = parts;
        const value = valueParts.join('\t');
        const normalizedDomain = domain.replace(/^\./, '');

        if (!normalizedDomain.endsWith(hostFilter)) {
            continue;
        }

        pairs.push(`${name}=${value}`);
    }

    return pairs.join('; ');
}

async function resolveCookieHeader(options) {
    if (options.cookie) {
        return options.cookie;
    }

    if (!options.cookieFile) {
        return '';
    }

    const content = await fs.readFile(options.cookieFile, 'utf8');

    if (content.includes('\t')) {
        return parseNetscapeCookieFile(content);
    }

    return content.trim();
}

function buildBlockEntries(catalog) {
    const entries = [];

    for (const [categoryKey, categoryValue] of Object.entries(catalog)) {
        const categoryFolder = CATEGORY_FOLDER_MAP[categoryKey] || sanitizeSegment(categoryValue.title || categoryKey);
        const subcategories = categoryValue?.$subcategories || {};

        for (const [subcategoryKey, subcategoryValue] of Object.entries(subcategories)) {
            const subcategoryFolder = sanitizeSegment(subcategoryValue.title || subcategoryKey);
            const blocks = subcategoryValue?.$blocks || {};

            for (const block of Object.values(blocks)) {
                entries.push({
                    categoryKey,
                    categoryFolder,
                    subcategoryKey,
                    subcategoryFolder,
                    blockName: block.name,
                    blockTitle: sanitizeSegment(block.title || block.name),
                    outputTitle: sanitizeSegment(block.title || block.name),
                    free: Boolean(block.free)
                });
            }
        }
    }

    return entries;
}

function ensureUniqueOutputTitles(entries) {
    const seen = new Map();

    for (const entry of entries) {
        const key = path
            .join(entry.categoryFolder, entry.subcategoryFolder, entry.blockTitle)
            .toLowerCase();
        const count = (seen.get(key) || 0) + 1;
        seen.set(key, count);

        if (count === 1) {
            entry.outputTitle = entry.blockTitle;
            continue;
        }

        entry.outputTitle = sanitizeSegment(`${entry.blockTitle} (${entry.blockName})`);
    }
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    options.cookie = await resolveCookieHeader(options);
    const outputDir = path.isAbsolute(options.outputDir)
        ? options.outputDir
        : path.resolve(REPO_ROOT, options.outputDir);

    const headers = {
        Accept: 'application/json, text/plain, */*',
        Referer: `${options.baseUrl}/`,
        Origin: options.baseUrl
    };

    if (options.cookie) {
        headers.Cookie = options.cookie;
    }

    const helperUrl = `${options.baseUrl}/_nuxt/C--gEQKb.js`;
    console.log(`Loading catalog from ${helperUrl}`);

    const helperScript = await fetchText(helperUrl, headers);
    const catalog = extractCatalogFromHelperScript(helperScript);

    let entries = buildBlockEntries(catalog);

    if (options.freeOnly) {
        entries = entries.filter((entry) => entry.free);
    }

    if (options.limit !== null) {
        entries = entries.slice(0, options.limit);
    }

    ensureUniqueOutputTitles(entries);

    const total = entries.length;

    console.log(`Found ${total} block entries to process.`);
    console.log(
        `Saving ${options.framework} code as .${options.extension} under ${outputDir}`
    );

    await fs.mkdir(outputDir, { recursive: true });

    let index = 0;
    let okCount = 0;
    let skipCount = 0;
    let lockedCount = 0;
    let failCount = 0;

    const failures = [];
    const locked = [];

    async function worker() {
        while (true) {
            const currentIndex = index;
            index += 1;

            if (currentIndex >= total) {
                return;
            }

            const entry = entries[currentIndex];
            const seq = currentIndex + 1;

            const relativeFile = path.join(
                entry.categoryFolder,
                entry.subcategoryFolder,
                `${entry.outputTitle}.${options.extension}`
            );
            const absoluteFile = path.join(outputDir, relativeFile);

            try {
                if (!options.overwrite && (await fileExists(absoluteFile))) {
                    skipCount += 1;
                    console.log(`[${seq}/${total}] SKIP existing ${relativeFile}`);
                    continue;
                }

                const query = new URLSearchParams({
                    category: entry.categoryKey,
                    subcategory: entry.subcategoryKey,
                    name: entry.blockName
                });

                if (options.includeUserId) {
                    query.set('user_id', options.includeUserId);
                }

                const apiUrl = `${options.baseUrl}/api/blocks?${query.toString()}`;
                const payload = await fetchJsonWithRetry(apiUrl, headers, 2);

                const code = payload?.[options.framework];

                if (typeof code !== 'string' || !code.trim()) {
                    throw new Error(`Missing '${options.framework}' code in API response.`);
                }

                await fs.mkdir(path.dirname(absoluteFile), { recursive: true });
                await fs.writeFile(absoluteFile, code, 'utf8');

                okCount += 1;
                console.log(`[${seq}/${total}] OK   ${relativeFile}`);
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);

                if (error instanceof LockedBlockError) {
                    lockedCount += 1;
                    locked.push({
                        relativeFile,
                        category: entry.categoryKey,
                        subcategory: entry.subcategoryKey,
                        name: entry.blockName,
                        free: entry.free,
                        error: message
                    });
                    console.log(`[${seq}/${total}] LOCK ${relativeFile}`);
                    continue;
                }

                failCount += 1;
                failures.push({
                    relativeFile,
                    category: entry.categoryKey,
                    subcategory: entry.subcategoryKey,
                    name: entry.blockName,
                    error: message
                });
                console.log(`[${seq}/${total}] FAIL ${relativeFile} -> ${message}`);
            }
        }
    }

    const workerCount = Math.min(options.concurrency, total || 1);
    await Promise.all(Array.from({ length: workerCount }, () => worker()));

    const report = {
        generatedAt: new Date().toISOString(),
        baseUrl: options.baseUrl,
        outputDir,
        framework: options.framework,
        extension: options.extension,
        freeOnly: options.freeOnly,
        total,
        okCount,
        skipCount,
        lockedCount,
        failCount,
        locked,
        failures
    };

    const reportPath = path.join(outputDir, 'primeblocks-scrape-report.json');
    await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

    console.log('\nDone.');
    console.log(`OK: ${okCount}  SKIP: ${skipCount}  LOCKED: ${lockedCount}  FAIL: ${failCount}`);
    console.log(`Report: ${reportPath}`);

    if (failCount > 0) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error instanceof Error ? error.stack : String(error));
    process.exit(1);
});
