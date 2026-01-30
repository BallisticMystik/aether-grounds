/**
 * IoT Devices Feature Component Tests
 * TDD: Tests written first before implementation
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/helpers/testUtils';
import { IoTDevices } from '../../../../src/components/features/IoTDevices';

describe('IoT Devices Feature Component', () => {
  describe('Full Access (Farmers Only)', () => {
    it('should render IoT devices with full access', () => {
      render(<IoTDevices accessLevel="full" />, { initialRole: 'farmers' });

      expect(screen.getByText('IoT Devices')).toBeInTheDocument();
    });

    it('should display device list', () => {
      render(<IoTDevices accessLevel="full" />, { initialRole: 'farmers' });

      // Should show device list
      expect(screen.getByText('IoT Devices')).toBeInTheDocument();
      expect(screen.getByText('Soil Sensor 01')).toBeInTheDocument();
    });

    it('should show device status', () => {
      render(<IoTDevices accessLevel="full" />, { initialRole: 'farmers' });

      // Should show device status information
      expect(screen.getByText('IoT Devices')).toBeInTheDocument();
      expect(screen.getAllByText('online').length).toBeGreaterThan(0);
    });

    it('should allow device management', () => {
      render(<IoTDevices accessLevel="full" />, { initialRole: 'farmers' });

      // Should have device management functionality
      expect(screen.getByText('IoT Devices')).toBeInTheDocument();
      const manageButtons = screen.queryAllByRole('button', { name: /Manage Device/i });
      expect(manageButtons.length).toBeGreaterThan(0);
    });

    it('should show real-time updates', () => {
      render(<IoTDevices accessLevel="full" />, { initialRole: 'farmers' });

      // Should show real-time telemetry or updates
      expect(screen.getByText('IoT Devices')).toBeInTheDocument();
      expect(screen.getByText('Real-time Telemetry')).toBeInTheDocument();
    });
  });
});
