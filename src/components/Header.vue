<template>
    <Layout>
        <template #left-content>
      <div class="relative w-full   h-[350px]">
        <video 
          class="w-full h-full object-cover" 
          autoplay 
          loop 
          muted 
          playsinline
        >
          <source src="/homepage.mp4" type="video/mp4">
          Votre navigateur ne supporte pas la lecture de vidéo.
        </video>
      </div>
    </template>

    <template #right-content>
      <GridRightContent/>
      <GridImageHover />
    </template>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '../layouts/Layout.vue'
</script>