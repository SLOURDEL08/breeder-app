<template>
  <nav
    class="w-full uppercase z-50 grid grid-cols-12 max-md:flex max-md:pl-0 text-sm font-light items-center justify-start  border-t-2 border-secondary sticky bottom-0"
    :class="{
      'bg-primary': currentRoute !== '/',
      'bg-yellowed': currentRoute === '/'
    }"
    :style="{
      transition: 'background-color 0.5s ease-in-out'  // Transition de la couleur de fond
    }"
  >
    <router-link
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      :class="[
        'hover:opacity-70 border-secondary py-4 w-full text-center transition-opacity',
        { 'border-l-2': currentRoute === item.path }
      ]"
    >
      {{ item.name }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)

const navigationItems = [
  { name: 'Wine', path: '/wine' },
  { name: 'Spirits', path: '/spirit' },
  { name: 'Brands', path: '/brands' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' }
] as const
</script>