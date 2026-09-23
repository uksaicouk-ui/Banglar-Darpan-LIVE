import { useEffect, useRef, type RefObject } from 'react';

const HLS_SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.20/dist/hls.min.js';

type HlsInstance = {
  loadSource(source: string): void;
  attachMedia(media: HTMLVideoElement): void;
  destroy(): void;
  on(event: string, listener: (...args: unknown[]) => void): void;
};

type HlsConstructor = {
  new (): HlsInstance;
  isSupported(): boolean;
  Events: { ERROR: string };
};

declare global {
  interface Window {
    Hls?: HlsConstructor;
    __banglarDarpanHlsLoader?: Promise<HlsConstructor | null>;
  }
}

function loadHls(): Promise<HlsConstructor | null> {
  if (window.Hls) return Promise.resolve(window.Hls);
  if (window.__banglarDarpanHlsLoader) return window.__banglarDarpanHlsLoader;

  window.__banglarDarpanHlsLoader = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${HLS_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Hls ?? null), { once: true });
      existing.addEventListener('error', () => resolve(null), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = HLS_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(window.Hls ?? null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return window.__banglarDarpanHlsLoader;
}

/** Installs native HLS or hls.js on the supplied video element and cleans up it. */
export function useHlsVideo(videoRef: RefObject<HTMLVideoElement | null>, url: string | null, onError: () => void) {
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url || !/\.m3u8(?:$|[?#])/i.test(url)) return;

    let destroyed = false;
    let hls: HlsInstance | null = null;
    video.removeAttribute('src');
    video.load();

    const setup = async () => {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        void video.play().catch(() => undefined);
        return;
      }
      const Hls = await loadHls();
      if (destroyed) return;
      if (!Hls?.isSupported()) {
        onErrorRef.current();
        return;
      }
      hls = new Hls();
      hls.on(Hls.Events.ERROR, (...args) => {
        const details = args[1] as { fatal?: boolean } | undefined;
        if (details?.fatal) onErrorRef.current();
      });
      hls.loadSource(url);
      hls.attachMedia(video);
      video.addEventListener('canplay', () => void video.play().catch(() => undefined), { once: true });
    };
    void setup();

    return () => {
      destroyed = true;
      hls?.destroy();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [videoRef, url]);
}
