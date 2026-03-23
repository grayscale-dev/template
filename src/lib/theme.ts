import { remodelConfig, type SiteRemodelConfig } from './config'

interface RgbColor {
  r: number
  g: number
  b: number
}

function parseHexColor(input: string): RgbColor | null {
  const value = input.trim().replace('#', '')
  const normalized =
    value.length === 3
      ? value
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : value

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null
  }

  const parsed = Number.parseInt(normalized, 16)

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255
  }
}

function parseRgbColor(input: string): RgbColor | null {
  const match = input
    .trim()
    .match(
      /^rgba?\(\s*([0-9]{1,3})\s*[, ]\s*([0-9]{1,3})\s*[, ]\s*([0-9]{1,3})/i
    )

  if (!match) {
    return null
  }

  const [r, g, b] = [match[1], match[2], match[3]].map((channel) =>
    Number.parseInt(channel, 10)
  )

  if (
    Number.isNaN(r) ||
    Number.isNaN(g) ||
    Number.isNaN(b) ||
    r > 255 ||
    g > 255 ||
    b > 255
  ) {
    return null
  }

  return { r, g, b }
}

function toRgb(input: string): RgbColor | null {
  return parseHexColor(input) ?? parseRgbColor(input)
}

function toLinearChannel(channel: number): number {
  const normalized = channel / 255
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

function getRelativeLuminance(color: RgbColor): number {
  const r = toLinearChannel(color.r)
  const g = toLinearChannel(color.g)
  const b = toLinearChannel(color.b)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function getContrastRatio(first: number, second: number): number {
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)
  return (lighter + 0.05) / (darker + 0.05)
}

function getReadableForeground(backgroundColor: string): '#000000' | '#ffffff' {
  const rgb = toRgb(backgroundColor)

  if (!rgb) {
    return '#ffffff'
  }

  const luminance = getRelativeLuminance(rgb)
  const contrastWithBlack = getContrastRatio(luminance, 0)
  const contrastWithWhite = getContrastRatio(luminance, 1)

  return contrastWithBlack >= contrastWithWhite ? '#000000' : '#ffffff'
}

export function applyThemeFromConfig(
  config: Partial<SiteRemodelConfig> = remodelConfig
): void {
  if (typeof document === 'undefined') {
    return
  }

  const primary = config.primaryColor?.trim() || '#1d4ed8'
  const secondary = config.secondaryColor?.trim() || '#0f172a'
  const onPrimary = getReadableForeground(primary)
  const onSecondary = getReadableForeground(secondary)

  const root = document.documentElement
  root.style.setProperty('--brand-primary', primary)
  root.style.setProperty('--brand-secondary', secondary)
  root.style.setProperty('--brand-on-primary', onPrimary)
  root.style.setProperty('--brand-on-secondary', onSecondary)
  root.style.setProperty('--brand-primary-soft', `color-mix(in srgb, ${primary} 15%, white)`)
  root.style.setProperty(
    '--brand-secondary-soft',
    `color-mix(in srgb, ${secondary} 15%, white)`
  )
}
