<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

    <!-- <div class="tab border-1px">
        <div v-for="item in tabList" class="tab-item">
          <router-link :to="item.href" v-link-active="">{{item.name}}</router-link>
        </div>
      </div> -->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <!-- <keep-alive>
      <router-view  v-if="$router.meta.keepAlive"></router-view>
    </keep-alive> -->
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import header from '@/components/header/header'

// const ERR_OK = 0

export default {
  name: 'app',
  data() {
    return {
      seller: {},
      tabList: [
        {
          name: '商品',
          href: 'goods'
        },
        {
          name: '评价',
          href: 'ratings'
        },
        {
          name: '商家',
          href: 'seller'
        }
      ]
    }
  },
  created: function () {
    this.getseller()
  },
  methods: {
    getseller() {
      axios
        .get('/api/seller')
        .then((response) => {
          if (response.status === 200) {
            let res = response.data
            if (res.errno === 0) {
              this.seller = res.data
            } else {
              this.seller = {}
            }
          }
        }).catch((error) => {
          console.log(error)
          console.log(this)
        })
    }
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="scss">
@import "~@/common/scss/mixin.scss";
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7,17,27,0.1));
    // border-bottom: 1px solid rgba(7,17,27,0.1);
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        text-decoration: none;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &:link {
          color: rgb(77, 85, 93);
        }
        &:visited {
          color: rgb(20, 20, 20);
        }
        &:hover {
          color: rgb(240, 20, 20);
        }
        &:active {
          color: rgb(240, 20, 20);
        }
        &.activeClass {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>