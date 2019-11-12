<template>
  <div>
    <van-nav-bar
  title="更换地址"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    <van-address-list
  v-model="chosenAddressId"
  :list="list"
  :disabled-list="disabledList"
  disabled-text="以下地址超出配送范围"
  @add="onAdd"
  @edit="onEdit"
/>

  

  </div>
</template>

<script>
import Vue from 'vue';
import { AddressList } from 'vant';
import { NavBar } from 'vant';

Vue.use(NavBar);
Vue.use(AddressList);
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },

    methods: {
    onAdd() {
      this.$router.push({path: "/ediadd",})
    },

    onEdit(item, index) {
      this.$router.push({path: "/ediadd",})
    },
     onClickLeft() {
      this.$router.push("/user")
    }
  }
}

</script>
<style lang="scss" scoped>
  .van-button--danger {
    color: #fff;
    background-color: #02d3d6;
    border: 1px solid  #02d3d6;
  }
</style>