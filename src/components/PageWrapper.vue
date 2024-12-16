// components/PageWrapper.vue
<template>
  <Layout>
    <template #header-left>
      <slot name="header-left" />
    </template>

    <template #header-right>
      <slot name="header-right" />
    </template>

    <template #separator>
      <slot name="separator" />
    </template>

    <template #content-beforeleft>
      <transition
        name="content-transition"
        mode="out-in"
        appear
      >
        <div :key="`beforeleft-${$route.path}`">
          <slot name="content-beforeleft" />
        </div>
      </transition>
    </template>

    <template #content-left>
      <transition
        name="content-transition"
        mode="out-in"
        appear
      >
        <div :key="`left-${$route.path}`">
          <slot name="content-left" />
        </div>
      </transition>
    </template>

    <template #content-right>
      <transition
        name="content-transition"
        mode="out-in"
        appear
      >
        <div :key="`right-${$route.path}`">
          <slot name="content-right" />
        </div>
      </transition>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/layouts/Layout.vue'
</script>

<style scoped>
.content-transition-enter-active,
.content-transition-leave-active {
  transition: all 0.5s ease-in-out;
}

.content-transition-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.content-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>