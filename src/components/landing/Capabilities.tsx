import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { content, getLandingRole, type LandingRole } from '@/lib/content';
import type { RoleId } from '../../../types/rbac.types';
import { ScrollReveal } from './ScrollReveal';
import { Check } from 'lucide-react';

export function Capabilities({ roleId }: { roleId: RoleId | null }) {
  const role = roleId ? getLandingRole(roleId) : 'farmers';
  const capabilitiesContent = content.capabilities;
  const roleItems = capabilitiesContent.items[role];
  const roleDescription = capabilitiesContent.description[role];

  return (
    <section className="container mx-auto py-16 sm:py-24">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {capabilitiesContent.title}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground text-balance">
          {roleDescription}
        </p>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {roleItems.map((item, index) => (
          <ScrollReveal key={item.title} delay={200 * (index + 1)}>
            <Card className="h-full border-0 bg-transparent shadow-none">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="pt-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
