<template>
  <Layout class="">
    <template #content-left>
      <div class="h-[93vh] flex flex-col">
        <div class="flex-1 bg-[#f2d556] flex flex-col justify-between">
          <div class="flex pt-20 flex-col p-4">
            <span class="uppercase font-light text-lg">Wine</span>
            <span class="text-4xl leading-10">Among all human artifacts, <b class="font-light italic">wine</b> is the one most capable of reconciling the ancient contest between <b class="font-light italic">nature</b> and <b class="font-light italic">culture</b>. In our <b class="font-light italic">territories</b> in power, we have chosen to release through the craft of wine, the energies and latent potential of man and the earth</span>
          </div>
          
          <RegionMap :currentIndex="currentIndex"/>
        </div>
        <PageNavigation/>
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
 
  
]

const handleWheel = (event: WheelEvent) => {
  // On détecte seulement le scroll horizontal ou le scroll vertical qu'on convertit en horizontal
  if (event.deltaX !== 0 || event.deltaY !== 0) {
    if (event.deltaX > 0 || event.deltaY > 0) {
      // Scroll vers la droite
      currentIndex.value = Math.min(currentIndex.value + 1, winesData.length - 1)
    } else {
      // Scroll vers la gauche
      currentIndex.value = Math.max(currentIndex.value - 1, 0)
    }
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel)
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