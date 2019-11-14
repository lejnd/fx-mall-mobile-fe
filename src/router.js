import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/etc',
            name: 'Etc',
            component: () => import(/* webpackChunkName: "Etc" */ './views/etc/apply.vue')
        },
        {
            path: '/myClerk',
            name: 'myClerk',
            component: () => import(/* webpackChunkName: "myClerk" */ './views/etc/myClerk.vue')
        }
    ]
})
