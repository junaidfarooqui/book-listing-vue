import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import BookDetails from '../views/BookDetails.vue'

const routes = [
    { path: '/', component: HomePage },
    { path: '/book/:slug', component: BookDetails, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router