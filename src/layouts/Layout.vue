<template>
  <div class="border-secondary bg-primary">
    <!-- Première section inchangée -->
    <div class="grid divide-x divide-secondary grid-cols-12 items-center">
      <div class="col-span-8 h-full">
        <slot name="header-left" />
      </div>
      <div class="col-span-4 h-full">
        <slot name="header-right" />
      </div>
    </div>

    <div>
      <slot name="separator" />
    </div>

    <div class="grid grid-cols-12">
      <div 
        v-if="currentLayout.beforeLeft > 0"
        :class="getColSpanClass(currentLayout.beforeLeft)"
        class="h-full"
      >
        <slot name="content-beforeleft" />
      </div>
      <div 
        v-if="currentLayout.left > 0"
        :class="[getColSpanClass(currentLayout.left), 'border-l border-secondary h-full']"
      >
        <slot name="content-left" />
      </div>
      <div 
        v-if="currentLayout.right > 0"
        :class="[getColSpanClass(currentLayout.right), 'border-secondary h-full']"
      >
        <slot name="content-right" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Layout',
  setup() {
    const route = useRoute()

    const layouts = {
      default: {
        beforeLeft: 0,
        left: 8,
        right: 4
      },
      '/wine': {
        beforeLeft: 0,
        left: 8,
        right: 4
      },
      '/spirit': {
        beforeLeft: 1,
        left: 7,
        right: 4
      },
      '/brands': {
        beforeLeft: 2,
        left: 6,
        right: 4
      },
      '/about': {
        beforeLeft: 3,
        left: 5,
        right: 4
      },
      '/news': {
        beforeLeft: 4,
        left: 4,
        right: 4
      }
    }

    const getColSpanClass = (span) => {
      const colSpanClasses = {
        0: 'col-span-0',
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12'
      }
      return colSpanClasses[span] || 'col-span-0'
    }

    const currentLayout = computed(() => {
      return layouts[route.path] || layouts.default
    })

    return {
      currentLayout,
      getColSpanClass
    }
  }
}
</script>