<template>
  <!-- Curseur personnalisé global -->
  <div 
    v-show="cursorVisible"
    class="custom-cursor"
    :style="{
      transform: `translate3d(${cursorX}px, ${cursorY}px, 0) rotate(${cursorRotate}deg)`
    }"
  >
    <img 
      src="/svg/finger.svg"
      alt="Custom cursor"
      class="w-24 h-24"
      draggable="false"
    />
  </div>

  <!-- Conteneur principal -->
  <div 
    ref="cardRef"
    class="relative w-full h-full transform-gpu cursor-none group"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="{ transform: `translate(${translateX}px, ${translateY}px)` }"
  >
    <!-- Image principale -->
    <a 
      :href="link"
      class="absolute inset-0 bg-primary overflow-hidden cursor-none"
      :style="{ transform: `perspective(1000px) rotateY(${rotationDegree}deg)` }"
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out cursor-none"
      />
    </a>

    <!-- Image avec effet -->
    <a 
      :href="link"
      class="absolute inset-0 bg-accent overflow-hidden cursor-none"
      :style="{ 
        transform: `perspective(1000px) rotateY(${rotationDegree}deg)`,
        opacity: hoverOpacity
      }"
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="absolute inset-0 w-full h-full object-cover mix-blend-color-dodge transition-transform duration-300 ease-out cursor-none"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  imageSrc: string
  imageAlt: string
  link: string
}>()

const MAX_INCLINE = 15
const MAX_TRANSLATE = 10
const FIXED_ROTATION = -MAX_INCLINE // Rotation fixe correspondant au côté gauche

const cardRef = ref<HTMLElement | null>(null)
const rotationDegree = ref(0)
const translateX = ref(0)
const translateY = ref(0)
const hoverOpacity = ref(0)
const cursorX = ref(-100)
const cursorY = ref(-100)
const cursorRotate = ref(0)
const cursorVisible = ref(false)

const handleGlobalMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX - 48 // Ajusté pour w-24
  cursorY.value = e.clientY - 48 // Ajusté pour h-24
}

onMounted(() => {
  window.addEventListener('mousemove', handleGlobalMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleGlobalMouseMove)
})

const handleMouseMove = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  
  // On garde la rotation fixe au lieu de la calculer
  rotationDegree.value = FIXED_ROTATION

  // On continue de calculer la translation pour l'effet de profondeur
  const xRel = event.clientX - rect.left
  const mouseXPercent = xRel / rect.width
  const yRel = event.clientY - rect.top
  const mouseYPercent = yRel / rect.height
  
  translateX.value = (mouseXPercent - 0.5) * MAX_TRANSLATE
  translateY.value = (mouseYPercent - 0.5) * MAX_TRANSLATE

  cursorRotate.value = -15
  hoverOpacity.value = 1
}

const handleMouseEnter = () => {
  cursorVisible.value = true
  rotationDegree.value = FIXED_ROTATION
}

const handleMouseLeave = () => {
  rotationDegree.value = 0
  translateX.value = 0
  translateY.value = 0
  hoverOpacity.value = 0
  cursorRotate.value = 0
  cursorVisible.value = false
}
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  transition: transform 0.05s linear;
}

:deep(*) {
  cursor: none !important;
}

/* Amélioration de la performance avec hardware acceleration */
.custom-cursor, .custom-cursor * {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

a {
  transform-origin: center;
  backface-visibility: hidden;
  will-change: transform;
  transition: all 0.3s ease-out;
}

img {
  transform-origin: center;
  backface-visibility: hidden;
  will-change: transform;
  user-select: none;
}
</style>