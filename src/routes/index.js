import Vue from 'vue';
import Router from 'vue-router';
import auth from '../auth/AuthService';
import Home from '../features/home/Home.vue';
import Callback from '../vue/Callback.vue';
import Login from '../features/login/Login.vue';
import Timesheets from '../vue/Timesheets.vue';
import ProjectForm from '../features/create-project-form/ProjectForm.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/projects',
      name: 'Home',
      component: Home,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: '/projects/:id',
      name: 'EditProject',
      component: ProjectForm,
      meta: {
        requiredAuth: true,
      },
    }, {
      path: '/projects/create',
      name: 'NewProject',
      component: ProjectForm,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: '/projects/:id/timesheet/',
      name: 'Timesheets',
      component: Timesheets,
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
      meta: {
        notAccessibleAfterLogin: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        notAccessibleAfterLogin: true,
      },
    },
    {
      path: '*',
      redirect: '/projects',
      meta: {
        requiredAuth: true,
      },

    },
  ],
});
//
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (!auth.isAuthenticated()) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.notAccessibleAfterLogin)) {
    if (auth.isAuthenticated()) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
