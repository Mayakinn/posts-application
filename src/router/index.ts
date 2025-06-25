import { createRouter, createWebHistory } from "vue-router";
import PostView from "@/views/PostView.vue";
import PostsView from "@/views/PostsView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AuthorView from "@/views/AuthorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "posts",
      component: PostsView,
      alias: "/posts",
      children: [
        {
          path: "post/:id",
          name: "post",
          component: PostView,
          props: true,
        },
      ],
    },
    {
      path: "/authors",
      name: "authors",
      component: AuthorView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFoundView,
    },
  ],
});

export default router;
