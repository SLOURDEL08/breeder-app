<template>
  <div class="min-h-screen  flex flex-col bg-primary">
    <!-- Navigation -->
    <Navbar/>

    <!-- Main Content -->
    <main class="flex-1  overflow-y-auto relative">
      <router-view />
    </main>
          <Navigation />

    <!-- Footer -->
    <footer class="p-4 border-t border-secondary bg-secondary text-center text-primary">
      <p>© {{ currentYear }} Your App Name. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Navbar from './components/Navbar/Navbar.vue'
import Navigation from './components/Navbar/Navigation.vue'


const currentYear = computed(() => new Date().getFullYear())
</script>