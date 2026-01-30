/**
 * Profile Feature Component
 * Displays user profile information with role-based access control
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRole } from '../../contexts/RoleContext';
import type { FeatureComponentProps } from './types';
import { User, Mail, Shield, Edit, Save, X } from 'lucide-react';

export function Profile({ accessLevel, className = '' }: FeatureComponentProps) {
  const { currentRole } = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  // Get connection type based on role
  const getConnectionType = (): 'pink' | 'purple' => {
    if (currentRole === 'farmers' || currentRole === 'roasters' || currentRole === 'retailers') {
      return 'purple';
    }
    return 'pink';
  };

  const connectionType = getConnectionType();
  const canEdit = accessLevel === 'full';
  const canPartialEdit = accessLevel === 'partial';

  const handleEdit = () => {
    if (canEdit || canPartialEdit) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  return (
    <FeatureWrapper featureId="profile" accessLevel={accessLevel} className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            {(canEdit || canPartialEdit) && !isEditing && (
              <Button onClick={handleEdit} size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{formData.name}</h3>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
              </div>
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                {isEditing && (canEdit || canPartialEdit) ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={accessLevel === 'partial' && !canEdit}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{formData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name
                </label>
                {isEditing && (canEdit || canPartialEdit) ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={accessLevel === 'partial' && !canEdit}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{formData.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Role
                </label>
                <p className="text-sm text-muted-foreground capitalize">
                  {currentRole?.replace('-', ' ') || 'No role selected'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Connection Type</label>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      connectionType === 'purple'
                        ? 'bg-purple-500'
                        : 'bg-pink-500'
                    }`}
                  />
                  <span className="text-sm text-muted-foreground capitalize">
                    {connectionType}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (canEdit || canPartialEdit) && (
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} size="sm" variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </FeatureWrapper>
  );
}
