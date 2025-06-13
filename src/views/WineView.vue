<template>
  <Layout class="">
    <template #content-left>
      <div class="h-[93vh] max-md:h-full flex flex-col">
        <div class="flex-1 bg-[#f2d556] flex flex-col justify-between">
          <div class="flex pt-20 max-md:pb-10 flex-col p-4">
            <span class="uppercase font-light text-lg">Wine</span>
            <span class="text-4xl font-light leading-10 max-md:text-2xl max-md:leading-8">
              Among all human artifacts, <b class="font-light italic">wine</b> is the one most capable of reconciling the ancient contest between <b class="font-light italic">nature</b> and <b class="font-light italic">culture</b>. In our <b class="font-light italic">territories</b> in power, we have chosen to release through the craft of wine, the energies and latent potential of man and the earth
            </span>
          </div>
          <RegionMap 
            :currentIndex="currentIndex"
            productType="wine"
            ref="regionMapRef"
          />
        </div>
      </div>
    </template>
    
    <template #content-right>
      <div class="h-[93vh] max-md:h-96 relative overflow-hidden flex items-center justify-center">
        <!-- Navigation mobile -->
        <div class="md:hidden absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <button 
            @click="previousRegion"
            :disabled="currentIndex === 0"
            class=" backdrop-blur-sm rounded-full p-3 disabled:cursor-not-allowed transition-all duration-200 "
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
      
          
          <button 
            @click="nextRegion"
            :disabled="currentIndex === regions.length - 1"
            class=" backdrop-blur-sm rounded-full p-3 disabled:cursor-not-allowed transition-all duration-200 "
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

     

        <!-- Conteneur des bouteilles -->
        <div 
          class="absolute flex transition-transform duration-500 h-full w-full"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for="(region, index) in regions"
            :key="index"
            class="w-full h-full flex-shrink-0 flex items-center justify-center relative"
          >
            <!-- Image de la bouteille -->
            <img 
              :src="region.products.wines[0]?.bottleImage"
              :alt="region.name"
              class="max-w-[80%] max-h-[80%] object-contain max-md:max-w-[60%] max-md:max-h-[60%]"
            />
            
           
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Layout from '../layouts/Layout.vue'
import RegionMap from '../components/InteractiveRegionMap/RegionMap.vue'
import type { Region } from '../components/InteractiveRegionMap/regionsData'

const currentIndex = ref(0)
const regionMapRef = ref<InstanceType<typeof RegionMap> | null>(null)

const regions = computed(() => {
  if (!regionMapRef.value?.regionsData) return []
  return Object.values(regionMapRef.value.regionsData as Record<string, Region>)
})

// Fonctions de navigation mobile
const nextRegion = () => {
  if (currentIndex.value < regions.value.length - 1) {
    currentIndex.value += 1
  }
}

const previousRegion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
  }
}

// Gestion du scroll pour desktop
const handleWheel = (() => {
  let isThrottled = false
  let scrollAccumulator = 0
  const scrollThreshold = 100
  const throttleDelay = 500

  return (event: WheelEvent) => {
    // Désactiver le scroll wheel sur mobile
    if (window.innerWidth < 768) return
    
    if (isThrottled) return
    event.preventDefault()

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY
    
    scrollAccumulator += Math.abs(delta)

    if (scrollAccumulator >= scrollThreshold) {
      isThrottled = true
      
      if (delta > 0 && currentIndex.value < regions.value.length - 1) {
        currentIndex.value += 1
      } else if (delta < 0 && currentIndex.value > 0) {
        currentIndex.value -= 1
      }

      scrollAccumulator = 0

      setTimeout(() => {
        isThrottled = false
      }, throttleDelay)
    }
  }
})()

// Gestion du swipe pour mobile
let startX = 0
let endX = 0

const handleTouchStart = (event: Event) => {
  const touchEvent = event as TouchEvent
  startX = touchEvent.touches[0].clientX
}

const handleTouchEnd = (event: Event) => {
  const touchEvent = event as TouchEvent
  endX = touchEvent.changedTouches[0].clientX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeDistance = startX - endX
  const minSwipeDistance = 50

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe vers la gauche - aller à la région suivante
      nextRegion()
    } else {
      // Swipe vers la droite - aller à la région précédente
      previousRegion()
    }
  }
}

// Gestion des événements clavier
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') {
    nextRegion()
  } else if (event.key === 'ArrowLeft') {
    previousRegion()
  }
}

onMounted(() => {
  // Événements desktop
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKeyDown)
  
  // Événements mobile
  const rightPanel = document.querySelector('[data-right-panel]') || document.body
  rightPanel.addEventListener('touchstart', handleTouchStart, { passive: true })
  rightPanel.addEventListener('touchend', handleTouchEnd, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeyDown)
  
  const rightPanel = document.querySelector('[data-right-panel]') || document.body
  rightPanel.removeEventListener('touchstart', handleTouchStart)
  rightPanel.removeEventListener('touchend', handleTouchEnd)
})
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}

/* Amélioration des transitions */
.transition-transform {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Styles pour les boutons de navigation */
button:disabled {
  pointer-events: none;
}

/* Animation des indicateurs */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>