/**
 * Script to generate RBAC configuration from XML
 * This can be used to convert XML to JSON, TypeScript, or other formats
 */

import { readFileSync } from 'fs';
import { parseString } from 'xml2js';

/**
 * Parse XML and convert to TypeScript-friendly JSON structure
 */
export async function parseRBACXML(xmlPath: string): Promise<any> {
  const xmlContent = readFileSync(xmlPath, 'utf-8');
  
  return new Promise((resolve, reject) => {
    parseString(xmlContent, { explicitArray: true }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/**
 * Convert XML structure to RBAC config format
 */
export function transformToRBACConfig(xmlData: any): any {
  const platform = xmlData['coffee-platform'];
  
  return {
    metadata: {
      name: platform.metadata[0].name[0],
      description: platform.metadata[0].description[0],
      version: platform.metadata[0].version[0],
    },
    roles: platform.roles[0].role.map((role: any) => ({
      id: role.$.id,
      name: role.$.name,
      connectionType: role.$['connection-type'],
      features: role.features[0].feature.map((f: any) => ({
        id: f.$.id,
        name: f.$.name,
        accessLevel: f.$['access-level'],
        description: f.$.description || undefined,
      })),
    })),
    features: platform['feature-catalog'][0].feature.map((f: any) => ({
      id: f.$.id,
      name: f.$.name,
      category: f.$.category,
      description: f.$.description || undefined,
    })),
    accessLevels: platform['access-levels'][0]['access-level'].map((al: any) => ({
      id: al.$.id,
      name: al.$.name[0],
      description: al.$.description[0],
    })),
    categories: platform.categories[0].category.map((c: any) => ({
      id: c.$.id,
      name: c.$.name[0],
      description: c.$.description[0],
    })),
    connectionTypes: platform['connection-types'][0]['connection-type'].map((ct: any) => ({
      id: ct.$.id,
      name: ct.$.name[0],
      description: ct.$.description[0],
    })),
  };
}

/**
 * Generate TypeScript constant from config
 */
export function generateTypeScriptConfig(config: any): string {
  return `/**
 * Auto-generated RBAC Configuration
 * DO NOT EDIT - Generated from coffee-platform-roles.xml
 */

export const RBAC_CONFIG = ${JSON.stringify(config, null, 2)} as const;
`;
}

/**
 * Generate JSON config file
 */
export function generateJSONConfig(config: any): string {
  return JSON.stringify(config, null, 2);
}

// Example usage (uncomment to use):
/*
import { parseRBACXML, transformToRBACConfig, generateTypeScriptConfig } from './generate-rbac-config';
import { writeFileSync } from 'fs';

async function main() {
  const xmlData = await parseRBACXML('./coffee-platform-roles.xml');
  const config = transformToRBACConfig(xmlData);
  const tsCode = generateTypeScriptConfig(config);
  
  writeFileSync('./generated/rbac-config.ts', tsCode);
  writeFileSync('./generated/rbac-config.json', generateJSONConfig(config));
}

main().catch(console.error);
*/
