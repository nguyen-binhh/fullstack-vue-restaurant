import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/promotions",
      name: "Promotions",
      component: () => import("../views/PromoView.vue"),
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("../views/MenuView.vue"),
    },
    {
      path: "/table",
      name: "Table",
      component: () => import("../views/TableView.vue"),
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: () => import("../views/CheckoutView.vue"),
    },
    {
      path: "/thanks",
      name: "Thanks",
      component: () => import("../views/ThanksView.vue"),
    },
    {
      path: "/myorder",
      name: "MyOrder",
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("../admin/Admin.vue"),
    },
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: () => import("../admin/Dashboard.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../admin/DashBoard.vue"),
      // https://stackoverflow.com/questions/68504803/how-can-i-make-a-catch-all-other-route-in-vue-router-also-catch-the-url-when-p
    },
  ],
});

export default router;
