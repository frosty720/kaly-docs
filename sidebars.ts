import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Main Getting Started Sidebar
  gettingStartedSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Network',
      items: [
        'getting-started/what-is-kalychain',
        'getting-started/wallet-setup',
      ],
    },
  ],

  // KUSD Protocol Sidebar (Consolidated)
  kusdSidebar: [
    'kusd/overview',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['kusd/getting-started/kusd-protocol-101'],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      items: [
        'kusd/smart-contracts/core-module/index',
        'kusd/smart-contracts/kusd-module/index',
        'kusd/smart-contracts/psm-module/index',
        {
          type: 'category',
          label: 'Other Modules',
          items: [
            'kusd/smart-contracts/collateral-module/index',
            'kusd/smart-contracts/oracle-module/index',
            'kusd/smart-contracts/liquidation-module/index',
            'kusd/smart-contracts/rates-module/index',
            'kusd/smart-contracts/governance-module/index',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Keepers',
      items: [
        'kusd/keepers/overview',
        'kusd/keepers/kusd-keeper',
        'kusd/keepers/psm-keeper',
      ],
    },
    {
      type: 'category',
      label: 'Tools & Deployment',
      items: [
        'kusd/cli/overview',
        'kusd/deployment/addresses',
      ],
    },
  ],

  // KalyBridge Sidebar
  bridgeSidebar: [
    'kalybridge/overview',
    'kalybridge/how-to-bridge',
    'kalybridge/supported-tokens',
  ],

  // KalyDAO Sidebar
  daoSidebar: [
    'kalydao/overview',
    // Add more DAO docs here later
  ],

  // Developers Sidebar
  developersSidebar: [
    'developers/resources',
    // Add more dev docs here later
  ],
};

export default sidebars;
