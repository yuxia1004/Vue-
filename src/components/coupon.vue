<template>
  <div>
    <van-nav-bar
  title="优惠券"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    <!-- 优惠券单元格 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { CouponCell, CouponList } from "vant";
import { Icon } from 'vant';
import { NavBar } from 'vant';

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(CouponCell).use(CouponList);
export default {
  data() {
    return {
      showList:false,
      chosenCoupon: -1,
      coupons: [
        {
          available: 1,
          condition: "无使用门槛\n最多优惠100元",
          reason: "",
          value: 10000,
          name: "优惠券名称",
          startAt: 1589104000,
          endAt: 1614592000,
          valueDesc: "100",
          unitDesc: "元"
        }
      ],
      disabledCoupons: [{
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 150,
          name: "优惠券名称",
          startAt: 1589104000,
          endAt: 1714592000,
          valueDesc: "1.5",
          unitDesc: "元"
        }]
    };
  },

  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    onClickLeft() {
      this.$router.push("/user")
    }
  }
};
</script>
