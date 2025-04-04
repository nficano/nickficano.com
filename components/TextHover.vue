<template>
  <client-only>
    <svg
      ref="svgRef"
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @mousemove="updateCursor"
      class="select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          <template v-if="hovered">
            <stop offset="0%" stop-color="#eab308" />
            <stop offset="25%" stop-color="#ef4444" />
            <stop offset="50%" stop-color="#3b82f6" />
            <stop offset="75%" stop-color="#06b6d4" />
            <stop offset="100%" stop-color="#8b5cf6" />
          </template>
        </linearGradient>

        <radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          :cx="maskPosition?.cx || '50%'"
          :cy="maskPosition?.cy || '50%'"
        >
          <stop offset="0%" stop-color="white" />
          <stop offset="100%" stop-color="black" />
        </radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke-width="0.3"
        class="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        :style="{ opacity: hovered ? 0.7 : 0 }"
      >
        {{ text }}
      </text>
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke-width="0.3"
        class="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        :style="{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
          transition: 'stroke-dashoffset 4s ease-in-out',
        }"
      >
        {{ text }}
      </text>
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke="url(#textGradient)"
        stroke-width="0.3"
        mask="url(#textMask)"
        class="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {{ text }}
      </text>
    </svg>
  </client-only>
</template>

<script setup>
import { useTextHover } from "~/composables/useTextHover";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  automatic: {
    type: Boolean,
    default: false,
  },
});

const { svgRef, hovered, maskPosition, updateCursor } = useTextHover(
  props.text,
  {
    duration: props.duration,
    automatic: props.automatic,
  }
);
</script>
