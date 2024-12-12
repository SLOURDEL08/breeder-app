<template>
  <Layout>
    <template #header-left>
      <div class="relative w-full h-[350px]">
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

    <template #header-right>
      <GridRightContent/>
    </template>

    <template #separator>
      <InfiniteScroll class="border-y border-secondary" />
    </template>

    <template #content-left>
      <div class="border-r border-secondary">
        <GridImageHover 
          :images="leftImages" 
          grid-cols="grid-cols-2"
        />
      </div>
    </template>

    <template #content-right>
      <GridImageHover 
        :images="rightImages" 
        grid-cols="grid-cols-1"
      />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../layouts/Layout.vue'
import InfiniteScroll from '../components/InfiniteScroll.vue'
import GridImageHover from '../components/GridImageHover/GridImageHover.vue'
import GridRightContent from '../components/GridContent/GridRightContent.vue'

const leftImages = [
  {
    src: '/public/svg/circle-moon.svg',
    alt: 'Moon Image',
    title: 'The Moon',
    description: 'A beautiful night sky'
  },
  {
    src: '/public/svg/sun-card.svg',
    alt: 'Sun Image',
    title: 'The Sun',
    description: 'A bright day ahead'
  },
  {
    src: '/public/svg/circle-moon.svg',
    alt: 'Stars Image',
    title: 'The Stars',
    description: 'Lost in space'
  },
  {
    src: '/public/svg/sun-card.svg',
    alt: 'Galaxy Image',
    title: 'The Galaxy',
    description: 'Infinite possibilities'
    },
  {
    src: '/public/svg/circle-moon.svg',
    alt: 'Stars Image',
    title: 'The Stars',
    description: 'Lost in space'
  },
  {
    src: '/public/svg/sun-card.svg',
    alt: 'Galaxy Image',
    title: 'The Galaxy',
    description: 'Infinite possibilities'
  },
]

const rightImages = [
  {
    src: '/public/svg/circle-moon.svg',
    alt: 'Large Image',
    title: 'Featured Image',
    description: 'Main attraction',
    isLarge: true
  },
  {
    src: '/public/svg/sun-card.svg',
    alt: 'Small Image 1',
    title: 'Small 1',
    description: 'Additional content'
    },

]
</script>