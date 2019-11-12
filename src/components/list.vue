<template>
  <div class="hello">
    <van-tabs
      v-model="active"
      @click="selecData()"
      title-active-color="#1db0b8"
      title-inactive-color="black"
      line-width="50%"
      color="#1db0b8"
    >
      <van-tab title="自营">
        <van-tabs v-model="active1" @click="selectGoods()" color="#1db0b8" line-height="5px">
          <van-tab :title="item.title" v-for="(item,index) in listData" :key="index">
            <ul id="goodlist">
              <li v-for="(item,index) in goodsData" :key="index">
                <img :src="item.ImgUrl" @click="toPath(item)" />
                <div class="goods_info">
                  <p class="fs14">{{item.Name}}</p>

                  <span class="means fs12">{{item.Means}}</span>

                  <span class="price fs16">
                    <span class="fs14" style="margin: 0px -3px;">￥</span>
                    {{item.CurrentPrice}}
                  </span>

                  <span class="size">
                    <span class="fs12" style="margin: 0px -3px;">/</span>
                    {{item.Size}}
                  </span>

                  <div class="cart" @click="add(item)">
                    <img src="../../public/img/list-cart.png" alt />
                  </div>
                </div>
              </li>
            </ul>
          </van-tab>
        </van-tabs>
      </van-tab>
      <van-tab title="贝式严选">
        <van-tabs v-model="active2" color="#1db0b8">
          <van-tab :title="value.title" v-for="(value,ind) in listData" :key="ind">
            <ul id="goodlist">
              <li v-for="(item,index) in ysGoodsData" :key="index">
                <img :src="item.ImgUrl" alt @click="toPath(item)" />
                <div class="goods_info">
                  <p class="fs14">{{item.Name}}</p>
                  <span class="means fs12">{{item.Means}}</span>
                  <div class="price_size">
                    <span class="price fs16">
                      <span class="fs14" style="margin: 0px -3px;">￥</span>
                      {{item.CurrentPrice}}
                    </span>
                    <span class="size">
                      <span class="fs12" style="margin: 0px 9px;">/</span>

                      {{item.Size}}
                    </span>
                    <div class="cart">
                      <img src="../../public/img/list-cart.png" alt />
                      <!-- <button @click="add(item)">1231231</button> -->
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>

    <div class="jg-gonggao">
      <div class="jg-gonggao1">
        <div class="jg-text-z fs14">划线价格</div>
        <div class="jg-text-y fs14">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
      </div>
      <div class="jg-gonggao1">
        <div class="jg-text-z fs14">未划线价格</div>
        <div
          class="jg-text-y fs14"
        >商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  data() {
    return {
      active: 0,
      active1: 0,
      active2: 1,
      goodsList: [
        { title: " 女神", mark: "NS", list: [] },
        { title: "经典", mark: "KSK", list: [] },
        { title: "伴手礼", mark: "JZ", list: [] },

        { title: "乳品", mark: "RP", list: [] }
      ],
      listData: [],
      goodsData: [],
      ysGoodsData: []
    };
  },
  mounted() {
    this.$store.state.showBottomNav = true;
    this.pageInit();
  },
  methods: {
    pageInit() {
      this._getListData(res => {
        var res = res.data.Tag.cakelist;
        this.goodsList.map((item, index) => {
          res.map(it => {
            if (it.SupplyNo.indexOf(item.mark) !== -1) {
              item.list.push(it);
              it.ImgUrl = this.$global.setImgUel(it);
            }
          });
        });
      });
      this.selecData();
      this.selectGoods();
    },
    selecData() {
      if (this.active === 0) {
        this.listData = this.goodsList.slice(0, 3);
      } else if (this.active === 1) {
        this.listData = this.goodsList.slice(3);
        this.ysGoodsData = this.goodsList[3].list;
      }
    },
    selectGoods() {
      this.goodsData = [];
      if (this.active1 === 0) {
        this.goodsData = this.listData[0].list;
      } else if (this.active1 === 1) {
        this.goodsData = this.listData[1].list;
      } else if (this.active1 === 2) {
        this.goodsData = this.listData[2].list;
      }
      if (this.active === 1) {
        this.goodsData = this.listData[3].list;
      }
    },
    add(item) {
      var temp = {
        SupplyNo: item.SupplyNo,
        ID: item.ID,
        Name: item.Name,
        CurrentPrice: item.CurrentPrice,
        ImgUrl: item.ImgUrl,
        Size: item.Size,
        check: true
      };

      this.$store.commit("add", temp);
      Toast({
        message: item.Name + "加入购物车成功！",
        duration: 1500
      });
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
    },
    _getListData(callBack) {
      this.$apis.getListData().then(res => {
        callBack(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.hello {
  margin-bottom: r(70);
}
#goodlist {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: flex-start;

  li {
    width: 43%;
    margin-left: r(20);
    img {
      width: 100%;
      height: 65%;
    }
    .goods_info {
      p {
        color: #333;
        margin-top: -8px;
      }
      .means {
        display: block;
        color: #999;
        width: 82%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: r(5) 0 r(5) r(1);
      }
      .price_size {
        height: 100px;
      }
      .price {
        color: rgb(255, 51, 0);
      }
      .size {
        color: #999;
      }
      .cart {
        width: r(25);
        float: right;
        img {
          width: 100%;
        }
      }
    }
  }
}
.jg-gonggao1 {
  clear: both;
  line-height: r(23);
  margin-bottom: r(20);
  overflow: hidden;
  padding-left: r(18);
  .jg-text-z {
    float: left;
    color: #181818;
    width: 23%;
    display: inline-block;
  }
  .jg-text-y {
    margin-left: r(20);
    float: left;
    color: #a2a2a2;
    width: 70%;
  }
}
</style>