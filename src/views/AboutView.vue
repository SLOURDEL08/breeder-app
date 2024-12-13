<template>
  <Layout class="">

    <template #content-left>
      <div class="h-full  border-secondary">
        <div class="h-[80vh] flex flex-col justify-between">
            <div class="flex flex-col">
                <span class="uppercase font-light text-lg">ABOUT</span>
            <span class="text-3xl hidden leading-8">Among all human artifacts, <b class="font-light italic">wine</b> is the one most capable of reconciling the ancient contest between <b class="font-light italic">nature</b> and <b class="font-light italic">culture</b>. In our <b class="font-light italic">territories</b> in power, we have chosen to release through the craft of wine, the energies and latent potential of man and the earth</span>
            </div>
            
        
        </div>
        <PageNavigation/>
      </div>
    </template>

    <template #content-right>
        <div class=" h-full border-secondary">
               dd
        </div>
  
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../layouts/Layout.vue'
import InfiniteScroll from '../components/InfiniteScroll.vue'
import PageNavigation from '../components/Navbar/PageNavigation.vue'
import RegionMap from '../components/InteractiveRegionMap/RegionMap.vue'
import GridImageHover from '../components/GridImageHover/GridImageHover.vue'
import GridRightContent from '../components/GridContent/GridRightContent.vue'



</script>