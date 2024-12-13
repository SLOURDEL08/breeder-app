<template>
 <Layout
  content-before-left-col-span="2"
    content-left-col-span="6"
  content-right-col-span="4"
 class=" hide-scrollbar ">
 <template #content-left>
      <div class="h-[93vh] flex flex-col border-secondary">
        <div class="flex-1 bg-yellow-300 flex flex-col justify-between">
          <div class="flex p-4 pt-20 h-full flex-col">
            <div class="brand-container">
              <!-- Titre -->
              <div class="line-wrapper overflow-hidden">
                <Transition 
                  name="line" 
                  mode="out-in"
                >
                  <span 
                    :key="`title-${activeBrand}`" 
                    class="uppercase font-light text-lg block"
                  >
                    {{ brands[activeBrand].title }}
                  </span>
                </Transition>
              </div>
              
              <!-- Description divisée en lignes -->
              <div class="paragraph-container overflow-hidden">
  <div 
    v-for="(line, index) in splitDescription" 
    :key="index" 
    class="line-wrapper inline-block"
  >
    <Transition 
      name="line" 
      mode="out-in"
    >
      <span 
        :key="`desc-${activeBrand}-${index}`" 
        class="text-3xl leading-8 inline-block"
      >
        {{ line }}&nbsp;
      </span>
    </Transition>
  </div>
</div>
                </div>
          </div>
           
         <div class="grid divide-x divide-secondary bg-primary h-44 grid-cols-6">
       
           <div 
             v-for="(brand, index) in brands" 
             :key="index"
             :class="[
               'border-t p-2 border-secondary cursor-pointer',
               { 'bg-yellow-300  border-t-0': activeBrand === index }
             ]"
             @click="changeBrand(index)"
           >
          
             <img :src="brand.logo" class="h-full w-full" />
           </div>
         </div>
       </div>
     </div>
   </template>

  <template #content-right>
  <div class="h-[93vh] border-secondary relative">
    <div 
      class="sticky top-0 h-full hide-scrollbar overflow-y-auto"
      ref="bottleContainer"
    >
      <div 
        class="flex flex-col"
        :style="{ height: `${brands[activeBrand].bottles.length * 93}vh` }"
      >
        <div 
  v-for="(bottle, index) in brands[activeBrand].bottles" 
  :key="index"
  class="h-[93vh] relative flex-shrink-0"
>
  <div class="h-full">
    <img 
      :src="bottle.image" 
      class="w-full !z-20 h-full object-contain"
      :ref="el => bottleRefs[index] = el"
    />
    <span 
      class="text-4xl absolute left-1/2 -translate-x-1/2 z-10 top-20 uppercase font-light"
    >
      {{ bottle.name }}
    </span>
  </div>
</div>
      </div>
    </div>
  </div>
</template>
 </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

