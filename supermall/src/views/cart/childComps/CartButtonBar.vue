<template>
  <div class="bottom-bar">
    <div class="check-content">
        <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick" />
        <span>全选</span>
    </div>
    <div class="check-center">
      合计:{{totalPrice}}  
    </div>
    <div class="calculate" @click="calcClick">
        去计算:{{checkLength}}
    </div>
  </div>
</template>
<script>
import CheckButton from './CheckButtom'
import { mapGetters } from 'vuex'
export default {
  name:'CartButtonBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+ this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue+item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return '('+this.$store.state.cartList.filter(item=>item.checked).length+')'
    },
    isSelectAll(){
      if(this.cartList.length ===0){return false}
      return !this.cartList.find(item=>!item.checked)
    }
  },
  methods:{
    checkClick(){
         if(this.isSelectAll){
           this.cartList.forEach(item=>item.checked=false)
         }else{
           this.cartList.forEach(item=>item.checked=true)
         }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1500)
      }
    }
  }
}
</script>
<style scoped>
  .bottom-bar{
    height: 40px;
    background-color:#eee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .check-content span{
    margin-right: 20px;
    
  }
  .check-center{
    flex: 1;
  }
  .calculate{
    background-color: #ff0000a8;
    width: 90px;
    text-align: center; 
    color: white;
  }
</style>