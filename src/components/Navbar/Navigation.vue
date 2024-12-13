<template>
<nav class="w-full uppercase grid grid-cols-12 text-xs font-light items-center justify-start border-t border-secondary sticky bottom-0 bg-primary">
    <router-link 
      v-for="item in navigationItems" 
      :key="item.path"
      :to="item.path"
      class="hover:opacity-70 first:border-l border-secondary py-4 px-10 transition-opacity"
    >
      {{ item.name }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
const navigationItems = [
  { name: 'Wine', path: '/wine' },
  { name: 'Spirits', path: '/spirit' },
  { name: 'Brands', path: '/brands' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' }
] as const
</script>