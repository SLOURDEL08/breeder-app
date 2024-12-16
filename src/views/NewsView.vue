<template>
  <Layout
    content-before-left-col-span="3"
    content-left-col-span="5"
    content-right-col-span="4"
    class="hide-scrollbar"
  >
    <template #content-beforeleft>
      <div class="border-l h-[93vh] border-secondary hide-scrollbar">
        <GridLeftContent 
          :news="newsArticles" 
          :active-index="activeNewsIndex"
          @select-news="setActiveNews"
        />
      </div>
    </template>

    <template #content-left>
      <div class="h-[93vh] flex flex-col border-secondary overflow-y-auto">
        <div class="flex-1 bg-yellowed overflow-y-auto hide-scrollbar grid grid-cols-1 justify-start divide-y divide-yellowed">
          <Transition
            name="fade"
            mode="out-in"
          >
            <div 
              v-if="activeNews" 
              :key="activeNews.id"
              class="bg-yellowed py-20 text-secondary p-3"
            >
              <h2 class="text-lg uppercase font-light">{{ activeNews.category }}</h2>
              <p class="text-5xl">
                {{ activeNews.article }}
                <router-link v-if="activeNews.link" class="underline italic" :to="activeNews.link.url">
                  {{ activeNews.link.text }}
                </router-link>
              </p>
              <span class="text-2xl font-semibold">{{ activeNews.author }}</span>
            </div>
          </Transition>
        </div>
      </div>
    </template>

    <template #content-right>
      <div class="h-[93vh] border-secondary overflow-y-auto hide-scrollbar">
        <div class="flex flex-col items-center pr-10 space-y-8">
          <TransitionGroup 
            name="gallery" 
            tag="div" 
            class="w-full flex flex-col items-center space-y-8"
          >
            <img
              v-for="(image, index) in activeNews?.gallery || []"
              :key="activeNews.id + '-' + index"
              :src="image"
              :alt="`Image ${index + 1} for ${activeNews.title}`"
              class="w-full h-auto object-contain"
            />
          </TransitionGroup>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Layout from '../layouts/Layout.vue'
import GridLeftContent from '../components/GridContent/GridLeftContent.vue'

