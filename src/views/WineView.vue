<template>
  <Layout class="">
    <template #content-left>
      <div class="h-[93vh] flex flex-col">
        <div class="flex-1 bg-[#f2d556] flex flex-col justify-between">
          <div class="flex pt-20 flex-col p-4">
            <span class="uppercase font-light text-lg">Wine</span>
            <span class="text-4xl font-light leading-10">Among all human artifacts, <b class="font-light italic">wine</b> is the one most capable of reconciling the ancient contest between <b class="font-light italic">nature</b> and <b class="font-light italic">culture</b>. In our <b class="font-light italic">territories</b> in power, we have chosen to release through the craft of wine, the energies and latent potential of man and the earth</span>
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
  <div class="h-[93vh] relative overflow-hidden flex items-center justify-center">
    <div 
      class="absolute flex transition-transform duration-500 h-full w-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(region, index) in regions" 
        :key="index"
        class="w-full h-full flex-shrink-0 flex items-center justify-center"
      >
        <img 
          :src="region.products.wines[0]?.bottleImage"
          :alt="region.name"
          class="max-w-[80%] max-h-[80%] object-contain"
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

const handleWheel = (() => {
  let isThrottled = false
  let scrollAccumulator = 0
  const scrollThreshold = 100
  const throttleDelay = 500

  return (event: WheelEvent) => {
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