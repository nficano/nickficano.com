<template>
  <div class="h-screen w-screen flex items-center justify-center bg-slate-950/95 relative overflow-hidden">
    <div class="particles-container">
      <div v-for="n in 20" :key="n" class="particle" :class="activeCard" :style="getParticleStyle(n)"></div>
    </div>
    <div class="">
      <client-only>
        <main class="flex gap-4 items-center">
          <pixel-card active-color="#f0fdf4" :gap="8" :speed="70" colors="#f0fdf4, #86efac, #22c55e"
            @mouseenter="activeCard = 'green'" @mouseleave="activeCard = null">
            <template #icon>
              <svgo-github class="w-8 h-8" />
            </template>
            <template #label>Layout</template>
          </pixel-card>

          <pixel-card active-color="#dbeafe" :gap="15" :speed="15" colors="#dbeafe, #60a5fa, #2563eb, #1e40af"
            @mouseenter="activeCard = 'blue'" @mouseleave="activeCard = null">
            <template #icon>
              <svgo-linkedin class="w-8 h-8" />
            </template>
            <template #label>Code</template>
          </pixel-card>

          <pixel-card active-color="#fef9c3" :gap="4" :speed="50" colors="#fef9c3, #fde047, #facc15, #ca8a04"
            @mouseenter="activeCard = 'yellow'" @mouseleave="activeCard = null">
            <template #icon>
              <svgo-email class="w-8 h-8" />
            </template>
            <template #label>Command</template>
          </pixel-card>

          <pixel-card active-color="#fce7f3" :gap="12" :speed="30" colors="#fce7f3, #f9a8d4, #ec4899, #be185d"
            :no-focus="true" @mouseenter="activeCard = 'pink'" @mouseleave="activeCard = null">
            <template #icon>
              <svgo-teachmehipaa class="w-8 h-8" />
            </template>
            <template #label>Dropper</template>
          </pixel-card>
        </main>
      </client-only>
    </div>
  </div>
</template>

<script setup>
const activeCard = ref(null)

function getParticleStyle(n) {
  return {
    '--left': `${Math.random() * 100}%`,
    '--top': `${Math.random() * 100}%`,
    '--delay': `-${Math.random() * 8}s`,
    '--duration': `${6 + Math.random() * 4}s`
  }
}
</script>

<style>
main {
  max-width: 1000px;
  position: relative;
  z-index: 1;
}

.particles-container {
  position: fixed;
  inset: 0;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  left: var(--left);
  top: var(--top);
  animation: float var(--duration) var(--delay) infinite ease-in-out;
  filter: blur(1px);
  mix-blend-mode: screen;
  background: rgb(148, 163, 184);
  transition: background-color 0.5s ease;
}

.particle.green {
  background: rgb(74, 222, 128);
}

.particle.blue {
  background: rgb(96, 165, 250);
}

.particle.yellow {
  background: rgb(250, 204, 21);
}

.particle.pink {
  background: rgb(249, 168, 212);
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }

  25% {
    transform: translate(100px, -100px) scale(1.5);
    opacity: 0.8;
  }

  50% {
    transform: translate(200px, 0) scale(1.2);
    opacity: 0.5;
  }

  75% {
    transform: translate(100px, 100px) scale(1.5);
    opacity: 0.8;
  }
}

.particle:nth-child(even) {
  animation-direction: reverse;
}
</style>
