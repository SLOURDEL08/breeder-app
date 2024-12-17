<template>
  <div class="min-h-screen flex flex-col bg-primary">
    <!-- Navigation -->
    <Navbar class="pl-10"/>
    <div class="h-[7vh]"/>
    
    <!-- Main Content -->
    <main class="flex-1 pl-10 min-h-[93vh] h-full overflow-y-auto relative">
      <transition
        :name="transitionName"
        mode="out-in"
        v-if="route.meta.animate">
        <router-view />
      </transition>
      <router-view v-else />
    </main>
    
    <!-- Navigation -->
    <Navigation class="pl-10" v-if="route.meta.showNavigation" />
    
    <!-- Footer -->
    <Footer v-if="route.meta.showFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import Navbar from './components/Navbar/Navbar.vue'
import Footer from './components/Footer.vue'
import Navigation from './components/Navbar/Navigation.vue'

const currentYear = computed(() => new Date().getFullYear())
const route = useRoute()
const router = useRouter()

// Garder une trace de la route précédente
const previousRoute = ref<RouteLocationNormalized | null>(null)

// Mettre à jour la route précédente lors des changements de route
router.beforeEach((to, from) => {
  previousRoute.value = from
})

const transitionName = computed(() => {
  if (!previousRoute.value) return 'main-transition-right'
  
  const fromIndex = previousRoute.value.meta?.index as number || 0
  const toIndex = route.meta?.index as number || 0
  
  // Si on remonte dans la hiérarchie (ex: de News vers About)
  if (fromIndex > toIndex) {
    return 'main-transition-left'
  }
  // Si on descend dans la hiérarchie (ex: de About vers News)
  return 'main-transition-right'
})
</script>

<style scoped>
/* Animation de transition vers la gauche */
.main-transition-left-enter-active,
.main-transition-left-leave-active {
  transition: all 0.5s ease;
}

.main-transition-left-enter-from {
  opacity: 1;
  transform: translateX(100px);
}

.main-transition-left-leave-to {
  opacity: 1;
  transform: translateX(-100px);
}

/* Animation de transition vers la droite */
.main-transition-right-enter-active,
.main-transition-right-leave-active {
  transition: all 0.5s ease;
}

.main-transition-right-enter-from {
  opacity: 1;
  transform: translateX(-100px);
}

.main-transition-right-leave-to {
  opacity: 1;
  transform: translateX(100px);
}

/* Animation de fade */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 0.5s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}
</style>