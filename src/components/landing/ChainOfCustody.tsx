import { useState } from 'react';
import { content, type ChainNode, type LandingRole } from '@/lib/content';
import { cn } from '@/lib/utils';
import {
  FarmIcon,
  CropIcon,
  BeanIcon,
  RoastIcon,
  BrewIcon,
  RetailIcon,
} from './icons';
import { NodeDetailPanel } from './NodeDetailPanel';
import { ScrollReveal } from './ScrollReveal';

const chainNodes: ChainNode[] = ['farm', 'crop', 'bean', 'roast', 'brew', 'retail'];

const nodeIcons: Record<ChainNode, React.ComponentType> = {
  farm: FarmIcon,
  crop: CropIcon,
  bean: BeanIcon,
  roast: RoastIcon,
  brew: BrewIcon,
  retail: RetailIcon,
};

export function ChainOfCustody({
  initialNode = 'farm',
}: {
  initialNode?: ChainNode;
}) {
  const [selectedNode, setSelectedNode] = useState<ChainNode>(initialNode);

  return (
    <section className="container mx-auto py-16 sm:py-24">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {content.chainOfCustody.title}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground text-balance">
          {content.chainOfCustody.description}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={200} className="mt-16">
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
            <div className="h-0.5 w-full bg-border" />
          </div>
          <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-6">
            {chainNodes.map((node) => {
              const Icon = nodeIcons[node];
              const isActive = selectedNode === node;

              return (
                <button
                  key={node}
                  onClick={() => setSelectedNode(node)}
                  className="group flex flex-col items-center gap-3 text-center"
                  aria-pressed={isActive}
                >
                  <div
                    className={cn(
                      'flex h-20 w-20 items-center justify-center rounded-full border-2 bg-card transition-all duration-300',
                      isActive
                        ? 'border-primary shadow-lg shadow-primary/20'
                        : 'border-border group-hover:border-primary/50'
                    )}
                  >
                    <Icon />
                  </div>
                  <span
                    className={cn(
                      'font-semibold capitalize transition-colors',
                      isActive ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {content.chainOfCustody.nodes[node].title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={400} className="mt-12">
        <NodeDetailPanel node={selectedNode} />
      </ScrollReveal>
    </section>
  );
}
