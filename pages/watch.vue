<template>
  <div class="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute left-[-35%] top-[-45%] h-[170%] w-[170%] -rotate-12 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.35)_0%,rgba(59,130,246,0.22)_22%,rgba(37,99,235,0.1)_45%,transparent_70%)] blur-3xl mix-blend-screen md:left-[-20%] md:top-[-35%] md:h-[150%] md:w-[150%]"
      ></div>
      <div
        class="absolute left-[62%] top-[46%] h-[135%] w-[155%] -translate-x-1/2 -translate-y-1/2 rotate-8 bg-[radial-gradient(ellipse_at_center,rgba(6,10,25,0.1)_0%,rgba(6,10,25,0.45)_30%,rgba(2,6,23,0.84)_65%,rgba(2,6,23,0.98)_86%,rgba(2,6,23,1)_96%)] mix-blend-multiply blur-[140px] sm:left-[60%] sm:top-[42%] md:h-[145%] md:w-[165%]"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.25),transparent_60%)] mix-blend-screen"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(136deg,rgba(15,23,42,0.84),rgba(2,6,23,0.95)_58%,rgba(2,6,23,1)_88%)]"
      ></div>
    </div>
    <div
      class="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 sm:px-8 xl:max-w-7xl 2xl:max-w-[1600px] 2xl:px-12 2xl:py-16"
    >
      <div
        class="relative -mt-16 flex flex-1 items-center justify-center sm:-mt-28 lg:-mt-52"
      >
        <div
          v-if="!videoId"
          class="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] px-10 py-14 text-center shadow-2xl backdrop-blur"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent"
          ></div>
          <p class="text-lg font-semibold text-rose-300">
            Missing video identifier.
          </p>
          <p class="mt-3 text-sm leading-relaxed text-zinc-400">
            Append
            <span class="font-mono text-rose-200/90">?v=&lt;nanoid&gt;</span>
            to the URL — for example
            <span class="font-mono text-rose-200/90"
              >watch.nickficano.com?v=BWQ4fZyi</span
            >.
          </p>
        </div>

        <ClientOnly v-else>
          <div class="relative w-full">
            <div
              class="pointer-events-none absolute left-[47%] top-[65%] h-[160%] w-[185%] -translate-x-1/2 -translate-y-1/2 rotate-[6deg] bg-[radial-gradient(ellipse_at_center,rgba(1,4,12,0.72)_18%,rgba(1,4,12,0.65)_32%,rgba(2,6,23,0.4)_56%,rgba(2,6,23,0.1)_78%,transparent_88%)] mix-blend-multiply blur-[120px] sm:top-[60%] md:h-[170%] md:w-[210%] md:rotate-[4deg]"
            ></div>
            <div
              class="pointer-events-none absolute left-[18%] top-[-26%] h-[165%] w-[180%] -translate-y-1/2 -rotate-[10deg] bg-[conic-gradient(from_230deg_at_22%_32%,rgba(125,211,252,0.28)_0deg,rgba(96,165,250,0.16)_48deg,rgba(59,130,246,0.08)_120deg,transparent_210deg)] mix-blend-screen blur-[120px] sm:left-[12%] sm:top-[-20%] md:h-[150%] md:w-[170%]"
            ></div>
            <div
              class="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_35px_120px_-35px_rgba(15,23,42,0.9)] backdrop-blur-lg sm:p-8 2xl:rounded-[36px] 2xl:border-white/20 2xl:p-12 2xl:shadow-[0_55px_160px_-45px_rgba(15,23,42,0.95)]"
            >
              <div
                class="group relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 2xl:rounded-[40px]"
              >
                <div
                  class="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-transparent to-purple-500/20 opacity-70 transition duration-700 group-hover:opacity-90 2xl:rounded-[40px]"
                ></div>
                <video
                  id="videoPlayer"
                  class="plyr relative z-10 h-full w-full rounded-3xl 2xl:rounded-[40px]"
                  playsinline
                  controls
                  muted
                ></video>
                <div
                  v-if="!isPlayerReady"
                  class="absolute inset-0 z-20 flex items-center justify-center bg-black/70"
                >
                  <p
                    class="text-sm font-medium uppercase tracking-[0.3em] text-zinc-300"
                  >
                    Loading video…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { VideoMeta, VideoSource } from "~/composables/useVideoPlayer";
import { useVideoPlayer } from "~/composables/useVideoPlayer";

const route = useRoute();
const sources = ref<VideoSource[]>([]);
const meta = ref<VideoMeta | null>(null);

const normalizeVideoId = (input: string) => input.trim();

const guessFileExtension = (filename: string) => {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/i);
  return match ? match[1] : null;
};

const sourceTypeByExtension: Record<string, string> = {
  webm: "video/webm",
  mp4: "video/mp4",
  m3u8: "application/x-mpegURL",
  mov: "video/quicktime",
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

const videoId = computed(() => {
  const raw = extractQueryParam(route.query.v as string | string[] | undefined);
  return raw ? normalizeVideoId(raw) : "";
});

const pageTitle = computed(() =>
  videoId.value ? `Watch ${videoId.value} • Nick Ficano` : "Watch • Nick Ficano"
);

useHead(() => ({
  title: pageTitle.value,
  meta: [
    {
      name: "robots",
      content: "noindex",
    },
  ],
}));

watch(
  videoId,
  (id) => {
    const source = id ? buildSourceFromId(id) : null;

    if (source) {
      sources.value = [source];
      meta.value = {
        title: `Upload ${id}`,
      };
    } else {
      sources.value = [];
      meta.value = null;
    }
  },
  { immediate: true }
);

const { initializePlayer, isPlayerReady } = useVideoPlayer(sources, meta);

onMounted(async () => {
  if (!videoId.value) {
    return;
  }

  await initializePlayer();
});

watch(
  () => videoId.value,
  async (id, previous) => {
    if (process.server || !id || previous) {
      return;
    }

    await initializePlayer();
  }
);
</script>
