import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/authors',
            name: 'authors',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AuthorsView.vue'),
        },
        {
            path: '/addbook',
            name: 'addbook',
            component: () => import('../views/CreateBook.vue'),
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('../views/ChatView.vue'),
        },
        {
            path: '/test',
            name: 'testeffect',
            component: () => import('../views/TestEffectView.vue'),
        },
        {
            path: '/WeldingVisualization',
            name: 'welding-visualization',
            component: () => import('../views/WeldingVisualizationView.vue'),
        },
        {
            path: '/DashboardView',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
        },
        {
            path: '/ParameterSectors',
            name: 'param-sectors',
            component: () => import('../views/ParameterSectors.vue'),
        },
        {
            path: '/ParameterSectorsBis',
            name: 'param-sectors-bis',
            component: () => import('../views/ParameterSectorsBis.vue'),
        },
    ],
})

export default router
