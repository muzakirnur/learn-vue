/* Import Vue Router */
import { createRouter, createWebHistory } from "vue-router";

/* Defining Routes */

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../view/Home.vue"),
  },
  {
    path: "/users",
    name: "users.index",
    component: () => import("../view/users/Index.vue"),
  },
  {
    path: "/users/create",
    name: "users.create",
    component: () => import("../view/Users/Create.vue"),
  },
  {
    path: "/users/edit/:id",
    name: "users.edit",
    component: () => import("../view/Users/Edit.vue"),
  },
];

/* Create Router */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* Export Router */
export default router;
