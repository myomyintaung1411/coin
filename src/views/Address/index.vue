<template>
  <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 银行卡包 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section v-if="bankAddress.length == 0 || usdtAddress.length == 0" class="pt-20">
      <div class="flex flex-col justify-center items-center">
        <img src="@/assets/no-card.png" alt="nocard" class="w-28" />
        <p class="pt-2 text-sm tracking-wider text-[#a3a7aa]">
          你暂无绑定记录,快去绑定吧~
        </p>
      </div>
    </section>
    <section v-else class="px-2 py-2">
        <div v-for="bank in bankAddress" :key="bank?.id" class="active_btn not_round py-2 px-2 mb-3">
          <div class="flex items-center justify-between px-2 py-2  border-b text-[#303437]">
            <span>AddressType</span>
            <span class="text-[#41a7d8]">Bank</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2  border-b text-[#303437]">
            <span>银行名称</span>
            <span class="text-[#41a7d8]">{{bank?.bank_name}}</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2 border-b">
            <span>银行账号</span>
            <span class=" text-ellipsis overflow-hidden max-w-[66%] text-[#41a7d8]">{{bank?.card_code}}sdfdsfsdfsdfdsfdsfdsfdsfdssfsdfdf</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2">
            <span>支行地址</span>
            <span class="text-[#41a7d8]">{{bank?.bank_address}}</span>
          </div>
        </div>
        <div v-for="usdt in usdtAddress" :key="usdt?.id" class="active_btn not_round py-2 px-2 mb-3">
          <div class="flex items-center justify-between px-2 py-2  border-b text-[#303437]">
            <span>AddressType</span>
            <span class="text-[#41a7d8]">USDT</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2  border-b text-[#303437]">
            <span>USDT名称</span>
            <span class="text-[#41a7d8]">{{usdt?.type}}</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2">
            <span>USDT地址</span>
            <span class="text-[#41a7d8]">{{usdt?.addr}}</span>
          </div>

        </div>
    </section>
  </section>
  
  <div  v-if="bankAddress.length == 0"
    class="absolute bottom-24 text-white tracking-wider flex items-center justify-center h-12 text-center w-full px-7"
  >
    <van-button @click="bindBank" block type="primary" color="#41a7d8">提交申请</van-button>
  </div>
  <div v-if="usdtAddress.length == 0"  class="absolute bottom-10 tracking-wider h-11 text-center w-full px-7">
    <div @click="bindU"
      class="shadow_color w-full h-full text-[#41a7d8] flex items-center justify-center"
    >
      添加USDT地址
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import {useStore} from 'vuex'
import allApi from "@/network/allApi.js";
import { showToast, showLoadingToast, closeToast } from "vant";
import globaljs from "@/utils/global";

const router = useRouter();
const route = useRoute();
const store = useStore()

const bankAddress = computed(()=> store.getters["app/BankAddress"])
const usdtAddress = computed(()=> store.getters["app/UsdtAddress"])


 const goBack = () => {
   router.push('/home')
 }

 const bindBank = () => {
    router.push('/bindBank')
 }
 const bindU = () => {
    router.push('/bindUSDT')
 }

onMounted(  ()=>{
   globaljs.getBankAddress()
   globaljs.getUsdtAddress()
})


</script>

<style scoped>
.active_btn {
    
border-radius: 9999px;
background: #edf1f3;
box-shadow: inset 5px 5px 5px #d5d9db,
            inset -5px -5px 5px #ffffff;
}
.un_active {
  border-radius: 9999px;
  background: linear-gradient(145deg, #d5d9db, #feffff);
  box-shadow: 7px 7px 13px #dce0e2, -7px -7px 13px #feffff;
}
.not_round{
    border-radius: 8px;
}
</style>