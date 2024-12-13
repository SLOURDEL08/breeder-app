<template>
  <div class=" min-h-screen flex flex-col bg-primary">
    <!-- Navigation -->
    <Navbar class="pl-10"/>
    <div class="h-[7vh]"/>

    <!-- Main Content -->
    <main class="flex-1 pl-10 min-h-[93vh] h-full overflow-y-auto relative">
      <router-view />
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