const newsArticles = [
  {
    id: 1,
    title: 'Avamposti, the new trends in Wine & Spirits by Spazio Di Paolo.',
    category: 'NEWS',
    article: "The imaginative pop-up labels designed by Spazio Di Paolo reach out from the glass of the bottle towards the consumer, almost winking at him from the shelf, attracting his gaze from a distance. Mario Di Paolo's distinguishing trait, which is also his competitive advantage, is that of being able to identify unprecedented technological solutions that go beyond mere graphic design and aesthetics and that effectively make his labels small masterpieces of ingenuity. Masterpieces that are not, however, destined to dress just a few numbered bottles, but can be replicated on an industrial level because they are designed to be perfectly functional for printing and automatic dispensing on millions of bottles. Read the full article here.",
    author: "Thibaud J.",
    date: "05/08/2022",
    link: {
      text: "Read more",
      url: "/news/1"
    },
      gallery: [
      "https://cdn.sanity.io/images/tduq6a61/production/e2e8e440f642e98f3ecca73b11728554baf01928-890x400.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/48f2610881d2463cbef3d3e64c6b24977277790c-890x400.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/c12e0afcb7bf2a41fb67d9581fcfb9f4ca82533d-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/884c3c0e66a90c021ea09fe9189a4f41e402854c-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/4385e6cee3b9db9ec49a943c8376dfe5b52d741f-960x641.jpg?w=800&q=80&fit=max&auto=format",
        "https://cdn.sanity.io/images/tduq6a61/production/b1a9f5ab65338787ac5f38eb98946b1aac922cd8-960x641.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/e9410e7e568708dee150ec216751f44bdb81187e-960x720.jpg?w=800&q=80&fit=max&auto=format",
    ],
  },
{
    id: 2,
    title: 'ECLIPSE promoted among the 10 Italian Gins of the Summer!',
    category: 'NEWS',
    article: "From the fortunate encounter between Mario Di Paolo, marketing and communications expert, and essence and botanicals expert Baldo Baldinini, comes No Man's Space - Eclipse Gin, produced by Brand Breeder. A gin in which the Mediterranean profile, evoked by hints of sage, rosemary and bitter orange, is enhanced by a voluptuous oriental note of damask rose. The packaging, winner of numerous industry awards, is expressed with the minimalism of the black and white of an eclipse, made three-dimensional by light. Minimalism is also the watchword for the choice of pairings for Gin Tonic with non-aggressive and less bitter tonics to enhance the gin's bouquet.",
    author: "Thibaud J.",
    date: "05/08/2022",
    link: {
      text: "Read more",
      url: "/news/1"
    },
      gallery: [
      "https://cdn.sanity.io/images/tduq6a61/production/b815ff97f3c3a930da41257fb19b1484310b0b0c-1278x1278.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/4e7589af407d49cedfb8560f30931b9d831592de-960x765.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/4385e6cee3b9db9ec49a943c8376dfe5b52d741f-960x641.jpg?w=800&q=80&fit=max&auto=format"
    ],
  },
  {
    id: 3,
    title: 'The famous Negroni Cocktail recipe.',
    category: 'RECIPE',
    article: "While enjoyable at any time of year, the crisply bitter Negroni seems particularlywell-suited to springtime imbibing. Made with only three ingredients—gin, bitter, and sweet vermouth— measured in equal amounts, a Negroni is also remarkably difficult to foul up, even for novice bartenders. Created in the Hotel Baglioni in Florence in the 1920s, the Negroni is an Italian classic that owes its longevity to its dependably delicious nature, and is a perfect drink to unwind with while settling in for the weekend. Ingredients: 1 ounce dry gin 1 ounce bitter 1 ounce sweet vermouth There are two common ways to serve a Negroni: on the rocks, or straight up. For the former, simply combine the ingredients in an old-fashioned glass filled with ice; stir to combine, twist a thin piece of orange peel over the drink for aromatics and use the twist as garnish. To serve a Negroni straight up, combine the ingredients in a mixing glass and fill with ice. Stir well for 20 seconds, and strain into a chilled cocktail glass. Twist a piece of orange peel over the drink, and use the twist as garnish.",
    author: "Thibaud J.",
    date: "05/08/2022",
    link: {
      text: "Read more",
      url: "/news/1"
    },
       gallery: [
      "https://cdn.sanity.io/images/tduq6a61/production/71975112ca8ee2ccaeeabf5ef3eb109725d552a8-4480x6720.jpg?w=800&q=80&fit=max&auto=format",
    ],
  },
  {
    id: 4,
    title: 'Gold award for Eclipse Gin at Dieline Awards 2020.',
    category: 'NEWS',
    article: "Eclipse Gin won gold at the 2020 Dieline Awards for Best use of label and the Packaging Design Price at the Red Dot Design Award. Brand Breeder and No Man's Space, multiple award winners at Vinitaly 2020!",
    author: "Thibaud J.",
    date: "05/08/2022",
    link: {
      text: "Read more",
      url: "/news/1"
    },
       gallery: [
      "https://cdn.sanity.io/images/tduq6a61/production/a2a4d0bdca68c2065f09dc6c08d69e84c9953087-960x509.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/9271f5787d0138390cdfe71d0fe9b71f3846ff9e-1920x1281.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/3f6bcddaf2843e22cb6f07a165b32d49ab6b1ceb-960x652.jpg?w=800&q=80&fit=max&auto=format"
    ],
  },
   {
    id: 5,
    title: 'GIN GIN, Long live the distillate',
    category: 'NEWS',
     article: "Gin is one of the world's most famous and popular spirits, which after having enjoyed a second youth is now expanding into the boundaries of experimentation. In this context, Eclipse Gin by Brand Breeder, the juniper distillate that harmonises the aromatic accords of Baldo Baldinini and DiBALDO with the creative vision of Mario Di Paolo and Spazio Di Paolo, comes to life. From Il Messaggero's interview: In short, Italy is a real quagmire. But be careful whats out there, warns guru Baldo Baldinini, from his Olfattorio in Rimini. Distillation, he explains, is one of the most challenging things to do. It is the art of extracting the soul from a plant, it is not enough to have a still; it takes years of experience and experimentation to create a quality product with great personality and identity. The challenge is to be truly unique, to have something that is only there in that product. Otherwise it's just marketing'. For now, Baldinini - together with designer Mario Di Paolo - has created with Brand Breeder Spirits a gin composed of 30 botanicals that symbolises the overcoming of one's own limits.",
    author: "Thibaud J.",
    date: "05/08/2022",
    link: {
      text: "Read more",
      url: "/news/1"
     },
       gallery: [
      "https://cdn.sanity.io/images/tduq6a61/production/ee51c172d5cb68354cc2921a97b8abbcbb3c6d14-960x641.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/3dda6e56d5baf699d1533d568b8ef92382f6b6f1-960x641.jpg?w=800&q=80&fit=max&auto=format",
      "https://cdn.sanity.io/images/tduq6a61/production/fa13285a37c6d16ce8ba569d9789f033d6fd6b2a-1980x1320.jpg?w=800&q=80&fit=max&auto=format"
    ],
  },
]

const activeNewsIndex = ref(0)
const activeNews = computed(() => newsArticles[activeNewsIndex.value])

const setActiveNews = (index: number) => {
  activeNewsIndex.value = index
}
</script>



<style scoped>
/* Animations existantes pour la galerie */
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.5s ease;
}

.gallery-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.gallery-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.gallery-move {
  transition: transform 0.5s ease;
}

/* Nouvelles animations pour le fade de l'article */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Style supplémentaire pour assurer une transition fluide */
.fade-leave-active {
  position: initial;
  width: 100%;
}
</style>