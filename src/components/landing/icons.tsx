import {
  Tractor,
  Leaf,
  Coffee,
  Flame,
  GlassWater,
  Store,
  type LucideProps,
} from 'lucide-react';

const iconProps: LucideProps = {
  className: 'h-10 w-10 text-primary',
  strokeWidth: 1.5,
};

export const FarmIcon = () => <Tractor {...iconProps} />;
export const CropIcon = () => <Leaf {...iconProps} />;
export const BeanIcon = () => <Coffee {...iconProps} />;
export const RoastIcon = () => <Flame {...iconProps} />;
export const BrewIcon = () => <GlassWater {...iconProps} />;
export const RetailIcon = () => <Store {...iconProps} />;
