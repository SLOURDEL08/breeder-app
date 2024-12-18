<template>
  <Layout
    content-left-col-span="8"
  content-right-col-span="4"
  content-before-left-col-span="0"
  class="border-l-2 border-secondary"
  >
    <template #header-left>
      <div class="relative border-b-2 border-secondary  w-full h-[500px]">
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
      <div class="border-b-2 border-secondary h-full"> 
        <GridRightContent/>
      </div>
    
    </template>

    <template #separator>
      <InfiniteScroll class="border-b-2 border-secondary" />
    </template>

    <template #content-left>
      <div>
        <GridImageHover 
          :images="leftImages" 
          grid-cols="grid-cols-2"
        />
      </div>
    </template>

    <template #content-right>
      <div>
          <GridImageHover 
        :images="rightImages" 
        grid-cols="grid-cols-1"
      />
      </div>
    
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
    src: 'https://cdn.sanity.io/images/tduq6a61/production/6827d7123fa0a3fa67395ec3ba5cc0be7900992c-1281x1920.jpg?rect=28,197,1253,1422&w=1000&fit=max&auto=format',
    alt: 'Moon Image',
    title: 'The Moon',
    description: 'A beautiful night sky'
  },
  {
    src: 'https://cdn.sanity.io/images/tduq6a61/production/70fe0090b7e20a5965177d73fa13d7025877113a-912x904.png?w=1000&fit=max&auto=format',
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
    src: 'https://cdn.sanity.io/images/tduq6a61/production/736bfa0f4da291f21e665256252a364b64e94403-1281x1920.jpg?rect=0,409,1281,1309&w=1000&fit=max&auto=format',
    alt: 'Galaxy Image',
    title: 'The Galaxy',
    description: 'Infinite possibilities'
    },
  {
    src: 'https://cdn.sanity.io/images/tduq6a61/production/96df5f805db9102e67c90e7dc413619e4c817a2c-112x112.svg?w=1000&fit=max&auto=format',
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
    src: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/cometbitter_d3a42b08-1a77-482e-95fe-2400d57c6868_1200x_crop_center.png?v=1647275562',
    alt: 'Large Image',
    title: 'Featured Image',
    description: 'Main attraction',
    isLarge: true
  },
  {
    src: 'https://cdn.sanity.io/images/tduq6a61/production/020b85c662153c4b648c7f8dbed07e0147933ddc-4272x2477.jpg?w=1000&fit=max&auto=format',
    alt: 'Small Image 1',
    title: 'Small 1',
    description: 'Additional content'
    },

]
</script>