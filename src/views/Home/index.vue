<template>
<section class="overflow-x-hidden relative w-full h-full pb-10 ">
   <div class="pt-5 flex justify-end items-center px-3  w-full">
    <div v-if="userInfo?.real_name" class="w-10 h-10 rounded bg-[#bde59f] text-center leading-10 text-white font-medium text-lg"> {{userInfo?.real_name[0]}}</div>
   </div>
   <div class="w-full px-3">
    <div class="flex items-center space-x-1 text-[#a3a7aa] text-sm tracking-wide">
      <span>总资产估值</span>
      <div @click="toggleShowMoney" class="pt-1">
       <van-icon v-if="isShowMoney" name="eye-o" color="#303437" size="20" />
       <van-icon v-else name="closed-eye" color="#303437" size="20" />
      </div>
    </div>
    <div class="py-2 text-2xl font-bold text-[#303437]">
      <span v-if="isShowMoney"> 40.00 </span>
      <span v-else> **** </span>
      <span class="text-base">CNY</span>
    </div>
    <section class="w-full py-3 relative flex items-center justify-between space-x-3">
      <div @click="goWithdraw(1)" class="flex-1 active_btn py-3 text-base font-semibold text-[#303437]  tracking-wide flex items-center justify-center">
        提现
      </div>
      <div @click="goWithdraw(2)" class="flex-1 un_active py-3 text-base font-semibold text-[#7bc3e7]  tracking-wide flex items-center justify-center">
        充值
      </div>
    </section>
    <section class="w-full  relative py-4 rounded">
     <div class="w-full relative rounded">
        <van-swipe
          :autoplay="3000"
          lazy-render
          indicator-color="#edf1f3"
          class="h-48 relative w-full"
        >
          <van-swipe-item v-for="(image, index) in 4" :key="index" >
            <img :src="`https://www.yl59866.com/static/img/banner2.d8379aca.jpg`" class="h-full rounded w-full object-cover" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </section>
    <section class="pt-3">
      <span class="text-[#303437] font-medium tracking-wide text-lg">系统专区</span>
    </section>

    <section  class="py-3 w-full   space-x-3">
      <van-row  gutter="8">
      <van-col v-for="cate in categoryData" :key="cate?.id"  span="12" class="w-full">
      <div   @click="goCategory(cate?.c_id,cate?.title)" class="flex-1   flex flex-col mb-2 w-full justify-center items-center bg-[#edf1f3] shadow rounded-md h-28">
       <img src="@/assets/Handshake.svg" alt="logo" class="w-10">
        <span class="mt-1">{{cate?.title}}</span>
      </div>
      </van-col>
      </van-row>
      <!-- <div @click="goCategory(2)" class="flex-1 flex flex-col justify-center items-center bg-[#edf1f3] shadow rounded-md h-28">
        <img src="@/assets/Handshake.svg" alt="logo" class="w-10">
        <span>分类二</span>
      </div> -->
    </section>

    <!-- <section class="py-3 w-full flex items-center justify-between space-x-3">
      <div @click="goCategory(3)" class="flex-1 flex flex-col justify-center items-center bg-[#edf1f3] shadow rounded-md h-28">
       <img src="@/assets/Handshake.svg" alt="logo" class="w-10">
        <span>分类三</span>
      </div>
      <div @click="goCategory(4)" class="flex-1 flex flex-col justify-center items-center bg-[#edf1f3] shadow rounded-md h-28">
        <img src="@/assets/Handshake.svg" alt="logo" class="w-10">
        <span>分类四</span>
      </div>
    </section> -->

    <section class="flex items-center justify-between">
      <span class="text-[#303437] font-medium tracking-wide text-lg">新闻中心</span>
      <div @click="goList" class="flex items-center text-sm text-[#a3a7aa]">
        <span>查看更多</span>
        <van-icon name="arrow" color="#a3a7aa" size="16" />
      </div>
    </section>

    <section class="py-3 relative w-full">
      <div v-for="new_data in new_list_data" :key="new_data.n_id" @click="goDetail" class="flex shadow mb-3 rounded-md bg-[#edf1f3] h-40 px-3 space-x-4 text-[#303437]">
        <img src="@/assets/Handshake.svg" alt="img" class="w-20">
        <div class="w-[70%] flex flex-col  py-3 text-sm space-y-1 h-full relative">
          <span class="w-full text-ellipsis overflow-hidden whitespace-nowrap">{{new_data?.title}}</span>
          <span class="w-full">{{new_data?.content}}</span>
        <div class="absolute bottom-3 w-full text-[#a3a7aa] tracking-wider">
          {{new_data?.date}}
          </div>
        </div>
      </div>
    </section>

   </div>
  </section>
