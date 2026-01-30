import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';
import { ScrollReveal } from './ScrollReveal';
import { Shield, GitBranch } from 'lucide-react';

export function TrustAndGovernance() {
  return (
    <section className="bg-card/40 py-16 sm:py-24">
      <ScrollReveal className="container mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {content.trust.title}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {content.trust.description}
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" variant="secondary">
                <Shield className="mr-2 h-5 w-5" />
                Governance Model
              </Button>
              <Button size="lg" variant="outline">
                <GitBranch className="mr-2 h-5 w-5" />
                View Protocol
              </Button>
            </div>
          </div>
          <div className="font-code text-sm">
            <div className="rounded-lg border bg-background/50 p-6">
              <p>
                <span className="text-primary">protocol</span>: Aether-Core
              </p>
              <p>
                <span className="text-primary">type</span>: Decentralized
                Autonomous Organization (DAO)
              </p>
              <p>
                <span className="text-primary">token</span>: $AETHER (governance
                only)
              </p>
              <p>
                <span className="text-primary">consensus</span>: Proof-of-Stake
                (PoS)
              </p>
              <p className="mt-4">
                <span className="text-muted-foreground/50">
                  // Network integrity is maintained by a distributed set of
                  validators.
                </span>
              </p>
              <p>
                <span className="text-muted-foreground/50">
                  // Protocol upgrades are proposed and voted on by token
                  holders.
                </span>
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
