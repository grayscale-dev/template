import rawConfig from '../../site-remodel.config.json'

export type PrimeBlocksAccess = 'free' | 'full'
export type PrimeBlocksDelivery = 'catalog' | 'local'

export interface SiteRemodelConfig {
  primaryColor: string
  secondaryColor: string
  siteName: string
  sourceUrl: string
  inspirationUrl: string
  primeBlocksAccess: PrimeBlocksAccess
  primeBlocksDelivery: PrimeBlocksDelivery
  primeBlocksLocalPath: string
  useSupabase: boolean
}

const defaults: SiteRemodelConfig = {
  primaryColor: '#1d4ed8',
  secondaryColor: '#0f172a',
  siteName: 'Website Remodel Starter',
  sourceUrl: '',
  inspirationUrl: '',
  primeBlocksAccess: 'full',
  primeBlocksDelivery: 'local',
  primeBlocksLocalPath: '../components',
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

function readPrimeBlocksAccess(
  value: unknown,
  fallback: PrimeBlocksAccess
): PrimeBlocksAccess {
  return value === 'free' || value === 'full' ? value : fallback
}

function readPrimeBlocksDelivery(
  value: unknown,
  fallback: PrimeBlocksDelivery
): PrimeBlocksDelivery {
  return value === 'catalog' || value === 'local' ? value : fallback
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
  primeBlocksAccess: readPrimeBlocksAccess(
    configInput.primeBlocksAccess,
    defaults.primeBlocksAccess
  ),
  primeBlocksDelivery: readPrimeBlocksDelivery(
    configInput.primeBlocksDelivery,
    defaults.primeBlocksDelivery
  ),
  primeBlocksLocalPath: readString(
    configInput.primeBlocksLocalPath,
    defaults.primeBlocksLocalPath
  ),
  useSupabase: readBoolean(configInput.useSupabase, defaults.useSupabase)
}
