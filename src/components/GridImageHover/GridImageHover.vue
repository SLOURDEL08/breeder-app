<template>
  <div :class="`grid ${gridCols} w-full gap-0 h-full`">
    <div 
      v-for="(image, index) in images" 
      :key="index" 
   :class="{
  'h-[600px]': image.isLarge,
  'h-[300px]': !image.isLarge,
  'border-r border-secondary': gridCols === 'grid-cols-2' && index % 2 === 0,
  'border-b border-secondary': index < images.length - (gridCols === 'grid-cols-2' && images.length % 2 === 0 ? 2 : 1)
}"

    >
      <ImageHoverAnimation
        :imageSrc="image.src"
        :imageAlt="image.alt"
        :title="image.title"
        :description="image.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageHoverAnimation from './ImageHoverAnimation.vue'

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