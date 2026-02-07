import React from 'react';

/**
 * Pixel art ninja rendered with CSS box-shadow technique.
 * Each "pixel" is a 1px box-shadow scaled up.
 * The ninja is drawn on a 16x24 grid.
 * frameIndex alternates 0/1 for a two-frame run cycle.
 */

const PIXEL = 1;

const DARK = '#1a1a2e';
const NINJA_BODY = '#2d2d44';
const NINJA_BELT = '#8b0000';
const SKIN = '#d4a574';
const EYE_WHITE = '#ffffff';
const EYE_PUPIL = '#111111';
const HEADBAND = '#cc0000';
const HEADBAND_TAIL = '#aa0000';

function buildShadow(pixels: [number, number, string][]): string {
  return pixels
    .map(([x, y, color]) => `${x * PIXEL}px ${y * PIXEL}px 0 0 ${color}`)
    .join(',');
}

// Run frame 1 - left leg forward
const ninjaFrame1: [number, number, string][] = [
  // Headband tails flowing behind (2 pixels trailing)
  [2, 5, HEADBAND_TAIL],
  [1, 4, HEADBAND_TAIL],
  [0, 4, HEADBAND_TAIL],
  // Head
  [5, 2, DARK], [6, 2, DARK], [7, 2, DARK], [8, 2, DARK],
  [4, 3, DARK], [5, 3, DARK], [6, 3, DARK], [7, 3, DARK], [8, 3, DARK], [9, 3, DARK],
  [4, 4, DARK], [5, 4, DARK], [6, 4, DARK], [7, 4, DARK], [8, 4, DARK], [9, 4, DARK],
  // Headband across forehead
  [4, 5, HEADBAND], [5, 5, HEADBAND], [6, 5, HEADBAND], [7, 5, HEADBAND], [8, 5, HEADBAND], [9, 5, HEADBAND],
  // Eyes
  [4, 6, DARK], [5, 6, EYE_WHITE], [6, 6, EYE_PUPIL], [7, 6, DARK], [8, 6, EYE_WHITE], [9, 6, EYE_PUPIL],
  // Lower face (mask)
  [4, 7, DARK], [5, 7, DARK], [6, 7, DARK], [7, 7, DARK], [8, 7, DARK], [9, 7, DARK],
  [5, 8, DARK], [6, 8, DARK], [7, 8, DARK], [8, 8, DARK],
  // Neck
  [6, 9, SKIN], [7, 9, SKIN],
  // Torso
  [4, 10, NINJA_BODY], [5, 10, NINJA_BODY], [6, 10, NINJA_BODY], [7, 10, NINJA_BODY], [8, 10, NINJA_BODY], [9, 10, NINJA_BODY],
  [4, 11, NINJA_BODY], [5, 11, NINJA_BODY], [6, 11, NINJA_BODY], [7, 11, NINJA_BODY], [8, 11, NINJA_BODY], [9, 11, NINJA_BODY],
  [4, 12, NINJA_BODY], [5, 12, NINJA_BODY], [6, 12, NINJA_BODY], [7, 12, NINJA_BODY], [8, 12, NINJA_BODY], [9, 12, NINJA_BODY],
  // Belt
  [4, 13, NINJA_BELT], [5, 13, NINJA_BELT], [6, 13, NINJA_BELT], [7, 13, NINJA_BELT], [8, 13, NINJA_BELT], [9, 13, NINJA_BELT],
  // Lower body
  [4, 14, NINJA_BODY], [5, 14, NINJA_BODY], [6, 14, NINJA_BODY], [7, 14, NINJA_BODY], [8, 14, NINJA_BODY], [9, 14, NINJA_BODY],
  [5, 15, NINJA_BODY], [6, 15, NINJA_BODY], [7, 15, NINJA_BODY], [8, 15, NINJA_BODY],
  // Arms stretched forward (holding feather)
  [10, 10, NINJA_BODY], [11, 10, NINJA_BODY], [12, 10, SKIN], [13, 10, SKIN],
  [10, 11, NINJA_BODY], [11, 11, NINJA_BODY], [12, 11, SKIN], [13, 11, SKIN],
  // Left leg forward, right leg back (running frame 1)
  [4, 16, NINJA_BODY], [5, 16, NINJA_BODY], [8, 16, NINJA_BODY], [9, 16, NINJA_BODY],
  [3, 17, NINJA_BODY], [4, 17, NINJA_BODY], [9, 17, NINJA_BODY], [10, 17, NINJA_BODY],
  [2, 18, NINJA_BODY], [3, 18, NINJA_BODY], [10, 18, NINJA_BODY], [11, 18, NINJA_BODY],
  // Feet
  [1, 19, DARK], [2, 19, DARK], [3, 19, DARK], [10, 19, DARK], [11, 19, DARK], [12, 19, DARK],
];

