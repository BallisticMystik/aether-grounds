import React from 'react';

/**
 * Pixel art horse with rider, rendered via CSS box-shadow.
 * Two-frame gallop cycle on a ~24x22 grid.
 * The rider wields a spear.
 */

const PIXEL = 1;

// Horse colors
const HORSE_BODY = '#8b4513';
const HORSE_DARK = '#5c2e0a';
const HORSE_BELLY = '#a0623a';
const HORSE_MANE = '#2a1a0a';
const HORSE_EYE = '#111111';

// Rider colors
const RIDER_SKIN = '#c9956b';
const RIDER_BODY = '#d4a04a';
const RIDER_HAIR = '#1a1a1a';
const RIDER_HEADBAND = '#cc4400';
const RIDER_PANTS = '#8b6f47';
const SPEAR_SHAFT = '#a08050';
const SPEAR_TIP = '#b0b0b0';
const FEATHER_DECO = '#cc0000';

function buildShadow(pixels: [number, number, string][]): string {
  return pixels
    .map(([x, y, color]) => `${x * PIXEL}px ${y * PIXEL}px 0 0 ${color}`)
    .join(',');
}

// Gallop frame 1 - front legs extended, back legs tucked
const horseRiderFrame1: [number, number, string][] = [
  // === RIDER (on top) ===
  // Spear (extends forward from rider's hand)
  [20, 4, SPEAR_TIP], [21, 4, SPEAR_TIP], [22, 4, SPEAR_TIP],
  [17, 4, SPEAR_SHAFT], [18, 4, SPEAR_SHAFT], [19, 4, SPEAR_SHAFT],
  [14, 4, SPEAR_SHAFT], [15, 4, SPEAR_SHAFT], [16, 4, SPEAR_SHAFT],

  // Feather decoration on spear
  [22, 3, FEATHER_DECO], [23, 3, FEATHER_DECO],
  [22, 5, FEATHER_DECO], [23, 5, FEATHER_DECO],

  // Hair flowing behind
  [6, 0, RIDER_HAIR], [5, 0, RIDER_HAIR],
  [5, 1, RIDER_HAIR], [6, 1, RIDER_HAIR],

  // Head
  [7, 0, RIDER_HAIR], [8, 0, RIDER_HAIR], [9, 0, RIDER_HAIR],
  [7, 1, RIDER_SKIN], [8, 1, RIDER_SKIN], [9, 1, RIDER_SKIN],
  // Headband
  [7, 2, RIDER_HEADBAND], [8, 2, RIDER_HEADBAND], [9, 2, RIDER_HEADBAND],
  // Face
  [7, 3, RIDER_SKIN], [8, 3, RIDER_SKIN], [9, 3, RIDER_SKIN],

  // Torso
  [8, 4, RIDER_BODY], [9, 4, RIDER_BODY], [10, 4, RIDER_BODY],
  [8, 5, RIDER_BODY], [9, 5, RIDER_BODY], [10, 5, RIDER_BODY],
  [8, 6, RIDER_BODY], [9, 6, RIDER_BODY], [10, 6, RIDER_BODY],

  // Arm holding spear (extended forward)
  [11, 4, RIDER_SKIN], [12, 4, RIDER_SKIN], [13, 4, RIDER_SKIN],

  // Legs straddling horse
  [7, 7, RIDER_PANTS], [8, 7, RIDER_PANTS],
  [11, 7, RIDER_PANTS], [12, 7, RIDER_PANTS],
  [7, 8, RIDER_PANTS],
  [12, 8, RIDER_PANTS],

  // === HORSE ===
  // Horse head
  [16, 6, HORSE_DARK], [17, 6, HORSE_DARK], [18, 6, HORSE_DARK],
  [16, 7, HORSE_BODY], [17, 7, HORSE_BODY], [18, 7, HORSE_BODY], [19, 7, HORSE_BODY],
  [17, 8, HORSE_BODY], [18, 8, HORSE_BODY], [19, 8, HORSE_BODY],
  // Horse eye
  [18, 7, HORSE_EYE],
  // Horse ear
  [17, 5, HORSE_DARK], [18, 5, HORSE_DARK],

  // Mane
  [13, 6, HORSE_MANE], [14, 6, HORSE_MANE], [15, 6, HORSE_MANE],
  [14, 7, HORSE_MANE], [15, 7, HORSE_MANE],

  // Horse neck
  [13, 7, HORSE_BODY], [14, 8, HORSE_BODY], [15, 8, HORSE_BODY], [16, 8, HORSE_BODY],

  // Horse body (main mass)
  [6, 8, HORSE_BODY], [7, 8, HORSE_BODY], [8, 8, HORSE_BODY], [9, 8, HORSE_BODY],
  [10, 8, HORSE_BODY], [11, 8, HORSE_BODY], [12, 8, HORSE_BODY], [13, 8, HORSE_BODY],

  [5, 9, HORSE_BODY], [6, 9, HORSE_BODY], [7, 9, HORSE_BODY], [8, 9, HORSE_BODY],
  [9, 9, HORSE_BODY], [10, 9, HORSE_BODY], [11, 9, HORSE_BODY], [12, 9, HORSE_BODY],
  [13, 9, HORSE_BODY], [14, 9, HORSE_BODY], [15, 9, HORSE_BODY], [16, 9, HORSE_BODY],

  [5, 10, HORSE_BODY], [6, 10, HORSE_BELLY], [7, 10, HORSE_BELLY], [8, 10, HORSE_BELLY],
  [9, 10, HORSE_BELLY], [10, 10, HORSE_BELLY], [11, 10, HORSE_BELLY], [12, 10, HORSE_BELLY],
  [13, 10, HORSE_BODY], [14, 10, HORSE_BODY], [15, 10, HORSE_BODY],

  [5, 11, HORSE_BODY], [6, 11, HORSE_BELLY], [7, 11, HORSE_BELLY], [8, 11, HORSE_BELLY],
  [9, 11, HORSE_BELLY], [10, 11, HORSE_BELLY], [11, 11, HORSE_BELLY], [12, 11, HORSE_BELLY],
  [13, 11, HORSE_BODY], [14, 11, HORSE_BODY],

  // Horse rump
  [4, 9, HORSE_BODY], [3, 10, HORSE_BODY], [4, 10, HORSE_BODY],
  [4, 11, HORSE_BODY],

  // Tail
  [1, 9, HORSE_MANE], [2, 9, HORSE_MANE], [3, 9, HORSE_MANE],
  [0, 10, HORSE_MANE], [1, 10, HORSE_MANE], [2, 10, HORSE_MANE],
  [0, 11, HORSE_MANE], [1, 11, HORSE_MANE],

  // Front legs - extended forward (gallop frame 1)
  [14, 12, HORSE_BODY], [15, 12, HORSE_BODY],
  [15, 13, HORSE_BODY], [16, 13, HORSE_BODY],
  [16, 14, HORSE_BODY], [17, 14, HORSE_BODY],
  [17, 15, HORSE_DARK], [18, 15, HORSE_DARK],

  // Back legs - tucked under (gallop frame 1)
  [5, 12, HORSE_BODY], [6, 12, HORSE_BODY],
  [6, 13, HORSE_BODY], [7, 13, HORSE_BODY],
  [7, 14, HORSE_BODY], [8, 14, HORSE_BODY],
  [7, 15, HORSE_DARK], [8, 15, HORSE_DARK],
];

