/**
 * Smart Contract Wizard Feature Component
 * Step-by-step contract creation wizard
 */

import React, { useState } from 'react';
import { FeatureWrapper } from './FeatureWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { FeatureComponentProps } from './types';
import { FileCode, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const WIZARD_STEPS = [
  { id: 1, title: 'Contract Type', description: 'Select the type of contract' },
  { id: 2, title: 'Parties', description: 'Define contract parties' },
  { id: 3, title: 'Terms', description: 'Set contract terms and conditions' },
  { id: 4, title: 'Review', description: 'Review and deploy contract' },
];

export function SmartContractWizard({
  accessLevel,
  className = '',
}: FeatureComponentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const canCreate = accessLevel === 'full';
  const isViewOnly = accessLevel === 'view-only';

  const nextStep = () => {
    if (canCreate && currentStep < WIZARD_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <FeatureWrapper
      featureId="smart-contract-wizard"
      accessLevel={accessLevel}
      className={className}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FileCode className="h-8 w-8" />
            Smart Contract Wizard
          </h2>
          <p className="text-muted-foreground mt-2">
            {isViewOnly
              ? 'Preview smart contract creation wizard (View Only)'
              : 'Create smart contracts step by step'}
          </p>
        </div>

        {/* Wizard Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Creation Wizard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step Indicators */}
              <div className="flex items-center justify-between">
                {WIZARD_STEPS.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          currentStep > step.id
                            ? 'bg-green-500 text-white'
                            : currentStep === step.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <p className="text-xs mt-2 text-center max-w-20">{step.title}</p>
                    </div>
                    {index < WIZARD_STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          currentStep > step.id ? 'bg-green-500' : 'bg-muted'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Current Step Content */}
              <div className="min-h-[300px] p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {WIZARD_STEPS[currentStep - 1].title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {WIZARD_STEPS[currentStep - 1].description}
                </p>
                {isViewOnly ? (
                  <p className="text-sm text-muted-foreground">
                    This is a preview. Contract creation is disabled in view-only mode.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder={`Enter ${WIZARD_STEPS[currentStep - 1].title.toLowerCase()} details`}
                    />
                    <textarea
                      className="w-full px-3 py-2 border rounded-md"
                      rows={4}
                      placeholder="Additional information..."
                    />
                  </div>
                )}
              </div>

              {/* Navigation */}
              {!isViewOnly && (
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === WIZARD_STEPS.length}
                  >
                    {currentStep === WIZARD_STEPS.length ? (
                      'Deploy Contract'
                    ) : (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contract Templates */}
        {canCreate && (
          <Card>
            <CardHeader>
              <CardTitle>Contract Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Roasting Contract', 'Supply Agreement', 'Quality Contract'].map(
                  (template) => (
                    <Button key={template} variant="outline" className="h-auto flex-col py-4">
                      <FileCode className="h-6 w-6 mb-2" />
                      <span>{template}</span>
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </FeatureWrapper>
  );
}
