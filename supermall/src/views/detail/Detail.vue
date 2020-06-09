<template>
    <div id="detail">
        <detail-nav-bar ref="nav" class="detail-nav" @itemClick="itemClick"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="scrollOn" :pullUpLoad="true" :probeType="3">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-images-info :images-info="imagesInfo" @imgLoad="imageLoad"></detail-images-info>
        <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list :goods="recommends" ref="recommend" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop" />
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImagesInfo from './childComps/DetailImagesInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'
import {debouce} from 'common/utils';
import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import { mapActions } from 'vuex'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      imagesInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      currentIndex:0,
      // message:'',
      // show:false
    }
  },
  created(){
    this.iid = this.$route.params.iid
    console.log(this.iid);
    getDetail(this.iid).then(res=>{
      //1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //获取店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      //获取商品的详情数据
      this.imagesInfo = data.detailInfo
      //获取参数的信息
      this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]
      }
      this.$nextTick(()=>{
      //根据最新的数据，对应的Dom是已经被渲染出来
      //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
      //offsetTop值不对的时候，都是因为图片的问题
      })
    })
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })
  },
  mounted(){
      
      
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh();
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
    },
    itemClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    scrollOn(position){
        let positionY = -position.y
        let length = this.themeTopYs.length
        for(let i =0;i<length-1;i++){
          //普通做法
            // if(this.currentIndex !==i && ((i<length-1 && this.themeTopYs[i]<=positionY &&positionY<this.themeTopYs[i+1])||(
            //   i===length-1 && positionY>=this.themeTopYs[i]))){
            //   console.log(i);
            //     this.currentIndex = i
            //     this.$refs.nav.currentIndex = this.currentIndex
            // }
            //hack做法
            if(this.currentIndex !==i&&(this.themeTopYs[i]<=positionY &&positionY<this.themeTopYs[i+1])){
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
            }
        }
        this.listenShowBackTop(position)
        // this.backTop()
    },
    backClick(){
      this.backTop()
    },
    addToCart(){
      const product = {}
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //通过mapActions映射调用action里面的addCart方法
      this.addCart(product).then(res=>{
        // this.show = true
        // this.message = res
        //   setTimeout(()=>{
        //       this.show = false
        //       this.message ='' 
        //   },1500)
        this.$toast.show(res)
        // console.log(this.$toast);
        
      })

      // this.$store.dispatch("addCart",product).then(res=>{
      //   console.log(res);
        
      // })
    }
  }
}
</script>
<style scoped>
    #detail{
      position: relative;
      z-index: 9;
      background-color: #fff;
      height: 100vh;
    }
    .detail-nav{
      position: relative;
      z-index: 9;
      background-color: white;
    }
    .content{
      height: calc(100% - 44px - 49px);
    }
</style>