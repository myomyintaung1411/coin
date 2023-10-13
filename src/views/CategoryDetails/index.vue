<template>
  <div class="category h-screen w-full relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"></span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-5 px-3 w-full relative bg-white">
        <span class="text-black text-xl font-bold">测试1</span>
        <div class="py-2 text-[#a3a7aa] text-sm">收益率1.00% | 部署周期1天</div>
        <div class="py-2 flex items-center space-x-2">
            <span class="text-black text-3xl">¥10000</span>
            <div class="_img__ flex items-center justify-center text-white text-sm">
                测试
            </div>
        </div>
        <div class="bg-red-300 p-2 bg-opacity-20 rounded text-sm text-red-400 inline-block">
            限购1次
        </div>
        <div class="my-5 h-16 bg-[#edf1f3] bg-opacity-25 px-3 flex flex-col justify-center items-center">
               <div class="w-full bg-gray-200  h-5  ">
                 <div class="bg-[#dfae65] h-full animate-fill " :style="{ width: fillWidth + '%' }"></div>
               </div>
            <div class="flex items-center justify-between w-full  pt-2">
                <span>租赁进度</span>
                <span class="text-red-500">0.00%</span>
            </div>
        </div>
    </section>
    <section class="mt-2 w-full py-5 px-3 relative bg-white pb-28">
        <span class="text-black text-base">购买须知</span>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>产品名称 :</span>
            <span class="text-black text-sm">测试1</span>
        </div>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>募集资金 :</span>
            <span class="text-black text-sm">20000.00万元</span>
        </div>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>增值利差 :</span>
            <span class="text-black text-sm">按每日100%的利率计算产品收益</span>
        </div>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>转化周期 :</span>
            <span class="text-black text-sm">1个自然日(一个自然日为一天包含节假日)</span>
        </div>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>增值计算 :</span>
            <span class="text-black text-sm">购入金额10000元*日收益率1.00%*1天=总收益 100.00元</span>
        </div>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>叠加收益 :</span>
            <span class="text-black text-sm">当前VIP等级(VIPO);购入金额10000元* VIP加息 0% *1天 = VIP尊享0.00元</span>
        </div>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>释放方式 :</span>
            <span class="text-black text-sm">每日返息,到期还本</span>
        </div>
        <div class="py-1 text-xs text-[#a3a7aa] space-x-1">
            <span>转化时间 :</span>
            <span class="text-black text-sm">此产品封闭收益周期为1个自然日(包含节假
日),封闭期截止后系统自动将购入总额与所产生的收益全
部返还至您的平台账户中</span>
        </div>
    </section>
    <section class="h-24 w-full bg-white fixed bottom-0 z-10">
        <div class="flex items-center justify-between px-5 h-full w-full">
            <div class="flex flex-col text-[#a3a7aa] text-xs items-center justify-center space-y-1">
                <img src="@/assets/Tab/msg2.svg" alt="keft" class="w-8">
                <p>在线客服</p>
            </div>
            <div class="w-[70%] h-20  flex items-center">
                 <van-button :loading="loading" :disabled="loading" @click="buyProduct" block type="primary" color="#41a7d8">立即购买</van-button>
            </div>
        </div>
    </section>
  </div>
</template>

<script setup>
 import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useStore} from 'vuex'
import allApi from "@/network/allApi.js";
import { showToast, showLoadingToast, closeToast } from "vant";

const router = useRouter();
const route = useRoute();
const store = useStore();
const loading = ref(false)
const productDetail = ref(null)
const fillWidth = ref("33"); // Initialize with a default value
const p_id = ref('')

const userInfo = computed(() => store.getters["app/UserInfo"]);

const goBack = () => {
  router.push("/project");
};

 const Get_ProductDetail = async () => {
    showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:1000,
  });
    try {
    let data = {p_id:p_id.value}
    const res = await allApi.GetProductDetailApi(data)
    console.log(res)
    if (res?.data?.success && res?.data?.code == 200) {
      productDetail.value = res.data?.data
      //store.commit("app/CATEGORY_DATA",res?.data?.data)   //切换显示金额
    }
  } catch (error) {
    console.log(error);
  }
 }

 const buyProduct = () => {
  let data = {
    id:productDetail?.value?.p_id,
    name:productDetail?.value?.p_name,
    money:userInfo.value?.amount,
    pay_password:'',
  }
      showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:2000,
  });
   loading.value = true
     allApi.BuyProductApi(data).then((res)=>{
      loading.value = false
      showToast({message:res?.data?.msg,duration:2000});
      if (res?.data?.success == true && res?.data?.code == 200) {
      //store.commit("app/LOGIN_DATA", res.data?.data);
        //router.push("/setting");
      }
     }).catch((err)=>{
      loading.value = false
      closeToast()
      console.log(err, "error");
     })
 }

  onMounted(() => {
      if (route?.query !== undefined && route.query?.pid !== undefined) {
        p_id.value = route.query?.pid;
       }
       Get_ProductDetail()
    });
 

</script>

<style scoped>
.category {
  height: 100vh;
  width: 100%;
}
._img__{
    background-image: url(@/assets/jg-bg.png);
    background-size: cover;
    width: 50px;
    height: 30px;
}

@keyframes fillWidthAnimation {
  0% {
    width: 0%;
  }
  100% {
    width: var(fillWidth);
  }
}

.animate-fill {
  animation: fillWidthAnimation 2s ease-in-out forwards;
}
</style>