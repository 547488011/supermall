<template>
    <div id="tab-bar">
        <slot></slot>
        <!-- <div id="tab-bar">
      <div class="tab-bar-item">
          <img src="../../assets/img/tabbar/主页.svg">
          首页
    </div>
      <div class="tab-bar-item"> <img src="../../assets/img/tabbar/all.svg">分类</div>
      <div class="tab-bar-item"> <img src="../../assets/img/tabbar/购物车.svg">购物车</div>
      <div class="tab-bar-item"> <img src="../../assets/img/tabbar/个人.svg">我的</div>
  </div> -->
    </div>
</template>
<script>

export default {
    name:"TabBar"
}
</script>
<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -1px 1px rgba(100,100, 100, 0.1);
 }
</style>