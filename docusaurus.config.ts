import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'KalyChain Documentation',
  tagline: 'The Official Documentation for the KalyChain Ecosystem',
  favicon: 'img/favicon.ico',

  // Future flags
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://docs.kalychain.io',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'KalyChain',
  projectName: 'kalychain-docs',

  onBrokenLinks: 'warn',
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
          editUrl: 'https://github.com/kalycoinproject/docs/tree/main/',
          routeBasePath: '/', // Docs as homepage
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/kalycoinproject/docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/kusd-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'KalyChain',
      logo: {
        alt: 'KalyChain Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingStartedSidebar',
          position: 'left',
          label: 'Getting Started',
        },
        {
          type: 'dropdown',
          label: 'Ecosystem',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'kusdSidebar',
              label: 'KUSD Protocol',
            },
            {
              type: 'docSidebar',
              sidebarId: 'bridgeSidebar',
              label: 'KalyBridge',
            },
            {
              type: 'docSidebar',
              sidebarId: 'daoSidebar',
              label: 'KalyDAO',
            },
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'developersSidebar',
          position: 'left',
          label: 'Developers',
        },
        { to: '/blog', label: 'Blog', position: 'right' },
        {
          href: 'https://github.com/kalycoinproject',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'KUSD Protocol',
              to: '/kusd/overview',
            },
            {
              label: 'KalyBridge',
              to: '/kalybridge/overview',
            },
            {
              label: 'KalyDAO',
              to: '/kalydao/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/KalyChain',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/KalyChain',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/kalychain',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/kalycoinproject',
            },
            {
              label: 'Resources',
              to: '/developers/resources',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} KalyChain. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
