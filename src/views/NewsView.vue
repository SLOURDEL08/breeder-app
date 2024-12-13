<template>
  <Layout
    content-before-left-col-span="3"
    content-left-col-span="5"
  content-right-col-span="4"
  class="hide-scrollbar">
    <template #content-left>
      <div class="h-[93vh]  flex flex-col border-secondary overflow-y-auto">
        <div class="flex-1 bg-yellow-300 overflow-y-auto hide-scrollbar grid grid-cols-1 justify-start divide-y divide-yellow-300">
          <div
            v-for="(item, index) in farmerTestimony"
            :key="index"
            class="bg-secondary py-20 text-yellow-300 p-3"
          >
            <h2 class="text-lg uppercase font-light">{{ item.title }}</h2>
            <p class="text-5xl">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </template>

  <template #content-right>
  <div class="h-[93vh] border-secondary overflow-hidden">
    <div class="flex w-max flex-col h-full">
      <div
        v-for="(item, index) in farmerTestimony"
        :key="index"
        class="flex-1 border-r flex items-center justify-start border-b last:border-b-0 border-secondary"
      >
        <img
          :src="item.avatar"
          alt="Avatar"
          class="h-full object-contain max-h-full w-auto rounded-full"
        />
      </div>
    </div>
  </div>
</template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../layouts/Layout.vue'
import PageNavigation from '../components/Navbar/PageNavigation.vue'

// Liste des témoignages
const farmerTestimony = [
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'Album di Famiglia',
    description:
      "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
  },
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'Album di Famiglia',
    description:
      "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
  },
   {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'Album di Famiglia',
    description:
      "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
  },
   {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'Album di Famiglia',
    description:
      "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
  },
   {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'Album di Famiglia',
    description:
      "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
  },
   {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'Album di Famiglia',
    description:
      "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
  },
]
</script>

<style scoped>

</style>
