<template>
  <div class="border-t-2 divide-x-2 max-md:divide-x-0 max-md:flex max-md:justify-between divide-secondary max-md:border-b-2  grid grid-cols-8 border-secondary">
    <!-- Section carte -->
    <div class="col-span-2 max-md:col-span-1 max-md:order-2 max-md:pr-4">
      <svg viewBox="0 0 100 100" class="w-full mt-2 ml-2 max-h-44 max-md:!max-h-32 max-md:!h-44 max-md:mt-1 max-md:ml-1">
        <template v-for="(region, id) in regionsData" :key="id">
          <path
            :id="id.toString()"
            :ref="(el) => { if (el) regionsRefs[id] = el as HTMLElement }"
            :d="region.path"
            stroke="black"
            stroke-width="0.5"
            :fill="activeRegion === id ? 'black' : 'none'"
            class="transition-all duration-300 hover:fill-gray-300 cursor-pointer max-md:pointer-events-none"
            @click="handleRegionClick(id)"
          />
        </template>
      </svg>
    </div>
    
    <!-- Section contenu -->
    <div class="col-span-6 max-md:col-span-1 max-md:order-1 flex flex-col p-4 max-md:p-3" ref="contentRef">
      <span class="text-lg font-medium max-md:text-base">{{ regionsData[activeRegion as keyof typeof regionsData].name }}</span>
      
      <template v-if="getActiveProduct && productType === 'wine'">
        <span class="text-4xl max-md:text-2xl font-light mt-2 max-md:mt-1">{{ getActiveProduct.name }}</span>
        <div class="flex justify-between max-md:flex-col max-md:gap-2 mt-4 max-md:mt-3">
          <span class="flex-1 max-md:text-sm">{{ getActiveProduct.description }}</span>
          <span class="font-medium text-lg max-md:text-base max-md:self-start">{{ getActiveProduct.price }}</span>
        </div>
      </template>
      
      <template v-else-if="getActiveProduct && productType === 'spirit'">
        <span class="text-4xl max-md:text-2xl font-light mt-2 max-md:mt-1">{{ getActiveProduct.name }}</span>
        <div class="flex justify-between max-md:flex-col max-md:gap-2 mt-4 max-md:mt-3">
          <span class="flex-1 max-md:text-sm">{{ getActiveProduct.description }}</span>
          <span class="font-medium text-lg max-md:text-base max-md:self-start">{{ getActiveProduct.price }}</span>
        </div>
      </template>
      
      <template v-else>
        <span class="text-lg max-md:text-base mt-2">Pas de {{ productType }} disponible dans cette région</span>
      </template>

   
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { regionsData } from './regionsData'

interface RegionsRefs {
  [key: string]: HTMLElement
}

const props = defineProps<{
  currentIndex: number
  productType: 'wine' | 'spirit'
}>()

const emit = defineEmits<{
  regionChange: [index: number]
}>()

const regionsRefs = ref<RegionsRefs>({})
const contentRef = ref<HTMLElement | null>(null)

// Filtrer les régions avec des produits
const regionsWithProducts = computed(() => {
  return Object.keys(regionsData).filter(key => {
    const region = regionsData[key]
    return props.productType === 'wine' 
      ? region.products.wines.length > 0 
      : region.products.spirits.length > 0
  })
})

const activeRegion = ref(regionsWithProducts.value[0])



const getActiveProduct = computed(() => {
  const region = regionsData[activeRegion.value]
  if (!region) return null
  
  const products = props.productType === 'wine' ? region.products.wines : region.products.spirits
  return products && products.length > 0 ? products[0] : null
})

// Gestion du clic sur une région (desktop uniquement)
const handleRegionClick = (regionId: string) => {
  if (window.innerWidth >= 768) { // Desktop seulement
    const regionIndex = regionsWithProducts.value.findIndex(id => id === regionId)
    if (regionIndex !== -1) {
      emit('regionChange', regionIndex)
    }
  }
}

watch(() => props.currentIndex, (newIndex) => {
  if (regionsWithProducts.value.length > 0) {
    const newRegion = regionsWithProducts.value[newIndex]
    if (newRegion) {
      activeRegion.value = newRegion
    }
  }
})

// Pour informer le parent des régions disponibles
const availableRegions = computed(() => regionsWithProducts.value)

defineExpose({
  regionsData,
  activeRegion,
  getActiveProduct,
  availableRegions,
  regionsWithProducts
})
</script>

<style scoped>
/* Amélioration des transitions */
path {
  transition: fill 0.3s ease, stroke-width 0.3s ease;
}

path:hover {
  stroke-width: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    gap: 0;
  }
  
  svg {
    max-height: 120px;
  }
}
</style>