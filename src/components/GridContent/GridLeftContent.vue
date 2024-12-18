<template>
  <div class="flex flex-col h-full relative overflow-y-auto hide-scrollbar">
    <!-- Overlay animé -->
    <div 
      class="absolute inset-0 pointer-events-none"
      :class="{'opacity-0': !isHovered}"
    >
      <div 
        class="absolute w-full bg-yellowed transition-all duration-300 ease-out"
        ref="overlayRef"
        :style="{
          height: currentItemHeight,
          transform: `translateY(${overlayPosition}px)`
        }"
      ></div>
    </div>

    <!-- Liste des articles -->
    <div
      v-for="(article, index) in news"
      :key="article.id"
      :ref="(el) => { if (el) itemRefs[index] = el as HTMLElement }"
      :class="[
        'p-4 py-10 last:border-b-0 border-b-2 border-secondary min-h-[250px] flex justify-between items-center cursor-pointer relative group transition-colors duration-300',

  { 'bg-yellowed': activeIndex === index && !isHovered }
      ]"
      @mouseenter="handleHover(index)"
      @mouseleave="handleLeave"
      @click="$emit('select-news', index)"
    >
      <div class="flex space-y-2 flex-col relative z-10">
        <span class="text-4xl  tracking-tight font-light leading-9">{{ article.title }}</span>
        <span class="text-right font-light text-base">{{ article.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface NewsArticle {
  id: number
  title: string
  article: string
  author?: string
  date: string
  link?: {
    url: string
  }
}

defineProps<{
  news: NewsArticle[]
  activeIndex: number
}>()

defineEmits<{
  'select-news': [index: number]
}>()

const isHovered = ref(false)
const hoverIndex = ref(-1)
const itemRefs = ref<(HTMLElement | null)[]>([])
const currentItemHeight = ref('0px')
const overlayPosition = ref(0)

const handleHover = (index: number) => {
  isHovered.value = true
  hoverIndex.value = index
  
  const element = itemRefs.value[index]
  if (element) {
    currentItemHeight.value = `${element.offsetHeight}px`
    overlayPosition.value = element.offsetTop
  }
}

const handleLeave = () => {
  isHovered.value = false
  hoverIndex.value = -1
}

onMounted(() => {
  const firstElement = itemRefs.value[0]
  if (firstElement) {
    currentItemHeight.value = `${firstElement.offsetHeight}px`
  }
})
</script>

<style scoped>
.bg-yellowed {
  background-color: #f2d556;
}

.group {
  isolation: isolate;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.opacity-0 {
  opacity: 0;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>