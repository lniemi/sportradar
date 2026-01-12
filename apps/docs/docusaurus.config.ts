import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'TrailRadar',
  tagline: 'Ultra-trail event spectator application documentation',
  favicon: 'img/logo.svg',

  url: 'https://trailradar.example.com',
  baseUrl: '/',

  organizationName: 'trailradar',
  projectName: 'trailradar',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: 'TrailRadar',
      logo: {
        alt: 'TrailRadar Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/trailradar/trailradar',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Architecture',
              to: '/docs/category/architecture',
            },
          ],
        },
        {
          title: 'Apps',
          items: [
            {
              label: 'Spectator App',
              to: '/docs/apps/spectator',
            },
            {
              label: 'Website',
              to: '/docs/apps/website',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TrailRadar. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
