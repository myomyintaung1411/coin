<template>
  <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 绑定银行卡 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
     <form @click.prevent>
             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">开户姓名</span>
                <input  disabled value="高山"    max="10" maxlength="10" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
            </div>
             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">银行账号</span>
                <input v-model="bankAccount"  placeholder="请输入银行账号" autocomplete="off"  type="text"   maxlength="26" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
            </div>
             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">银行名称</span>
                <div @click="bankDialog = true" class="w-full h-full bg-transparent px-3 flex  items-center  border-none outline-none outline-0 focus:outline-none">
                    {{banktitle}}
                </div>
            </div>
             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">支行地址</span>
                <input v-model="bank_address"  placeholder="请输入支行地址" autocomplete="off"  type="text"   maxlength="26" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
            </div>

             <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">验证码</span>
                <input  v-model="captchaCode"  placeholder="请输入验证码" autocomplete="off"  type="tel"   maxlength="6" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
             <button @click="getSvgCode" class=" whitespace-nowrap mr-4 px-3 py-1 text-white rounded tracking-wide text-sm bg-[#41a7d8]">获取验证码</button>
            </div>
     </form>
     <div class=" px-2 w-full relative text-[11px] space-y-1">
        <span class="text-xs bg-[#e2ddda]">温馨提示</span>
        <p class="pt-1 ">1、提现银行卡信息必须与实名信息一致</p>
        <p>2、如果银行卡信息和实名认证信息不符,可能导致风控部门冻结</p>
     </div>
    </section>
      <div
    class="absolute bottom-24 text-white tracking-wider flex items-center justify-center h-12 text-center w-full px-7"
  >
    <van-button @click="submit" :loading="loading" :disabled="loading" block type="primary" color="#41a7d8">确定绑定</van-button>
  </div>
  </section>

      <van-popup v-model:show="bankDialog" position="bottom" closeable  :style="{ height: '30%' }">
      <div class="px-3 py-2 w-full">
        <div class="pt-10 ">
            <div v-for="bank in typeofBank" :key="bank.id" class=" h-10 flex items-center justify-center">
             <div @click="clickBank(bank)" class="w-[calc(100%_-_8px)] h-9 text-xs rounded  flex items-center justify-center  text-center"
             :class="bank.title === banktitle ? 'bg-[#41a7d8] text-white' : 'bg-[#f7f8fc]  text-black'"
             >
                {{bank.title}}
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
import { showToast, showLoadingToast, closeToast } from "vant";
import globaljs from "@/utils/global";
import authApi from "@/network/auth.js";

const router = useRouter();
const route = useRoute();
const store = useStore()

const bankAccount = ref('')
const bank_address = ref('')
const captchaCode = ref('')

const bankDialog = ref(false)
const banktitle = ref('中国工商银行')
const loading = ref(false)
const typeofBank = ref([
    {
        id:1,
        title:'中国工商银行'
    },
    {
        id:2,
        title:'招商银行'
    },
    {
        id:3,
        title:'中国建设银行'
    },
    {
        id:4,
        title:'中国银行'
    },
    {
        id:5,
        title:'中国民生银行'
    },
])

const clickBank = (bank) => {
      banktitle.value = bank.title
  bankDialog.value = false;
}

 const goBack = () => {
   router.push('/address')
 }

 const submit = () => {
   if(bankAccount.value == '' || bank_address.value == '' || captchaCode.value == '') return showToast('请输入所有字段')
   
   let data = {
    "card_code":bankAccount.value,
    "card_name":"",
    "bank_address":bank_address.value,
    "captcha":captchaCode.value,
    "bank_name":banktitle.value
  }
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:1000,
  });
  loading.value = true;
  allApi.AddBankCardApi(data).then((res)=>{
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