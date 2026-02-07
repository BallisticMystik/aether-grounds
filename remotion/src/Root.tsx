import {Composition} from 'remotion';
import {NinjaIntro, NinjaIntroSchema} from './NinjaIntro/NinjaIntro';
import type {NinjaIntroProps} from './NinjaIntro/NinjaIntro';

const defaultProps: NinjaIntroProps = {
  titleText: 'AETHER GROUNDS',
  titleColor: '#f5f0e1',
  titleShadowColor: '#1a1a2e',
  skyColorTop: '#0a0a1a',
  skyColorBottom: '#1a2a4a',
  moonColor: '#f5f0d0',
  showStars: true,
  showMoon: true,
  showDust: true,
  ninjaScale: 5,
  riderScale: 6,
  riderCount: 5,
  phase1Seconds: 3.5,
  pauseSeconds: 1.0,
  phase2Seconds: 4.0,
  titleAppearSeconds: 2.5,
};

export const RemotionRoot = () => {
  return (
    <Composition
      id="NinjaIntro"
      component={NinjaIntro}
      durationInFrames={270}
      fps={30}
      width={1920}
      height={1080}
      schema={NinjaIntroSchema}
      defaultProps={defaultProps}
    />
  );
};
