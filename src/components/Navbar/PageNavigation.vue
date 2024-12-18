<template>
  <nav class="w-full uppercase flex gap-14 text-xs font-light items-center justify-start pl-20 py-4 border-t-2 border-secondary">
    <router-link 
      v-for="item in navigationItems" 
      :key="item.path"
      :to="item.path"
      class="hover:opacity-70 transition-opacity"
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
  { name: 'About', path: '/about' }
] as const
</script>