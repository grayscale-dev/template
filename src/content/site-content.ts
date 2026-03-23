import type { SiteContent } from '../types/site'

export const siteContent: SiteContent = {
  metadata: {
    siteName: 'Northline Studio',
    tagline: 'Remodeling legacy marketing sites into modern growth engines.',
    description:
      'A reusable marketing-site template designed for rapid website remodel projects powered by Vue, PrimeVue, and Tailwind.',
    sourceUrl: 'https://example.com'
  },
  navItems: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' }
  ],
  hero: {
    eyebrow: 'Website Remodel Template',
    title: 'Launch a polished, conversion-focused rebuild in days, not months.',
    subtitle:
      'Use this starter to transform existing front-facing websites into modern, section-based experiences that are easy to maintain and evolve.',
    primaryCta: { label: 'Book a Remodel Call', to: '/contact' },
    secondaryCta: { label: 'View Services', to: '/services' }
  },
  features: [
    {
      title: 'Section-Based Architecture',
      description:
        'Swap, reorder, or rewrite page sections quickly without untangling tightly coupled templates.',
      icon: 'pi pi-th-large'
    },
    {
      title: 'Typed Content Model',
      description:
        'Centralized TypeScript content keeps site copy and page structure predictable for future automated updates.',
      icon: 'pi pi-file-edit'
    },
    {
      title: 'PrimeVue + Tailwind UI',
      description:
        'Leverage proven component patterns with utility-first styling to build credible marketing pages faster.',
      icon: 'pi pi-palette'
    },
    {
      title: 'Optional Supabase Ready',
      description:
        'Supabase is wired in as an optional integration for forms, auth, and editable content when needed.',
      icon: 'pi pi-database'
    },
    {
      title: 'Codex-Optimized Layout',
      description:
        'Clean structure enables future Codex runs to remodel pages efficiently with minimal context overhead.',
      icon: 'pi pi-bolt'
    },
    {
      title: 'Accessible by Default',
      description:
        'Responsive layouts, semantic markup, and clear interaction patterns create a stronger baseline experience.',
      icon: 'pi pi-check-circle'
    }
  ],
  testimonials: [
    {
      quote:
        'The remodel clarified our offer and made the site easier for both customers and our internal team.',
      name: 'Jordan Lee',
      role: 'Marketing Director',
      company: 'Brightline Mechanical'
    },
    {
      quote:
        'Our new pages are noticeably easier to update, and design changes no longer require full rework.',
      name: 'Priya Shah',
      role: 'Operations Lead',
      company: 'Hearth & Harbor'
    },
    {
      quote:
        'We finally have a frontend foundation that balances polish, speed, and maintainability.',
      name: 'Marcus Ford',
      role: 'Founder',
      company: 'Summit Ridge Advisors'
    }
  ],
  faq: [
    {
      question: 'Can this template mirror an existing website structure?',
      answer:
        'Yes. It is built for structured remodeling: preserving business intent while modernizing layout, content clarity, and visual hierarchy.'
    },
    {
      question: 'Do we have to use Supabase?',
      answer:
        'No. Supabase is fully optional. If environment variables are missing, the app runs normally with no runtime errors.'
    },
    {
      question: 'How quickly can new sections be added?',
      answer:
        'New sections can be added as standalone Vue components and dropped into page files with typed props from the content model.'
    },
    {
      question: 'Is this optimized for future Codex runs?',
      answer:
        'Yes. The repository uses clean organization, predictable naming, and centralized content/config files for fast iterative changes.'
    }
  ],
  cta: {
    title: 'Ready to remodel a website with a stronger conversion path?',
    body: 'Start with this template, map the existing site structure, and ship a cleaner frontend that is easier to evolve.',
    action: { label: 'Start Your Remodel', to: '/contact' }
  },
  contact: {
    headline: 'Talk with the remodel team',
    body: 'Share your current website, growth goals, and constraints. We will respond with a practical rebuild direction.',
    email: 'hello@northline.example',
    phone: '(555) 018-2200',
    addressLines: ['420 Market Street', 'Suite 300', 'Denver, CO 80202'],
    hours: 'Monday-Friday, 9:00 AM-5:00 PM MT'
  },
  footer: {
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'About', to: '/about' },
          { label: 'Services', to: '/services' },
          { label: 'Contact', to: '/contact' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { label: 'Remodel Plan', href: '#' },
          { label: 'Project Checklist', href: '#' },
          { label: 'Implementation Notes', href: '#' }
        ]
      }
    ],
    copyright: 'Northline Studio. All rights reserved.',
    legal:
      'This template is intended for website remodeling and modernization projects.'
  },
  pages: {
    about: {
      title: 'About Our Remodel Approach',
      subtitle: 'Strategic modernization without losing what already works.',
      paragraphs: [
        'We start by understanding your current website architecture, message hierarchy, and user pathways before rewriting components.',
        'The goal is to preserve business intent while improving readability, flow, and conversion opportunities across each page.',
        'Every remodel is built with future iteration in mind, so content, sections, and style can evolve quickly.'
      ],
      highlights: [
        'Structured page decomposition into reusable sections',
        'Clear information architecture with measurable CTA paths',
        'Frontend-first implementation that remains easy to maintain'
      ]
    },
    services: {
      title: 'Remodel Services',
      subtitle: 'From quick refreshes to full front-end rebuilds.',
      intro:
        'Choose the level of remodel support that matches your timeline and complexity. Each service keeps implementation modular and future-proof.',
      services: [
        {
          name: 'Homepage Remodel',
          summary:
            'Rebuild hero, trust, value proposition, and conversion flow for your primary landing page.'
        },
        {
          name: 'Multi-Page Refresh',
          summary:
            'Modernize key marketing pages with reusable section patterns and improved visual consistency.'
        },
        {
          name: 'Information Architecture Rewrite',
          summary:
            'Reorganize navigation and page structure to clarify user journeys and decision points.'
        },
        {
          name: 'Content-Ready Component System',
          summary:
            'Deliver reusable components that make future content updates faster for internal teams.'
        }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'Start your website remodel conversation.',
      intro:
        'Use the form below to share the current website URL and project goals. This starter is built so the form can later connect to Supabase without structural changes.'
    }
  }
}
