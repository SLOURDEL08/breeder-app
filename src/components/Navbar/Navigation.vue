<template>
  <nav class="w-full uppercase z-50 grid grid-cols-12 text-sm font-light items-center justify-start border-t border-secondary sticky bottom-0 bg-primary">
    <router-link
      v-for="(item, index) in navigationItems"
      :key="item.path"
      :to="item.path"
      :class="[
        'hover:opacity-70 border-secondary py-4 px-10 transition-opacity',
        { 'border-l': currentRoute === item.path }
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