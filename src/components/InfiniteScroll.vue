<template>
  <div class="relative overflow-hidden w-full py-4">
    <div class="flex animate-scroll">
      <!-- Premier groupe d'éléments -->
      <div class="flex items-center gap-10 whitespace-nowrap">
        <template v-for="(item, index) in items" :key="`first-${index}`">
          <div class="flex-shrink-0">
            <span 
              v-if="item.type === 'text'" 
              class="text-secondary text-4xl font-light tracking-wider"
            >
              {{ item.content }}
            </span>
            <img 
              v-else 
              :src="item.content" 
              :alt="`Scroll item ${index}`"
              class="h-10 w-auto object-contain"
            />
          </div>
        </template>
      </div>

      <!-- Duplication pour un défilement sans couture -->
      <div class="flex items-center gap-10 whitespace-nowrap">
        <template v-for="(item, index) in items" :key="`second-${index}`">
          <div class="flex-shrink-0">
            <span 
              v-if="item.type === 'text'" 
              class="text-secondary text-4xl font-light tracking-wider"
            >
              {{ item.content }}
            </span>
            <img 
              v-else 
              :src="item.content" 
              :alt="`Scroll item ${index}`"
              class="h-10 w-auto object-contain"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { type: 'text', content: 'WHO DO YOU THINK ?' },
  { type: 'image', content: '/svg/sun-card.svg' },
  { type: 'text', content: 'THE WORLD IS A PLAYGROUND' },
  { type: 'image', content: '/svg/circle-moon.svg' },
  { type: 'text', content: 'WHO DO YOU THINK ?' },
  { type: 'image', content: '/svg/sun-card.svg' },
  { type: 'text', content: 'THE WORLD IS A PLAYGROUND' },
  { type: 'image', content: '/svg/circle-moon.svg' },
] as const;
</script>

<style scoped>
.animate-scroll {
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Animation plus fluide */
.animate-scroll {
  will-change: transform;
  backface-visibility: hidden;
}

/* Pause au survol avec transition douce */
.animate-scroll:hover {
  animation-play-state: paused;
  transition: all 0.3s ease;
}
</style>