<template>
  <Layout
    content-before-left-col-span="3"
    content-left-col-span="5"
    content-right-col-span="4"
    class="hide-scrollbar top-0"

  >

    <template #content-beforeleft>
      <div class="h-[93vh] border-l border-secondary hide-scrollbar relative">
        <AboutGallery 
          position="beforeleft"
          :active-index="activeIndex"
          :testimonies="farmerTestimony"
        />
      </div>
    </template>
    <template #content-left>
      <div class="h-[93vh] flex flex-col border-secondary overflow-y-auto" ref="testimoniesContainer">
        <div class="flex-1 overflow-y-auto hide-scrollbar grid grid-cols-1 justify-start divide-y divide-yellowed">
          <div
            v-for="(item, index) in farmerTestimony"
            :key="index"
            :id="`testimony-${index}`"
            :class="[
  'py-20 p-3',
  index === 0 ? 'text-secondary' : 'text-yellowed',
  index === 0 ? 'bg-yellowed' : 'bg-secondary'
]"
          >
            <h2 class="text-lg uppercase font-light">{{ item.title }}</h2>
            <p class="text-5xl">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </template>

<template #content-right>
      <div class="h-[93vh] w-full flex border-secondary overflow-hidden relative">
        <!-- Titre rotaté -->
        <div class="absolute z-10 font-bold rotate-90 top-20 left-40 order-2 text-secondary">
          {{ farmerTestimony[activeIndex].title }}
        </div>

        <!-- Liste des avatars -->
        <div class="flex w-max z-10 flex-col h-full">
          <div
            v-for="(item, index) in farmerTestimony"
            :key="index"
            class="flex-1 border-r border-b last:border-b-0 border-secondary relative"
          >
            <div 
              @click="selectTestimony(index)"
              class="flex bg-primary justify-center items-center h-full cursor-pointer transition-colors duration-300"
              :class="{ 'bg-secondary': activeIndex === index }"
            >
              <img
                :src="item.avatar"
                alt="Avatar"
                class=" object-contain  rounded-full  max-h-full w-28 h-28 flex justify-center"
              />
            </div>
          </div>
        </div>

        <div class="overflow-hidden w-f absolute inset-0 w-full h-full">
  <AboutGallery 
    position="right"
    :active-index="activeIndex"
    :testimonies="farmerTestimony"
  />
</div>
        
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Layout from '../layouts/Layout.vue'
import AboutGallery from '../components/AboutGallery.vue'


const testimoniesContainer = ref<HTMLElement | null>(null)
const activeIndex = ref(0) // Initialisation à 0 pour avoir le premier actif par défaut

const selectTestimony = (index: number) => {
  activeIndex.value = index

  nextTick(() => {
    if (index === 0) {
      const firstElement = document.getElementById('testimony-0')
      if (firstElement && testimoniesContainer.value) {
        firstElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        // Vérification explicite avant l'affectation
        if (testimoniesContainer.value) {
          testimoniesContainer.value.scrollTop = 0
        }
      }
    } else {
      const targetElement = document.getElementById(`testimony-${index}`)
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  })
}


onMounted(() => {
  activeIndex.value = 0
  
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  
  if (testimoniesContainer.value) {
    testimoniesContainer.value.scrollTop = 0
  }

  setTimeout(() => {
    window.scrollTo(0, 0)
    if (testimoniesContainer.value) {
      testimoniesContainer.value.scrollTop = 0
    }
  }, 100)
})

const farmerTestimony = [
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/729a19927643d2cf804a98677ebbdd860a7e3146-422x422.png?w=800&h=800&auto=format',
    title: 'Bdedededed',
    description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
    gallery: {
      beforeleft: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ],
      right: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ]
    }
  },
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'A',
    description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
    gallery: {
      beforeleft: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ],
      right: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ]
    }
  },
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'C',
    description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
    gallery: {
      beforeleft: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ],
      right: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ]
    }
  },
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'D',
    description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
    gallery: {
      beforeleft: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ],
      right: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ]
    }
  },
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'E',
    description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
    gallery: {
      beforeleft: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ],
      right: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ]
    }
  },
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
    title: 'F',
    description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
    gallery: {
      beforeleft: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ],
      right: [
        "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
      ]
    }
  }
]

// Modifiez la partie script

onMounted(() => {
  // Mettre à 0 l'index actif
  activeIndex.value = 0
  
  // Forcer le scroll en haut de la page
  window.scrollTo(0, 0)
  
  // Si vous avez un conteneur spécifique à scroller
  if (testimoniesContainer.value) {
    testimoniesContainer.value.scrollTop = 0
  }
})


</script>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>






