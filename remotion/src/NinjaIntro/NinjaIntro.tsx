import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from 'remotion';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {PixelNinja} from './PixelNinja';
import {PixelFeather} from './PixelFeather';
import {PixelHorseRider} from './PixelHorseRider';

// ─── SCHEMA ───────────────────────────────────────────────────

export const NinjaIntroSchema = z.object({
  titleText: z.string().describe('Title text displayed on screen'),
  titleColor: zColor().describe('Title text color'),
  titleShadowColor: zColor().describe('Title text shadow color'),
  skyColorTop: zColor().describe('Sky gradient top color'),
  skyColorBottom: zColor().describe('Sky gradient bottom color'),
  moonColor: zColor().describe('Moon color'),
  showStars: z.boolean().describe('Show twinkling stars'),
  showMoon: z.boolean().describe('Show the moon'),
  showDust: z.boolean().describe('Show dust particles'),
  ninjaScale: z.number().min(1).max(10).step(1).describe('Ninja pixel scale'),
  riderScale: z.number().min(1).max(10).step(1).describe('Horse rider pixel scale'),
  riderCount: z.number().min(1).max(5).step(1).describe('Number of horse riders'),
  phase1Seconds: z.number().min(1).max(8).step(0.5).describe('Phase 1 duration: ninja runs right (seconds)'),
  pauseSeconds: z.number().min(0.3).max(3).step(0.1).describe('Pause duration: ninja reacts (seconds)'),
  phase2Seconds: z.number().min(1).max(8).step(0.5).describe('Phase 2 duration: chase runs left (seconds)'),
  titleAppearSeconds: z.number().min(0.5).max(6).step(0.5).describe('When title appears (seconds from start)'),
});

export type NinjaIntroProps = z.infer<typeof NinjaIntroSchema>;

// ─── HELPER COMPONENTS ────────────────────────────────────────

/** Pixel art ground tiles */
const PixelGround: React.FC<{offset: number}> = ({offset}) => {
  const tileWidth = 40;
  const tileCount = 60;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 180,
        overflow: 'hidden',
        imageRendering: 'pixelated',
      }}
    >
      {/* Grass top strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: -tileWidth + (((offset % tileWidth) + tileWidth) % tileWidth),
          width: tileWidth * tileCount,
          height: 12,
          background:
            'repeating-linear-gradient(90deg, #3a7d44 0px, #3a7d44 20px, #2d6b36 20px, #2d6b36 40px)',
        }}
      />
      {/* Dirt layer */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 0,
          width: '100%',
          height: 20,
          backgroundColor: '#8b6914',
        }}
      />
      {/* Deep ground */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 0,
          width: '100%',
          height: 150,
          backgroundColor: '#6b4f12',
        }}
      />
      {/* Ground detail pixels */}
      {Array.from({length: 30}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 40 + (i % 5) * 20,
            left:
              (((i * 73 + offset * 0.3) % 1920) + 1920) % 1920 - 20,
            width: 8,
            height: 8,
            backgroundColor: i % 3 === 0 ? '#5a3f10' : '#7a5f1a',
          }}
        />
      ))}
    </div>
  );
};

/** Dust particle */
const DustParticle: React.FC<{
  x: number;
  y: number;
  size: number;
  opacity: number;
}> = ({x, y, size, opacity}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      backgroundColor: '#c4a55a',
      opacity,
      imageRendering: 'pixelated',
    }}
  />
);

/** Starfield background */
const StarField: React.FC<{twinklePhase: number}> = ({twinklePhase}) => {
  const stars = React.useMemo(() => {
    const result: {x: number; y: number; size: number; phase: number}[] = [];
    for (let i = 0; i < 40; i++) {
      result.push({
        x: (i * 197 + 50) % 1920,
        y: (i * 131 + 20) % 700,
        size: i % 3 === 0 ? 6 : 4,
        phase: (i * 0.7) % (Math.PI * 2),
      });
    }
    return result;
  }, []);

  return (
    <>
      {stars.map((star, i) => {
        const brightness =
          0.3 + 0.7 * Math.abs(Math.sin(twinklePhase + star.phase));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: '#ffffff',
              opacity: brightness,
              imageRendering: 'pixelated',
            }}
          />
        );
      })}
    </>
  );
};

