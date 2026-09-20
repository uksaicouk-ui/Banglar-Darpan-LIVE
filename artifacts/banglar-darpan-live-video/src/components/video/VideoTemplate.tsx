import {
  SafeFrame,
  VideoCanvas,
  type VideoAspectRatio,
  VideoPausedContext,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS = {
  opening: 4200,
  lineup: 4800,
  viewer: 5200,
  test: 4600,
  control: 4800,
  close: 5200,
} as const;
const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';

interface VideoTemplateProps {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  onSceneChange?: (sceneKey: string) => void;
}

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  onSceneChange,
}: VideoTemplateProps = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({
    durations,
    loop,
    paused,
  });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas
        aspectRatio={VIDEO_ASPECT_RATIO}
        className="bd-film"
        style={{ backgroundColor: 'var(--color-bg-light)' }}
      >
        <SafeFrame>
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 77% 16%, rgba(232,93,63,.16), transparent 28%)' }}
          animate={{ opacity: [.5, .95, .5], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: '1vw', height: '1vw', minWidth: 8, minHeight: 8, background: 'var(--color-primary)', left: '7vw', top: '8vw' }}
          animate={{ x: ['0vw', '12vw', '0vw'], y: ['0vw', '5vw', '0vw'], opacity: [.25, .75, .25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: '.55vw', height: '.55vw', minWidth: 5, minHeight: 5, background: 'var(--color-accent)', right: '14vw', bottom: '11vw' }}
          animate={{ x: ['0vw', '-8vw', '0vw'], y: ['0vw', '-4vw', '0vw'], opacity: [.25, .95, .25] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 overflow-hidden" data-scene-index={sceneIndex}>
          <AnimatePresence mode="sync" initial={false}>
            {sceneIndex === 0 && <Scene1 key={currentSceneKey} />}
            {sceneIndex === 1 && <Scene2 key={currentSceneKey} />}
            {sceneIndex === 2 && <Scene3 key={currentSceneKey} />}
            {sceneIndex === 3 && <Scene4 key={currentSceneKey} />}
            {sceneIndex === 4 && <Scene5 key={currentSceneKey} />}
            {sceneIndex === 5 && <Scene6 key={currentSceneKey} />}
          </AnimatePresence>
        </div>
        <motion.div
          className="absolute left-[5.8vw] bottom-[4.7vw] bd-mono"
          style={{ color: 'rgba(246,240,223,.42)', fontSize: 'clamp(.4rem, .58vw, .62rem)' }}
          animate={{ opacity: [.35, .68, .35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          DHAKA DESK / CONTINUOUS SIGNAL
        </motion.div>
        </SafeFrame>
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
