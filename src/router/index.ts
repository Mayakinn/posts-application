import { createRouter, createWebHistory } from 'vue-router'
import PostView from '../views/PostView.vue'
import PostsView from '../views/PostsView.vue'
import AuthorView from '../views/AuthorView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/author',
      name: 'author',
      component: AuthorView,
    },
    {
      path: '/post',
      name: 'post',
      component: PostView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router
