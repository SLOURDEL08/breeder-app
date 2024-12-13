import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WineView from '../views/WineView.vue'
import SpiritView from '../views/SpiritView.vue'
import BrandsView from '../views/BrandsView.vue'
import AboutView from '../views/AboutView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    showNavigation?: boolean
    showFooter?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      showNavigation: true,
            showFooter: true

    }
  },
  {
    path: '/wine',
    name: 'wine',
    component: WineView,
    meta: {
      showNavigation: false,
      showFooter: false

    }
  },
  {
    path: '/spirit',
    name: 'spirit',
    component: SpiritView,
    meta: {
      showNavigation: false 
    }
  },
   {
    path: '/brands',
    name: 'brands',
    component: BrandsView,
    meta: {
      showNavigation: false,
            showFooter: true

    }
  },
    {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      showNavigation: false 
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router