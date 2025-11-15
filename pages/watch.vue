<template>
  <div :class="['relative', 'min-h-screen', 'bg-zinc-950', 'text-zinc-100']">
    <div
      :class="[
        'relative',
        'mx-auto',
        'flex',
        'min-h-screen',
        'w-full',
        'max-w-5xl',
        'flex-col',
        'items-start',
        'px-4',
        'py-6',
        'sm:px-6',
        'md:px-8',
        'lg:max-w-6xl',
        'xl:max-w-7xl',
        '2xl:max-w-[1600px]',
      ]"
    >
      <div :class="['flex', 'w-full', 'flex-col']">
        <div
          v-if="!videoId"
          :class="[
            'w-full',
            'border',
            'border-zinc-800',
            'bg-zinc-950',
            'px-6',
            'py-16',
            'text-center',
            'sm:px-12',
            'sm:py-20',
          ]"
        >
          <p :class="['text-base', 'font-semibold', 'text-zinc-100', 'sm:text-lg']">
            Missing video identifier
          </p>
          <p :class="['mt-3', 'text-sm', 'text-zinc-400']">
            Add <span :class="['font-mono', 'text-zinc-100']">?v=&lt;nanoid&gt;</span> to the URL
          </p>
        </div>

        <ClientOnly v-else>
          <div :class="['w-full', 'flex', 'flex-col', 'gap-4']">
            <div
              :class="[
                'border',
                'border-zinc-800',
                'bg-zinc-950',
                'p-4',
                'sm:p-5',
                'md:p-6',
              ]"
            >
              <div
                :class="[
                  'flex',
                  'flex-col',
                  'items-start',
                  'gap-3',
                  'sm:flex-row',
                  'sm:items-center',
                  'sm:justify-between',
                  'sm:gap-4',
                ]"
              >
                <p :class="['hidden', 'text-xs', 'text-zinc-500', 'uppercase', 'tracking-wider', 'sm:block', 'sm:text-sm']">
                  Unlisted • Expires in 7 days
                </p>
                <div :class="['flex', 'items-center', 'gap-2', 'w-full', 'flex-wrap', 'sm:w-auto', 'sm:gap-2']">
                  <button
                    @click="copyToClipboard"
                    :class="[
                      'flex',
                      'flex-1',
                      'items-center',
                      'justify-center',
                      'gap-1.5',
                      'border',
                      'px-3',
                      'py-2',
                      'text-xs',
                      'font-medium',
                      'transition',
                      'sm:flex-initial',
                      'sm:px-4',
                      'sm:py-2.5',
                      copySuccess
                        ? 'bg-white text-black border-white'
                        : 'border-zinc-100 bg-zinc-950 text-zinc-100 hover:bg-white hover:text-black',
                    ]"
                    :title="copySuccess ? 'URL copied!' : 'Copy URL to clipboard'"
                  >
                    <FontAwesomeIcon :icon="['fal', 'copy']" :class="['w-3.5', 'h-3.5', 'sm:w-4', 'sm:h-4']" />
                    <span>{{ copySuccess ? 'Copied!' : 'Copy URL' }}</span>
                  </button>
                  <a
                    v-if="sources.length > 0"
                    :href="sources[0].src"
                    download
                    :class="[
                      'flex',
                      'flex-1',
                      'items-center',
                      'justify-center',
                      'gap-1.5',
                      'border',
                      'border-zinc-900',
                      'dark:border-zinc-100',
                      'bg-white',
                      'dark:bg-zinc-950',
                      'px-3',
                      'py-2',
                      'text-xs',
                      'font-medium',
                      'text-zinc-900',
                      'dark:text-zinc-100',
                      'transition',
                      'hover:bg-black',
                      'hover:text-white',
                      'dark:hover:bg-white',
                      'dark:hover:text-black',
                      'sm:flex-initial',
                      'sm:px-4',
                      'sm:py-2.5',
                    ]"
                    title="Download video file"
                  >
                    <FontAwesomeIcon :icon="['fal', 'download']" :class="['w-3.5', 'h-3.5', 'sm:w-4', 'sm:h-4']" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
            <div
              :class="[
                'relative',
                'z-10',
                'w-full',
                'border',
                'border-zinc-800',
                'bg-zinc-950',
                'p-2',
                'sm:p-3',
                'md:p-4',
              ]"
            >
              <div
                :class="[
                  'aspect-video',
                  'w-full',
                  'overflow-hidden',
                  'border',
                  'border-zinc-700',
                  'bg-black',
                ]"
              >
                <video
                  id="videoPlayer"
                  :class="[
                    'plyr',
                    'h-full',
                    'w-full',
                  ]"
                  playsinline
                  controls
                  muted
                ></video>
                <div
                  v-if="!isPlayerReady"
                  :class="[
                    'absolute',
                    'inset-0',
                    'z-20',
                    'flex',
                    'items-center',
                    'justify-center',
                    'bg-black/70',
                  ]"
                >
                  <p
                    :class="[
                      'text-sm',
                      'font-medium',
                      'uppercase',
                      'tracking-[0.3em]',
                      'text-zinc-100',
                    ]"
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const route = useRoute();
const sources = ref<VideoSource[]>([]);
const meta = ref<VideoMeta | null>(null);
const copySuccess = ref(false);

const copyToClipboard = async () => {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Keyboard shortcuts
onMounted(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Ignore if typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.key.toLowerCase()) {
      case 'c':
        if (e.metaKey || e.ctrlKey) return; // Don't override copy
        copyToClipboard();
        break;
    }
  };

  window.addEventListener('keydown', handleKeyPress);

  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  };
});

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

<style scoped>
</style>
