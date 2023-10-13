<template>
    <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 系统等级 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
        <div class="py-5 text-base text-center flex flex-col justify-center items-center">
            <span class="text-2xl font-bold">{{usdtInfo?.money?.toFixed(2)}}</span>
            <span>可提金额(元)</span>
            <div class="flex items-center space-x-1 ">
                <span>当前汇率:</span>
                <span>1:{{usdtInfo?.rate}}</span>
            </div>
        </div>

         <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">兑换金额</span>
                <input v-model="amount" @input="getValue"   placeholder=" 请输入兑换金额" autocomplete="off"  type="tel"   maxlength="10" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
            
        </div>
        <div class="flex items-center space-x-1 text-sm">
            <span>可兑换</span>
            <span class="text-[#7bc3e7]">{{resultAmount}}USDT</span>
        </div>

    </section>

    </section>
</template>


<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import globaljs from "@/utils/global";
import {useStore} from 'vuex'

const router = useRouter();
const store = useStore()
const amount = ref('')
const resultAmount = ref(0)
const usdtInfo = computed(()=> store.getters["app/UsdtCalcuInfo"])

 const goBack = () => {
   router.push('/user')
 }

const getValue = () => {
   resultAmount.value = usdtInfo?.value?.rate * amount.value
}
 
onMounted(  ()=>{
   globaljs.usdCalculator()
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