<template>
    <div class="flex flex-col h-full relative">
        <!-- Overlay animé -->
        <div 
            class="absolute inset-0 pointer-events-none"
            :class="{'opacity-0': !isHovered}"
        >
            <div 
                class="absolute w-full bg-yellowed transition-all duration-300 ease-out"
                :style="{
                    height: '50%',
                    transform: `translateY(${activeIndex * 100}%)`
                }"
            ></div>
        </div>

        <!-- Premier article (ECLIPSE) -->
        <div 
            class="p-4 flex flex-col border-b-2  border-secondary justify-between h-1/2 relative transition-colors duration-300 cursor-pointer group"
            @mouseenter="handleHover(0)"
            @mouseleave="handleLeave"
            @click="navigateToNews(1)"
        >
            <span class="text-sm uppercase relative z-10">News</span>
            <div class="flex flex-col relative z-10">
                <span class="text-4xl tracking-tight leading-9">ECLIPSE Promoted among the 10 italien Gins of the Summer!</span>
                <span class="text-right text-xs">05/08/2022</span>
            </div>
        </div>

        <!-- Deuxième article (Avamposti) -->
        <div 
            class="p-4 flex flex-col justify-between  border-secondary h-1/2 relative transition-colors duration-300 cursor-pointer group"
            @mouseenter="handleHover(1)"
            @mouseleave="handleLeave"
            @click="navigateToNews(0)" 
        >
            <span class="text-sm uppercase relative z-10">News</span>
            <div class="flex flex-col relative z-10">
                <span class="text-4xl  tracking-tight leading-9">Avamposti, the new trends in Wine & Spirits by Spazio Di Paolo.</span>
                <span class="text-right text-xs">05/08/2022</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref(-1)
const isHovered = ref(false)

const handleHover = (index: number) => {
    activeIndex.value = index
    isHovered.value = true
}

const handleLeave = () => {
    isHovered.value = false
    activeIndex.value = -1
}

const navigateToNews = (index: number) => {
    router.push({
        path: '/news',
        query: { activeIndex: index.toString() }
    })
}
</script>

<style scoped>
.bg-yellowed {
    background-color: #f2d556;
}

.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.opacity-0 {
    opacity: 0;
}

.group {
    isolation: isolate;
}
</style>