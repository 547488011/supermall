<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>

import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
        scroll:null
    }
  },
  mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          tap:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
      })
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
        
      })
      ; 
      this.scroll.on('pullingUp',()=>{
        // console.log('上啦加载');
        this.$emit('pullingup')
        
      }) 
  },
  methods:{
    scrollTo(x,y,time=700){
      this.scroll && this.scroll.scrollTo(x,y,time)
      // console.log('hahahh');
      
    },
    finishPullUp(){
     this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      console.log('111');
      
     this.scroll && this.scroll.refresh()
    }
  }
}
</script>
<style scoped>

</style>