<template>
  <div class="border-t-2 divide-x-2 divide-secondary max-md:border-b-2 border-secondary grid grid-cols-8 border-secondary">
    <div class="col-span-2">
      <svg viewBox="0 0 100 100" class="w-full mt-2 ml-2 max-h-44">
        <template v-for="(region, id) in regionsData" :key="id">
          <path
            :id="id.toString()"
            :ref="(el) => { if (el) regionsRefs[id] = el as HTMLElement }"
            :d="region.path"
            stroke="black"
            stroke-width="0.5"
            :fill="activeRegion === id ? 'black' : 'none'"
          />
        </template>
      </svg>
    </div>
    <div class="col-span-6 flex flex-col p-4" ref="contentRef">
      <span>{{ regionsData[activeRegion as keyof typeof regionsData].name }}</span>
      <template v-if="getActiveProduct && productType === 'wine'">
        <span class="text-4xl">{{ getActiveProduct.name }}</span>
        <div class="flex justify-between">
          <span>{{ getActiveProduct.description }}</span>
          <span>{{ getActiveProduct.price }}</span>
        </div>
      </template>
      <template v-else-if="getActiveProduct && productType === 'spirit'">
        <span class="text-4xl">{{ getActiveProduct.name }}</span>
        <div class="flex justify-between">
          <span>{{ getActiveProduct.description }}</span>
          <span>{{ getActiveProduct.price }}</span>
        </div>
      </template>
      <template v-else>
        <span class="text-lg">Pas de {{ productType }} disponible dans cette région</span>
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

watch(() => props.currentIndex, (newIndex) => {
  if (regionsWithProducts.value.length > 0) {
    const newRegion = regionsWithProducts.value[newIndex]
    activeRegion.value = newRegion || regionsWithProducts.value[0]
  }
})

// Pour informer le parent des régions disponibles
const availableRegions = computed(() => regionsWithProducts.value)

defineExpose({
  regionsData,
  activeRegion,
  getActiveProduct,
  availableRegions
})
</script>