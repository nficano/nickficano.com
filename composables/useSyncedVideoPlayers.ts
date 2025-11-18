import type Plyr from "plyr";
import {
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
  type Ref,
  type WatchStopHandle,
} from "vue";
import type { VideoMeta, VideoSource } from "./useVideoPlayer";
import { updatePlayerSource } from "./useVideoPlayer";

type PlyrInstance = Plyr;

interface UseSyncedVideoPlayersOptions {
  primaryVideoRef: Ref<HTMLVideoElement | null>;
  secondaryVideoRef: Ref<HTMLVideoElement | null>;
  primarySources: Ref<VideoSource[]>;
  secondarySources: Ref<VideoSource[]>;
  primaryMeta?: Ref<VideoMeta | null | undefined>;
  secondaryMeta?: Ref<VideoMeta | null | undefined>;
}

const MIN_TIME_DELTA = 0.06;

export function useSyncedVideoPlayers({
  primaryVideoRef,
  secondaryVideoRef,
  primarySources,
  secondarySources,
  primaryMeta,
  secondaryMeta,
}: UseSyncedVideoPlayersOptions) {
  const primaryPlayer = ref<PlyrInstance | null>(null);
  const secondaryPlayer = ref<PlyrInstance | null>(null);
  const isReady = ref(false);
  const watcherStops: WatchStopHandle[] = [];
  const cleanupFns: Array<() => void> = [];

  const registerEvent = (
    player: PlyrInstance,
    event: string,
    handler: (...args: any[]) => void
  ) => {
    player.on(event, handler);
    cleanupFns.push(() => {
      player.off(event, handler);
    });
  };

  const attachSourceWatchers = () => {
    if (!process.client) {
      return;
    }

    watcherStops.push(
      watch(
        () => [primarySources.value, primaryMeta?.value ?? null] as const,
        ([sources, meta]) => {
          if (primaryPlayer.value) {
            updatePlayerSource(primaryPlayer.value, sources, meta);
          }
        },
        { deep: true }
      )
    );

    watcherStops.push(
      watch(
        () => [secondarySources.value, secondaryMeta?.value ?? null] as const,
        ([sources, meta]) => {
          if (secondaryPlayer.value) {
            updatePlayerSource(secondaryPlayer.value, sources, meta);
          }
        },
        { deep: true }
      )
    );
  };

  const clearWatchers = () => {
    watcherStops.forEach((stop) => stop());
    watcherStops.length = 0;
  };

  const destroyPlayers = () => {
    cleanupFns.splice(0).forEach((fn) => fn());

    if (primaryPlayer.value) {
      primaryPlayer.value.destroy();
      primaryPlayer.value = null;
    }

    if (secondaryPlayer.value) {
      secondaryPlayer.value.destroy();
      secondaryPlayer.value = null;
    }

    clearWatchers();
  };

  const syncPrimaryWithSecondary = () => {
    if (!primaryPlayer.value || !secondaryPlayer.value) {
      return;
    }

    const primary = primaryPlayer.value;
    const secondary = secondaryPlayer.value;

    primary.muted = true;
    primary.volume = 0;

    const alignClocks = () => {
      if (
        Math.abs(primary.currentTime - secondary.currentTime) >
        MIN_TIME_DELTA
      ) {
        primary.currentTime = secondary.currentTime;
      }
    };

    registerEvent(secondary, "play", () => {
      primary.play().catch(() => {});
    });

    registerEvent(secondary, "pause", () => {
      primary.pause();
    });

    registerEvent(secondary, "seeking", () => {
      primary.currentTime = secondary.currentTime;
    });

    registerEvent(secondary, "timeupdate", alignClocks);

    registerEvent(secondary, "ratechange", () => {
      primary.speed = secondary.speed;
    });
  };

  const loadPlyr = async () => {
    const { default: PlyrConstructor } = await import("plyr");
    return PlyrConstructor;
  };

  const initializePlayers = async () => {
    if (!process.client) {
      return null;
    }

    await nextTick();

    if (primaryPlayer.value && secondaryPlayer.value) {
      updatePlayerSource(primaryPlayer.value, primarySources.value, primaryMeta?.value ?? null);
      updatePlayerSource(secondaryPlayer.value, secondarySources.value, secondaryMeta?.value ?? null);
      return { primary: primaryPlayer.value, secondary: secondaryPlayer.value };
    }

    if (!primaryVideoRef.value || !secondaryVideoRef.value) {
      return null;
    }

    const PlyrConstructor = await loadPlyr();

    const primary = new PlyrConstructor(primaryVideoRef.value, {
      ratio: "16:9",
      controls: [],
      clickToPlay: false,
      keyboard: { focused: true, global: true },
      autoplay: true,
      muted: true,
    });

    const secondary = new PlyrConstructor(secondaryVideoRef.value, {
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

    updatePlayerSource(primary, primarySources.value, primaryMeta?.value ?? null);
    updatePlayerSource(secondary, secondarySources.value, secondaryMeta?.value ?? null);

    primaryPlayer.value = primary;
    secondaryPlayer.value = secondary;
    attachSourceWatchers();

    syncPrimaryWithSecondary();

    let readyCount = 0;
    const handleReady = () => {
      readyCount += 1;
      if (readyCount >= 2) {
        isReady.value = true;
        secondary.play().catch(() => {});
        primary.play().catch(() => {});
      }
    };

    registerEvent(primary, "ready", handleReady);
    registerEvent(secondary, "ready", handleReady);

    registerEvent(secondary, "error", (error) => {
      console.error("[Plyr] Secondary player error:", error);
    });

    registerEvent(primary, "error", (error) => {
      console.error("[Plyr] Primary player error:", error);
    });

    return { primary, secondary };
  };

  onBeforeUnmount(() => {
    destroyPlayers();
  });

  return {
    primaryPlayer,
    secondaryPlayer,
    isReady,
    initializePlayers,
  };
}
