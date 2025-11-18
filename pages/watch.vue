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
          v-if="!primaryVideoId"
          :class="[
            'w-full',
            'border',
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
              <div :class="['flex', 'flex-col', 'gap-4']">
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
                </div>
                <div
                  :class="[
                    'flex',
                    'flex-col',
                    'gap-3',
                    'lg:flex-row',
                    'lg:items-center',
                    'lg:justify-between',
                  ]"
                >
                  <div
                    :class="[
                      'flex',
                      'w-full',
                      'flex-col',
                      'gap-2',
                      'sm:flex-row',
                      'sm:flex-wrap',
                      'sm:items-center',
                    ]"
                  >
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
                      v-for="download in downloadLinks"
                      :key="download.src"
                      :href="download.src"
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
                      <span>{{ download.label }}</span>
                    </a>
                  </div>
                  <ModeToggle
                    v-if="hasSecondaryVideo"
                    v-model="comparisonMode"
                    :class="['w-full', 'sm:w-auto']"
                  />
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
              <ComparisonPlayer
                v-if="hasSecondaryVideo"
                :primary-sources="primarySources"
                :secondary-sources="secondarySources"
                :primary-meta="primaryMeta"
                :secondary-meta="secondaryMeta"
                :mode="comparisonMode"
              />
              <div
                v-else
                :class="[
                  'relative',
                  'w-full',
                  'overflow-hidden',
                  'bg-black',
                ]"
                :style="{
                  aspectRatio: singlePlayerAspectRatio,
                }"
              >
                <video
                  ref="singleVideoRef"
                  id="videoPlayer"
                  :class="['plyr', 'h-full', 'w-full']"
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
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ComparisonPlayer from "~/components/watch/ComparisonPlayer.vue";
import ModeToggle from "~/components/watch/ModeToggle.vue";
import { useVideoPlayer } from "~/composables/useVideoPlayer";
import { useWatchMedia } from "~/composables/useWatchMedia";
import { useWatchClipboard } from "~/composables/useWatchClipboard";
import { useComparisonMode } from "~/composables/useComparisonMode";

const {
  primaryVideoId,
  hasSecondaryVideo,
  primarySources,
  secondarySources,
  primaryMeta,
  secondaryMeta,
  downloadLinks,
  shouldUseSinglePlayer,
} = useWatchMedia();

const { copySuccess, copyToClipboard } = useWatchClipboard();
const { comparisonMode } = useComparisonMode(hasSecondaryVideo);

const { initializePlayer, isPlayerReady } = useVideoPlayer(
  primarySources,
  primaryMeta
);
const singleVideoRef = ref<HTMLVideoElement | null>(null);
const singlePlayerAspectRatio = ref("16 / 9");

const ensureSinglePlayer = async () => {
  if (!shouldUseSinglePlayer.value || process.server) {
    return;
  }

  await initializePlayer();
};

onMounted(ensureSinglePlayer);

const updateSinglePlayerAspectRatio = () => {
  const video = singleVideoRef.value;
  if (!video || !video.videoWidth || !video.videoHeight) {
    return;
  }

  singlePlayerAspectRatio.value = `${video.videoWidth} / ${video.videoHeight}`;
};

watch(
  singleVideoRef,
  (video, previousVideo) => {
    if (previousVideo) {
      previousVideo.removeEventListener(
        "loadedmetadata",
        updateSinglePlayerAspectRatio
      );
    }

    if (!video) {
      return;
    }

    video.addEventListener("loadedmetadata", updateSinglePlayerAspectRatio);

    if (video.readyState >= 1) {
      updateSinglePlayerAspectRatio();
    }
  }
);

onBeforeUnmount(() => {
  const video = singleVideoRef.value;
  if (video) {
    video.removeEventListener(
      "loadedmetadata",
      updateSinglePlayerAspectRatio
    );
  }
});

watch(
  () => [primaryVideoId.value, shouldUseSinglePlayer.value],
  async ([id, shouldUse]) => {
    if (!shouldUse || !id || process.server) {
      return;
    }

    await initializePlayer();
  }
);
</script>

<style scoped>
</style>
