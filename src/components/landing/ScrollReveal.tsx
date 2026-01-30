import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIntersecting(true);
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }, delay);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      data-state={intersecting ? 'open' : 'closed'}
      className={cn(
        'opacity-0 transition-opacity duration-700 ease-in-out data-[state=open]:opacity-100',
        'translate-y-5 motion-reduce:translate-y-0 data-[state=open]:translate-y-0 motion-reduce:transition-none motion-safe:transition-transform motion-safe:duration-500',
        className
      )}
    >
      {children}
    </div>
  );
}
