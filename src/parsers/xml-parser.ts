/**
 * XML Parser for Coffee Platform RBAC Configuration
 * Parses coffee-platform-roles.xml into RBACConfig structure
 */

import { parseStringPromise } from 'xml2js';
import * as fs from 'fs/promises';
import type {
  RBACConfig,
  Role,
  RoleFeature,
  Feature,
  AccessLevelDefinition,
  Category,
  ConnectionTypeDefinition,
  AccessLevel,
  ConnectionType,
  CategoryId,
  FeatureId,
  RoleId,
} from '../../types/rbac.types';
import type {
  RawXMLCoffeePlatform,
  RawXMLRole,
  RawXMLFeature,
  ParseResult,
} from './types';
import { isRawXMLCoffeePlatform, isValidAccessLevel, isValidConnectionType } from './types';

export class XMLParser {
  /**
   * Parse XML file from path
   */
  async parseFile(filePath: string): Promise<ParseResult<RBACConfig>> {
    try {
      const xmlContent = await fs.readFile(filePath, 'utf-8');
      return this.parseString(xmlContent);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error reading file';
      return {
        success: false,
        error: `Failed to read file: ${message}`,
      };
    }
  }

  /**
   * Parse XML string
   */
  async parseString(xmlString: string): Promise<ParseResult<RBACConfig>> {
    if (!xmlString || xmlString.trim() === '') {
      return {
        success: false,
        error: 'Empty XML string provided',
      };
    }

    try {
      const rawXml = await parseStringPromise(xmlString, {
        explicitArray: true,
        mergeAttrs: false,
      });

      if (!isRawXMLCoffeePlatform(rawXml)) {
        return {
          success: false,
          error: 'Invalid XML structure: not a valid coffee-platform document',
        };
      }

      return this.transformToRBACConfig(rawXml);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown parsing error';
      return {
        success: false,
        error: `XML parsing error: ${message}`,
      };
    }
  }

  /**
   * Transform raw XML to RBACConfig
   */
  private transformToRBACConfig(rawXml: RawXMLCoffeePlatform): ParseResult<RBACConfig> {
    const platform = rawXml['coffee-platform'];

    // Validate required sections exist
    if (!platform.metadata?.[0]) {
      return { success: false, error: 'Missing required section: metadata' };
    }
    if (!platform.roles?.[0]?.role) {
      return { success: false, error: 'Missing required section: roles' };
    }
    if (!platform['feature-catalog']?.[0]?.feature) {
      return { success: false, error: 'Missing required section: feature-catalog' };
    }
    if (!platform['access-levels']?.[0]?.['access-level']) {
      return { success: false, error: 'Missing required section: access-levels' };
    }
    if (!platform.categories?.[0]?.category) {
      return { success: false, error: 'Missing required section: categories' };
    }
    if (!platform['connection-types']?.[0]?.['connection-type']) {
      return { success: false, error: 'Missing required section: connection-types' };
    }

    try {
      const config: RBACConfig = {
        metadata: {
          name: platform.metadata[0].name[0],
          description: platform.metadata[0].description[0],
          version: platform.metadata[0].version[0],
        },
        roles: this.parseRoles(platform.roles[0].role),
        features: this.parseFeatureCatalog(platform['feature-catalog'][0].feature),
        accessLevels: this.parseAccessLevels(platform['access-levels'][0]['access-level']),
        categories: this.parseCategories(platform.categories[0].category),
        connectionTypes: this.parseConnectionTypes(platform['connection-types'][0]['connection-type']),
      };

      return {
        success: true,
        data: config,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown transformation error';
      return {
        success: false,
        error: `Failed to transform XML: ${message}`,
      };
    }
  }

  /**
   * Parse roles from XML
   */
  private parseRoles(rawRoles: RawXMLRole[]): Role[] {
    return rawRoles.map(rawRole => {
      const connectionType = rawRole.$['connection-type'];

      return {
        id: rawRole.$.id as RoleId,
        name: rawRole.$.name,
        connectionType: isValidConnectionType(connectionType) ? connectionType : 'purple',
        features: this.parseRoleFeatures(rawRole.features[0]?.feature || []),
      };
    });
  }

  /**
   * Parse features within a role
   */
  private parseRoleFeatures(rawFeatures: RawXMLFeature[]): RoleFeature[] {
    return rawFeatures.map(rawFeature => {
      const accessLevel = rawFeature.$['access-level'] || 'no';

      return {
        id: rawFeature.$.id as FeatureId,
        name: rawFeature.$.name,
        accessLevel: isValidAccessLevel(accessLevel) ? accessLevel : 'no',
        ...(rawFeature.$.description && { description: rawFeature.$.description }),
      };
    });
  }

  /**
   * Parse feature catalog
   */
  private parseFeatureCatalog(rawFeatures: RawXMLFeature[]): Feature[] {
    return rawFeatures.map(rawFeature => ({
      id: rawFeature.$.id as FeatureId,
      name: rawFeature.$.name,
      category: (rawFeature.$.category || 'core') as CategoryId,
      ...(rawFeature.$.description && { description: rawFeature.$.description }),
    }));
  }

  /**
   * Parse access levels
   */
  private parseAccessLevels(rawLevels: Array<{ $: { id: string; name: string; description: string } }>): AccessLevelDefinition[] {
    return rawLevels.map(rawLevel => ({
      id: rawLevel.$.id as AccessLevel,
      name: rawLevel.$.name,
      description: rawLevel.$.description,
    }));
  }

  /**
   * Parse categories
   */
  private parseCategories(rawCategories: Array<{ $: { id: string; name: string; description: string } }>): Category[] {
    return rawCategories.map(rawCategory => ({
      id: rawCategory.$.id as CategoryId,
      name: rawCategory.$.name,
      description: rawCategory.$.description,
    }));
  }

  /**
   * Parse connection types
   */
  private parseConnectionTypes(rawTypes: Array<{ $: { id: string; name: string; description: string } }>): ConnectionTypeDefinition[] {
    return rawTypes.map(rawType => ({
      id: rawType.$.id as ConnectionType,
      name: rawType.$.name,
      description: rawType.$.description,
    }));
  }
}

// Export a default instance
export const xmlParser = new XMLParser();

// Export types
export * from './types';
