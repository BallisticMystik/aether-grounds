/**
 * Role Selector Component
 * Dropdown for switching between roles in the sidebar
 */

import React, { useState, useRef, useEffect } from 'react';
import { useRole } from '../../contexts/RoleContext';
import type { RoleId } from '../../../types/rbac.types';
import { ChevronDown } from 'lucide-react';

// Friendly role names
const roleLabels: Record<RoleId, string> = {
  'farmers': 'Farmers',
  'roasters': 'Roasters',
  'retailers': 'Retailers',
  'hub-community': 'Hub - Community',
  'affiliates-distributors': 'Affiliates/Distributors',
};

const roleIcons: Record<RoleId, string> = {
  'farmers': '🚜',
  'roasters': '☕',
  'retailers': '🛒',
  'hub-community': '🏘️',
  'affiliates-distributors': '📦',
};

export function RoleSelector() {
  const { currentRole, setCurrentRole, availableRoles } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleRoleSelect = (role: RoleId) => {
    setCurrentRole(role);
    setIsOpen(false);
  };

  if (!currentRole) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-accent/10 border border-border rounded-lg transition-colors text-left"
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{roleIcons[currentRole]}</span>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {roleLabels[currentRole]}
            </span>
            <span className="text-xs text-muted-foreground">Current Role</span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="py-1">
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                  currentRole === role
                    ? 'bg-primary/20 text-primary'
                    : 'hover:bg-accent/10 text-foreground'
                }`}
              >
                <span className="text-xl">{roleIcons[role]}</span>
                <span className="text-sm">{roleLabels[role]}</span>
                {currentRole === role && (
                  <span className="ml-auto text-primary text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
