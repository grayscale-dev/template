import { remodelConfig } from './config'

interface PageSeoInput {
  title: string
  description?: string
}

function setMetaDescription(description: string): void {
  const existing = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]'
  )

  if (existing) {
    existing.setAttribute('content', description)
    return
  }

  const meta = document.createElement('meta')
  meta.setAttribute('name', 'description')
  meta.setAttribute('content', description)
  document.head.appendChild(meta)
}

export function applyPageSeo({ title, description }: PageSeoInput): void {
  if (typeof document === 'undefined') {
    return
  }

  const baseName = remodelConfig.siteName || 'Website Remodel Starter'
  document.title = title ? `${title} | ${baseName}` : baseName

  if (description) {
    setMetaDescription(description)
  }
}
