<template>
  <div class=" min-h-screen flex flex-col bg-primary">
    <!-- Navigation -->
    <Navbar class="pl-10"/>
    <div class="h-[7vh]"/>

    <!-- Main Content -->
    <main class="flex-1 pl-10 min-h-[93vh] h-full overflow-y-auto relative">
 <transition
  name="main-transition"
  mode="out-in"
  v-if="$route.meta.animate">
  <router-view />
</transition>
<router-view v-else />
</main>

          <Navigation class="pl-10"  v-if="$route.meta.showNavigation" />

    <!-- Footer -->
    <Footer v-if="$route.meta.showFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Navbar from './components/Navbar/Navbar.vue'
import Footer from './components/Footer.vue'
import Navigation from './components/Navbar/Navigation.vue'


const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.main-transition-enter-active, .main-transition-leave-active {
  transition: all 0.5s ease;
}
.main-transition-enter-from {
  opacity: 1;
  transform: translateX(100px);
}
.main-transition-leave-to {
  opacity: 1;
  transform: translateX(-0px);
}

.content-fade-enter-active,
.content-fade-leave-active {
  transition: opacity 0.5s ease;
}

.content-fade-enter-from,
.content-fade-leave-to {
  opacity: 0;
}
</style>