/** Title text */
const PixelTitle: React.FC<{
  progress: number;
  shakeAmount?: number;
  text: string;
  color: string;
  shadowColor: string;
}> = ({progress, shakeAmount = 0, text, color, shadowColor}) => {
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const scale = interpolate(progress, [0, 1], [0.5, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const shakeX = shakeAmount * Math.sin(shakeAmount * 20) * 3;
  const shakeY = shakeAmount * Math.cos(shakeAmount * 15) * 2;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% + ${shakeX}px), calc(-50% + ${shakeY}px)) scale(${scale})`,
        opacity,
        fontFamily: '"Courier New", monospace',
        fontSize: 80,
        fontWeight: 'bold',
        color,
        textShadow: `4px 4px 0 ${shadowColor}, -2px -2px 0 #357abd`,
        letterSpacing: 8,
        whiteSpace: 'nowrap',
        imageRendering: 'pixelated',
      }}
    >
      {text}
    </div>
  );
};

/** Exclamation mark that pops above ninja's head */
const ExclamationMark: React.FC<{progress: number}> = ({progress}) => {
  const scale = interpolate(progress, [0, 0.3, 1], [0, 1.3, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const opacity = interpolate(progress, [0, 0.1, 0.8, 1], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 30,
        top: -60,
        transform: `scale(${scale})`,
        opacity,
        fontFamily: '"Courier New", monospace',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ff4444',
        textShadow: '2px 2px 0 #1a1a2e',
      }}
    >
      !!
    </div>
  );
};

// ─── MAIN COMPOSITION ─────────────────────────────────────────

