import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        component:()=>import('../pages/Home.vue'),
        
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
    {
        path:'/supplier',
        component:()=>import('../pages/Supplier.vue'),
        name:'Supplier'
    },
    {
        path:'/purchase',
        component:()=>import('../pages/Purchase.vue'),
        name:'Purchase'
    },
    {
        path:'/sale',
        component:()=>import('../pages/Sale.vue'),
    },
    {
        path:'/import',
        component:()=>import('../pages/Import.vue'),
        name:'Import'
    },
    {
        path:'/export',
        component:()=>import('../pages/Export.vue'),
        name:'Export'
    },
]
const router=new VueRouter({
    routes
})

export default router