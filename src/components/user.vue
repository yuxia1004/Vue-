<template>
  <div v-if="$store.state.showUser">
    <div class="user-poster">
      <img src="https://avatars2.githubusercontent.com/u/227713?v=4&s=120" @click="show=!show"/>
      <van-image-preview v-model="show" :images="images"></van-image-preview>
    </div>
    <p class="name">兜兜有枪~</p>

    <ul class="user-group">
      <li>
        <span>余额</span>
        <p>1000.00</p>
      </li>
      <li>
        <span>吉致币</span>
        <p>123</p>
      </li>
      <li @click="toCoupon()">
        <span>优惠券</span>
        <p>2</p>
      </li>
      <li>
        <span>兑换券</span>
        <p>90</p>
      </li>
    </ul>

    <van-cell-group>
      <van-cell icon="records" title="我的订单" is-link />

      <van-cell icon="logistics" title="收货地址" is-link @click="toAddress" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview } from "vant";

import { Row, Col, Icon, Cell, CellGroup } from "vant";
import { Popup } from "vant";
Vue.use(ImagePreview);
Vue.use(Popup);
Vue.use(Cell)
  .use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Icon);
export default {
  data(){
    return{
      images: [
        'https://avatar.gitee.com/uploads/group/539678777172974.png',
      ],
  show:false
    }
    
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    toAddress() {
      this.$router.push("/address");
    },
    toCoupon() {
      this.$router.push("/coupon");
    },
    
  }
};
</script>
<style lang="scss" scoped>
.user-poster {
  height: r(150);
  display: block;
  position: relative;
  img {
    width: r(80);
    height: r(80);
    display: block;
    border-radius: 50%;
    margin: 0 auto;
    padding-top: r(50);
  }
}
.user-group {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-around;
  li {
    display: inline-block;
    text-align: center;
    span {
      color: #ccc;
      font-size: 12px;
    }
    p {
      margin-top: r(10);
      font-size: 18px;
    }
  }
}
.name {
  margin-top: r(20);
  font-size: 12px;
  text-align: center;
  margin-bottom: r(20);
}
.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
  .van-icon {
    display: block;
    font-size: 24px;
  }
}
</style>
