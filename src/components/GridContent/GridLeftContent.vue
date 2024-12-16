<template>
  <div class="flex divide-y  divide-secondary hide-scrollbar overflow-scroll flex-col h-full">
    <div
      v-for="(article, index) in news"
      :key="article.id"
      class="p-4 py-14 flex flex-col gap-10 justify-between h-max cursor-pointer"
      :class="{ 'bg-yellowed': activeIndex === index }"
      @click="$emit('select-news', index)"
    >
      <div class="flex flex-col">
        <span class="text-4xl font-light leading-9">{{ article.title }}</span>
        <span class="text-right text-lg">{{ article.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NewsArticle {
  id: number
  title: string
  article: string
  author: string
  date: string
  link?: {
    text: string
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
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>