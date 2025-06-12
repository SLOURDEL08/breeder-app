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
                     class="text-3xl font-neue tracking-tight font-light leading-8 inline-block"
                     v-html="line"
                   >
                   </span>
                 </Transition>
               </div>
              </div>
            </div>
          </div>
           
          <div class="grid divide-x-2 divide-secondary bg-primary max-md:h-auto max-md:border-b-2 border-secondary h-44 grid-cols-6">
            <div 
              v-for="(brand, index) in brands" 
              :key="index"
              :class="[
                'border-t-2 p-2 border-secondary cursor-pointer',
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
          @wheel.passive="handleScroll"
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
                <span class="text-4xl uppercase tracking-tight sticky font-[300] top-10"
                  v-html="bottle.name">
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
  // On divise en respectant les tags HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = description
  const textContent = tempDiv.textContent || tempDiv.innerText
  const words = textContent.split(' ')
  const lines = []
  const wordsPerLine = 5

  let currentLine = []
  let currentWordCount = 0
  let currentHtmlIndex = 0
  
  for (const word of words) {
    currentWordCount++
    currentLine.push(word)
    
    if (currentWordCount === wordsPerLine) {
      // On reconstruit le HTML pour cette ligne
      let htmlLine = description
        .substring(currentHtmlIndex)
        .split(' ')
        .slice(0, wordsPerLine)
        .join(' ')
      
      lines.push(htmlLine)
      currentLine = []
      currentWordCount = 0
      currentHtmlIndex += htmlLine.length
    }
  }
  
  if (currentLine.length > 0) {
    // Pour la dernière ligne si elle n'est pas complète
    let remainingHtml = description
      .substring(currentHtmlIndex)
    lines.push(remainingHtml)
  }

  return lines
})

