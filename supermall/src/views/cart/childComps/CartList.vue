<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item 
        v-for="(item,index) in cartList" :key="index"  :itemInfo="item">
        </cart-list-item>
    </scroll>
    <cart-button-bar/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import CartButtonBar from './CartButtonBar'
export default {
  name:'CartList',
  components:{
      Scroll,
      CartListItem,
      CartButtonBar
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
      this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
  .content{
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>