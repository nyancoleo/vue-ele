<template>
<div class="goods">
<div class="menu-wrapper" :class="" v-el:menu-wrapper>
  <ul>
    <li v-for="item of goods" class="menu-item">
      <span class="text">
        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
        {{item.name}}
      </span>
    </li>
  </ul>
</div>
<div class="foods-wrapper" v-el:foods-wrapper>
  <ul>
    <li v-for="item of goods" class="food-list">
      <h1 class="title">{{item.name}}</h1>
      <ul>
        <li v-for="food of item.foods" class="food-item border-item">
          <div class="icon">
            <img width="57" :src="food.icon" alt="">
          </div>
          <div class="content">
            <h2 class="name">{{food.name}}</h2>
            <p class="desc">{{food.description}}
              <div class="extra">
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
            </p>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</div>
</div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
const ERR_OK = 0

export default {
  name: '',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created: function () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.getfoods()
  },
  methods: {
    getfoods () {
      axios
        .get('/api/goods')
        .then((response) => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno === ERR_OK) {
              this.goods = res.data
              this._initScroll()
            }
          }
        })
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$els.menuWrapper, {})
      this.foodsScroll = new BScroll(this.$els.foodWrapper, {})
    }
  }
}
</script>
<style lang="stylus">
@import '~@/common/stylus/mixin';
.goods 
  display flex
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden
  .menu-wrapper 
    flex 0 0 80px
    // 安卓浏览器兼容问题
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      line-height 14px
      padding 0 12px
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
        &.decrease
            bg-image('image/decrease_3')
        &.discount
            bg-image('image/discount_3')
        &.invoice
            bg-image('image/invoice_3')
        &.special
            bg-image('image/special_3')
        &.guarantee
            bg-image('image/guarantee_3')
      .text
        display table-cell
        width 56px
        font-size 12px
        border-1px(rgba(7, 17, 27, 0.1))
        vertical-align middle
  .foods-wrapper 
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26pxr
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        padding-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          margin-bottom 8px
        .extra
          &.count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)


</style>
