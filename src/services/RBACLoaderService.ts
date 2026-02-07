/**
 * RBACLoaderService
 * Singleton service for loading and caching RBAC configuration
 */

import { XMLParser } from '../parsers/xml-parser';
import { RBAC } from '../../types/rbac.types';
import type { RBACConfig } from '../../types/rbac.types';
import * as fs from 'fs/promises';
import * as path from 'path';

export class RBACLoaderService {
  private static instance: RBACLoaderService | null = null;
  private config: RBACConfig | null = null;
  private rbacInstance: RBAC | null = null;
  private configPath: string | null = null;
  private parser: XMLParser;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    this.parser = new XMLParser();
  }

  /**
   * Get the singleton instance
   */
  static getInstance(): RBACLoaderService {
    if (!RBACLoaderService.instance) {
      RBACLoaderService.instance = new RBACLoaderService();
    }
    return RBACLoaderService.instance;
  }

  /**
   * Reset the singleton instance (useful for testing)
   */
  static resetInstance(): void {
    RBACLoaderService.instance = null;
  }

  /**
   * Load RBAC configuration from a file path
   * @param configPath - Path to the XML config file. Defaults to project root coffee-platform-roles.xml
   * @returns The parsed RBACConfig
   * @throws Error if file not found or parsing fails
   */
  async loadConfig(configPath?: string): Promise<RBACConfig> {
    const filePath = configPath || path.resolve(process.cwd(), 'coffee-platform-roles.xml');

    // Return cached config if already loaded from same path
    if (this.config && this.configPath === filePath) {
      return this.config;
    }

    const result = await this.parser.parseFile(filePath);

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to load RBAC configuration');
    }

    this.config = result.data;
    this.configPath = filePath;
    this.rbacInstance = new RBAC(this.config);

    return this.config;
  }

  /**
   * Load RBAC configuration from an XML string
   * @param xmlString - The XML content as a string
   * @returns The parsed RBACConfig
   * @throws Error if parsing fails
   */
  async loadConfigFromString(xmlString: string): Promise<RBACConfig> {
    const result = await this.parser.parseString(xmlString);

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to parse RBAC configuration');
    }

    this.config = result.data;
    this.configPath = null; // No file path for string-loaded config
    this.rbacInstance = new RBAC(this.config);

    return this.config;
  }

  /**
   * Get the currently loaded configuration
   * @returns The RBACConfig or null if not loaded
   */
  getConfig(): RBACConfig | null {
    return this.config;
  }

  /**
   * Check if a configuration has been loaded
   * @returns true if config is loaded, false otherwise
   */
  isLoaded(): boolean {
    return this.config !== null;
  }

  /**
   * Reload the configuration from the previously loaded path
   * @returns The freshly parsed RBACConfig
   * @throws Error if no path was previously loaded or parsing fails
   */
  async reload(): Promise<RBACConfig> {
    if (!this.configPath) {
      throw new Error('No config path set. Call loadConfig first.');
    }

    // Clear cache to force reload
    const previousPath = this.configPath;
    this.reset();

    return this.loadConfig(previousPath);
  }

  /**
   * Reset the service state, clearing cached config
   */
  reset(): void {
    this.config = null;
    this.rbacInstance = null;
    this.configPath = null;
  }

  /**
   * Get the RBAC instance for permission checking
   * @returns The RBAC instance or null if config not loaded
   */
  getRBACInstance(): RBAC | null {
    return this.rbacInstance;
  }

  /**
   * Get the path of the currently loaded config file
   * @returns The file path or null if loaded from string or not loaded
   */
  getConfigPath(): string | null {
    return this.configPath;
  }
}

// Export a convenience function to get the instance
export function getRBACLoader(): RBACLoaderService {
  return RBACLoaderService.getInstance();
}
