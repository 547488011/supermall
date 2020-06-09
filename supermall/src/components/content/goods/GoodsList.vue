<template>
    <div class="goods">
      <goods-list-item v-for="item in goods" :key='item.index' :goods-item="item"/>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
    type:Array,
    default(){
      return []
    }
    }
  }
}
</script>
<style scoped>
  .goods{
    display: flex;
    /* 让弹性盒元素在必要的时候拆行 */
    flex-wrap: wrap;
    /* 均等分布 */
    justify-content: space-around;
  }
</style>