export const NinjaIntro: React.FC<NinjaIntroProps> = ({
  titleText,
  titleColor,
  titleShadowColor,
  skyColorTop,
  skyColorBottom,
  moonColor,
  showStars,
  showMoon,
  showDust,
  ninjaScale,
  riderScale,
  riderCount,
  phase1Seconds,
  pauseSeconds,
  phase2Seconds,
  titleAppearSeconds,
}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();

  // ═══ PHASE TIMING (in frames) ═══
  const phase1End = Math.round(phase1Seconds * fps);
  const pauseStart = phase1End;
  const pauseDuration = Math.round(pauseSeconds * fps);
  const pauseEnd = pauseStart + pauseDuration;
  const phase2Start = pauseEnd;
  const phase2Duration = Math.round(phase2Seconds * fps);
  const phase2End = phase2Start + phase2Duration;

  // Title timing
  const titleAppearFrame = Math.round(titleAppearSeconds * fps);
  const titleShakeStart = pauseStart;

  // ═══ PHASE 1: NINJA RUNS RIGHT ═══
  const ninjaPhase1X = interpolate(frame, [0, phase1End], [-200, width + 300], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // ═══ PAUSE: NINJA STOPS, SEES RIDERS, REACTS ═══
  // Ninja re-enters from right and skids to a stop at ~70% screen
  const ninjaPauseX = interpolate(
    frame,
    [pauseStart, pauseStart + 10, pauseStart + 20],
    [width + 300, width * 0.72, width * 0.7],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    },
  );

  // Exclamation mark appears during pause
  const exclamationProgress = interpolate(
    frame,
    [pauseStart + 8, pauseStart + pauseDuration],
    [0, 1],
    {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
  );

  // ═══ PHASE 2: NINJA FLEES LEFT, RIDERS CHASE ═══
  const ninjaPhase2X = interpolate(
    frame,
    [phase2Start, phase2End],
    [width * 0.7, -300],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.in(Easing.quad),
    },
  );

  // ═══ Determine ninja state ═══
  let ninjaX: number;
  let ninjaFacing: 'left' | 'right' = 'right';
  let isRunning = true;

  if (frame < phase1End) {
    // Phase 1: running right
    ninjaX = ninjaPhase1X;
    ninjaFacing = 'right';
  } else if (frame < phase2Start) {
    // Pause: skid in from right, face left toward riders
    ninjaX = ninjaPauseX;
    ninjaFacing = 'left';
    isRunning = frame < pauseStart + 10; // running during skid, then stops
  } else {
    // Phase 2: fleeing left
    ninjaX = ninjaPhase2X;
    ninjaFacing = 'left';
  }

  // Bounce while running
  const bounceY = isRunning ? Math.sin(frame * 0.8) * 8 : 0;

  // Run cycle
  const runFrameIndex = isRunning ? Math.floor(frame / 4) : 0;

  // Feather position (in front relative to facing direction)
  const featherOffsetX = ninjaFacing === 'right' ? 55 : -100;
  const featherOffsetY = -60;
  const featherRotation = isRunning ? Math.sin(frame * 0.3) * 3 : 0;

  // ═══ HORSE RIDERS ═══
  const riders = React.useMemo(
    () =>
      Array.from({length: riderCount}).map((_, i) => ({
        delay: i * 8,
        spacing: i * 160,
      })),
    [riderCount],
  );

  // Riders enter from right edge during pause, then chase left in phase 2
  const getRiderX = (riderDelay: number, riderSpacing: number): number => {
    const riderEnterFrame = pauseStart + riderDelay;

    if (frame < riderEnterFrame) {
      return width + 400 + riderSpacing;
    }

    if (frame < phase2Start) {
      // During pause: riders gallop in from right, stopping near right side
      return interpolate(
        frame,
        [riderEnterFrame, riderEnterFrame + 25],
        [width + 200 + riderSpacing, width * 0.82 + riderSpacing * 0.3],
        {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
          easing: Easing.out(Easing.quad),
        },
      );
    }

    // Phase 2: riders chase ninja to the left
    const riderStartX = width * 0.82 + riderSpacing * 0.3;
    return interpolate(
      frame,
      [phase2Start + riderDelay * 0.5, phase2End + 10],
      [riderStartX, -400 - riderSpacing],
      {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
        easing: Easing.in(Easing.quad),
      },
    );
  };

  // ═══ GROUND SCROLL ═══
  // Phase 1: scroll left. Phase 2: scroll right (reversed direction)
  const groundPhase1 = interpolate(frame, [0, phase1End], [0, -800], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const groundPhase2 = interpolate(
    frame,
    [phase2Start, phase2End],
    [-800, 0],
    {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
  );
  const groundOffset = frame < phase2Start ? groundPhase1 : groundPhase2;

  // ═══ DUST PARTICLES ═══
  // Phase 1 dust (behind ninja running right)
  const dustPhase1 = React.useMemo(() => {
    return Array.from({length: 80}).map((_, i) => ({
      spawnFrame: i * 2,
      offsetX: -(20 + ((i * 17) % 60)),
      offsetY: -(5 + ((i * 13) % 30)),
      size: 4 + (i % 3) * 4,
      lifetime: 12 + (i % 4) * 4,
      phase: 1 as const,
    }));
  }, []);

  // Phase 2 dust (behind ninja + riders running left)
  const dustPhase2 = React.useMemo(() => {
    return Array.from({length: 120}).map((_, i) => ({
      spawnFrame: phase2Start + i * 1.5,
      offsetX: 20 + ((i * 17) % 80), // dust goes RIGHT since running left
      offsetY: -(5 + ((i * 13) % 30)),
      size: 4 + (i % 3) * 4,
      lifetime: 14 + (i % 5) * 4,
      phase: 2 as const,
    }));
  }, [phase2Start]);

  const allDust = [...dustPhase1, ...dustPhase2];

  // ═══ TITLE ═══
  const titleProgress = spring({
    frame: frame - titleAppearFrame,
    fps,
    config: {damping: 200},
  });

  // Shake the title when riders arrive and during chase
  const titleShake = frame > titleShakeStart
    ? interpolate(
        frame,
        [titleShakeStart, titleShakeStart + 15, phase2End],
        [0, 1, 0],
        {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
      )
    : 0;

  // ═══ SKY / STARS ═══
  const twinklePhase = frame * 0.08;
  const skyGradient = `linear-gradient(180deg, ${skyColorTop} 0%, ${skyColorBottom} 100%)`;

  // ─── RENDER ─────────────────────────────────────────────────

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a1a',
        background: skyGradient,
        overflow: 'hidden',
        imageRendering: 'pixelated',
      }}
    >
      {/* Stars */}
      {showStars && <StarField twinklePhase={twinklePhase} />}

      {/* Moon */}
      {showMoon && (
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 200,
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: moonColor,
            boxShadow: `0 0 40px 15px ${moonColor}33`,
          }}
        />
      )}

      {/* Ground */}
      <PixelGround offset={groundOffset} />

      {/* Dust particles */}
      {showDust && allDust.map((dust, i) => {
        const age = frame - dust.spawnFrame;
        if (age < 0 || age > dust.lifetime) return null;

        const dustOpacity = interpolate(age, [0, dust.lifetime], [0.7, 0], {
          extrapolateRight: 'clamp',
        });
        const dustRise = interpolate(age, [0, dust.lifetime], [0, -20], {
          extrapolateRight: 'clamp',
        });

        let spawnX: number;
        if (dust.phase === 1) {
          spawnX = interpolate(
            dust.spawnFrame,
            [0, phase1End],
            [-200, width + 300],
            {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
              easing: Easing.inOut(Easing.quad),
            },
          );
        } else {
          // Phase 2 dust spawns near the ninja or riders
          spawnX = interpolate(
            dust.spawnFrame,
            [phase2Start, phase2End],
            [width * 0.75, -200],
            {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
              easing: Easing.in(Easing.quad),
            },
          );
        }

        return (
          <DustParticle
            key={i}
            x={spawnX + dust.offsetX}
            y={880 + dust.offsetY + dustRise}
            size={dust.size}
            opacity={dustOpacity}
          />
        );
      })}

      {/* ═══ HORSE RIDERS ═══ */}
      {riders.map((rider, i) => {
        const riderX = getRiderX(rider.delay, rider.spacing);
        // Riders face left (chasing ninja who runs left)
        const riderBounce = Math.sin((frame + rider.delay * 3) * 0.6) * 6;
        const riderRunFrame = Math.floor((frame + rider.delay * 2) / 5);

        // Only render if within visible range (plus margin)
        if (riderX < -500 || riderX > width + 500) return null;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: riderX,
              top: 740 + riderBounce,
              transform: 'translate(0, -100%)',
            }}
          >
            <PixelHorseRider
              frameIndex={riderRunFrame}
              scale={riderScale}
              facing="left"
            />
          </div>
        );
      })}

      {/* ═══ NINJA + FEATHER ═══ */}
      <div
        style={{
          position: 'absolute',
          left: ninjaX,
          top: 780 + bounceY,
          transform: 'translate(0, -100%)',
        }}
      >
        {/* Exclamation mark during pause */}
        {frame >= pauseStart && frame < phase2Start && (
          <ExclamationMark progress={exclamationProgress} />
        )}

        {/* Feather (held in front relative to facing) */}
        <div
          style={{
            position: 'absolute',
            left: featherOffsetX,
            top: featherOffsetY,
            transform: `rotate(${featherRotation}deg) scaleX(${ninjaFacing === 'left' ? -1 : 1})`,
            transformOrigin: 'center bottom',
          }}
        >
          <PixelFeather scale={4} />
        </div>

        {/* Ninja */}
        <PixelNinja
          frameIndex={runFrameIndex}
          scale={ninjaScale}
          facing={ninjaFacing}
        />
      </div>

      {/* Title */}
      <Sequence from={Math.round(titleAppearFrame)} premountFor={fps}>
        <PixelTitle
          progress={titleProgress}
          shakeAmount={titleShake}
          text={titleText}
          color={titleColor}
          shadowColor={titleShadowColor}
        />
      </Sequence>

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
