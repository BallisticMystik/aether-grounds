/**
 * XML Parser Types
 * Types for parsing coffee-platform-roles.xml
 */

// Raw XML structure types (as returned by xml2js)
export interface RawXMLFeature {
  $: {
    id: string;
    name: string;
    'access-level'?: string;
    category?: string;
    description?: string;
  };
}

export interface RawXMLRole {
  $: {
    id: string;
    name: string;
    'connection-type': string;
  };
  features: [{ feature: RawXMLFeature[] }];
}

export interface RawXMLAccessLevel {
  $: {
    id: string;
    name: string;
    description: string;
  };
}

export interface RawXMLCategory {
  $: {
    id: string;
    name: string;
    description: string;
  };
}

export interface RawXMLConnectionType {
  $: {
    id: string;
    name: string;
    description: string;
  };
}

export interface RawXMLCoffeePlatform {
  'coffee-platform': {
    metadata: [{
      name: [string];
      description: [string];
      version: [string];
    }];
    roles: [{
      role: RawXMLRole[];
    }];
    'feature-catalog': [{
      feature: RawXMLFeature[];
    }];
    'access-levels': [{
      'access-level': RawXMLAccessLevel[];
    }];
    categories: [{
      category: RawXMLCategory[];
    }];
    'connection-types': [{
      'connection-type': RawXMLConnectionType[];
    }];
  };
}

// Parser options
export interface XMLParserOptions {
  filePath?: string;
  xmlString?: string;
  strict?: boolean;
}

// Parser result
export interface ParseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Type guards
export function isRawXMLCoffeePlatform(obj: unknown): obj is RawXMLCoffeePlatform {
  if (!obj || typeof obj !== 'object') return false;
  const platform = obj as RawXMLCoffeePlatform;
  return (
    platform['coffee-platform'] !== undefined &&
    Array.isArray(platform['coffee-platform'].metadata) &&
    Array.isArray(platform['coffee-platform'].roles)
  );
}

export function isValidAccessLevel(level: string): level is 'full' | 'partial' | 'view-only' | 'no' {
  return ['full', 'partial', 'view-only', 'no'].includes(level);
}

export function isValidConnectionType(type: string): type is 'pink' | 'purple' {
  return ['pink', 'purple'].includes(type);
}
