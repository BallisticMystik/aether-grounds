import { cn } from '@/lib/utils';

export function AnimatedBackground() {
  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 h-full w-full',
        'transition-opacity duration-1000'
      )}
    >
      <div className="absolute top-0 left-0 w-1/2 h-1/2 opacity-20 [mask-image:radial-gradient(ellipse_at_top_left,white_20%,transparent_70%)]">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 [mask-image:radial-gradient(ellipse_at_bottom_right,white_20%,transparent_70%)]">
        <div className="w-full h-full bg-gradient-to-tl from-primary/10 to-transparent" />
      </div>
    </div>
  );
}