import Layout from '../layouts/Layout.vue'
import InfiniteScroll from '../components/InfiniteScroll.vue'
import RegionMap from '../components/InteractiveRegionMap/RegionMap.vue'
import GridImageHover from '../components/GridImageHover/GridImageHover.vue'
import GridRightContent from '../components/GridContent/GridRightContent.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const brands = [
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
   title: 'Album di Famiglia',
   description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
   bottles: [
     {
       name: 'ANCESTRALE',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     }
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/8673caabdd2ec738a4753696b7fb1ff30cdc2648-112x112.svg?auto=format',
   title: "No men's Space",
   description: "The absolute spirits of No Man's Space, a project combines designer Mario Di Paolo with perfumer and alchemist Baldo Baldinini: three elixirs each representing a common stance on the world, a superhuman world set in a neutral space.",
   bottles: [
     {
       name: 'NEGROAMARO',
       image: '/public/wine/negroamaro.webp'
     },
     {
       name: 'NEGROAMARO 2',
       image: '/public/wine/negroamaro.webp'
     },
     {
       name: 'NEGROAMARO 2',
       image: '/public/wine/negroamaro.webp'
     },
     {
       name: 'NEGROAMARO 2',
       image: '/public/wine/negroamaro.webp'
     }
   ]
  },
  {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/3315f51c7234e3934b9ec7074acfec64f6c26716-112x112.svg',
   title: 'Vuciata',
   description: "An abraded and aerial earth, very rich in minerals and organic substances, perpetually regenerated by the volcano Etna from which every year man borrows it, enlivening it with its seeds. Thus was born Vuciata: the Etnean line of Brand Breeder.",
   bottles: [
     {
       name: 'PUGLIAFIANOBIO',
       image: '/public/wine/pugliafianobio.webp'
     },
     {
          name: 'PUGLIAFIANOBIO',
       image: '/public/wine/pugliafianobio.webp'
     }
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/0db997ebcd8eeb7cc9884f4c433146be585399e0-112x112.svg',
   title: 'VOVITA',
   description: "Ecstatic and haughty, extemporaneous and eternal, Votiva it is homage to the majestic Temple of Capo Colonna dedicated to Hera Lacinia. Inside is a purest and unalterable elixir, as stentorian as the history that forged it.",
   bottles: [
     {
       name: 'ANCESTRALE',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     }
   ]
  },
  {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/2b275023fdebb96a9af8b0e50eaae354e772a470-112x112.svg?auto=format',
   title: 'SOLNATO',
   description: "Near the Sanctuary of Divino Amore, Solnato is born: in two specimens that draw life from the tuffaceous soils of ancient Rome, expressing themselves through the sap of a whitewine with character and structure and a voluminous, ascending red wine.",
   bottles: [
     {
       name: 'ANCESTRALE',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     }
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/863654164eec7d95cefb85a8b516494edbebc80e-112x112.svg',
   title: 'Fuoridimè',
   description: "The Amaro Italiano that Mario Di Paolo designs together with liquorist and herbalist Marco Sarandrea refutes classical iconography: stamps of human faces in an alienating, anthropomorphic patchwork aimed at celebrating the great men of science of Modern Italy.",
   bottles: [
     {
       name: 'ANCESTRALE',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     },
     {
       name: 'ANCESTRALE 2',
       image: '/public/wine/ancestrale.webp'
     }
   ]
 },
 // ... autres marques identiques ...
]

const activeBrand = ref(0)
const bottleContainer = ref(null)
const bottleRefs = ref([])
const titleRefs = ref([])

const initializeAnimations = () => {
  brands[activeBrand.value].bottles.forEach((_, index) => {
    const bottle = bottleRefs.value[index]
    const title = titleRefs.value[index]
    
    if (!bottle || !title) return

    // Position initiale du titre: centrée horizontalement et top-10
    gsap.set(title, {
      xPercent: -50,
      left: '50%',
      position: 'absolute',
      top: '100px'
    })

    // Animation du titre quand la bouteille monte
    gsap.to(title, {
      scrollTrigger: {
        trigger: bottle,
        scroller: bottleContainer.value,
        start: 'bottom bottom', // Commence quand le bas de la bouteille atteint le bas du viewport
        end: 'top top', // Termine quand le haut de la bouteille atteint le haut du viewport
        pin: true, // Garde le titre fixe jusqu'au point de départ
        pinSpacing: false,
        scrub: true,
      },
      y: '-100vh', // Monte avec la même vitesse que le scroll
      ease: 'none'
    })
  })
}

const changeBrand = (index: number) => {
  // Kill les anciennes animations avant de changer de brand
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  
  activeBrand.value = index
  if (bottleContainer.value) {
    bottleContainer.value.scrollTop = 0
    
    nextTick(() => {
      bottleRefs.value = []
      titleRefs.value = []
      initializeAnimations()
    })
  }
}

const handleScroll = (event: WheelEvent) => {
 if (!bottleContainer.value) return

 const container = bottleContainer.value
 const isAtBottom = Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight
 const isAtTop = container.scrollTop === 0

 if (!(event.deltaY > 0 && isAtBottom) && !(event.deltaY < 0 && isAtTop)) {
   event.preventDefault()
   container.scrollTop += event.deltaY
 }
}

const splitDescription = computed(() => {
 const description = brands[activeBrand.value].description;
 const words = description.split(' ');
 const lines = [];
 const wordsPerLine = 5;

 for (let i = 0; i < words.length; i += wordsPerLine) {
   lines.push(words.slice(i, i + wordsPerLine).join(' '));
 }

 return lines;
})

onMounted(() => {
  document.addEventListener('wheel', handleScroll, { passive: false })
  nextTick(() => {
    initializeAnimations()
  })
})

onUnmounted(() => {
  document.removeEventListener('wheel', handleScroll)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
.brand-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.paragraph-container {
  display: block;
  width: 100%;
}

.line-wrapper {
  position: relative;
  display: inline-block;
  height: 2.2rem; /* Hauteur fixe pour l'animation */
  overflow: hidden;
  vertical-align: top;
}

/* Animation pour les lignes */
.line-enter-active,
.line-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  left: 0;
  right: 0;
}

.line-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.line-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.line-enter-to,
.line-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Pour les spans à l'intérieur des line-wrapper */
.line-wrapper span {
  position: relative;
  display: inline-block;
  padding-right: 0.25em;
  white-space: nowrap;
}

/* Cacher la scrollbar */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>