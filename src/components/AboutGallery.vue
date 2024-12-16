<template>
  <div 
    class="absolute inset-0 overflow-hidden"
    :class="{
      'right-side': position === 'right',
      'left-side': position === 'beforeleft'
    }"
  >
    <TransitionGroup 
      name="fade" 
      tag="div"
      class="w-full h-full relative"
    >
      <div 
        v-for="(image, index) in currentGalleryImages" 
        :key="`${position}-${activeIndex}-${index}`"
        class="absolute"
        :style="getRandomStyle(index)"
      >
        <img 
          :src="image" 
          :alt="`Gallery image ${index + 1}`"
          class="object-cover shadow-lg"
          :class="getRandomSize()"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  position: 'beforeleft' | 'right'
  activeIndex: number
  testimonies: {
    gallery: {
      beforeleft: string[]
      right: string[]
    }
  }[]
}>()

const currentGalleryImages = computed(() => {
  return props.testimonies[props.activeIndex].gallery[props.position]
})

const getPositionLimits = () => {
  if (props.position === 'right') {
    return {
      minLeft: 15, // Réduit pour utiliser plus d'espace
      maxLeft: 70, // Augmenté pour utiliser plus d'espace horizontal
      minTop: 5,   // Commence plus haut
      maxTop: 80   // Descend plus bas
    }
  }
  return {
    minLeft: 10,
    maxLeft: 60,
    minTop: 10,
    maxTop: 80
  }
}

const getRandomStyle = (index: number) => {
  const limits = getPositionLimits()
  const columnCount = Math.ceil(Math.sqrt(currentGalleryImages.value.length))
  const rowIndex = Math.floor(index / columnCount)
  const colIndex = index % columnCount

  // Distribution plus espacée
  const baseLeft = limits.minLeft + (colIndex * ((limits.maxLeft - limits.minLeft) / (columnCount - 0.5)))
  const baseTop = limits.minTop + (rowIndex * ((limits.maxTop - limits.minTop) / (columnCount - 0.5)))

  return {
    opacity: 1,
    transform: `rotate(${Math.random() * 12 - 6}deg)`, // Rotation plus subtile
    left: `${baseLeft + (Math.random() * 15 - 7.5)}%`, // Variation réduite pour éviter trop de chevauchement
    top: `${baseTop + (Math.random() * 15 - 7.5)}%`,
    zIndex: index, // Z-index basé sur l'index pour un ordre cohérent
    transition: 'all 0.5s ease'
  }
}

const getRandomSize = () => {
  const sizes = props.position === 'right' ? [
    'w-72 h-56', // Plus grandes tailles pour le côté droit
    'w-80 h-64',
    'w-96 h-72'
  ] : [
    'w-64 h-48', // Tailles pour le côté gauche
    'w-72 h-56',
    'w-80 h-64'
  ]
  return sizes[Math.floor(Math.random() * sizes.length)]
}
</script>

<style scoped>
.right-side {
  left: 0; 
  right: 0;
  padding-left: 80px; 
}

.left-side {
  left: 0;
  right: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.2) translateY(-20px);
}

img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>