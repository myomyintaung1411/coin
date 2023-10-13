<template>
  <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 绑定USDT </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
     <form @click.prevent>
             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">开户姓名</span>
                <input  disabled value="高山"    max="10" maxlength="10" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
            </div>

             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">网络类型</span>
                <div @click="uDialog = true" class="w-full h-full bg-transparent px-3 flex  items-center  border-none outline-none outline-0 focus:outline-none">
                    {{usdttitle}}
                </div>
            </div>


             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">验证码</span>
                <input v-model="captchaCode"   placeholder=" 请输入验证码" autocomplete="off"  type="tel"   maxlength="6" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
             <button @click="getSvgCode" class=" whitespace-nowrap mr-4 px-3 py-1 text-white rounded tracking-wide text-sm bg-[#41a7d8]">获取验证码</button>
            </div>

            <div class=" mt-2 mb-4 h-20 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">USDT地址</span>
                <textarea v-model="usdt_address"  placeholder="请输入USDT地址" maxlength="80" class="w-full h-full  pt-7 px-3  bg-transparent border-none outline-none outline-0 focus:outline-none" ></textarea>
            </div>
            
     </form>
    </section>
      <div
    class="absolute bottom-24 text-white tracking-wider flex items-center justify-center h-12 text-center w-full px-7"
  >
    <van-button @click="submit" :loading="loading" :disabled="loading" block type="primary" color="#41a7d8">确定绑定</van-button>
  </div>
  </section>

      <van-popup v-model:show="uDialog" position="bottom" closeable  :style="{ height: '30%' }">
      <div class="px-3 py-2 w-full">
        <div class="pt-10 ">
            <div v-for="u in typeofU" :key="u.id" class=" h-10 flex items-center justify-center">
             <div @click="clicku(u)" class="w-[calc(100%_-_8px)] h-9 text-xs rounded  flex items-center justify-center  text-center"
             :class="u.title === usdttitle ? 'bg-[#41a7d8] text-white' : 'bg-[#f7f8fc]  text-black'"
             >
                {{u.title}}
             </div>
            </div>
        </div>
      </div>
     </van-popup>

</template>

<script setup>
 import { onMounted, ref, watch, computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import {useStore} from 'vuex'
import allApi from "@/network/allApi.js";
import authApi from "@/network/auth.js";
import { showToast, showLoadingToast, closeToast } from "vant";
import globaljs from "@/utils/global";
const router = useRouter();
const uDialog = ref(false)
const usdttitle = ref('TRC')
const loading = ref(false)
const usdt_address = ref('')
const captchaCode = ref('')
const typeofU = ref([
    {
        id:1,
        title:'TRC'
    },
    {
        id:2,
        title:'ETC'
    },
])

const clicku = (u) => {
      usdttitle.value = u.title
  uDialog.value = false;
}

 const goBack = () => {
   router.push('/address')
 }

  const submit = () => {
   if(usdt_address.value == '' || captchaCode.value == '' || usdttitle.value == '') return showToast('请输入完整的信息')
   
   let data = {
    "net":usdttitle.value,
    "usdt_addr":usdt_address.value,
    "captcha":captchaCode.value,
  }
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:1000,
  });
  loading.value = true;
  allApi.AddUsdtApi(data).then((res)=>{
    showToast({message:res?.data?.msg,duration:2000});
    loading.value = false;
   if (res?.data?.success && res?.data?.code == 200) {
    router.push('/address')
   }
  }).catch((e)=>{
    loading.value = false
    console.log(e);
  })
 }

    const getSvgCode = () => {
      authApi.GetAuthCodeApi()
    .then((res) => {
        showToast({message:res?.data?.msg,duration:2000});
        console.log(res,"dddddd")
     if (res?.data?.success == true) {
        captchaCode.value = res.data?.data?.code;
      }
    })
    .catch((e) => {
      console.log(e);
    });
    }

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