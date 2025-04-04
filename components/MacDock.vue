<template>
  <div class="dock-container">
    <ClientOnly>
      <div
        v-if="!isMobile"
        class="dock"
        ref="dockRef"
        @mousemove="handleMouseMove"
      >
        <svg width="0" height="0" class="hidden">
          <defs>
            <linearGradient id="dockGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#eab308" />
              <stop offset="25%" stop-color="#ef4444" />
              <stop offset="50%" stop-color="#3b82f6" />
              <stop offset="75%" stop-color="#06b6d4" />
              <stop offset="100%" stop-color="#8b5cf6" />
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
            <mask id="dockMask">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#revealMask)"
              />
            </mask>
          </defs>
        </svg>
        <div
          v-for="(item, index) in dockItems"
          :key="index"
          class="dock-item"
          :style="{ '--item-index': index }"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <div class="icon-wrapper">
            <div class="icon-base">
              <FontAwesomeIcon :icon="['fab', item.icon]" class="icon" />
            </div>
            <div
              class="icon-gradient"
              :style="{ opacity: hoveredIndex === index ? 1 : 0 }"
            >
              <FontAwesomeIcon :icon="['fab', item.icon]" class="icon" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mobile-dock">
        <div v-for="(item, index) in dockItems" :key="index" class="dock-item">
          <div class="icon-wrapper">
            <FontAwesomeIcon :icon="['fab', item.icon]" class="icon" />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

library.add(fab);

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("md");

const dockRef = ref(null);
const hoveredIndex = ref(null);
const maskPosition = ref({ cx: "50%", cy: "50%" });

const dockItems = [
  { icon: "github" },
  { icon: "twitter" },
  { icon: "linkedin" },
  { icon: "instagram" },
];

const calculateScale = (distance) => {
  return 1 + 0.2 * (1 - distance / 6);
};

const calculateTranslateY = (distance) => {
  return -12 * (1 - distance / 6);
};

const updateMaskPosition = (event, element) => {
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  maskPosition.value = { cx: `${x}%`, cy: `${y}%` };
};

const handleMouseMove = (event) => {
  if (!dockRef.value) return;

  const rect = dockRef.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const itemWidth = 56 + 12;
  const centerOffset = 28;

  const itemIndex = Math.floor((mouseX - centerOffset) / itemWidth);
  const nextItemIndex = itemIndex + 1;

  if (itemIndex < 0 || nextItemIndex >= dockItems.length) return;

  const progress = ((mouseX - centerOffset) % itemWidth) / itemWidth;

  const items = dockRef.value.querySelectorAll(".dock-item");
  items.forEach((item, i) => {
    const distance1 = Math.abs(itemIndex - i);
    const distance2 = Math.abs(nextItemIndex - i);

    const scale1 = calculateScale(distance1);
    const scale2 = calculateScale(distance2);
    const translateY1 = calculateTranslateY(distance1);
    const translateY2 = calculateTranslateY(distance2);

    const scale = scale1 + (scale2 - scale1) * progress;
    const translateY = translateY1 + (translateY2 - translateY1) * progress;

    item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    item.style.opacity = 1 - Math.min(distance1, distance2) * 0.08;

    if (i === itemIndex || i === nextItemIndex) {
      updateMaskPosition(event, item);
    }
  });
};

const handleMouseEnter = (index) => {
  hoveredIndex.value = index;
  const items = dockRef.value.querySelectorAll(".dock-item");
  items.forEach((item, i) => {
    const distance = Math.abs(index - i);
    const scale = calculateScale(distance);
    const translateY = calculateTranslateY(distance);
    item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    item.style.opacity = 1 - distance * 0.08;
  });
};

const handleMouseLeave = () => {
  hoveredIndex.value = null;
  const items = dockRef.value.querySelectorAll(".dock-item");
  items.forEach((item) => {
    item.style.transform = "scale(1) translateY(0)";
    item.style.opacity = 1;
  });
};

onMounted(() => {
  if (!isMobile.value && dockRef.value) {
    const items = dockRef.value.querySelectorAll(".dock-item");
    items.forEach((item) => {
      item.style.transform = "scale(1) translateY(0)";
      item.style.opacity = 1;
    });
  }
});
</script>

<style scoped>
.dock-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.dock {
  display: flex;
  gap: 24px;
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .dock-container {
    position: fixed;
    bottom: 0;
    padding: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  .dock {
    padding: 16px 40px;
    gap: 32px;
    width: auto;
    max-width: none;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }

  .dock-item {
    width: 64px;
    height: 64px;
  }

  .icon {
    width: 32px;
    height: 32px;
  }

  .icon-wrapper {
    border-radius: 20px;
  }
}

.dock:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.dock-item {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom center;
  will-change: transform, opacity;
  margin: 0 2px;
  position: relative;
  animation: subtlePulse 4s ease-in-out infinite;
}

@keyframes subtlePulse {
  0% {
    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.05));
  }
  50% {
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.08));
  }
  100% {
    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.05));
  }
}

.dock-item::before {
  content: "";
  position: absolute;
  inset: -4px;
  background: linear-gradient(
    45deg,
    #eab308,
    #ef4444,
    #3b82f6,
    #06b6d4,
    #8b5cf6
  );
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  animation: subtleGlow 4s ease-in-out infinite;
}

@keyframes subtleGlow {
  0% {
    opacity: 0.05;
  }
  50% {
    opacity: 0.08;
  }
  100% {
    opacity: 0.05;
  }
}

.dock-item:hover::before {
  opacity: 0.5;
  animation: rotateGradient 3s linear infinite;
}

@keyframes rotateGradient {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.icon-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
}

.dock-item:hover .icon-wrapper {
  background: rgba(0, 0, 0, 0.3);
  transform: scale(0.95);
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.15),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.1);
}

.icon-base {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  mask: url(#dockMask);
  -webkit-mask: url(#dockMask);
  transition: all 0.3s ease;
}

.icon {
  width: 28px;
  height: 28px;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
}

.icon-base .icon {
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
}

.icon-gradient .icon {
  color: url(#dockGradient);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
}

.dock-item:hover .icon {
  transform: scale(1.1) rotate(5deg);
}

.dock-item:hover .icon-gradient {
  opacity: 1;
  transform: scale(1.05);
}

.mobile-dock {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 16px;
}

@media (max-width: 768px) {
  .dock-container {
    position: fixed;
    bottom: 0;
    padding: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  .mobile-dock {
    width: 100%;
    padding: 16px;
    gap: 1.5rem;
  }

  .dock-item {
    width: 64px;
    height: 64px;
    margin: 0;
    animation: none;
  }

  .icon-wrapper {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .icon {
    width: 32px;
    height: 32px;
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>
