export interface NavItem {
  label: string
  to: string
}

export interface ActionLink {
  label: string
  to?: string
  href?: string
}

export interface SiteMetadata {
  siteName: string
  tagline: string
  description: string
  sourceUrl?: string
}

export interface HeroContent {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta: ActionLink
  secondaryCta?: ActionLink
}

export interface FeatureBlock {
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface CtaContent {
  title: string
  body: string
  action: ActionLink
}

export interface ContactInfo {
  headline: string
  body: string
  email: string
  phone: string
  addressLines: string[]
  hours: string
}

export interface FooterLink {
  label: string
  to?: string
  href?: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterData {
  columns: FooterColumn[]
  copyright: string
  legal: string
}

export interface AboutPageContent {
  title: string
  subtitle: string
  paragraphs: string[]
  highlights: string[]
}

export interface ServiceItem {
  name: string
  summary: string
}

export interface ServicesPageContent {
  title: string
  subtitle: string
  intro: string
  services: ServiceItem[]
}

export interface ContactPageContent {
  title: string
  subtitle: string
  intro: string
}

export interface SiteContent {
  metadata: SiteMetadata
  navItems: NavItem[]
  hero: HeroContent
  features: FeatureBlock[]
  testimonials: Testimonial[]
  faq: FaqItem[]
  cta: CtaContent
  contact: ContactInfo
  footer: FooterData
  pages: {
    about: AboutPageContent
    services: ServicesPageContent
    contact: ContactPageContent
  }
}
