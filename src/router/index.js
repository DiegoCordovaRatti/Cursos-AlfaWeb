import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: () => import('../views/Cursos.vue'),
    meta: {
      ingresar: true,
    },
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: () => import('../views/Administracion.vue'),
    meta: {
      ingresar: true,
    },
  },
  {
    path: '/editar/:id',
    name: 'EditarCurso',
    component: () => import('../views/EditarCurso.vue'),
    meta: {
      ingresar: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
