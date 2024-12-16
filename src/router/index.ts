import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WineView from '../views/WineView.vue'
import SpiritView from '../views/SpiritView.vue'
import BrandsView from '../views/BrandsView.vue'
import AboutView from '../views/AboutView.vue'
import NewsView from '../views/NewsView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    showNavigation?: boolean
    showFooter?: boolean
    animate?: boolean
    layout?: {
      beforeLeft: number
      left: number
      right: number
    }
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      showNavigation: true,
      showFooter: true,
      animate: true,
      layout: {
        beforeLeft: 0,
        left: 8,
        right: 4
      }
    }
  },
  {
    path: '/wine',
    name: 'wine',
    component: WineView,
    meta: {
      showNavigation: true,
      showFooter: true,
      animate: true,
      layout: {
        beforeLeft: 0,
        left: 8,
        right: 4
      }
    }
  },
  {
    path: '/spirit',
    name: 'spirit',
    component: SpiritView,
    meta: {
      showNavigation: true,
      showFooter: true,
      animate: true,
      layout: {
        beforeLeft: 1,
        left: 7,
        right: 4
      }
    }
  },
  {
    path: '/brands',
    name: 'brands',
    component: BrandsView,
    meta: {
      showNavigation: true,
      showFooter: true,
      animate: true,
      layout: {
        beforeLeft: 2,
        left: 6,
        right: 4
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      showNavigation: true,
      showFooter: true,
      animate: true,
      layout: {
        beforeLeft: 3,
        left: 5,
        right: 4
      }
    }
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView,
    meta: {
      showNavigation: true,
      showFooter: true,
      animate: true,
      layout: {
        beforeLeft: 4,
        left: 4,
        right: 4
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router