<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <cart-list/>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
// import getters from 'store/getters'
import { mapGetters } from 'vuex'
export default {
    name:'Cart',
    components:{
        NavBar,
        CartList
    },
    computed:{
        // cartLength(){
        // return this.$store.getters.cartLength
        // }
        ...mapGetters({
            length:'cartLength',
        })
    }
}
</script>
<style>
 .nav-bar{
    background-color: var(--color-tint);
    color: honeydew;
    font-weight: 700;
 }
</style>