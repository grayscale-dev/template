#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const CONFIG_PATH = path.join(REPO_ROOT, 'site-remodel.config.json');

function printHelp() {
    console.log(`PrimeBlocks Library CLI

Usage:
  node scripts/primeblocks-library.mjs <command> [options]

Commands:
  summary            Print totals by category and subcategory
  list               List block files
  search             Search block names or paths

Options:
  --root <path>      Library root directory
                     Default: site-remodel.config.json primeBlocksLocalPath
  --category <name>  Filter by category folder (e.g. Application)
  --subcategory <n>  Filter by subcategory folder
  --limit <n>        Maximum rows for list/search (default 50)
  --query <text>     Search query for search command
  --content          Include file content in search
  --json             Output JSON
  -h, --help         Show help
`);
}

function parseArgs(argv) {
    if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
        return { command: 'help', options: {} };
    }

    const command = argv[0];
    const options = {
        root: '',
        category: '',
        subcategory: '',
        limit: 50,
        query: '',
        content: false,
        json: false
    };

    for (let i = 1; i < argv.length; i += 1) {
        const arg = argv[i];

        if (arg === '--root') {
            options.root = argv[++i] || '';
            continue;
        }
        if (arg === '--category') {
            options.category = (argv[++i] || '').trim();
            continue;
        }
        if (arg === '--subcategory') {
            options.subcategory = (argv[++i] || '').trim();
            continue;
        }
        if (arg === '--limit') {
            options.limit = Number(argv[++i]);
            continue;
        }
        if (arg === '--query') {
            options.query = (argv[++i] || '').trim();
            continue;
        }
        if (arg === '--content') {
            options.content = true;
            continue;
        }
        if (arg === '--json') {
            options.json = true;
            continue;
        }

        throw new Error(`Unknown argument: ${arg}`);
    }

    if (!Number.isFinite(options.limit) || options.limit < 1) {
        throw new Error(`Invalid --limit value: ${options.limit}`);
    }

    return { command, options };
}

async function readConfigLocalPath() {
    try {
        const raw = await fs.readFile(CONFIG_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        const configured = parsed?.primeBlocksLocalPath;
        if (typeof configured === 'string' && configured.trim()) {
            return configured.trim();
        }
    } catch {
        // keep fallback
    }

    return '../components';
}

function normalizeForMatch(value) {
    return value.toLowerCase();
}

function matchesFilter(value, filter) {
    if (!filter) return true;
    return normalizeForMatch(value).includes(normalizeForMatch(filter));
}

async function walkFiles(rootDir) {
    const results = [];

    async function walk(current) {
        const entries = await fs.readdir(current, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(current, entry.name);
            if (entry.isDirectory()) {
                await walk(fullPath);
                continue;
            }
            if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
                results.push(fullPath);
            }
        }
    }

    await walk(rootDir);
    return results;
}

function toBlockRecord(rootDir, filePath) {
    const relativePath = path.relative(rootDir, filePath);
    const parts = relativePath.split(path.sep);

    const category = parts[0] || '';
    const subcategory = parts[1] || '';
    const filename = parts[parts.length - 1] || '';
    const name = filename.replace(/\.html$/i, '');

    return {
        category,
        subcategory,
        name,
        relativePath,
        filePath
    };
}

function applyBaseFilters(records, options) {
    return records.filter(
        (record) =>
            matchesFilter(record.category, options.category) &&
            matchesFilter(record.subcategory, options.subcategory)
    );
}

function printTable(rows) {
    for (const row of rows) {
        console.log(row);
    }
}

async function commandSummary(records, options) {
    const filtered = applyBaseFilters(records, options);

    const byCategory = new Map();
    const bySubcategory = new Map();

    for (const record of filtered) {
        byCategory.set(record.category, (byCategory.get(record.category) || 0) + 1);
        const subKey = `${record.category} / ${record.subcategory}`;
        bySubcategory.set(subKey, (bySubcategory.get(subKey) || 0) + 1);
    }

    const categories = Array.from(byCategory.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, count]) => ({ name, count }));

    const subcategories = Array.from(bySubcategory.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([name, count]) => ({ name, count }));

    if (options.json) {
        console.log(
            JSON.stringify(
                {
                    total: filtered.length,
                    categories,
                    subcategories
                },
                null,
                2
            )
        );
        return;
    }

    console.log(`Total blocks: ${filtered.length}`);
    console.log('');
    console.log('By category:');
    printTable(categories.map((row) => `- ${row.name}: ${row.count}`));
    console.log('');
    console.log('Top subcategories:');
    printTable(
        subcategories
            .slice(0, 20)
            .map((row) => `- ${row.name}: ${row.count}`)
    );
}

async function commandList(records, options) {
    const filtered = applyBaseFilters(records, options).slice(0, options.limit);

    if (options.json) {
        console.log(JSON.stringify(filtered, null, 2));
        return;
    }

    if (filtered.length === 0) {
        console.log('No matching block files.');
        return;
    }

    for (let i = 0; i < filtered.length; i += 1) {
        const record = filtered[i];
        console.log(`${String(i + 1).padStart(3, ' ')}. ${record.relativePath}`);
    }
}

async function commandSearch(records, options) {
    if (!options.query) {
        throw new Error('search command requires --query');
    }

    const filtered = applyBaseFilters(records, options);
    const query = normalizeForMatch(options.query);

    const hits = [];
    for (const record of filtered) {
        const haystack = `${record.relativePath} ${record.name}`.toLowerCase();
        let matched = haystack.includes(query);

        if (!matched && options.content) {
            const content = await fs.readFile(record.filePath, 'utf8');
            matched = content.toLowerCase().includes(query);
        }

        if (matched) {
            hits.push(record);
            if (hits.length >= options.limit) break;
        }
    }

    if (options.json) {
        console.log(JSON.stringify(hits, null, 2));
        return;
    }

    if (hits.length === 0) {
        console.log('No matches found.');
        return;
    }

    for (let i = 0; i < hits.length; i += 1) {
        const hit = hits[i];
        console.log(`${String(i + 1).padStart(3, ' ')}. ${hit.relativePath}`);
    }
}

async function main() {
    const { command, options } = parseArgs(process.argv.slice(2));

    if (command === 'help') {
        printHelp();
        return;
    }

    const configuredRoot = options.root || (await readConfigLocalPath());
    const rootDir = path.resolve(REPO_ROOT, configuredRoot);

    const stat = await fs.stat(rootDir).catch(() => null);
    if (!stat || !stat.isDirectory()) {
        throw new Error(`PrimeBlocks library path does not exist: ${rootDir}`);
    }

    const files = await walkFiles(rootDir);
    const records = files.map((filePath) => toBlockRecord(rootDir, filePath));

    if (command === 'summary') {
        await commandSummary(records, options);
        return;
    }
    if (command === 'list') {
        await commandList(records, options);
        return;
    }
    if (command === 'search') {
        await commandSearch(records, options);
        return;
    }

    throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
});
