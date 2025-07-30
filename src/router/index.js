import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import CashboxList from "../views/cashboxs/CashboxView.vue";
import AnalyticsDashboard from "@/views/AnalyticsDashboard.vue";
import CurrencyList from "@/views/currencies/CurrencyList.vue";
import RecordList from "@/views/records/RecordList.vue";
import RecordCreate from "@/views/records/RecordCreate.vue";
import UserPage from "@/views/users/UserPage.vue";


const routes = [
  { path: "/login", component: Login },

  { path: '/', redirect: '/analytics', meta: { requiresAuth: true } },
  { path: '/cashboxes', component: CashboxList, meta: { requiresAuth: true } },
  { path: '/currencies', component: CurrencyList, meta: { requiresAuth: true } },
  { path: '/records', component: RecordList, meta: { requiresAuth: true } },
  { path: '/analytics', component: AnalyticsDashboard, meta: { requiresAuth: true } },
  { path: '/user', component: UserPage, meta: { requiresAuth: true } },

    { path: '/records/create', component: RecordCreate, meta: { requireAuth:true } },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Redirect if not logged in
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.path === "/login" && token) {
    next("/");
  } else {
    next();
  }
});

export default router;
