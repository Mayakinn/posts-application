import { createRouter, createWebHistory } from 'vue-router'
import PostView from '../components/views/PostView.vue'
import PostsView from '../components/views/PostsView.vue'
import AuthorView from '../components/views/AuthorView.vue'
import LoginView from '../components/views/LoginView.vue'
import NotFoundView from '../components/views/NotFoundView.vue'

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
      path: '/post/:id',
      name: 'post',
      component: PostView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView,
    },
  ],
})

export default router
