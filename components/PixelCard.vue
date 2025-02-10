<template>
  <div class="card" :style="{ '--active-color': activeColor }">
    <pixel-canvas :data-gap="gap" :data-speed="speed" :data-colors="colors" :data-no-focus="noFocus"></pixel-canvas>
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <button>
      <slot name="label"></slot>
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeColor: {
    type: String,
    default: '#ffffff'
  },
  gap: {
    type: [String, Number],
    default: 5
  },
  speed: {
    type: [String, Number],
    default: 25
  },
  colors: {
    type: String,
    default: '#f8fafc, #f1f5f9, #cbd5e1'
  },
  noFocus: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-areas: "card";
  place-items: center;
  aspect-ratio: 1/1;
  isolation: isolate;
  transition: border-color 200ms var(--ease-out);
  user-select: none;
  border-radius: 50%;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;

  pointer-events: none;

  transition: opacity 900ms var(--ease-out);
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  aspect-ratio: 1;

  opacity: 0;
  transition: opacity 800ms var(--ease-out);
}

.card>* {
  grid-area: card;
}

.card svg {
  position: relative;
  z-index: 1;
  width: 30%;
  height: auto;
  color: var(--surface-3);
  transition: 300ms var(--ease-out);
  transition-property: color, scale;
}

.card button {
  opacity: 0;
}

.card:focus-within {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}

.card:where(:hover, :focus-within) {
  border-color: var(--active-color, var(--fg));
  transition: border-color 800ms var(--ease-in-out);
}

.card:where(:hover, :focus-within) svg {
  color: var(--active-color, var(--fg));
  scale: 1.1;
  transition: 300ms var(--ease-in-out);
}

.card:where(:hover, :focus-within)::before {
  opacity: 0;
}

.card:where(:hover, :focus-within)::after {
  opacity: 1;
}

.icon {
  position: relative;
  z-index: 1;
  width: 30%;
  height: auto;
  color: var(--surface-3);
  transition: 300ms var(--ease-out);
  transition-property: color, scale;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.card:where(:hover, :focus-within) .icon {
  color: var(--active-color, var(--fg));
  scale: 1.1;
  transition: 300ms var(--ease-in-out);
}
</style>
