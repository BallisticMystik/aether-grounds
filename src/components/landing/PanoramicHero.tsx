/**
 * Panoramic Hero Component
 * Desktop/panoramic view with horizontal layout
 * Mirrors mobile design but optimized for wide screens
 */

import React from 'react';
import type { RoleId } from '../../types/rbac.types';
import { Button } from '../ui/button';
import { Leaf, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PanoramicHeroProps {
  currentRole: RoleId | null;
  onRoleSelect: (role: RoleId) => void;
}

const roleFeatures = [
  {
    id: 'farmers' as RoleId,
    title: 'FARMERS',
    description: 'Manage your crops, contracts, and certifications with irrefutable data.',
    icon: <Leaf className="h-8 w-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'roasters' as RoleId,
    title: 'ROASTERS',
    description: 'Source with confidence. Trace every bean back to its origin and ensure quality.',
    icon: <Leaf className="h-8 w-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'retailers' as RoleId,
    title: 'RETAILERS',
    description: 'Sell with transparency. Show customers the journey of every product.',
    icon: <Wallet className="h-8 w-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  {
    id: 'hub-community' as RoleId,
    title: 'HUBS',
    description: 'Streamline logistics and aggregation with a single source of truth for your network.',
    icon: <Leaf className="h-8 w-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
];

export function PanoramicHero({ currentRole, onRoleSelect }: PanoramicHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="text-green-400">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="text-xl font-semibold text-foreground">Aether Grounds</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="bg-background/80 backdrop-blur-sm border-border"
            asChild
          >
            <a href="/login">Sign In</a>
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <a href="/register">Create Account</a>
          </Button>
        </div>
      </header>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center container mx-auto px-6 py-12">
        <div className="w-full max-w-7xl">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6">
              <span className="block bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                ONE PLATFORM
              </span>
              <span className="block bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                ONE STANDARD
              </span>
              <span className="block bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                ONE AETHER
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The Coffee-Native Operating System — Infrastructure for certification, contracts, and
              trust
            </p>
          </div>

          {/* Role Features - Horizontal Layout on Desktop, Vertical on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 mt-20">
            {roleFeatures.map((role) => (
              <button
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className={cn(
                  'group text-left p-8 lg:p-10 rounded-xl border-2 transition-all duration-300',
                  'hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20',
                  'transform-gpu',
                  currentRole === role.id
                    ? `${role.bgColor} ${role.borderColor} border-2 ring-2 ring-green-500/50 scale-[1.02]`
                    : 'bg-card/50 border-border hover:border-green-500/50'
                )}
                aria-pressed={currentRole === role.id}
              >
                <div className={cn('mb-6', role.color)}>{role.icon}</div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                  {role.title}
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
                {currentRole === role.id && (
                  <div className="mt-6 text-xs lg:text-sm text-green-400 font-semibold uppercase tracking-wide">
                    ✓ Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
