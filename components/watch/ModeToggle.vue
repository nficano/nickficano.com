<template>
  <div
    :class="[
      'flex',
      'w-full',
      'flex-col',
      'sm:flex-row',
      'sm:items-center',
      'sm:justify-end',
    ]"
  >
    <p
      :class="[
        'text-xs',
        'font-medium',
        'uppercase',
        'tracking-widest',
        'text-zinc-500',
      ]"
    ></p>
    <div :class="['flex', 'w-full', 'flex-col', 'sm:w-auto', 'sm:flex-row']">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        @click="select(option.value)"
        :class="[
          'flex',
          'items-center',
          'justify-center',
          'border',
          'px-3',
          'py-2',
          'text-xs',
          'font-semibold',
          'uppercase',
          'tracking-wider',
          'transition',
          modelValue === option.value
            ? 'border-white bg-white text-black'
            : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-100 hover:text-white',
        ]"
      >
        <component
          :is="option.icon"
          :class="['h-4', 'w-4', 'sm:h-5', 'sm:w-5', 'p-0', 'm-0']"
          aria-hidden="true"
        />
        <span>{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ComparisonMode } from "~/types/watch";

const props = defineProps<{
  modelValue: ComparisonMode;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: ComparisonMode): void;
}>();

const iconComponents: Record<ComparisonMode, string> = {
  full: "watch-icon-full",
  "side-by-side": "watch-icon-side-by-size",
  slide: "watch-icon-slide",
};

const options = computed(() => [
  {
    value: "full" as ComparisonMode,
    label: "",
    icon: iconComponents.full,
  },
  {
    value: "side-by-side" as ComparisonMode,
    label: "",
    icon: iconComponents["side-by-side"],
  },
  {
    value: "slide" as ComparisonMode,
    label: "",
    icon: iconComponents.slide,
  },
]);

const select = (value: ComparisonMode) => {
  emit("update:modelValue", value);
};

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: ComparisonMode) => emit("update:modelValue", value),
});
</script>