// Gallop frame 2 - front legs tucked, back legs extended
const horseRiderFrame2: [number, number, string][] = [
  // === RIDER (same as frame 1, slightly bounced) ===
  // Spear
  [20, 3, SPEAR_TIP], [21, 3, SPEAR_TIP], [22, 3, SPEAR_TIP],
  [17, 3, SPEAR_SHAFT], [18, 3, SPEAR_SHAFT], [19, 3, SPEAR_SHAFT],
  [14, 3, SPEAR_SHAFT], [15, 3, SPEAR_SHAFT], [16, 3, SPEAR_SHAFT],

  // Feather decoration
  [22, 2, FEATHER_DECO], [23, 2, FEATHER_DECO],
  [22, 4, FEATHER_DECO], [23, 4, FEATHER_DECO],

  // Hair flowing
  [5, 0, RIDER_HAIR], [4, 1, RIDER_HAIR],
  [5, 1, RIDER_HAIR], [6, 0, RIDER_HAIR],

  // Head (bounced up 1px)
  [7, 0, RIDER_HAIR], [8, 0, RIDER_HAIR], [9, 0, RIDER_HAIR],
  [7, 1, RIDER_SKIN], [8, 1, RIDER_SKIN], [9, 1, RIDER_SKIN],
  [7, 2, RIDER_HEADBAND], [8, 2, RIDER_HEADBAND], [9, 2, RIDER_HEADBAND],
  [7, 3, RIDER_SKIN], [8, 3, RIDER_SKIN], [9, 3, RIDER_SKIN],

  // Torso
  [8, 4, RIDER_BODY], [9, 4, RIDER_BODY], [10, 4, RIDER_BODY],
  [8, 5, RIDER_BODY], [9, 5, RIDER_BODY], [10, 5, RIDER_BODY],
  [8, 6, RIDER_BODY], [9, 6, RIDER_BODY], [10, 6, RIDER_BODY],

  // Arm holding spear
  [11, 3, RIDER_SKIN], [12, 3, RIDER_SKIN], [13, 3, RIDER_SKIN],

  // Legs
  [7, 7, RIDER_PANTS], [8, 7, RIDER_PANTS],
  [11, 7, RIDER_PANTS], [12, 7, RIDER_PANTS],
  [7, 8, RIDER_PANTS],
  [12, 8, RIDER_PANTS],

  // === HORSE ===
  // Horse head
  [16, 7, HORSE_DARK], [17, 7, HORSE_DARK], [18, 7, HORSE_DARK],
  [16, 8, HORSE_BODY], [17, 8, HORSE_BODY], [18, 8, HORSE_BODY], [19, 8, HORSE_BODY],
  [17, 9, HORSE_BODY], [18, 9, HORSE_BODY], [19, 9, HORSE_BODY],
  [18, 8, HORSE_EYE],
  // Ear
  [17, 6, HORSE_DARK], [18, 6, HORSE_DARK],

  // Mane
  [13, 7, HORSE_MANE], [14, 7, HORSE_MANE], [15, 7, HORSE_MANE],
  [14, 8, HORSE_MANE], [15, 8, HORSE_MANE],

  // Neck
  [13, 8, HORSE_BODY], [14, 9, HORSE_BODY], [15, 9, HORSE_BODY], [16, 9, HORSE_BODY],

  // Body
  [6, 9, HORSE_BODY], [7, 9, HORSE_BODY], [8, 9, HORSE_BODY], [9, 9, HORSE_BODY],
  [10, 9, HORSE_BODY], [11, 9, HORSE_BODY], [12, 9, HORSE_BODY], [13, 9, HORSE_BODY],

  [5, 10, HORSE_BODY], [6, 10, HORSE_BODY], [7, 10, HORSE_BODY], [8, 10, HORSE_BODY],
  [9, 10, HORSE_BODY], [10, 10, HORSE_BODY], [11, 10, HORSE_BODY], [12, 10, HORSE_BODY],
  [13, 10, HORSE_BODY], [14, 10, HORSE_BODY], [15, 10, HORSE_BODY], [16, 10, HORSE_BODY],

  [5, 11, HORSE_BODY], [6, 11, HORSE_BELLY], [7, 11, HORSE_BELLY], [8, 11, HORSE_BELLY],
  [9, 11, HORSE_BELLY], [10, 11, HORSE_BELLY], [11, 11, HORSE_BELLY], [12, 11, HORSE_BELLY],
  [13, 11, HORSE_BODY], [14, 11, HORSE_BODY], [15, 11, HORSE_BODY],

  [5, 12, HORSE_BODY], [6, 12, HORSE_BELLY], [7, 12, HORSE_BELLY], [8, 12, HORSE_BELLY],
  [9, 12, HORSE_BELLY], [10, 12, HORSE_BELLY], [11, 12, HORSE_BELLY], [12, 12, HORSE_BELLY],
  [13, 12, HORSE_BODY], [14, 12, HORSE_BODY],

  // Rump
  [4, 10, HORSE_BODY], [3, 11, HORSE_BODY], [4, 11, HORSE_BODY],
  [4, 12, HORSE_BODY],

  // Tail (different position - flowing up)
  [1, 8, HORSE_MANE], [2, 8, HORSE_MANE], [3, 9, HORSE_MANE],
  [0, 7, HORSE_MANE], [1, 7, HORSE_MANE], [2, 9, HORSE_MANE],
  [0, 8, HORSE_MANE], [1, 9, HORSE_MANE],

  // Front legs - tucked (gallop frame 2)
  [13, 13, HORSE_BODY], [14, 13, HORSE_BODY],
  [12, 14, HORSE_BODY], [13, 14, HORSE_BODY],
  [12, 15, HORSE_DARK], [13, 15, HORSE_DARK],

  // Back legs - extended back (gallop frame 2)
  [4, 13, HORSE_BODY], [5, 13, HORSE_BODY],
  [3, 14, HORSE_BODY], [4, 14, HORSE_BODY],
  [2, 15, HORSE_DARK], [3, 15, HORSE_DARK],
];

export const PixelHorseRider: React.FC<{
  frameIndex: number;
  scale?: number;
  facing?: 'left' | 'right';
}> = ({frameIndex, scale = 4, facing = 'right'}) => {
  const pixels = frameIndex % 2 === 0 ? horseRiderFrame1 : horseRiderFrame2;
  const shadow = buildShadow(pixels);
  const flipX = facing === 'left' ? -1 : 1;

  return (
    <div
      style={{
        width: PIXEL,
        height: PIXEL,
        boxShadow: shadow,
        transform: `scale(${Math.abs(scale)}) scaleX(${flipX})`,
        transformOrigin: 'top left',
        imageRendering: 'pixelated',
        position: 'absolute',
      }}
    />
  );
};
