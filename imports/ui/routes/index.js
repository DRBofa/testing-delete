import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        component:()=>import('../pages/Home.vue')
    },
    {
        path:'/user',
        component:()=>import('../pages/User.vue')
    },
    {
        path:'/customer',
        component:()=>import('../pages/Customer.vue')
    },
    {
        path:'/item',
        component:()=>import('../pages/Item.vue')
    },
]
const router=new VueRouter({
    routes
})

export default router