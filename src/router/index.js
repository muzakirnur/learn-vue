/* Import Vue Router */
import { createRouter, createWebHistory } from "vue-router";

/* Defining Routes */

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/users",
    name: "users.index",
    component: () => import("../views/users/Index.vue"),
  },
  {
    path: "/users/create",
    name: "users.create",
    component: () => import("../views/users/Create.vue"),
  },
  {
    path: "/users/edit/:id",
    name: "users.edit",
    component: () => import("../views/users/Edit.vue"),
  },
  {
    path: "/movies",
    name: "movies.index",
    component: () => import("../views/movies/Index.vue"),
  },
];

/* Create Router */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* Export Router */
export default router;
