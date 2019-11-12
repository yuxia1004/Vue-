import request from "./http";
import params from "./params";

var poxy = "/apis"

var url1 = "/json1811.ashx"
var url2 = "/user/topic"
class Apis {
   getIndexData() {
      return request({
         method: "GET",
         url:url1,
         params: {
            c: "NewIndexController",
            m: "index",
            v: params.v
         }
      })
   }

   getListData() {
      return request({
         method: "GET",
         url:url1,
         params: {
            c: "NsCakeCenter",
            m: "GetJdListNew",
            v: params.v
         }
      })
   }

   getShowDataOne(data) {
      return request({
         method: "GET",
         url:url1,
         params: {
            Name: data.Name,
            c: "NsCakeCenter",
            m: data.m,
            v: params.v
         }
      })
   }

   getShowDataTwo(data) {
      return request({
         method: "GET",
         url: url1,
         params: {
            City: data.City,
            ProName: data.ProName,
            c: data.c,
            m: data.m,
            v: params.v
         }
      })
   }

}
export default new Apis();