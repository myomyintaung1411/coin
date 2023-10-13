<template>
    <section  class="w-full h-screen relative text-[#303437] ">
        <div class="h-14 flex items-center justify-between px-3">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" color="text-[#303437]" />
            </div>
            <span class="text-base tracking-wide"> {{acitveTab === 1 ? '提现到银行卡' : '提现到USDT'}} </span>
            <span @click="gorec" class="text-xs tracking-wide">提现记录</span>
        </div>

        <div class="py-4 px-7 w-full relative ">
            <div class="  w-full h-12 active_btn flex items-center justify-between">
                <div :class="acitveTab === 1 ? 'un_active animate-fade' : ''" @click="clickTab(1)" class="flex-1   h-full flex items-center justify-center  text-center text-base" >
                    银行卡
                </div>
                <div :class="acitveTab === 2 ? 'un_active animate-fadeleft' : ''"  @click="clickTab(2)" class="flex-1  flex h-full items-center justify-center  text-center text-base">
                    USDT
                </div>
            </div>
        </div>
        <section v-if="acitveTab === 1">
            <section class="py-4 w-full relative px-7">
           <form @click.prevent>
            <div class="text-sm tracking-wide">提现金额</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full flex items-center px-3 active_btn ">
               <span class="text-lg pl-4">¥</span>
                <input v-model="money"  type="tel" placeholder="请输入提款金额" max="10" maxlength="10" class="w-full h-full bg-transparent px-3 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>
            <div class="text-sm tracking-wide">支付密码</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="pay_password" type="password" maxlength="16" placeholder="请输入支付密码" class="w-full h-full bg-transparent pl-12 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>
            <div class="text-sm tracking-wide">银行卡号</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="address" type="text" maxlength="40" placeholder="请输入银行卡号" class="w-full h-full bg-transparent pl-12 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>

             <div class="text-sm tracking-wide">验证码</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="recaptcha" type="text" maxlength="8" placeholder="请输入验证码" class="w-full h-full bg-transparent pl-12 text-lg border-none outline-none outline-0 focus:outline-none">
            <button @click="getSvgCode" class=" whitespace-nowrap mr-4 px-3 py-1 text-white rounded tracking-wide text-sm bg-[#41a7d8]">获取验证码</button>
            </div>

            <div class="text-sm tracking-wide">留言</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="message" type="text"  placeholder="请输入留言" class="w-full h-full bg-transparent pl-12 pr-4 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>

             <!-- <div @click="addAdress()" class=" mt-5 mb-3 h-12  text-[#8c8ea0]  justify-center w-full active_btn not_round flex items-center ">
                暂无银行卡,请前往个人中心添加
            </div> -->

           </form>
        </section>
        <div class="absolute bottom-10 tracking-wider flex items-center justify-center h-12 text-center w-full px-7">
            <van-button :loading="loading" :disabled="loading" @click="withdraw(1)" block type="primary" color="#41a7d8">提交申请</van-button>
        </div>
        </section>

        <section v-if="acitveTab === 2">
            <section class="py-4 w-full relative px-7">
           <form @click.prevent>
            <div class="text-sm tracking-wide">提现金额</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full flex items-center px-3 active_btn ">
               <span class="text-lg pl-4">¥</span>
                <input v-model="money" @input="getValue"   type="tel" placeholder="请输入金额" max="10" maxlength="10" class="w-full h-full bg-transparent px-3 text-lg border-none outline-none outline-0 focus:outline-none">
              <span class="text-sm pr-4 text-[#8c8ea0]">≈{{resultAmount}}usdt</span>
            </div>
            <div class="text-sm tracking-wide">支付密码</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="pay_password" type="password" maxlength="16" placeholder="请输入支付密码" class="w-full h-full bg-transparent pl-12 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>

            <div class="text-sm tracking-wide">USDT地址</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="address" type="text" maxlength="40" placeholder="请输入USDT地址" class="w-full h-full bg-transparent pl-12 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>

            <div class="text-sm tracking-wide">验证码</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="recaptcha" type="text" maxlength="8" placeholder="请输入验证码" class="w-full h-full bg-transparent pl-12 text-lg border-none outline-none outline-0 focus:outline-none">
            <button @click="getSvgCode" class=" whitespace-nowrap mr-4 px-3 py-1 text-white rounded tracking-wide text-sm bg-[#41a7d8]">获取验证码</button>
            </div>

            <div class="text-sm tracking-wide">留言</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input v-model="message" type="text"  placeholder="请输入留言" class="w-full h-full bg-transparent pl-12 pr-4 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>

             <!-- <div @click="addAdress()" class=" mt-5 mb-3 h-12  text-[#8c8ea0]  justify-center w-full active_btn not_round flex items-center ">
               暂无USDT地址,请前往个人中心添加
            </div> -->

           </form>
        </section>
        <div class="absolute bottom-10 tracking-wider flex items-center justify-center h-12 text-center w-full px-7">
            <van-button :loading="loading" :disabled="loading" @click="withdraw(2)" block type="primary" color="#41a7d8">提交申请</van-button>
        </div>
        </section>



    </section>


</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import globaljs from "@/utils/global";
import {useStore} from 'vuex'
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import authApi from "@/network/auth.js";
import allApi from "@/network/allApi.js";

const router = useRouter();
const route = useRoute();
const store = useStore()
const resultAmount = ref(0)

const acitveTab = ref(1)
const money = ref('')
const address = ref('')
const message = ref('')
const pay_password = ref('')
const recaptcha = ref('')
const loading = ref(false)
const usdtInfo = computed(()=> store.getters["app/UsdtCalcuInfo"])
const userInfo = computed(() => store.getters["app/UserInfo"]);

const getValue = () => {
   resultAmount.value = usdtInfo?.value?.rate * money.value
}

     const getSvgCode = () => {
      authApi.GetAuthCodeApi()
    .then((res) => {
        showToast({message:res?.data?.msg,duration:2000});
        console.log(res,"dddddd")
     if (res?.data?.success == true) {
        recaptcha.value = res.data?.data?.code;
      }
    })
    .catch((e) => {
      console.log(e);
    });
    }

  const withdraw = (type) => {
    if(money.value == '' || address.value == '' || pay_password.value == '' || recaptcha.value == '') return  showToast('请输入所有字段')
    
    let data = {
      amount:money.value,
      pay_password:pay_password.value,
      memo:message.value,
      coin_type:type,
      captcha:recaptcha.value,
      userId:userInfo.value?.userId,
      code:address.value,
    }
      showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      duration:1000,
    });
    loading.value = true;
    allApi.WithdrawApi(data).then((res)=>{
      showToast({message:res?.data?.msg,duration:2000});
      loading.value = false;
    if (res?.data?.success && res?.data?.code == 200) {
      //router.push('/address')
    }
    }).catch((e)=>{
      loading.value = false
      console.log(e);
    })

  }

  const goBack = () => {
    router.push('/home')
  }

  const clickTab = (number) => {
    acitveTab.value = number
      address.value = ''
      money.value = ''
      recaptcha.value = ''
      pay_password.value = ''
      message.value = ''
  }

 const addAdress = () => {
    router.push('/address')
 }
  const gorec = () => {
      router.push('/withdraw-record')
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