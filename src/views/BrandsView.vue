
<template>
  <Layout
    content-before-left-col-span="2"
    content-left-col-span="6"
    content-right-col-span="4"
    class="hide-scrollbar"
  >
    <template #content-left>
      <div class="h-[93vh] flex flex-col border-secondary">
        <div class="flex-1 bg-yellowed flex flex-col justify-between">
          <div class="flex p-4 pt-20 h-full flex-col">
            <div class="brand-container">
              <!-- Titre -->
              <div class="line-wrapper overflow-hidden">
                <Transition name="line" mode="out-in">
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
                  <Transition name="line" mode="out-in">
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
                { 'bg-yellowed border-t-0': activeBrand === index }
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
              <div class="h-full py-10 flex flex-col items-center justify-center relative">
                <span class="text-4xl uppercase sticky font-light top-10">
                  {{ bottle.name }}
                </span>
                <img 
                  :src="bottle.image" 
                  class="w-full h-full object-contain pt-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Layout from '../layouts/Layout.vue'

const activeBrand = ref(0)
const bottleContainer = ref<HTMLElement | null>(null)

const changeBrand = (index: number) => {
  activeBrand.value = index
  if (bottleContainer.value) {
    bottleContainer.value.scrollTop = 0
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
  const description = brands[activeBrand.value].description
  const words = description.split(' ')
  const lines = []
  const wordsPerLine = 5

  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '))
  }

  return lines
})

// Data
const brands = [
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
   title: 'Album di Famiglia',
   description: "In that of Cerignola, on a piece of land wrested from the brackish water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to Album di Famiglia.",
   bottles: [
     {
       name: 'PUGLIA IGT / 2021',
       desc:"FIANO BIO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/pugliafianobio_8d419d00-4443-41d8-aba1-0d9a08c86361_300x_crop_center.png?v=1647276323'
     },
     {
       name: 'PUGLIA IGT / 2020',
       desc:"Negroamaro Rosato Bio",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/negroamaro_300x_crop_center.png?v=1647276414'
     },
     {
       name: "PUGLIA IGT / 2020",
      desc:"PRIMITIVO BIO",
      image: "https://cdn.shopify.com/s/files/1/0610/2902/3943/products/pugliaprimitivobio_300x_crop_center.png?v=1647276458"
     },

     {
       name: "PUGLIA IGT / 2021",
       desc:"Rosato Ancestrale Bio",
       image:"https://cdn.shopify.com/s/files/1/0610/2902/3943/products/ancestrale_300x_crop_center.png?v=1659630129",
     },
    {
       name: "LAST COLONY / GIN",
       image:"https://cdn.shopify.com/s/files/1/0610/2902/3943/products/ginlastcolony_e89e9161-f4f8-4934-9f8a-76fbc2b644dc_300x_crop_center.png?v=1647276392",
    },
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/8673caabdd2ec738a4753696b7fb1ff30cdc2648-112x112.svg?auto=format',
   title: "No men's Space",
   description: "The absolute spirits of No Man's Space, a project combines designer Mario Di Paolo with perfumer and alchemist Baldo Baldinini: three elixirs each representing a common stance on the world, a superhuman world set in a neutral space.",
   bottles: [
     {
       name: 'ECLIPSE / GIN',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/eclipsegin_300x_crop_center.png?v=1647275591'
     },
     {
       name: 'COMET / BITTER',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/cometbitter_d3a42b08-1a77-482e-95fe-2400d57c6868_300x_crop_center.png?v=1647275562'
     },
     {
       name: 'Capricorn / Vermouth ',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/capricornvermouth_e037cc4a-7c68-4659-90f7-52761ec15c90_300x_crop_center.png?v=1647275525'
     },
   ]
  },
  {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/3315f51c7234e3934b9ec7074acfec64f6c26716-112x112.svg',
   title: 'Vuciata',
   description: "An abraded and aerial earth, very rich in minerals and organic substances, perpetually regenerated by the volcano Etna from which every year man borrows it, enlivening it with its seeds. Thus was born Vuciata: the Etnean line of Brand Breeder.",
   bottles: [
     {
       name: 'ETNA DOC / 2020',
       desc:"BIANCO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/vuciatabianco_2254562f-cb18-4af6-bc64-9163346079a1_800x_crop_center.png?v=1647276210'
     },
      {
       name: 'ETNA DOC / 2018',
       desc:"ROSSO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/vuciatarosso_800x_crop_center.png?v=1647276283'
     },
      {
       name: 'ETNA DOC / 2020',
       desc:"ROSATO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/vuciatarosato_ba0eaca5-d7fc-4106-8a63-c351f3fb8695_800x_crop_center.png?v=1647276300'
     },
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/0db997ebcd8eeb7cc9884f4c433146be585399e0-112x112.svg',
   title: 'VOVITA',
   description: "Ecstatic and haughty, extemporaneous and eternal, Votiva it is homage to the majestic Temple of Capo Colonna dedicated to Hera Lacinia. Inside is a purest and unalterable elixir, as stentorian as the history that forged it.",
   bottles: [
     {
       name: 'VOTIVA / VODKA',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/votivavodka_800x_crop_center.png?v=1647276522'
     },
   ]
  },
  {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/2b275023fdebb96a9af8b0e50eaae354e772a470-112x112.svg?auto=format',
   title: 'SOLNATO',
   description: "Near the Sanctuary of Divino Amore, Solnato is born: in two specimens that draw life from the tuffaceous soils of ancient Rome, expressing themselves through the sap of a whitewine with character and structure and a voluminous, ascending red wine.",
   bottles: [
     {
       name: 'ROMA DOC / 2021',
       desc:"BIANCO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/solnatobianco_db26e7a2-41c3-479e-af1a-471cbe326c26_800x_crop_center.png?v=1647338296'
     },
     {
       name: 'ROMA DOC / 2021',
       desc:"ROSSO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/solnatorosso_a3b24468-43b4-4a38-8022-adb9bb7bd5c9_300x_crop_center.png?v=1647276501'
     },
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/863654164eec7d95cefb85a8b516494edbebc80e-112x112.svg',
   title: 'Fuoridimè',
   description: "The Amaro Italiano that Mario Di Paolo designs together with liquorist and herbalist Marco Sarandrea refutes classical iconography: stamps of human faces in an alienating, anthropomorphic patchwork aimed at celebrating the great men of science of Modern Italy.",
   bottles: [
     {
       name: 'FUORIDIMÈ / AMARO',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/fuoridimeamaroitaliano_300x_crop_center.png?v=1647276342'
     },

   ]
 },
]
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
  height: 2.2rem;
  overflow: hidden;
  vertical-align: top;
}

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

.line-wrapper span {
  position: relative;
  display: inline-block;
  padding-right: 0.25em;
  white-space: nowrap;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>