/**
 * FeatureWrapper Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureWrapper } from '../../../../src/components/features/FeatureWrapper';
import type { AccessLevel } from '../../../../types/rbac.types';

describe('FeatureWrapper', () => {
  const testFeatureId = 'profile' as const;
  const testChildren = <div>Test Content</div>;

  describe('Full Access', () => {
    it('should render children when access level is full', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="full">
          {testChildren}
        </FeatureWrapper>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should not show access denied message for full access', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="full">
          {testChildren}
        </FeatureWrapper>
      );

      expect(screen.queryByText(/access denied/i)).not.toBeInTheDocument();
    });
  });

  describe('Partial Access', () => {
    it('should render children when access level is partial', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="partial">
          {testChildren}
        </FeatureWrapper>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should show limited functionality indicator for partial access', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="partial">
          {testChildren}
        </FeatureWrapper>
      );

      // Should have some indicator that functionality is limited
      const wrapper = screen.getByText('Test Content').closest('[data-access-level]');
      expect(wrapper).toHaveAttribute('data-access-level', 'partial');
    });
  });

  describe('View-Only Access', () => {
    it('should render children when access level is view-only', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="view-only">
          {testChildren}
        </FeatureWrapper>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should disable all inputs in view-only mode', () => {
      const { container } = render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="view-only">
          <input type="text" data-testid="test-input" />
          <button data-testid="test-button">Click</button>
        </FeatureWrapper>
      );

      const input = container.querySelector('input[data-testid="test-input"]');
      const button = container.querySelector('button[data-testid="test-button"]');

      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });

    it('should show view-only indicator', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="view-only">
          {testChildren}
        </FeatureWrapper>
      );

      const wrapper = screen.getByText('Test Content').closest('[data-access-level]');
      expect(wrapper).toHaveAttribute('data-access-level', 'view-only');
    });
  });

  describe('No Access', () => {
    it('should show access denied message when access level is no', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="no">
          {testChildren}
        </FeatureWrapper>
      );

      expect(screen.getByText(/access denied/i)).toBeInTheDocument();
      expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });

    it('should not render children when access level is no', () => {
      render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="no">
          {testChildren}
        </FeatureWrapper>
      );

      expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });
  });

  describe('Access Level Attributes', () => {
    it('should set data-access-level attribute', () => {
      const { container } = render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="full">
          {testChildren}
        </FeatureWrapper>
      );

      const wrapper = container.querySelector('[data-access-level]');
      expect(wrapper).toHaveAttribute('data-access-level', 'full');
    });

    it('should set data-feature-id attribute', () => {
      const { container } = render(
        <FeatureWrapper featureId={testFeatureId} accessLevel="full">
          {testChildren}
        </FeatureWrapper>
      );

      const wrapper = container.querySelector('[data-feature-id]');
      expect(wrapper).toHaveAttribute('data-feature-id', testFeatureId);
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <FeatureWrapper
          featureId={testFeatureId}
          accessLevel="full"
          className="custom-class"
        >
          {testChildren}
        </FeatureWrapper>
      );

      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });
  });
});
