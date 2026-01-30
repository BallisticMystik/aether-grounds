import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';
import { ScrollReveal } from './ScrollReveal';
import { ArrowRight } from 'lucide-react';

export function Cta() {
  return (
    <section className="container mx-auto py-16 sm:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-tr from-primary/10 via-card to-card p-8 text-center sm:p-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {content.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
            {content.cta.description}
          </p>
          <div className="mt-8">
            <Button size="lg" className="group">
              {content.cta.button}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
