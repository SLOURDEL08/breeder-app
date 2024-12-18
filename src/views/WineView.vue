<template>
  <Layout
   content-before-left-col-span="0"
    content-left-col-span="8"
  content-right-col-span="4"
  class="">
    <template #content-left>
      <div class="h-[93vh] flex flex-col">
        <div class="flex-1 bg-[#f2d556] flex flex-col justify-between">
          <div class="flex pt-20 flex-col p-4">
            <span class="uppercase font-light text-lg">Wine</span>
            <span class="text-4xl font-light leading-10">Among all human artifacts, <b class="font-light italic">wine</b> is the one most capable of reconciling the ancient contest between <b class="font-light italic">nature</b> and <b class="font-light italic">culture</b>. In our <b class="font-light italic">territories</b> in power, we have chosen to release through the craft of wine, the energies and latent potential of man and the earth</span>
          </div>
          
          <RegionMap :currentIndex="currentIndex"/>
        </div>
      
      </div>
    </template>

    <template #content-right>
      <div class="h-[93vh] relative overflow-hidden">
        <div 
          class="absolute flex transition-transform duration-500 h-full"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div 
            v-for="(wine, index) in winesData" 
            :key="index"
            class="w-full h-full flex-shrink-0"
          >
            <img 
              :src="wine.bottleImage" 
              :alt="wine.name"
              class="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Layout from '../layouts/Layout.vue'
import InfiniteScroll from '../components/InfiniteScroll.vue'
import RegionMap from '../components/InteractiveRegionMap/RegionMap.vue'
import PageNavigation from '../components/Navbar/PageNavigation.vue'
import GridImageHover from '../components/GridImageHover/GridImageHover.vue'
import GridRightContent from '../components/GridContent/GridRightContent.vue'

const currentIndex = ref(0)

// Données des vins avec les images des bouteilles
const winesData = [
  {
    region: 'sicilia',
    name: 'Sicilia Wine',
    bottleImage: '/wine/ancestrale.webp'
  },
  {
    region: 'toscana',
    name: 'Toscana Wine',
    bottleImage: '/wine/ancestrale.webp'
  },
   {
    region: 'marche',
    name: 'Marche',
    bottleImage: '/wine/ancestrale.webp'
  },
    {
    region: 'puglia',
    name: 'Puglia',
    bottleImage: '/wine/ancestrale.webp'
  },
  
]

const handleWheel = (() => {
  let isThrottled = false;
  let scrollAccumulator = 0;
  const scrollThreshold = 100;
  const throttleDelay = 500;

  return (event: WheelEvent) => {
    if (isThrottled) return;
    event.preventDefault();

    // Accumuler le scroll (vertical ou horizontal)
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) 
      ? event.deltaX 
      : event.deltaY;
    
    scrollAccumulator += Math.abs(delta);

    // Ne changer que lorsque l'accumulateur atteint le seuil
    if (scrollAccumulator >= scrollThreshold) {
      isThrottled = true;
      
      // Déterminer la direction en fonction du signe de delta
      if (delta > 0 && currentIndex.value < winesData.length - 1) {
        currentIndex.value += 1;
      } else if (delta < 0 && currentIndex.value > 0) {
        currentIndex.value -= 1;
      }

      // Réinitialiser l'accumulateur
      scrollAccumulator = 0;

      // Attendre avant de permettre le prochain changement
      setTimeout(() => {
        isThrottled = false;
      }, throttleDelay);
    }
  }
})();

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}
</style>