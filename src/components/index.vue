<template>
  <div class="hello">
    <div id="title">
      <p>福原爱甜点</p>
    </div>
    <div v-if="SwiperBannerList.length !== 0" id="banner_index">
      <swiper
        :config="{id:'banner',info:{pagination:'.swiper-pagination',autoplay:3000}}"
        id="banner"
      >
        <div class="swiper-slide" v-for="(item,index) in SwiperBannerList" :key="index">
          <img class="banner_img" :src="item.ImgUrl" />
        </div>
      </swiper>
    </div>
    <img src="../../public/img/title.png" id="tit" />
    <div class="center_ad">
      <img :src="pic" />
    </div>

    <div>
      <ul id="choose">
        <li v-for="(item,index) in TopIconList" :key="index" @click="toPath(item)">
          <img :src="item.ImgUrl" alt />
          <span>{{item.ActName}}</span>
        </li>
      </ul>
    </div>
    <div class="notice_wrap">
      <p>通知</p>
      <van-notice-bar :text="NoticeList"  color="#1db0b8" background="white" class="notice" />
    </div>
    

    <div style="padding:0px 11px;">
      <ul id="centerList">
        <li v-for="(value,idi) in CenterContentList" :key="idi">
          <img :src="value.ImgUrl" alt />
        </li>
      </ul>
    </div>
    <div>
      <div v-for="(item,index) in SaleList" :key="index" id="all_main" >
        <img class="title_img" :src="item.TabImgUrl" alt @click="toList()"/>
        <div id="swiper_list">
          <swiper :config="{id:'banner'+index,info:{slidesPerView: 2.2,spaceBetween:15}}">
            <div class="swiper-slide" v-for="(item,index) in item.CakeList" :key="index" @click="toPath(item)"> 
              <img class="banner_img" :src="item.ImgUrl" />
              <span class="goods_name fs14">{{item.Name}}</span>
              <div class="goods_info">
                <span class="goods_price fs16">
                  <span class="fs14" style="margin: 0px -3px;">￥</span>
                  {{item.Price}}
                </span>
                <span class="goods_size fs14">
                  <span class="fs14" style="margin: 0px -3px;">/</span>
                  {{item.Size}}
                </span>
              </div>
            </div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      SwiperBannerList: [],
      SaleList: [],
      TopIconList: [],
      CenterContentList: [],
      pic: "",
      NoticeList: ""
    };
  },
  mounted() {
    this.$store.state.showBottomNav = true;
    this.$apis.getIndexData().then(res => {
      // var pic = res.AbsoluteBannerList;

      var res = res.data.Tag.mainresult;
      var pic = res.AbsoluteBannerList[0].ImgUrl;
      var CenterContentList = res.CenterContentList;
      var TopIconList = res.TopIconList;
      var SaleList = res.SaleList;
      var NoticeList = res.NoticeList;
      SaleList.map(item => {
        item.CakeList = JSON.parse(item.CakeList);
        item.CakeList.map(item => {
          item.ImgUrl = this.$global.setImgUel(item);
          //  console.log(SaleList)
        });
      });
      this.CenterContentList = CenterContentList;
      this.TopIconList = TopIconList;
      this.SaleList = SaleList;
      this.SwiperBannerList = res.SwiperBannerList;
      this.pic = pic;
      this.NoticeList = NoticeList;
    });
  },
  methods: {
    toPath(item){
      this.$router.push({path:"/show",query:{SupplyNo:item.SupplyNo,Name:item.Name,ID:item.ID,ImgUrl:item.ImgUrl}})
    },
    toList(){
      this.$router.push("/list")
    }
  },
  
}

</script>
<style lang="scss" scoped>
.hello {
  margin-bottom: 50px;
}
#title {
  padding: 0 r(10);
  height: r(44);
  margin: 0 auto;
  p {
    font-size: 22px;
    line-height: r(44);
    color: pink;
    letter-spacing: 0;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888;
  }
}
#banner_index {
  padding: 0 15px;
  #banner {
    height: r(180);
    border-radius: 8px;
    border: none;
    margin: 0 auto;
    .banner_img {
      width: 100%;
      height: 100%;
    }
  }
}

#tit {
  width: 100%;
  vertical-align: middle;
}
.center_ad {
  margin: 0 auto;
  padding: 0 r(12);
  img {
    width: 100%;
    height: 100%;
  }
}
#choose {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: r(10);
  margin: 0 auto;
  li {
    width: 25%;
    text-align: center;
    margin: r(10) 0;
    img {
      width: r(52);
      height: r(52);
      margin-bottom: r(10);
    }
    span {
      display: block;
    }
  }
}
#centerList {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-around;
  padding: 4px 0;
  border-bottom:r(8) solid #FAFAFA;
  li {
    width: 47%;
    text-align: center;
    margin: 5px 0px;
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
  }
}
.title_img {
  width: 100%;
  height: r(142);
}
#swiper_list {
  height: r(250);
  padding: 0 15px;
  .swiper-container {
    height: r(256);
    border: none;
    .swiper-slide {
      width: 50%;
      height: 80%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin: r(10) r(6) 10px r(6) !important;
      padding: r(11) 0;
      img {
        width: 78%;
        height: 59%;
        transform: translate(15%, 0);
      }
      .goods_name {
        display: block;
        width: r(118);
        height: r(35);
        line-height: r(20);
        margin: r(10) auto;
        overflow: hidden;
        text-align: center;
        color: #333;
        font-weight: 600;
      }
      .goods_info {
        margin: 0 auto;
        padding: 0 r(17);

        width: r(110);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .goods_price {
          color: #cc2825;
        }
        .goods_size {
          color: #999;
        }
      }
    }
  }
}
#all_main {
  padding-bottom: r(21);
  background: #FAFAFA;
}
.notice_wrap{
  position: relative;
  width: 100%;
  line-height: r(20);
  overflow: hidden;
  border-top:r(8) solid #FAFAFA;
  border-bottom:r(8) solid #FAFAFA;
  p{
    float: left;
    height: r(20);
    line-height: r(20);
    margin: r(9) 0 0 3%;
    width: r(35);
    text-align: center;
    border-radius: 3px;
    color: white;
    background: #1db0b8;
  }
  .notice{
    width: 82%;
    float: right;
    padding: 0 8px;
  }
}
</style>

