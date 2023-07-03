// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/LoginLayout.vue"),
    children: [
      { path: "", name: "loginDefault", component: () => import("@/views/Login.vue") },
      { path: "login", name: "Login", component: () => import("@/views/Login.vue") },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'cadastrar-usuario',
        name: 'Cadastrar-Usuario',
        component: () => import('@/views/CadastrarUsuario.vue'),
      },
      {
        path: 'cadastrar-produto',
        name: 'Cadastrar-Produto',
        component: () => import('@/views/CadastrarProduto.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
