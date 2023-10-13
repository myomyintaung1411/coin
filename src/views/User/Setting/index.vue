<template>
  <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 安全中心 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
        <div @click="goInfo(1)" class=" h-12  w-full flex items-center border-b border-solid justify-between text-sm">
            <span >昵称</span>
            <div class="flex items-center space-x-1 text-[#7bc3e7] text-xs">
                <span>{{userInfo?.nickname}}</span>
                <van-icon name="arrow" size="16" color="#303437" />
            </div>
        </div>
         <div class="h-12 w-full flex items-center border-b border-solid justify-between text-sm">
            <span >手机号码</span>
            <div class="flex items-center text-[#7bc3e7] text-xs">
                <span>{{formatNumber(userInfo?.account)}}</span>
            </div>
        </div>
        <div @click="goInfo(2)" class="h-12 w-full flex items-center border-b border-solid justify-between text-sm">
            <span >身份认证</span>
            <div class="flex items-center text-[#7bc3e7] text-sm">
                <div v-if="userInfo?.isRealName == 1" class="bg-white rounded-full px-2 py-1 text-xs shadow  text-red-400">已实名</div>
                <van-icon name="arrow" size="16" color="#303437" />
            </div>
        </div>

        <div @click="goInfo(3)" class="h-12 w-full flex items-center border-b border-solid justify-between text-sm">
            <span >修改登录密码</span>
            <div class="flex items-center text-[#7bc3e7] text-xs">
               <van-icon name="arrow" size="16" color="#303437" />
            </div>
        </div>
        <div @click="goInfo(4)" class="h-12 w-full flex items-center border-b border-solid justify-between text-sm">
            <span > {{userInfo?.is_bind_cash_password == 0 ? '绑定支付密码' : '修改支付密码'}}  </span>
            <div class="flex items-center text-[#7bc3e7] text-xs">
               <van-icon name="arrow" size="16" color="#303437" />
            </div>
        </div>
        <div @click="goInfo(5)" class="h-12 w-full flex items-center border-b border-solid justify-between text-sm">
            <span >银行卡包</span>
            <div class="flex items-center text-[#7bc3e7] text-xs">
               <van-icon name="arrow" size="16" color="#303437" />
            </div>
        </div>
        <div class="h-12 w-full z-20 flex items-center justify-between text-sm border-b border-solid">
            <span >版本号</span>
            <div class="flex items-center text-[#7bc3e7] text-xs">
               1.0
            </div>
        </div>
        <div class="mt-7 w-full flex items-center justify-between text-sm ">
            <van-button @click="logoutDialog = true" block type="primary" color="#41a7d8">退出登录</van-button>
        </div>
    </section>

  </section>

     <van-dialog
    className="customBackround"
    v-model:show="logoutDialog"
    confirm-button-text="确认"
    cancel-button-text="取消"
    :cancelButtonColor="'#252a3e'"
    :confirm-button-color="'#e53123'"
    show-cancel-button
    @confirm="confirmLogout"
    @cancel="logoutDialog = false"
  >
    <template #title>
      <div>
        提示
      </div>
    </template>
    <p class="text-center py-2 text-black">是否确认退出？</p>
  </van-dialog>

</template>

<script setup>

 import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
import globaljs from "@/utils/global";
import { showToast, showLoadingToast, closeToast } from "vant";

const router = useRouter();
const logoutDialog = ref(false)
const userInfo = computed(() => store.getters["app/UserInfo"]);

const store = useStore()

 const goBack = () => {
   router.push('/user')
 }

 const formatNumber = (number) => {
  return globaljs.formatPhoneNumber(number)
 }

 const goInfo = (n) => {
    switch (n) {
        case 1:
             router.push('/personalInfo')
            break;
        case 2:
             router.push('/authentication')
            break;
        case 3:
             router.push('/change-login-pass')
            break;
        case 4:
             router.push('/change-payment-pass')
            break;
        case 5:
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
           router.push('/address')
            break;
    
        default:
            break;
    }
 }

  const confirmLogout = () => {
    logoutDialog.value = false;
    window.localStorage.clear("xztt");
    setTimeout(() => {
      window.location.reload();
      router.push("/login");
    }, 500);
  }
 onMounted(()=>{
      globaljs.Get_UserInfo()
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