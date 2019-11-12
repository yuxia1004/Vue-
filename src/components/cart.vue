<template>
  <div class="hello">
    <div v-if="!this.cartList.length" class="zero">
      <h1>购物车是空滴哦 (●ﾟωﾟ●)</h1>
    </div>
    <div>
      <van-card
        :num="item.num"
        :price="item.CurrentPrice"
        :desc="item.Size"
        :title="item.Name"
        :thumb="item.ImgUrl"
        v-for="(item,index) in cartList"
        :key="index"
        :centered="true"
      >
        <div slot="tag">
          <van-checkbox v-model="item.check" @change="count" :name="item.ID">
            <img
              slot="icon"
              slot-scope="props"
              :src="props.checked ? activeIcon : inactiveIcon"
              style="width:50%"
              class="qwe"
            />
          </van-checkbox>
        </div>

        <div class="toshow" slot="tag" @click="toPath(item)"></div>

        <div slot="footer" class="footer">
          <span @click="minus(item)">-</span>
          <span @click="add(item)">+</span>
        </div>
      </van-card>

      <van-submit-bar :price="allPrice*100" button-text="结算">
        <van-checkbox v-model="check" @click="allCheck">
          <img
            slot="icon"
            slot-scope="props"
            :src="props.checked ? activeIcon : inactiveIcon"
            style="width:20px;margin-left:15px"
            class="qwe"
          />
          全选
        </van-checkbox>
        <button @click="clearList" class="clearList fs14">清空</button>
      </van-submit-bar>
    </div>
  </div>
</template>



<script>
import Vue from "vue";
import { Card } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
import { Cell, CellGroup } from "vant";
import { SubmitBar } from "vant";
import { Stepper } from "vant";
import { Dialog } from "vant";
import Store from "storejs";
Vue.use(Stepper);
Vue.use(SubmitBar);
Vue.use(Cell).use(CellGroup);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Card);
export default {
  data() {
    return {
      cartList: [],
      num: 1,
      list: [6],
      activeIcon:
        "https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg",
      inactiveIcon:
        "https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg",
      allPrice: 0,
      isArr: [],
      check: false,
      show: false,
    };
  },
  mounted() {
    this.$store.state.showBottomNav = true;
    this.cartList = this.$store.state.cartList;
    this.count();
  },
  methods: {
    add(item) {
      item.num++;
      this.count();
    },
    clearList() {
      Dialog.confirm({
        title: "",
        message: "确定清空购物车？"
      })
        .then(() => {
          this.cartList = [];
          this.$store.commit("clearall");
        })
        .catch(() => {
          // on cancel
        });
    },
    minus(item) {
      if (item.num > 1) {
        item.num--;
        this.count();
      } else {
        Dialog.confirm({
          message: "是否将" + item.Name + "移出购物车？"
        })
          .then(() => {
            this.cartList.map((ite, index) => {
              if (item.Name === ite.Name) {
                this.cartList.splice(index, 1);
                Store.set("cartList",this.cartList)
              }
            });
            this.count();
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    add(item) {
      item.num++;
      this.count();
    },
    allCheck() {
      if (!this.check) {
        this.check = !this.check;
        this.cartList.map(item => {
          item.check = true;
        });
      } else {
        this.check = !this.check;
        this.cartList.map(item => {
          item.check = false;
        });
      }
    },
    count() {
      this.allPrice = 0;
      this.isArr = [];
      this.cartList.map(item => {
        if (item.check) {
          this.allPrice += item.CurrentPrice * item.num;
          this.isArr.push(item);
        }
      });
      if (this.isArr.length == this.cartList.length) {
        this.check = true;
      } else {
        this.check = false;
      }
    },
    toPath(item) {
      this.$router.push({
        path: "/show",
        query: {
          SupplyNo: item.SupplyNo,
          Name: item.Name,
          ID: item.ID,
          ImgUrl: item.ImgUrl,
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.van-submit-bar {
  bottom: 50px;
}
.van-button--danger {
  color: #fff;
  background-color: #02d4d7;
  border: 1px solid #02d4d7;
}
.van-card__tag {
  position: absolute;
  top: 37px;
  left: -20px;
}
.van-card__thumb {
  position: relative;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  width: r(90);
  height: 90px;
  margin-right: 8px;
  left: 20px;
}
.addcut {
  position: absolute;
  right: r(10);
  bottom: r(5);
}
.van-card {
  position: relative;
  box-sizing: border-box;
  padding: r(8) r(16);
  color: #323233;
  font-size: 12px;
  background-color: #fff;
  border-bottom: r(15) solid rgb(247, 247, 247);
}
.van-card__content {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: r(90);
  margin-left: r(15);
}
// .van-checkbox__icon--round {
//   margin-right: -20px;
//   margin-left: r(15);
//   width: r(40);
// }
.clearList {
  font-weight: 300;
  margin-left: r(10);
}
.zero {
  height: 50px;
  background-color: white;
  h1 {
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    font-weight: 300;
  }
}
.hello {
  min-height: 580px;
  background-color: rgb(247, 247, 247);
}
.footer {
  font-size: 20px;
}
.toshow {
  position: absolute;
  height: 60px;
  width: 60px;
  top: -20px;
  left: 48px;
}
</style>