<template>
  <div class=" min-h-screen flex flex-col bg-primary">
    <!-- Navigation -->
    <Navbar/>

    <!-- Main Content -->
    <main class="flex-1 min-h-[93vh] h-full overflow-y-auto relative">
      <router-view />
    </main>
          <Navigation  v-if="$route.meta.showNavigation" />

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