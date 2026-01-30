import type { RoleId } from '../../types/rbac.types';

// Map Aether Grounds roles to the landing page roles
const roleMap: Record<RoleId, 'farmers' | 'roasters' | 'hubs'> = {
  farmers: 'farmers',
  'roasters-retailers': 'roasters',
  'hub-community': 'hubs',
  'affiliates-distributors': 'hubs',
};

type LandingRole = 'farmers' | 'roasters' | 'hubs';
type ChainNode = 'farm' | 'crop' | 'bean' | 'roast' | 'brew' | 'retail';

type Content = {
  tagline: string;
  subhead: string;
  roles: Record<LandingRole, { title: string; description: string }>;
  chainOfCustody: {
    title: string;
    description: string;
    nodes: Record<ChainNode, { title: string; description: string }>;
  };
  capabilities: {
    title: string;
    description: Record<LandingRole, string>;
    items: Record<
      LandingRole,
      Array<{ title: string; description: string; icon?: any }>
    >;
  };
  trust: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  footer: {
    links: Array<{ text: string; href: string }>;
    copyright: string;
  };
};

export const content: Content = {
  tagline: 'ONE PLATFORM ONE STANDARD ONE AETHER',
  subhead:
    'The Coffee-Native Operating System — Infrastructure for certification, contracts, and trust',
  roles: {
    farmers: {
      title: 'For Farmers',
      description:
        'Manage your crops, contracts, and certifications with irrefutable data.',
    },
    roasters: {
      title: 'For Roasters',
      description:
        'Source with confidence. Trace every bean back to its origin and ensure quality.',
    },
    hubs: {
      title: 'For Hubs',
      description:
        'Streamline logistics and aggregation with a single source of truth for your network.',
    },
  },
  chainOfCustody: {
    title: 'A Digital Twin for Every Bean',
    description:
      'Aether Grounds creates an unbroken, auditable chain of custody from farm to cup. Each step is a verifiable event on a shared ledger, ensuring unparalleled transparency and trust.',
    nodes: {
      farm: {
        title: 'Farm',
        description:
          'The journey begins. Geolocation, soil data, and farm certifications are recorded, establishing the foundational identity of the crop.',
      },
      crop: {
        title: 'Crop',
        description:
          'From planting to harvest, every action is documented. Yield forecasts, organic practices, and labor standards are verified and locked.',
      },
      bean: {
        title: 'Bean',
        description:
          'Post-harvest processing is critical. Wet or dry processing methods, drying times, and quality scores are recorded for each micro-lot.',
      },
      roast: {
        title: 'Roast',
        description:
          "The roaster's art meets science. Roast profiles, batch data, and cupping scores are linked to the specific bean lot, preserving its unique story.",
      },
      brew: {
        title: 'Brew',
        description:
          'In the cafe, brewing parameters like grind size, water temperature, and extraction time are logged, offering the final link in the quality chain.',
      },
      retail: {
        title: 'Retail',
        description:
          'The final product is packaged with a unique Aether ID. Consumers can scan to trace its entire journey, verifying its authenticity and story.',
      },
    },
  },
  capabilities: {
    title: 'A Purpose-Built OS',
    description: {
      farmers:
        'Tools designed to capture value, prove quality, and access new markets.',
      roasters:
        'Source with integrity and offer customers a new level of transparency.',
      hubs: 'The operating system for modern, data-driven coffee logistics.',
    },
    items: {
      farmers: [
        {
          title: 'Digital ID',
          description:
            'Create a permanent, verifiable identity for your farm and each of your crops.',
        },
        {
          title: 'Smart Contracts',
          description:
            'Automate sales agreements and payments with buyers, triggered by verified delivery.',
        },
        {
          title: 'Certification Management',
          description:
            'Streamline organic and fair-trade certification audits with immutable records.',
        },
      ],
      roasters: [
        {
          title: 'Traceable Sourcing',
          description:
            'Access a marketplace of verified, high-quality beans with complete origin data.',
        },
        {
          title: 'Quality Assurance',
          description:
            'Verify cupping scores and processing methods before you purchase.',
        },
        {
          title: 'Dynamic Storytelling',
          description:
            'Provide your customers with a rich, verifiable story for every coffee you sell.',
        },
      ],
      hubs: [
        {
          title: 'Aggregated Logistics',
          description:
            'Manage inventory from multiple farms in a single, unified system.',
        },
        {
          title: 'Lot Tracking',
          description:
            'Maintain perfect separation and tracking of micro-lots through your facility.',
        },
        {
          title: 'Compliance Automation',
          description:
            'Simplify import/export documentation with a single, trusted data source.',
        },
      ],
    },
  },
  trust: {
    title: 'Trust & Governance',
    description:
      'Aether Grounds is not a central authority. It is a decentralized protocol governed by its participants. Our open-source framework ensures that the rules are transparent and the data is owned by its creators.',
  },
  cta: {
    title: 'Join the New Standard.',
    description:
      "Whether you're a single-estate farmer or a global roaster, Aether Grounds provides the tools for a more transparent and equitable coffee future. Get started with the Pilot Program.",
    button: 'Request Access',
  },
  footer: {
    links: [
      { text: 'Protocol', href: '#' },
      { text: 'Docs', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Contact', href: '#' },
    ],
    copyright: `© ${new Date().getFullYear()} Aether Grounds. All Rights Reserved.`,
  },
};

// Helper to get landing role from RBAC role
export function getLandingRole(roleId: RoleId): LandingRole {
  return roleMap[roleId] || 'farmers';
}

export type { LandingRole, ChainNode };
