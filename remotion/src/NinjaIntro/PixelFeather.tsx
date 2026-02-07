import React from 'react';

/**
 * A large pixel art feather (quill) rendered via CSS box-shadow.
 * The feather is drawn on roughly a 20x30 grid, held vertically
 * in front of the ninja with barbs spreading outward.
 */

const PIXEL = 1;

const QUILL_SHAFT = '#f5f0e1';
const QUILL_TIP = '#2a1a0a';
const BARB_INNER = '#4a90d9';
const BARB_MID = '#357abd';
const BARB_OUTER = '#2563a0';
const BARB_EDGE = '#1d4e7a';
const BARB_HIGHLIGHT = '#6db3f2';

function buildShadow(pixels: [number, number, string][]): string {
  return pixels
    .map(([x, y, color]) => `${x * PIXEL}px ${y * PIXEL}px 0 0 ${color}`)
    .join(',');
}

const featherPixels: [number, number, string][] = [
  // Quill tip (bottom, the writing end)
  [10, 28, QUILL_TIP],
  [10, 27, QUILL_TIP],
  [10, 26, QUILL_TIP],

  // Shaft running up the middle
  [10, 25, QUILL_SHAFT], [10, 24, QUILL_SHAFT], [10, 23, QUILL_SHAFT],
  [10, 22, QUILL_SHAFT], [10, 21, QUILL_SHAFT], [10, 20, QUILL_SHAFT],
  [10, 19, QUILL_SHAFT], [10, 18, QUILL_SHAFT], [10, 17, QUILL_SHAFT],
  [10, 16, QUILL_SHAFT], [10, 15, QUILL_SHAFT], [10, 14, QUILL_SHAFT],
  [10, 13, QUILL_SHAFT], [10, 12, QUILL_SHAFT], [10, 11, QUILL_SHAFT],
  [10, 10, QUILL_SHAFT], [10, 9, QUILL_SHAFT], [10, 8, QUILL_SHAFT],
  [10, 7, QUILL_SHAFT], [10, 6, QUILL_SHAFT], [10, 5, QUILL_SHAFT],
  [10, 4, QUILL_SHAFT], [10, 3, QUILL_SHAFT],

  // Top of feather (plume tip)
  [10, 2, BARB_HIGHLIGHT], [10, 1, BARB_INNER],

  // === Left barbs (spread from shaft leftward) ===
  // Top section - short barbs
  [9, 3, BARB_HIGHLIGHT], [8, 3, BARB_INNER],
  [9, 4, BARB_HIGHLIGHT], [8, 4, BARB_INNER], [7, 4, BARB_MID],
  [9, 5, BARB_HIGHLIGHT], [8, 5, BARB_INNER], [7, 5, BARB_MID], [6, 5, BARB_OUTER],

  // Middle section - longer barbs
  [9, 6, BARB_HIGHLIGHT], [8, 6, BARB_INNER], [7, 6, BARB_MID], [6, 6, BARB_OUTER], [5, 6, BARB_EDGE],
  [9, 7, BARB_HIGHLIGHT], [8, 7, BARB_INNER], [7, 7, BARB_MID], [6, 7, BARB_OUTER], [5, 7, BARB_EDGE], [4, 7, BARB_EDGE],
  [9, 8, BARB_HIGHLIGHT], [8, 8, BARB_INNER], [7, 8, BARB_MID], [6, 8, BARB_OUTER], [5, 8, BARB_EDGE], [4, 8, BARB_EDGE],
  [9, 9, BARB_HIGHLIGHT], [8, 9, BARB_INNER], [7, 9, BARB_MID], [6, 9, BARB_OUTER], [5, 9, BARB_EDGE], [4, 9, BARB_EDGE],
  [9, 10, BARB_HIGHLIGHT], [8, 10, BARB_INNER], [7, 10, BARB_MID], [6, 10, BARB_OUTER], [5, 10, BARB_EDGE],
  [9, 11, BARB_HIGHLIGHT], [8, 11, BARB_INNER], [7, 11, BARB_MID], [6, 11, BARB_OUTER], [5, 11, BARB_EDGE],
  [9, 12, BARB_HIGHLIGHT], [8, 12, BARB_INNER], [7, 12, BARB_MID], [6, 12, BARB_OUTER],
  [9, 13, BARB_HIGHLIGHT], [8, 13, BARB_INNER], [7, 13, BARB_MID], [6, 13, BARB_OUTER],
  [9, 14, BARB_HIGHLIGHT], [8, 14, BARB_INNER], [7, 14, BARB_MID],
  [9, 15, BARB_HIGHLIGHT], [8, 15, BARB_INNER], [7, 15, BARB_MID],
  [9, 16, BARB_HIGHLIGHT], [8, 16, BARB_INNER],
  [9, 17, BARB_HIGHLIGHT], [8, 17, BARB_INNER],
  [9, 18, BARB_INNER],
  [9, 19, BARB_INNER],

  // === Right barbs (spread from shaft rightward) ===
  // Top section
  [11, 3, BARB_HIGHLIGHT], [12, 3, BARB_INNER],
  [11, 4, BARB_HIGHLIGHT], [12, 4, BARB_INNER], [13, 4, BARB_MID],
  [11, 5, BARB_HIGHLIGHT], [12, 5, BARB_INNER], [13, 5, BARB_MID], [14, 5, BARB_OUTER],

  // Middle section
  [11, 6, BARB_HIGHLIGHT], [12, 6, BARB_INNER], [13, 6, BARB_MID], [14, 6, BARB_OUTER], [15, 6, BARB_EDGE],
  [11, 7, BARB_HIGHLIGHT], [12, 7, BARB_INNER], [13, 7, BARB_MID], [14, 7, BARB_OUTER], [15, 7, BARB_EDGE], [16, 7, BARB_EDGE],
  [11, 8, BARB_HIGHLIGHT], [12, 8, BARB_INNER], [13, 8, BARB_MID], [14, 8, BARB_OUTER], [15, 8, BARB_EDGE], [16, 8, BARB_EDGE],
  [11, 9, BARB_HIGHLIGHT], [12, 9, BARB_INNER], [13, 9, BARB_MID], [14, 9, BARB_OUTER], [15, 9, BARB_EDGE], [16, 9, BARB_EDGE],
  [11, 10, BARB_HIGHLIGHT], [12, 10, BARB_INNER], [13, 10, BARB_MID], [14, 10, BARB_OUTER], [15, 10, BARB_EDGE],
  [11, 11, BARB_HIGHLIGHT], [12, 11, BARB_INNER], [13, 11, BARB_MID], [14, 11, BARB_OUTER], [15, 11, BARB_EDGE],
  [11, 12, BARB_HIGHLIGHT], [12, 12, BARB_INNER], [13, 12, BARB_MID], [14, 12, BARB_OUTER],
  [11, 13, BARB_HIGHLIGHT], [12, 13, BARB_INNER], [13, 13, BARB_MID], [14, 13, BARB_OUTER],
  [11, 14, BARB_HIGHLIGHT], [12, 14, BARB_INNER], [13, 14, BARB_MID],
  [11, 15, BARB_HIGHLIGHT], [12, 15, BARB_INNER], [13, 15, BARB_MID],
  [11, 16, BARB_HIGHLIGHT], [12, 16, BARB_INNER],
  [11, 17, BARB_HIGHLIGHT], [12, 17, BARB_INNER],
  [11, 18, BARB_INNER],
  [11, 19, BARB_INNER],
];

export const PixelFeather: React.FC<{scale?: number}> = ({scale = 5}) => {
  const shadow = buildShadow(featherPixels);

  return (
    <div
      style={{
        width: PIXEL,
        height: PIXEL,
        boxShadow: shadow,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        imageRendering: 'pixelated',
        position: 'absolute',
      }}
    />
  );
};
