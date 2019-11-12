<template>
  <div class="hello">
    <van-swipe @change="onChange" indicator-color="white">
      <van-swipe-item v-for="(item,index) in swipers" :key="index">
        <img :src="banners+item+'.jpg'" class="goods_pic" @click="show=!show" />
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
      </van-swipe-item>
    </van-swipe>
    <van-image-preview
      v-model="show"
      :images="images"
      @change="onChange"
      :startPosition="startPosition"
      :swipeDuration="100000"
    ></van-image-preview>

    <span class="more" @click="toPath()">更多商品</span>

    <h1 class="goods_name fs16">{{params.Name}}</h1>

    <div class="good_info">
      <div v-if="isLoad" class="info_sweet info_kou">
        <div class="info">甜度</div>
        <img
          :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${info.Sweet||info.CakeType[0].Sweet}.png`"
          alt
        />
      </div>
      <div class="info_kou">
        <div class="info">口味</div>
        <p>{{info.CategoryName}}</p>
      </div>
      <div class="info_kou">
        <div class="info">原材料</div>
        <p>{{currentType.Resourse || info.Resource || info.Resourse}}</p>
      </div>
      <div class="info_kou">
        <div class="info">适合人群</div>
        <p>{{people||"所有人群"}}</p>
      </div>
      <div class="info_kou">
        <div class="info">保鲜条件</div>
        <p>{{info.KeepFresh||"最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。"}}</p>
      </div>
    </div>

    <div class="user_say">
      <div class="say1">
        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" />
        <span>商品评价</span>
      </div>

      <div class="say2">
        <span>(55)条</span>
        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png" />
      </div>
    </div>

    <div class="choose_size" v-for="(item,index) in types" :key="index">
      <button
        @click="userSelct(index)"
        class="choose"
        :class="{ liBackground:changeLeftBackground == index}"
      >{{item.Size}}</button>
    </div>
    <ul class="style_main">
      <li>
        <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112" />
        {{style.configpeople}}
      </li>
      <li>
        <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png?v=112" />
        {{style.configsize}}
      </li>
      <li>
        <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png?v=112" />
        {{style.configtips}}
      </li>
      <li>
        <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png?v=112" />
        {{style.configware}}
      </li>
    </ul>

    <div class="num">
      <span class="tit">购买数量</span>
      <div>
        <button class="fs18 cut" @click="cut">-</button>
        <span class="fs16 nums">{{num}}</span>
        <button class="fs18 addg" @click="add">+</button>
      </div>
    </div>

    <van-goods-action>
      <div>
        <span class="price">{{currentType.CurrentPrice*num}}.00</span>
      </div>
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" class="buy add" />
      <van-goods-action-button
        color="#02d4d7"
        type="danger"
        text="立即购买"
        class="buy"
        @click="isAdd"
      />
    </van-goods-action>

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
import { Dialog } from "vant";
export default {
  data() {
    return {
      params: {},
      // 轮播
      swipers: [1, 2, 3, 4],
      banners: "",
      current: 0,
      show: false,
      index: 0,
      startPosition: 0,
      images: [],
      goods: [],
      types: [],
      info: {},
      isLoad: false,
      currentType: {},
      num: 1,
      titImg: "",
      style: "",
      people: ""
    };
  },
  mounted() {
    this.$store.state.showBottomNav = false;
    this.params = this.$route.query;
    this.params.city = this.$store.state.city;
    this.pageInt();
    this.titImg = "https://res.bestcake.com/m-images/ww/detail/icon-custom-";
  },
  methods: {
    pageInt() {
      var currentPro;
      if (this.params.SupplyNo.indexOf("NS") !== -1) {
        this.banners = this.setImgUel("ns-detail");
        this.seePic();
        currentPro = this.$apis.getShowDataOne({
          Name: this.params.Name,
          m: "GetNSCakeByName"
        });
      } else if (this.params.SupplyNo.indexOf("KSK") !== -1) {
        this.banners = this.setImgUel("jd-detail");
        this.seePic();
        currentPro = this.$apis.getShowDataTwo({
          City: this.params.city,
          ProName: this.params.Name,
          c: "Product",
          m: "GetCakeByName"
        });
      } else if (this.params.SupplyNo.indexOf("JZ") !== -1) {
        this.banners = this.setImgUel("jz-detail");
        this.seePic();
        currentPro = this.$apis.getShowDataTwo({
          City: this.params.city,
          ProName: this.params.Name,
          c: "IndexCenter",
          m: "GetjzCakeInfo"
        });
      } else if (this.params.SupplyNo.indexOf("RP") !== -1) {
        this.banners = this.setImgUel("rp-detail");
        this.seePic();
        currentPro = this.$apis.getShowDataOne({
          Name: this.params.Name,
          m: "GetRuPCakeByName"
        });
      }
      currentPro.then(res => {
        // console.log(res);
        var res = res.data.Tag;
        if (res.length) {
          res.map(item => {
            if (item.City == this.params.city) {
              this.types.push(item);
            }
          });
          if (this.types.length === 0) {
            this.types = res;
          }
          this.info = this.types[0];
        } else {
          this.types = res.infos.CakeType;
          this.info = res.infos;
        }
        this.isLoad = true;
        this.userSelct(0);
        // console.log( this.info);
        // console.log( this.typs);
        // console.log(this.info.ProductConfig);
        // console.log(this.types[0]);
        // JSON.parse(this.types[0].Details).details_tips
        //   if(this.info.Details){
        //
        // }
      });
    },
    userSelct(index) {
      this.currentType = this.types[index];
      this.changeLeftBackground = index;
      if (this.types[index].ProductConfig) {
        this.style = JSON.parse(this.types[index].ProductConfig).pc;
      }
      // this.people = JSON.parse(this.types[index].Details).details_tips;
    },
    setImgUel(no) {
      return `https://res.bestcake.com/m-images/${no}/${this.params.Name}/${this.params.Name}-`;
    },

    onChange(index) {
      this.current = index;
      this.index = index;
      this.startPosition = this.current;
    },
    seePic() {
      this.swipers.map(item => {
        this.images.push(this.banners + item + ".jpg");
      });
    },
    add() {
      this.num++;
    },
    cut() {
      if (this.num > 1) {
        this.num--;
      }
    },
    toPath(item) {
      this.$router.push({path:"/list"});;
    },
    isAdd() {
      var temp = {
        SupplyNo:this.params.SupplyNo,
        ID: this.currentType.Id || this.currentType.ID,
        Name: this.params.Name,
        CurrentPrice: this.currentType.CurrentPrice,
        ImgUrl: this.params.ImgUrl,
        Size: this.currentType.Size,
        num: this.num,
        check:true
      };
      Dialog.confirm({
        title: "",
        message: "确定加入购物车吗？"
      })
        .then(() => {
         this.$store.commit("add",temp);
         this.$router.push({path:"/cart"});
         console.log(temp)
        })
        .catch(() => {
          // on cancel
        });

      // MessageBox.confirm("确认加入购物车?").then(action => {
      //   // console.log("run");
      //   this.$store.commit("add",temp);
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
.hello {
  margin-bottom: 40px;
}
.goods_pic {
  width: 100%;
}
.goods_name {
  line-height: r(16);
  font-weight: bold;
  color: #333;
  margin-top: r(4);
  margin-bottom: r(40);
  text-align: center;
}
.buy {
  border-radius: 0px;
  margin-right: 0;
}
.add {
  color: rgb(170, 170, 170);
}
.good_info {
  border-top: r(15) solid rgb(247, 247, 247);
  border-bottom: r(15) solid rgb(247, 247, 247);
  overflow: hidden;
  .info_sweet {
    margin-top: r(35);
    margin-bottom: r(20);
    img {
      width: r(84);
      float: left;
    }
  }
  .info_kou {
    clear: both;
    overflow: hidden;
    margin: r(25) 0;
  }
}
.user_say {
  border-bottom: r(15) solid rgb(247, 247, 247);
  overflow: hidden;
  padding: r(15) r(10);
  .say1 {
    float: left;
    span {
      font-size: 14px;
      margin-left: r(10);
    }
    img {
      width: 20%;
      vertical-align: middle;
    }
  }
  .say2 {
    float: right;
    span {
      font-size: 14px;
      color: #999;
      margin-right: 5px;
    }
    img {
      width: 16%;
      vertical-align: middle;
    }
  }
}

.info {
  width: 25%;
  color: #9a9a9a;
  margin-left: r(16);
  font-size: 14px;
  float: left;
  line-height: normal;
  font-weight: 300;
}
p {
  width: 68%;
  float: left;
  color: #252525;
  font-size: 14px;
  line-height: r(20);
  font-weight: 300;
}
.choose_size {
  margin-top: r(30);
  .choose {
    background: white;
    border-radius: 2px;
    color: #333;
    border: 1px solid #ddd;
    float: left;
    font-size: 14px;
    text-align: center;
    line-height: r(18);
    padding: 0 r(13);
    height: r(28);
    margin-left: r(15);
  }
}
.num {
  padding: 15px 0;
  margin: 5px 0;
  border-top: r(15) solid rgb(247, 247, 247);
  overflow: hidden;
  .tit {
    font-size: 14px;
    color: #333;
    font-weight: 300;
    padding-left: r(15);
    line-height: r(24);
  }
  div {
    float: right;
    .cut {
      margin-right: r(8);
    }
    .addg {
      margin-left: r(8);
      margin-right: r(10);
    }
    .nums {
      width: r(10);
      display: inline-block;
    }
  }
}
.jg-gonggao {
  background: rgb(247, 247, 247);
  padding-bottom: r(20);
  padding-top: r(30);
}
.jg-gonggao1 {
  clear: both;
  line-height: r(23);
  margin-bottom: r(20);
  overflow: hidden;
  padding-left: r(18);
  background: rgb(247, 247, 247);
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
.price {
  font-size: 18px;
  color: #f2495e;
  font-weight: bolder;
  width: r(120);
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 15px;
  font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", FontAwesome, sans-serif;
}
.liBackground {
  background: #02d3d6 !important;
  color: #fff !important;
}
.style_main {
  clear: both;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: r(30) r(15) r(30) r(15);
  li {
    width: 46%;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: r(15);
    img {
      width: 11%;
      margin-right: r(10);
    }
  }
}
.more {
  position: fixed;
  font-size: 16px;
  font-weight: 300;
  background: rgba($color: #fff, $alpha: 0.5);
  right: 0;
  top: r(20);
  padding: r(8) r(8);
  border: 1px solid black;
  border-radius: 5px 0 0 5px;
  border-right: none;
}
</style>