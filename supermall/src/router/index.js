import Vue from "vue"
import VueRouter from 'vue-router'
 
const Home = ()=>import('../views/home/Home')
const Cart = ()=>import('../views/cart/Cart')
const Category = ()=>import('../views/category/Category')
const Profile = ()=>import('../views/profile/Profile')
const Detail = ()=>import('../views/detail/Detail')
//安装插件Vue
Vue.use(VueRouter)

//创建路由对象
const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/profile',
        component:Profile
    },
    {
        path:'/detail/:iid',
        component:Detail
    }
]
const router = new VueRouter({
    routes,
    mode:'history'
})

//导出router
export default router;