// Run frame 2 - legs more neutral / right leg forward
const ninjaFrame2: [number, number, string][] = [
  // Headband tails flowing behind (slightly different position)
  [2, 5, HEADBAND_TAIL],
  [1, 5, HEADBAND_TAIL],
  [0, 5, HEADBAND_TAIL],
  // Head (same)
  [5, 2, DARK], [6, 2, DARK], [7, 2, DARK], [8, 2, DARK],
  [4, 3, DARK], [5, 3, DARK], [6, 3, DARK], [7, 3, DARK], [8, 3, DARK], [9, 3, DARK],
  [4, 4, DARK], [5, 4, DARK], [6, 4, DARK], [7, 4, DARK], [8, 4, DARK], [9, 4, DARK],
  // Headband
  [4, 5, HEADBAND], [5, 5, HEADBAND], [6, 5, HEADBAND], [7, 5, HEADBAND], [8, 5, HEADBAND], [9, 5, HEADBAND],
  // Eyes
  [4, 6, DARK], [5, 6, EYE_WHITE], [6, 6, EYE_PUPIL], [7, 6, DARK], [8, 6, EYE_WHITE], [9, 6, EYE_PUPIL],
  // Lower face (mask)
  [4, 7, DARK], [5, 7, DARK], [6, 7, DARK], [7, 7, DARK], [8, 7, DARK], [9, 7, DARK],
  [5, 8, DARK], [6, 8, DARK], [7, 8, DARK], [8, 8, DARK],
  // Neck
  [6, 9, SKIN], [7, 9, SKIN],
  // Torso
  [4, 10, NINJA_BODY], [5, 10, NINJA_BODY], [6, 10, NINJA_BODY], [7, 10, NINJA_BODY], [8, 10, NINJA_BODY], [9, 10, NINJA_BODY],
  [4, 11, NINJA_BODY], [5, 11, NINJA_BODY], [6, 11, NINJA_BODY], [7, 11, NINJA_BODY], [8, 11, NINJA_BODY], [9, 11, NINJA_BODY],
  [4, 12, NINJA_BODY], [5, 12, NINJA_BODY], [6, 12, NINJA_BODY], [7, 12, NINJA_BODY], [8, 12, NINJA_BODY], [9, 12, NINJA_BODY],
  // Belt
  [4, 13, NINJA_BELT], [5, 13, NINJA_BELT], [6, 13, NINJA_BELT], [7, 13, NINJA_BELT], [8, 13, NINJA_BELT], [9, 13, NINJA_BELT],
  // Lower body
  [4, 14, NINJA_BODY], [5, 14, NINJA_BODY], [6, 14, NINJA_BODY], [7, 14, NINJA_BODY], [8, 14, NINJA_BODY], [9, 14, NINJA_BODY],
  [5, 15, NINJA_BODY], [6, 15, NINJA_BODY], [7, 15, NINJA_BODY], [8, 15, NINJA_BODY],
  // Arms stretched forward (holding feather)
  [10, 10, NINJA_BODY], [11, 10, NINJA_BODY], [12, 10, SKIN], [13, 10, SKIN],
  [10, 11, NINJA_BODY], [11, 11, NINJA_BODY], [12, 11, SKIN], [13, 11, SKIN],
  // Right leg forward, left leg back (running frame 2)
  [5, 16, NINJA_BODY], [6, 16, NINJA_BODY], [7, 16, NINJA_BODY], [8, 16, NINJA_BODY],
  [4, 17, NINJA_BODY], [5, 17, NINJA_BODY], [8, 17, NINJA_BODY], [9, 17, NINJA_BODY],
  [3, 18, NINJA_BODY], [4, 18, NINJA_BODY], [9, 18, NINJA_BODY], [10, 18, NINJA_BODY],
  // Feet
  [2, 19, DARK], [3, 19, DARK], [4, 19, DARK], [9, 19, DARK], [10, 19, DARK], [11, 19, DARK],
];

export const PixelNinja: React.FC<{
  frameIndex: number;
  scale?: number;
  facing?: 'left' | 'right';
}> = ({frameIndex, scale = 5, facing = 'right'}) => {
  const pixels = frameIndex % 2 === 0 ? ninjaFrame1 : ninjaFrame2;
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
