



<template>
  <Layout
    content-before-left-col-span="3"
    content-left-col-span="5"
    content-right-col-span="4"
    class="hide-scrollbar top-0"
  >
    <template #content-beforeleft>
      <div class="h-[93vh] max-md:hidden hide-scrollbar relative">
        <AboutGallery 
          position="beforeleft"
          :active-index="activeIndex"
          :testimonies="farmerTestimony"
        />
      </div>
    </template>

    <template #content-left>
      <div class="h-[93vh] flex flex-col border-secondary overflow-y-auto" ref="testimoniesContainer">
        <div class="flex-1 overflow-y-auto hide-scrollbar grid grid-cols-1 justify-start divide-y-2 divide-yellowed">
         <div
  v-for="(item, index) in farmerTestimony"
  :key="index"
  :id="`testimony-${index}`"
  :class="[
    'py-20 p-3 transition-colors duration-300',
    index === 0 ? 'bg-yellowed text-secondary' : 'bg-secondary text-yellowed',
    index !== 0 && activeIndex === index ? 'text-yellowed bg-secondary' : ''
  ]"
>
  <h2 class="text-lg uppercase font-light" v-html="item.title"></h2>
  <p class="text-4xl font-light tracking-tight leading-tighter" v-html="item.description"></p>
</div>
        </div>
      </div>
    </template>

    <template #content-right>
      <div class="h-[93vh] w-full flex border-secondary overflow-hidden relative">
        <div class="absolute h-full w-12 -translate-x-1/2 left-1/2 flex items-center justify-center z-10">
          <div 
            class="rotate-90 text-4xl whitespace-nowrap  uppercase font-medium text-secondary origin-center"
            v-html="farmerTestimony[activeIndex].title"
          >
          </div>
        </div>

        <div class="flex w-max z-10 flex-col h-full">
          <div
            v-for="(item, index) in farmerTestimony"
            :key="index"
            class="flex-1 border-r-2 border-b-2 last:border-b-0 border-secondary relative"
          >
            <div 
              @click="selectTestimony(index)"
              class="flex bg-primary justify-center items-center  h-full cursor-pointer transition-colors duration-300"
              :class="{ 'bg-yellowed': activeIndex === index }"
            >
              <img
                :src="item.avatar"
                alt="Avatar"
                class="object-contain p-2 rounded-full max-h-full w-28 h-28 flex justify-center"
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
const activeIndex = ref(0)

// Configuration de l'Intersection Observer
const observerOptions = {
  root: null,
  threshold: 0.5,
  rootMargin: '-20% 0px -20% 0px'
}

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = parseInt(entry.target.id.split('-')[1])
      activeIndex.value = index
    }
  })
}

const selectTestimony = (index: number) => {
  activeIndex.value = index

  nextTick(() => {
    const targetElement = document.getElementById(`testimony-${index}`)
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
}

onMounted(() => {
  // Initialisation
  activeIndex.value = 0
  
  window.scrollTo(0, 0)
  if (testimoniesContainer.value) {
    testimoniesContainer.value.scrollTop = 0
  }

  // Mise en place de l'Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, observerOptions)

  // Observer chaque témoignage
  setTimeout(() => {
    farmerTestimony.forEach((_, index) => {
      const element = document.getElementById(`testimony-${index}`)
      if (element) {
        observer.observe(element)
      }
    })
  }, 100)
})

// Vos données farmerTestimony restent identiques...
const farmerTestimony = [
  {
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/729a19927643d2cf804a98677ebbdd860a7e3146-422x422.png?w=800&h=800&auto=format',
    title: 'ABOUT / MANIFESTO',
    description: "In that of <b>Cerignola</b>, on a piece of land wrested from the <b>brackish water by man's labor</b> in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
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
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/903a2e52a2378665d470f7409ec500e8fc071580-579x640.jpg?rect=98,106,417,417&w=800&h=800&auto=format',
    title: 'People / <b>Marco Sarandrea</b>',
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
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/0a3c37594bbefbcb71edc86fb1d22c94e3547299-1680x1120.jpg?rect=280,0,1120,1120&w=800&h=800&auto=format',
    title: 'People / <b>Francesco Tava</b>',
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
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/8dfbd8918be3d9c17686b14d983818cd63e767d4-500x500.jpg?w=800&h=800&auto=format',
    title: 'People / <b>Franco Bernabei</b>',
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
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/3648b5049a623d3563b61e6a3855d82af0c9f78d-1512x1512.jpg?w=800&h=800&auto=format',
    title: 'People / <b>Marco Caiaffa</b>',
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
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/77e538e8631dbfaf3487805f9f403cac0f0c458e-2068x1550.jpg?rect=259,0,1550,1550&w=800&h=800&auto=format',
    title: 'People / <b>Baldo Baldinini</b>',
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
    avatar: 'https://cdn.sanity.io/images/tduq6a61/production/1b3a266b9ebf5e861892bc2ee02caf64b00484d1-2016x1512.jpg?rect=252,0,1512,1512&w=800&h=800&auto=format',
    title: 'People / <b>Mario Di Paolo</b>',
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