// Data
const brands = [
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/2a215e6692f4dc3f3d4c6a30e6c3343e26013ea9-112x112.svg',
   title: 'Album di Famiglia',
   description: "In that of <b>Cerignola</b>, on a piece of land wrested from the <b>brackish</b> water by man's labor in the early 20th century, in a soil mixed with water and earth, salt and hope, vines and fruit trees grow and thrive, giving life to <b>Album di Famiglia</b>.",
   bottles: [
     {
       name: 'PUGLIA IGT / <b>2021</b>',
       desc:"FIANO BIO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/pugliafianobio_8d419d00-4443-41d8-aba1-0d9a08c86361_300x_crop_center.png?v=1647276323'
     },
     {
       name: 'PUGLIA IGT / <b>2020</b>',
       desc:"Negroamaro Rosato Bio",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/negroamaro_300x_crop_center.png?v=1647276414'
     },
     {
       name: "PUGLIA IGT / <b>2020</b>",
      desc:"PRIMITIVO BIO",
      image: "https://cdn.shopify.com/s/files/1/0610/2902/3943/products/pugliaprimitivobio_300x_crop_center.png?v=1647276458"
     },

     {
       name: "PUGLIA IGT / <b>2021</b>",
       desc:"Rosato Ancestrale Bio",
       image:"https://cdn.shopify.com/s/files/1/0610/2902/3943/products/ancestrale_300x_crop_center.png?v=1659630129",
     },
    {
       name: "LAST COLONY / <b>GIN</b>",
       image:"https://cdn.shopify.com/s/files/1/0610/2902/3943/products/ginlastcolony_e89e9161-f4f8-4934-9f8a-76fbc2b644dc_300x_crop_center.png?v=1647276392",
    },
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/8673caabdd2ec738a4753696b7fb1ff30cdc2648-112x112.svg?auto=format',
   title: "No men's Space",
   description: "The absolute spirits of <b>No Man's Space</b>, a project combines designer Mario Di Paolo with perfumer and alchemist Baldo Baldinini:<b> three elixirs</b> each representing a common stance on the world, a <b>superhuman</b> world set in a <b>neutral space</b>.",
   bottles: [
     {
       name: 'ECLIPSE / <b>GIN</b>',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/eclipsegin_300x_crop_center.png?v=1647275591'
     },
     {
       name: 'COMET / <b>BITTER</b>',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/cometbitter_d3a42b08-1a77-482e-95fe-2400d57c6868_300x_crop_center.png?v=1647275562'
     },
     {
       name: 'Capricorn / <b>Vermouth</b>',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/capricornvermouth_e037cc4a-7c68-4659-90f7-52761ec15c90_300x_crop_center.png?v=1647275525'
     },
   ]
  },
  {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/3315f51c7234e3934b9ec7074acfec64f6c26716-112x112.svg',
   title: 'Vuciata',
   description: "An <b>abraded</b> and <b>aerial earth</b>, very rich in minerals and organic substances, perpetually regenerated by the volcano <b>Etna</b> from which every year man borrows it, enlivening it with its seeds. Thus was born <b>Vuciata:</b> the Etnean line of Brand Breeder.",
   bottles: [
     {
       name: 'ETNA DOC / <b>2020</b>',
       desc:"BIANCO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/vuciatabianco_2254562f-cb18-4af6-bc64-9163346079a1_800x_crop_center.png?v=1647276210'
     },
      {
       name: 'ETNA DOC / <b>2018</b>',
       desc:"ROSSO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/vuciatarosso_800x_crop_center.png?v=1647276283'
     },
      {
       name: 'ETNA DOC / <b>2020</b>',
       desc:"ROSATO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/vuciatarosato_ba0eaca5-d7fc-4106-8a63-c351f3fb8695_800x_crop_center.png?v=1647276300'
     },
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/0db997ebcd8eeb7cc9884f4c433146be585399e0-112x112.svg',
   title: 'VOVITA',
   description: "Ecstatic and haughty, extemporaneous and eternal, <b>Votiva</b> it is homage to the majestic Temple of Capo Colonna dedicated to Hera Lacinia. Inside is a <b>purest and unalterable elixir</b>, as stentorian as the history that forged it.",
   bottles: [
     {
       name: 'VOTIVA / <b>VODKA</b>',
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/votivavodka_800x_crop_center.png?v=1647276522'
     },
   ]
  },
  {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/2b275023fdebb96a9af8b0e50eaae354e772a470-112x112.svg?auto=format',
   title: 'SOLNATO',
   description: "Near the Sanctuary of Divino Amore, <b>Solnato</b> is born: in two specimens that draw life from the<b>tuffaceous soils</b> of ancient Rome, expressing themselves through the sap of a <b>whitewine</b> with <b>character</b> and <b>structure</b> and a <b>voluminous</b>, ascending red wine.",
   bottles: [
     {
       name: 'ROMA DOC / <b>2021</b>',
       desc:"BIANCO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/solnatobianco_db26e7a2-41c3-479e-af1a-471cbe326c26_800x_crop_center.png?v=1647338296'
     },
     {
       name: 'ROMA DOC / <b>2021</b>',
       desc:"ROSSO",
       image: 'https://cdn.shopify.com/s/files/1/0610/2902/3943/products/solnatorosso_a3b24468-43b4-4a38-8022-adb9bb7bd5c9_300x_crop_center.png?v=1647276501'
     },
   ]
 },
 {
   logo: 'https://cdn.sanity.io/images/tduq6a61/production/863654164eec7d95cefb85a8b516494edbebc80e-112x112.svg',
   title: 'Fuoridimè',
   description: "The <b>Amaro Italiano</b> that Mario Di Paolo designs together with liquorist and herbalist Marco Sarandrea refutes <b>classical iconography:</b> stamps of human faces in an alienating, anthropomorphic patchwork aimed at celebrating the great men of science of <b>Modern Italy</b>.",
   bottles: [
     {
       name: 'FUORIDIMÈ / <b>AMARO</b>',
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