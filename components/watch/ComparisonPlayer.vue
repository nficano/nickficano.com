<template>
  <div
    :class="[
      'relative',
      'w-full',
      'overflow-hidden',
      'bg-black',
    ]"
    :style="{
      aspectRatio: aspectRatioValue,
    }"
  >
    <div
      ref="stageRef"
      class="comparison-stage"
      :data-mode="mode"
      :style="{
        '--slider-percent': `${sliderValue}%`,
      }"
      @click="handleStageClick"
    >
      <div
        class="pane pane--primary"
        :class="{
          'opacity-0 pointer-events-none': mode === 'full',
        }"
      >
        <video
          preload="metadata"
          ref="primaryVideoRef"
          class="comparison-video"
          playsinline
        ></video>
      </div>
      <div class="pane pane--secondary">
        <video
          preload="metadata"
          ref="secondaryVideoRef"
          class="comparison-video"
          playsinline
        ></video>
      </div>

      <div
        v-if="mode === 'slide'"
        ref="sliderRef"
        class="slider-handle"
        :style="{
          left: `${sliderValue}%`,
        }"
        role="presentation"
        @pointerdown.prevent="startDragging"
        @click.stop
      >
        <span class="slider-line" />
        <span class="slider-knob" />
      </div>

      <input
        v-if="mode === 'slide'"
        class="sr-only"
        type="range"
        min="0"
        max="100"
        :value="sliderValue"
        aria-label="Adjust comparison slider"
        @input="onSliderInput"
      />
    </div>

    <div
      v-if="!isReady"
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
        Loading videos…
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import type { VideoMeta, VideoSource } from "~/composables/useVideoPlayer";
import { useSyncedVideoPlayers } from "~/composables/useSyncedVideoPlayers";
import type { ComparisonMode } from "~/types/watch";

const props = defineProps<{
  primarySources: VideoSource[];
  secondarySources: VideoSource[];
  primaryMeta?: VideoMeta | null;
  secondaryMeta?: VideoMeta | null;
  mode: ComparisonMode;
}>();

const primaryVideoRef = ref<HTMLVideoElement | null>(null);
const secondaryVideoRef = ref<HTMLVideoElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);
const sliderRef = ref<HTMLElement | null>(null);
const sliderValue = ref(50);
const isDragging = ref(false);
const aspectRatio = ref("16 / 9");

const primarySourcesRef = computed(() => props.primarySources);
const secondarySourcesRef = computed(() => props.secondarySources);
const primaryMetaRef = computed(() => props.primaryMeta ?? null);
const secondaryMetaRef = computed(() => props.secondaryMeta ?? null);

const { primaryPlayer, secondaryPlayer, isReady, initializePlayers } =
  useSyncedVideoPlayers({
    primaryVideoRef,
    secondaryVideoRef,
    primarySources: primarySourcesRef,
    secondarySources: secondarySourcesRef,
    primaryMeta: primaryMetaRef,
    secondaryMeta: secondaryMetaRef,
  });

const clampSlider = (value: number) => Math.min(100, Math.max(0, value));

const updateSliderFromPointer = (clientX: number) => {
  if (!stageRef.value) return;

  const { left, width } = stageRef.value.getBoundingClientRect();
  const percent = ((clientX - left) / width) * 100;
  sliderValue.value = clampSlider(percent);
};

const handlePointerMove = (event: PointerEvent) => {
  updateSliderFromPointer(event.clientX);
};

const stopDragging = (event?: PointerEvent) => {
  if (event) {
    updateSliderFromPointer(event.clientX);
  }

  isDragging.value = false;
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerup", stopDragging);
};

const startDragging = (event: PointerEvent) => {
  isDragging.value = true;
  updateSliderFromPointer(event.clientX);
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", stopDragging);
};

const onSliderInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  sliderValue.value = clampSlider(Number(target.value));
};

const togglePlayback = () => {
  const controller = secondaryPlayer.value;
  if (!controller) return;

  if (controller.playing) {
    controller.pause();
  } else {
    controller.play().catch(() => {});
  }
};

const handleStageClick = (event: MouseEvent) => {
  if (isDragging.value) {
    return;
  }

  const target = event.target as HTMLElement | null;
  if (target?.closest(".plyr__controls")) {
    return;
  }

  togglePlayback();
};

const updateAspectRatio = () => {
  const referenceVideo =
    secondaryVideoRef.value || primaryVideoRef.value || null;

  if (
    !referenceVideo ||
    !referenceVideo.videoWidth ||
    !referenceVideo.videoHeight
  ) {
    return;
  }

  aspectRatio.value = `${referenceVideo.videoWidth} / ${referenceVideo.videoHeight}`;
};

const metadataCleanup: Array<() => void> = [];

const attachMetadataListeners = () => {
  metadataCleanup.splice(0).forEach((fn) => fn());

  const register = (videoEl: HTMLVideoElement | null) => {
    if (!videoEl) {
      return;
    }

    const handler = () => updateAspectRatio();
    videoEl.addEventListener("loadedmetadata", handler);
    metadataCleanup.push(() =>
      videoEl.removeEventListener("loadedmetadata", handler)
    );
  };

  register(primaryVideoRef.value);
  register(secondaryVideoRef.value);
};

const aspectRatioValue = computed(() => aspectRatio.value);

watch(
  () => props.mode,
  (mode, previousMode) => {
    if (mode === "slide" && previousMode !== "slide") {
      sliderValue.value = 50;
    }
  }
);

onMounted(async () => {
  await nextTick();
  await initializePlayers();
  attachMetadataListeners();
  updateAspectRatio();
});

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerup", stopDragging);
  metadataCleanup.splice(0).forEach((fn) => fn());
});
</script>

<style scoped>
.comparison-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0.25rem;
}

.pane {
  position: relative;
  flex: 1 1 0%;
  height: 100%;
}

.pane--primary {
  z-index: 2;
}

.pane--secondary {
  z-index: 1;
}

.comparison-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comparison-stage[data-mode="slide"] {
  display: block;
}

.comparison-stage[data-mode="slide"] .pane {
  position: absolute;
  inset: 0;
  flex: none;
}

.comparison-stage[data-mode="slide"] .pane--primary {
  clip-path: inset(0 calc(100% - var(--slider-percent, 50%)) 0 0);
}

.comparison-stage[data-mode="slide"] .pane--secondary {
  clip-path: inset(0 0 0 0);
}

.comparison-stage[data-mode="full"] {
  display: block;
}

.comparison-stage[data-mode="full"] .pane--primary {
  display: none;
}

.comparison-stage[data-mode="full"] .pane--secondary {
  flex: none;
  width: 100%;
  height: 100%;
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  cursor: ew-resize;
  touch-action: none;
}

.slider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.6);
}

.slider-knob {
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
