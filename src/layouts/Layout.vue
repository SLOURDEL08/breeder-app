<template>
<div class="border-secondary bg-primary">
  <!-- Header reste identique -->
  <div class="grid divide-x divide-secondary grid-cols-12 items-center">
    <div class="col-span-8 h-full">
      <slot name="header-left" />
    </div>
    <div class="col-span-4 h-full">
      <slot name="header-right" />
    </div>
  </div>

  <div>
    <slot name="separator" />
  </div>

  <!-- Modification du transition-group -->
  <transition-group
    :name="transitionName"
    class="grid divide-x divide-secondary grid-cols-12"
    tag="div"
    mode="out-in"
  >
    <!-- Ajout d'une div toujours présente pour beforeLeft -->
    <div
      :key="'beforeLeft'"
      :class="[
        getColSpanClass(currentLayout.beforeLeft),
        'transition-all duration-500 ease-in-out transform'
      ]"
      :style="{
        width: currentLayout.beforeLeft > 0 ? 'auto' : '0',
        opacity: currentLayout.beforeLeft > 0 ? '1' : '0',
      }"
    >
      <slot name="content-beforeleft" />
    </div>

    <div
      :key="'left'"
      :class="[
        getColSpanClass(currentLayout.left),
        'border-l h-full transition-all duration-500 ease-in-out',
        borderClass
      ]"
    >
      <slot name="content-left" />
    </div>

    <div
      :key="'right'"
      :class="[
        getColSpanClass(currentLayout.right),
        'border-secondary h-full transition-all duration-500 ease-in-out'
      ]"
    >
      <slot name="content-right" />
    </div>
  </transition-group>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

// Définir l'interface pour la configuration du layout
interface LayoutConfig {
  beforeLeft: number
  left: number
  right: number
}

// Définir le type pour l'objet layouts avec un index signature
type Layouts = {
  [key: string]: LayoutConfig
}

const route = useRoute()
const router = useRouter()
const previousRoute = ref<RouteLocationNormalized | null>(null)

// Mettre à jour la route précédente lors des changements de route
router.beforeEach((to, from) => {
  previousRoute.value = from
})

const layouts: Layouts = {
  default: {
    beforeLeft: 0,
    left: 8,
    right: 4
  },
  '/wine': {
    beforeLeft: 0,
    left: 8,
    right: 4
  },
  '/spirit': {
    beforeLeft: 1,
    left: 7,
    right: 4
  },
  '/brands': {
    beforeLeft: 2,
    left: 6,
    right: 4
  },
  '/about': {
    beforeLeft: 3,
    left: 5,
    right: 4
  },
  '/news': {
    beforeLeft: 4,
    left: 4,
    right: 4
  }
}

const getColSpanClass = (span: number) => {
  const colSpanClasses: { [key: number]: string } = {
    0: 'hidden',
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12'
  }
  return colSpanClasses[span] || 'col-span-0'
}

const currentLayout = computed(() => {
  return layouts[route.path] || layouts.default
})

const borderClass = computed(() => {
  return route.path === '/' ? 'border-transparent' : 'border-secondary'
})

const transitionName = computed(() => {
  if (!previousRoute.value) return 'layout-right'
  
  const fromIndex = previousRoute.value.meta?.index as number || 0
  const toIndex = route.meta?.index as number || 0
  
  return fromIndex > toIndex ? 'layout-left' : 'layout-right'
})

const isHomePage = computed(() => route.path === '/')
const showNavigationOverlay = computed(() => !isHomePage.value && route.meta.showNavigation)
</script>

<style scoped>
/* Animation vers la gauche */
.layout-left-enter-active,
.layout-left-leave-active {
  transition: all 0.5s ease;
}

.layout-left-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.layout-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Animation vers la droite */
.layout-right-enter-active,
.layout-right-leave-active {
  transition: all 0.5s ease;
}

.layout-right-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.layout-right-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* Animation pour les éléments qui se déplacent */
.layout-left-move,
.layout-right-move {
  transition: all 0.5s ease;
}
</style>