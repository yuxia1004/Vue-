import directive from "./directiev.js";
import Apis from "@/core/api/apis.js";
import Common from "../components/common/index.js";
import 'vant/lib/index.css';
import {
  NoticeBar
} from 'vant';
import Global from "@/core/global"
import {Tabbar,TabbarItem} from 'vant';
import {Tab,Tabs} from 'vant';
import {
  Icon
} from 'vant';
import {
  Swipe,
  SwipeItem
} from 'vant';
import {
  ImagePreview
} from 'vant';
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';














export default (Vue) => {
  // console.dir(Vue);
  directive(Vue);
  Common(Vue);
  Vue.prototype.$eventBus = new Vue();
  Vue.prototype.$apis = Apis;
  Vue.prototype.$global = Global;
  Vue.use(NoticeBar);
  Vue.use(Tabbar).use(TabbarItem);
  Vue.use(Tab).use(Tabs);
  Vue.use(Icon);
  Vue.use(Swipe).use(SwipeItem);
  Vue.use(ImagePreview);
  Vue
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton);
  

}