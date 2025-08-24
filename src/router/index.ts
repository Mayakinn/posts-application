import { createRouter, createWebHistory } from "vue-router";
import PostView from "@/views/PostView.vue";
import PostsView from "@/views/PostsView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AuthorView from "@/views/AuthorView.vue";
import { useAuthStore } from "@/store/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      children: [
        {
          path: "",
          name: "posts",
          component: PostsView,
          alias: "/posts",
        },
        {
          path: "posts/:id",
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

router.beforeEach((to, from) => {
  const auth = useAuthStore();
  if (auth.jwtToken != null && to.name == "login") {
    return { name: "posts" };
  }
});

export default router;
