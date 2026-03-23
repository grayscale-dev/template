import rawConfig from '../../site-remodel.config.json'

export interface SiteRemodelConfig {
  primaryColor: string
  secondaryColor: string
  siteName: string
  sourceUrl: string
  inspirationUrl: string
  useSupabase: boolean
}

const defaults: SiteRemodelConfig = {
  primaryColor: '#1d4ed8',
  secondaryColor: '#0f172a',
  siteName: 'Website Remodel Starter',
  sourceUrl: '',
  inspirationUrl: '',
  useSupabase: false
}

const configInput = (rawConfig ?? {}) as Partial<SiteRemodelConfig>

function readString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : fallback
}

function readBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback
}

export const remodelConfig: SiteRemodelConfig = {
  primaryColor: readString(configInput.primaryColor, defaults.primaryColor),
  secondaryColor: readString(
    configInput.secondaryColor,
    defaults.secondaryColor
  ),
  siteName: readString(configInput.siteName, defaults.siteName),
  sourceUrl: readString(configInput.sourceUrl, defaults.sourceUrl),
  inspirationUrl: readString(
    configInput.inspirationUrl,
    defaults.inspirationUrl
  ),
  useSupabase: readBoolean(configInput.useSupabase, defaults.useSupabase)
}
