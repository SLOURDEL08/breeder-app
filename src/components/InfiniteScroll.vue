<template>
  <Transition
    appear
    name="expand"
  >
    <div 
      v-show="isVisible" 
      class="relative overflow-hidden   w-full"
    >
      <div class="animate-container py-4 pt-5">
        <div class="flex animate-scroll ">
          <div class="flex items-center  gap-10 whitespace-nowrap">
            <template v-for="(item, index) in items" :key="`first-${index}`">
              <div class="flex-shrink-0 animate-item" :style="{ animationDelay: `${500 + (index * 100)}ms` }">
                <span 
                  v-if="item.type === 'text'" 
                  :class="[
                    'text-secondary',
                    'text-4xl',
                    'font-light',
                    'tracking-wider',
                    item.font === 'clearface' ? 'font-clearface' : item.font === 'neue' ? 'font-neue' : ''
                  ]"
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
          <div class="flex items-center gap-10 whitespace-nowrap">
            <template v-for="(item, index) in items" :key="`second-${index}`">
              <div class="flex-shrink-0 animate-item" :style="{ animationDelay: `${1200 + (index * 100)}ms` }">
                <span 
                  v-if="item.type === 'text'" 
                  :class="[
                    'text-secondary',
                    'text-4xl',
                    'font-light',
                    'tracking-wider',
                    item.font === 'clearface' ? 'font-clearface' : item.font === 'neue' ? 'font-neue' : ''
                  ]"
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
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 1000);
});

const items = [
  { type: 'text', content: 'WHO DO YOU THINK I AM ?', font: 'clearface' },
  { type: 'image', content: '/svg/sun-card.svg', font: '' },
  { type: 'text', content: 'THE WORLD IS A PLAYGROUND.', font: 'neue' },
  { type: 'image', content: '/svg/circle-moon.svg', font: '' },
  { type: 'text', content: 'WHO DO YOU THINK I AM ?', font: 'clearface' },
  { type: 'image', content: '/svg/sun-card.svg', font: '' },
  { type: 'text', content: 'THE WORLD IS A PLAYGROUND.', font: 'neue' },
  { type: 'image', content: '/svg/circle-moon.svg', font: '' },
] as const;
</script>

<style scoped>
/* Animation d'expansion du conteneur */
.expand-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}

.expand-enter-to {
  max-height: 100px; /* Ajustez selon la hauteur de votre contenu */
  opacity: 1;
  transform: translateY(0);
}

.animate-container {
  animation: slideIn 0.2s ease forwards;
  animation-delay: 0s;
  transform-origin: left;
  width: 100%;
  position: relative;
  transform: scaleX(0);
}

.animate-scroll {
  animation: scroll 30s linear infinite;
  animation-delay: 2s; /* Démarre après les animations d'entrée */
}

.animate-item {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

@keyframes slideIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* Ajustement pour la font Clearface */
.font-clearface {
  line-height: 0;
  vertical-align: middle;
}
</style>