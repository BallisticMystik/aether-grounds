/**
 * Create Account Form Component
 * Mirrors mobile design for desktop
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Leaf, LogIn } from 'lucide-react';

interface CreateAccountFormProps {
  onSignIn?: () => void;
  onSubmit?: (email: string, password: string) => void;
}

export function CreateAccountForm({ onSignIn, onSubmit }: CreateAccountFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="text-green-400">
            <Leaf className="h-12 w-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight">
          AETHER GROUNDS
        </h1>
      </div>

      {/* Form Card */}
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            Create Account
          </Button>
        </form>

        {onSignIn && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSignIn}
              className="text-green-400 hover:text-green-300 font-semibold underline"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
