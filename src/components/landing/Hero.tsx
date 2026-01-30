import { content, getLandingRole, type LandingRole } from '@/lib/content';
import type { RoleId } from '../../../types/rbac.types';
import { RoleSelector } from './RoleSelector';
import { ScrollReveal } from './ScrollReveal';

export function Hero({
  currentRole,
  onRoleSelect,
}: {
  currentRole: RoleId | null;
  onRoleSelect: (role: RoleId) => void;
}) {
  const landingRole: LandingRole = currentRole
    ? getLandingRole(currentRole)
    : 'farmers';

  return (
    <section className="container mx-auto max-w-5xl py-24 text-center sm:py-32">
      <ScrollReveal>
        <h1 className="font-headline text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl">
          <span className="block bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            {content.tagline}
          </span>
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
          {content.subhead}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={400}>
        <RoleSelector
          currentRole={landingRole}
          onRoleSelect={(role) => {
            // Map landing role back to RBAC role
            const roleMap: Record<LandingRole, RoleId> = {
              farmers: 'farmers',
              roasters: 'roasters',
              hubs: 'hub-community',
            };
            onRoleSelect(roleMap[role]);
          }}
        />
      </ScrollReveal>
    </section>
  );
}
