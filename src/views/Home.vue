<template>
  <div class="home">
    <router-view />

    <van-tabbar route v-if="$store.state.showBottomNav" >
      <van-tabbar-item replace to="/index">
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/list">
        <img slot="icon" slot-scope="props" :src="props.active ? icon2.active : icon2.inactive" />
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/cart"
        :info="$store.state.cartList.length? $store.state.cartList.length:''"
      >
        <img slot="icon" slot-scope="props" :src="props.active ? icon3.active : icon3.inactive" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/user" @click="showPopup">
        <img slot="icon" slot-scope="props" :src="props.active ? icon4.active : icon4.inactive" />
      </van-tabbar-item>
    </van-tabbar>

    <!-- 切换路由组件 -->
    <van-popup
      v-model="show"
      position="right"
      class="login"
      closeable
      close-icon-position="top-left"
    >
      <h1 class="tit">快速登录</h1>
      <van-cell-group>
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" style="color:white" />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          ref="pwd"
          style="color:white"
        />
      </van-cell-group>
      <p class="agree">
        温馨提示：未注册的手机号，登录时将自动注册，且代表您已同意
        <span>《用户协议》</span>
      </p>
      <van-button round type="info" @click="login">登录</van-button>
      <van-button round type="info" @click="register">注册</van-button>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Field } from "vant";
import { Button } from "vant";
import Store from "storejs";
import { Toast } from "vant";
import { Popup } from "vant";

Vue.use(Popup);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Field);
export default {
  data() {
    return {
      icon: {
        active: "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-2.png",
        inactive: "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-1.png"
      },
      icon2: {
        active: "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-2.png",
        inactive: "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png"
      },
      icon3: {
        active: "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-2.png",
        inactive: "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-1.png"
      },
      icon4: {
        active: "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-2.png",
        inactive: "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-1.png"
      },
      show: false,
      phone: "",
      password: "",
      userList: []
    };
  },
  mounted() {
    this.userList = this.$store.state.userList;
    this.show = false;
  },
  methods: {
    showPopup() {
      this.show = !this.show;
    },
    login() {
      var cloudList = Store.get("userList") || [];
      var len = cloudList.length;
      var index = 0;
      if (len >= 1) {
        for (let i = 0; i < len; i++) {
          if (this.phone === cloudList[i].uname) {
            index = i;
            if (this.password === cloudList[index].upwd) {
              Toast("登录成功！");
              this.$store.state.showUser = true;
              this.show = false;
            } else {
              Toast("密码错误！");
            }
          } else {
            Toast("您还没有注册！请先注册~");
          }
        }
      }
    },
    register() {
      var cloudList = Store.get("userList") || [];
      var len = cloudList.length;
      if (len >= 1) {
        for (let i = 0; i < len; i++) {
          if (this.phone === cloudList[i].uname) {
            Toast("该用户已存在！");
            return;
          }
          this.userList.push({ uname: this.phone, upwd: this.password });
          Store.set("userList", this.userList);
          Toast("注册成功！请登录");
          return;
        }
      } else {
        this.userList.push({ uname: this.phone, upwd: this.password });
        Store.set("userList", this.userList);
        Toast("注册成功！");
        return;
      }
    }
  } 
};
</script>
<style lang="scss" scoped>
.van-tabbar-item__icon {
  display: flex;
  justify-content: space-around;
  img {
    width: 35px;
    height: 100%;
    margin: 0 auto;
  }
}
.van-tabbar-item {
  margin-top: 4px !important;
}

.login {
  background-image: linear-gradient(45deg, #345, transparent);
  z-index: 2004;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
.van-cell {
  background: rgba($color: #000, $alpha: 0.2) !important;
}
.tit {
  font-size: 32px;
  color: white;
  font-weight: 300;
  padding: 50px 0 10px 35px;
}
.van-hairline--top-bottom::after {
  border: none;
}
.agree {
  color: white;
  padding: 0 5px 0 15px;
  line-height: 20px;
  span {
    color: rgb(14, 144, 210);
  }
}
.van-button--normal {
  padding: 0 40px;
  font-size: 18px;
  height: r(35);
  line-height: r(35);
  background: transparent;
  border-color: white;
  font-weight: 300;
  margin-left: 11%;
  margin-top: 20px;
}
</style>
