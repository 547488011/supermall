<template>
  <div class="tab-control">
    <!-- <transition-group
    name="nav-group"
    enter-active-class="animated backInUp"
    leave-active-class="animated backOutUp"
    > -->
    <div v-for="(item,index) in titles" :key='index' class="tab-control-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
        <span>{{item}}</span>
    </div>
    <!-- </transition-group> -->
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
    }
  }
};
</script>
<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size:15px;
    height: 40px;
    line-height: 40px;
  }
  .active {
    color:#ff69c9
    /* var(--color-height-text) */
  }
   .active span{
     padding: 5px;
    border-bottom:2px solid #ff69c9;
  }
 .tab-control-item{
     flex:1;
 }
</style>