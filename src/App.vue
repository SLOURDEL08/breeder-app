<template>
  <div class="min-h-screen  flex flex-col bg-primary">
    <!-- Navigation -->
    <Navbar/>

    <!-- Main Content -->
    <main class="flex-1 lg:px-10">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="p-4 border-t border-primary text-center text-primary">
      <p>© {{ currentYear }} Your App Name. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>