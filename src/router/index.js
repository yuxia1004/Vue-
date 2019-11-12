import Vue from "vue";
import VueRouter from "vue-router";
import params from "@/core/api/params";



Vue.use(VueRouter);



const routes = [{
  path: "/",
  name: "home",
  component: () => import("@/views/Home.vue"),
  redirect:"/index",
  children: [{
      path: "index",
      name: "index",
      component: () => import("@/components/index.vue"),
      meta: {
        title: "首页"
      }
    },
    {
      path: "list",
      name: "list",
      component: () => import("@/components/list.vue"),
      meta: {
        title: "商品列表",
      }
    },
    {
      path: "cart",
      name: "cart",
      component: () => import("@/components/cart.vue"),
      meta: {
        title: "购物车列表"
      }
    },
    {
      path: "user",
      name: "user",
      component: () => import("@/components/user.vue"),
      meta: {
        title: "用户详情"
      }
    },
    {
      path: "address",
      name: "address",
      component: () => import("@/components/address.vue"),
      meta: {
        title: "用户地址"
      },
      children: []
    },
    {
      path: "show",
      name: "show",
      component: () => import("@/components/show.vue"),
      meta: {
        title: "商品详情"
      }
    },
    {
      path: "ediadd",
      name: "ediadd",
      component: () => import("@/components/ediadd.vue"),
      meta: {
        title: "用户地址编辑"
      },
    },
    {
      path: "coupon",
      name: "coupon",
      component: () => import("@/components/coupon.vue"),
      meta: {
        title: "用户优惠券"
      },
    }
  ]
}];
const router = new VueRouter({
  // mode:"history",
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    if (params.userType === "index") {
      next({
        path: "/index"
      });
    } else if (params.userType === "list") {
      next({
        path: "/list"
      })
    } else if (params.userType === "test") {
      next({
        path: "/test"
      })
    }
  } else {
    next();
  }
});

export default router;