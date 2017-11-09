<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <transition name="bounce">
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  name: '',
  data() {
    return {
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  created() {
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // NOTE: 1.触发事件传递参数
      this.$emit('add', event.target)
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>
<style lang="stylus">
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    .inner
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
    &.move-enter-active
      transition all .3s linear
    &.move-leave-active
      transition all .3s linear
    &.move-enter, &.move-leave-to
      transform translate3d(24px, 0, 0)
      opacity 0
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
    &.bounce-enter-active
      animation bounce-in .5s
    &.bounce-leave-active
      animation bounce-in .5s reverse
    @keyframes bounce-in
      0%
        transform: scale(0)
      50%
        transform: scale(1.5)
      100%
        transform: scale(1)
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
</style>