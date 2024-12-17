<template>
  <div :class="`grid ${gridCols} w-full overflow-hidden gap-0 h-full`">
    <div 
      v-for="(image, index) in images" 
      :key="index" 
      :class="{
        'h-[600px] bg-yellowed overflow-hidden': image.isLarge,
        'h-[300px] bg-yellowed overflow-hidden': !image.isLarge,
        'border-r overflow-hidden border-secondary': gridCols === 'grid-cols-2' && index % 2 === 0,
        'border-b overflow-hidden border-secondary': index < images.length - (gridCols === 'grid-cols-2' && images.length % 2 === 0 ? 2 : 1)
      }"
    >
      <TiltImage
        :imageSrc="image.src"
        :imageAlt="image.alt"
        :link="`/products/${image.title.toLowerCase().replace(/\s+/g, '-')}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TiltImage from './ImageHoverAnimation.vue'

interface ImageData {
  src: string
  alt: string
  title: string
  description: string
  isLarge?: boolean
}

interface Props {
  images: ImageData[]
  gridCols?: 'grid-cols-1' | 'grid-cols-2'
}

withDefaults(defineProps<Props>(), {
  gridCols: 'grid-cols-2'
})
</script>