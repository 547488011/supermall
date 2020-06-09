<template>
    <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" :class="{fixed:isShowTabControl}" v-show="isShowTabControl"></tab-control>
    <scroll class="content" ref="scroll" :probe-type = "3" @scroll="contentScroll" :pull-up-load="true" @pullingup="loadUp">
        <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends = "recommends" />
        <feature-view/>
        <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
        <!-- <swiper>
        <swiper-item v-for="item in banners" :key='item.index'>
            <a :href="item.ilnk">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper> -->
    
    </div>
</template>
<script>

import HomeSwiper from './childComps/HomeSwiper'
import FeatureView from './childComps/FeatureView'
import RecommendView from './childComps/RecomendView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
import {
    getHomeMultidata,
    getHomeGoods
} from 'network/home';
import mianTabBarVue from '../../components/content/mianTabBar/mianTabBar.vue'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
export default {
    name:'Home',
    components:{
        
         HomeSwiper,
         RecommendView,
         FeatureView, 
         NavBar,
         TabControl,
         GoodsList,
         Scroll,
         BackTop
        // Swiper,
        // SwiperItem
    },
    mixins:[itemListenerMixin],
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isShowTabControl:false,
            saveY :0,
            
        }
    },
    methods:{
        /**
         * 事件监听相关的方法
         */
        swiperImageLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            
        },
       
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = "new"
                    break
                case 2:
                    this.currentType = 'sell'
                    break
                
            }
            this.$refs.tabControl2.currentIndex = index
            this.$refs.tabControl1.currentIndex = index
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0,1000)
        },
        contentScroll(position){
                this.isShowBackTop = -(position.y) > 1000
                this.isShowTabControl = -(position.y) > this.tabOffsetTop
        },
        loadUp(){
                // console.log('上啦加载');
                this.getHomeGoods(this.currentType)
                //重新计算Scroll的可滚动区域
                this.$refs.scroll.scroll.refresh()
            },
                /**
         * 网络请求相关的方法
         */
        getHomeMultidata(){
             getHomeMultidata().then(res=>{
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
            // console.log(this.showGoods); 
        })
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1
            getHomeGoods(type,page).then(res=>{
                // console.log(res);
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page = page
                this.$refs.scroll.finishPullUp()
            })
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created(){
        //1.请求多个数据
       this.getHomeMultidata();

        //2.请求商品数据
       this.getHomeGoods('pop');
       this.getHomeGoods('new');
       this.getHomeGoods('sell');

      
    },
    mounted(){
     
       
    },
    activated(){ 
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0,this.saveY,0);
       
         console.log(this.saveY)
    },
    deactivated(){
        this.saveY = this.$refs.scroll.scroll.y

        this.$bus.$off('itemImgLoad',this.itemImgListener)
        console.log(this.saveY)
    }
    
}
</script>
<style scoped>
 #home{
     /* padding-top: 44px; */
     /* padding-bottom: 100px; */
     height: 100vh;
     position: relative;
 }
 .home-nav{
     background-color: var(--color-tint);
     color:#fff;
     /* position: fixed;
     left: 0;
     right: 0;
     top: 0;
     z-index: 9; */
    
 }
 .tab-control{
     /* position: sticky; */
     background-color: white;

 }
 .content{
     
     overflow: hidden;
     
     position: absolute;
     top:44px;
     bottom:49px
 }
 .fixed{
     position: relative;
     z-index: 9;
 }
</style>