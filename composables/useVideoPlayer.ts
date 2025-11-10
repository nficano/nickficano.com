import type Plyr from "plyr";
import { onBeforeUnmount, ref, watch, type Ref, type WatchStopHandle } from "vue";

type PlyrInstance = Plyr;

export interface VideoSource {
  src: string;
  type: string;
  size?: number;
}

export interface VideoMeta {
  title?: string;
  captions?: Record<string, string>;
  poster?: string;
}

const SUPPORTED_LANGUAGES: Record<string, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};

const createTracksList = (captions?: Record<string, string>) => {
  if (!captions) {
    return [];
  }

  return Object.entries(SUPPORTED_LANGUAGES)
    .map(([lang, label]) => ({
      kind: "captions" as const,
      label,
      srclang: lang,
      src: captions[lang],
      default: lang === "en",
    }))
    .filter((track) => track.src);
};

const updatePlayerSource = (
  videoPlayer: PlyrInstance,
  newSources: VideoSource[],
  newMeta?: VideoMeta | null
) => {
  videoPlayer.source = {
    type: "video",
    title: newMeta?.title,
    sources: newSources,
    tracks: createTracksList(newMeta?.captions),
    ...(newMeta?.poster ? { poster: newMeta.poster } : {}),
  };
};

export function useVideoPlayer(
  sources: Ref<VideoSource[]>,
  meta: Ref<VideoMeta | null | undefined>
) {
  const vod = ref<PlyrInstance | null>(null);
  const isPlayerReady = ref(false);
  let stopWatcher: WatchStopHandle | null = null;

  if (process.client) {
    stopWatcher = watch(
      () => [sources.value, meta.value] as const,
      ([newSources, newMeta]) => {
        if (vod.value) {
          updatePlayerSource(vod.value, newSources, newMeta);
        }
      },
      { deep: true }
    );
  }

  onBeforeUnmount(() => {
    if (stopWatcher) {
      stopWatcher();
      stopWatcher = null;
    }

    if (vod.value) {
      vod.value.destroy();
      vod.value = null;
    }
  });

  const initializePlayer = async () => {
    if (!process.client) {
      return null;
    }

    if (vod.value) {
      updatePlayerSource(vod.value, sources.value, meta.value);
      return vod.value;
    }

    const { default: PlyrConstructor } = await import("plyr");

    const videoPlayer = new PlyrConstructor("#videoPlayer", {
      ratio: "16:9",
      captions: {
        active: true,
        update: true,
        language: "en",
      },
      settings: ["captions", "quality", "speed"],
      controls: [
        "rewind",
        "play-large",
        "play",
        "progress",
        "current-time",
        "volume",
        "captions",
        "fullscreen",
        "quality",
        "settings",
      ],
      tooltips: {
        controls: true,
        seek: true,
      },
      autoplay: true,
    });

    updatePlayerSource(videoPlayer, sources.value, meta.value);
    vod.value = videoPlayer;

    videoPlayer.on("ready", () => {
      isPlayerReady.value = true;
      videoPlayer.play().catch(() => {
        /* Autoplay might be blocked; rely on controls */
      });
    });

    videoPlayer.on("error", (error) => {
      console.error("[Plyr] Player error:", error);
    });

    return videoPlayer;
  };

  return {
    vod,
    isPlayerReady,
    initializePlayer,
  };
}
