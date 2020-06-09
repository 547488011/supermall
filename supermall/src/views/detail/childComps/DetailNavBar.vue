<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="detail">
      <div v-for="(item,index) in titles" :key="index" class="detail-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
      </div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('itemClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>
<style scoped>
  .detail{
    display: flex;
    font-size: 13px;
  }
  .detail-item{
    flex: 1;
    /* color: black; */
  }
  .active{
    color:rgb(248, 0, 124)
  }
  .back img{
    margin-top: 10px;
  }
</style>