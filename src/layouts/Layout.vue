<!-- Layout.vue -->

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



<transition-group

name="layout-transition"

class="grid divide-x divide-secondary grid-cols-12"

tag="div"

mode="out-in"

>

<div

v-if="currentLayout.beforeLeft > 0"

:key="'beforeLeft'"

:class="getColSpanClass(currentLayout.beforeLeft)"

class="h-full transition-all duration-500 ease-in-out"

>

<slot name="content-beforeleft" />

</div>



<div

v-if="currentLayout.left > 0"

:key="'left'"

:class="[

getColSpanClass(currentLayout.left),

'border-l h-full transition-all duration-500 ease-in-out',

borderClass

]"

>

<slot name="content-left" />

</div>



<div

v-if="currentLayout.right > 0"

:key="'right'"

:class="[

getColSpanClass(currentLayout.right),

'border-secondary h-full transition-all duration-500 ease-in-out'

]"

>

<slot name="content-right" />

</div>

</transition-group>

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



const borderClass = computed(() => {

return route.path === '/' ? 'border-transparent' : 'border-secondary'

})



return {

currentLayout,

getColSpanClass,

borderClass

}

}

}

</script>



<style scoped>

.layout-transition-move,

.layout-transition-enter-active,

.layout-transition-leave-active {

transition: all 0.5s ease;

}



.layout-transition-enter-from,

.layout-transition-leave-to {

opacity: 0;

transform: translateX(100px);

}



.layout-transition-leave-active {

position: absolute;

}

</style>.