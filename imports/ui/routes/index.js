import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        component:()=>import('../pages/Home.vue'),
        name:'Home'
    },
    {
        path:'/user',
        component:()=>import('../pages/User.vue'),
        name:'User'
    },
    {
        path:'/customer',
        component:()=>import('../pages/Customer.vue'),
        name:'Customer'
    },
    {
        path:'/item',
        component:()=>import('../pages/Item.vue'),
        name:'Item'
    },
    {
        path:'/category',
        component:()=>import('../pages/Category.vue'),
        name:'Category'
    },
]
const router=new VueRouter({
    routes
})

export default router