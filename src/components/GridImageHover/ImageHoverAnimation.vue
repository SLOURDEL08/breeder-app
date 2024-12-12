<template>
  <div class="relative overflow-hidden group h-full">
    <img 
      :src="imageSrc" 
      :alt="imageAlt"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    
    <div class="absolute inset-0 bg-secondary bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500">
      <div class="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 class="text-primary text-2xl font-light">{{ title }}</h3>
        <p class="text-primary mt-2">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageSrc: string
  imageAlt: string
  title: string
  description: string
}>()
</script>