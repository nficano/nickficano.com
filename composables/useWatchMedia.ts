import { useHead, useRoute } from "#imports";
import { computed } from "vue";
import type { VideoMeta, VideoSource } from "~/composables/useVideoPlayer";

const sourceTypeByExtension: Record<string, string> = {
  webm: "video/webm",
  mp4: "video/mp4",
  m3u8: "application/x-mpegURL",
  mov: "video/quicktime",
};

const normalizeVideoId = (input: string) => input.trim();

const guessFileExtension = (filename: string) => {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/i);
  return match ? match[1] : null;
};

const buildSourceFromId = (identifier: string): VideoSource | null => {
  const cleanedId = normalizeVideoId(identifier);

  if (!cleanedId) {
    return null;
  }

  const existingExtension = guessFileExtension(cleanedId);
  const extension = existingExtension ?? "webm";
  const filename = existingExtension ? cleanedId : `${cleanedId}.${extension}`;
  const type = sourceTypeByExtension[extension] ?? `video/${extension}`;

  return {
    src: `https://dl.nickficano.com/${filename}`,
    type,
  };
};

const extractQueryParam = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const sourcesFromId = (id: string) => {
  const source = id ? buildSourceFromId(id) : null;
  return source ? [source] : [];
};

const metaFromId = (id: string): VideoMeta | null =>
  id ? { title: `Upload ${id}` } : null;

export function useWatchMedia() {
  const route = useRoute();

  const videoIds = computed(() => {
    const raw = extractQueryParam(route.query.v as string | string[] | undefined);
    if (!raw) {
      return [];
    }

    return raw
      .split(",")
      .map((id) => normalizeVideoId(id))
      .filter(Boolean)
      .slice(0, 2);
  });

  const primaryVideoId = computed(() => videoIds.value[0] ?? "");
  const secondaryVideoId = computed(() => videoIds.value[1] ?? "");
  const hasSecondaryVideo = computed(() => Boolean(secondaryVideoId.value));

  const primarySources = computed<VideoSource[]>(() =>
    sourcesFromId(primaryVideoId.value)
  );
  const secondarySources = computed<VideoSource[]>(() =>
    sourcesFromId(secondaryVideoId.value)
  );

  const primaryMeta = computed<VideoMeta | null>(() =>
    metaFromId(primaryVideoId.value)
  );
  const secondaryMeta = computed<VideoMeta | null>(() =>
    metaFromId(secondaryVideoId.value)
  );

  const pageTitle = computed(() => {
    if (videoIds.value.length === 0) {
      return "Watch • Nick Ficano";
    }

    if (videoIds.value.length === 1) {
      return `Watch ${videoIds.value[0]} • Nick Ficano`;
    }

    return `Watch ${videoIds.value.join(" & ")} • Nick Ficano`;
  });

  useHead(() => ({
    title: pageTitle.value,
    meta: [
      {
        name: "robots",
        content: "noindex",
      },
    ],
  }));

  const downloadLinks = computed(() => {
    const links: Array<{ label: string; src: string }> = [];

    if (primarySources.value[0]) {
      links.push({
        label: hasSecondaryVideo.value ? "Download Video 1" : "Download",
        src: primarySources.value[0].src,
      });
    }

    if (hasSecondaryVideo.value && secondarySources.value[0]) {
      links.push({
        label: "Download Video 2",
        src: secondarySources.value[0].src,
      });
    }

    return links;
  });

  const shouldUseSinglePlayer = computed(
    () => Boolean(primaryVideoId.value) && !hasSecondaryVideo.value
  );

  return {
    videoIds,
    primaryVideoId,
    secondaryVideoId,
    hasSecondaryVideo,
    primarySources,
    secondarySources,
    primaryMeta,
    secondaryMeta,
    downloadLinks,
    shouldUseSinglePlayer,
  };
}