</template>

<script setup>
 import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useStore} from 'vuex'
import { showToast, showLoadingToast, closeToast } from "vant";
import allApi from "@/network/allApi.js";
import globaljs from "@/utils/global";

const router = useRouter();
const route = useRoute();
const store = useStore()
const pageSize = ref(10)
const currentPage = ref(1)
const totalPage = ref(1);
const new_list_data = ref(null)
const isShowMoney = computed(() => store.getters["app/IsShowMoney"]);
const loginInfo = computed(()=> store.getters["app/LoginData"])
const categoryData = computed(()=> store.getters["app/CategoryData"])

const userInfo = computed(() => store.getters["app/UserInfo"]);


const toggleShowMoney = () => {
  console.log(isShowMoney.value)
  store.commit("app/Is_Show_Money",isShowMoney.value)   //切换显示金额
}
 const goWithdraw = (number) => {
  switch (number) {
    case 1:
         if(userInfo.value?.is_bind_cash_password == 0){
             showToast({
               message:'请先设置支付密码',
               duration:2000,
            })
          setTimeout(() => {
            router.push('/change-payment-pass')
          }, 1000);
          return
        }
        if(userInfo.value?.isRealName == 0){
            showToast({
               message:'请先绑定实名认证',
               duration:2000,
            })
          setTimeout(() => {
            router.push('/authentication')
          }, 1000);
          return
         }
      router.push('/withdraw')
      break;
    case 2:
         if(userInfo.value?.is_bind_cash_password == 0){
             showToast({
               message:'请先设置支付密码',
               duration:2000,
            })
          setTimeout(() => {
            router.push('/change-payment-pass')
          }, 1000);
          return
        }
        if(userInfo.value?.isRealName == 0){
            showToast({
               message:'请先绑定实名认证',
               duration:2000,
            })
          setTimeout(() => {
            router.push('/authentication')
          }, 1000);
          return
         }
      router.push('/recharge')
      break;
  
    default:
      break;
  }
 }
 const goList = () => {
  router.push('/newlists')
 }
 const goCategory = (cid,title) => {
    router.push({path:'/category',query:{cid:cid,title:title}});
 }
  const goDetail = () => {
   router.push('/new-details')
 }



 const GetNewList = async () => {
  let data = {
    "pageSize":pageSize.value,
    "currentPage":currentPage.value
  }
    try {
    const res = await allApi.GetNewListApi(data);
    console.log(res)
    if (res?.data?.success && res?.data?.code == 200) {
     // store.commit("app/CATEGORY_DATA",res?.data?.data)   //切换显示金额
     new_list_data.value = res?.data?.data?.record
    }
  } catch (error) {
    console.log(error);
  }
 }

 onMounted(()=> {
  globaljs.Get_Category()
  GetNewList()
  //GetAssest()
  globaljs.Get_UserInfo()

 })
</script>

<style scoped>
.active_btn {
border-radius: 6px;
background: #edf1f3;
box-shadow: inset 5px 5px 5px #d5d9db,
            inset -5px -5px 5px #ffffff;
}
.un_active {
  border-radius: 6px;
  background: linear-gradient(145deg, #d5d9db, #feffff);
  box-shadow: 7px 7px 13px #dce0e2, -7px -7px 13px #feffff;
}
</style>