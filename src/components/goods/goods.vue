<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) of goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item of goods" class="food-list food-list-hook">
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
                  <div class="cartcontrol-wrapper">
                    <!-- NOTE: 2.参数接受,调用addFood函数 -->
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice">
    </shopcart>
  </div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'

import shopcart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'

const ERR_OK = 0

export default {
  name: '',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created: function () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.getfoods()
  },
  methods: {
    getfoods() {
      axios
        .get('/api/goods')
        .then((response) => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno === ERR_OK) {
              this.goods = res.data
              this.$nextTick(() => {
                this._initScroll()
                this._calculateHeight()
              })
            }
          }
        })
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodlist.length; i++) {
        let item = foodlist[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodlist[index]
      this.foodsScroll.scrollToElement(el, 300)
      console.log(index)
    },
    addFood(target) {
      this._drop(target)
    },
    // NOTE: 3.与shopcart通信,调用它的drop函数
    _drop(target) {
      // 体验优化异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
}
</script>
<style lang="stylus">
@import '~@/common/stylus/mixin';
@import 'goods';
</style>
