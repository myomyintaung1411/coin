<template>
    <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 修改登录密码 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
        <div class="py-2 text-sm">
            手机号
        </div>
        <div class="text-2xl font-bold">{{formatNumber(userInfo?.account)}}</div>
    </section>
    <form @click.prevent class="w-full px-3">

           <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">验证码</span>
                <input  v-model="captchaCode"  placeholder=" 请输入验证码" autocomplete="off"  type="tel"   maxlength="6" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
             <button @click="getSvgCode" class=" whitespace-nowrap mr-4 px-3 py-1 text-white rounded tracking-wide text-sm bg-[#41a7d8]">获取验证码</button>
            </div>

           <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">的登录密码</span>
                <input  v-model="password"   placeholder=" 请输入新的登录密码" autocomplete="off"  type="password"   maxlength="16" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
          </div>

           <div class="mt-7 w-full flex items-center justify-between text-sm ">
            <van-button :loading="loading" :disabled="loading" @click="submit" block type="primary" color="#41a7d8">确认修改</van-button>
        </div>

    </form>
    </section>
</template>


<script setup>
 import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import md5 from "js-md5";
import allApi from "@/network/allApi.js";
import authApi from "@/network/auth.js";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore()

const loading = ref(false)
const password = ref('')
const captchaCode = ref('')
const userInfo = computed(() => store.getters["app/UserInfo"]);

 const goBack = () => {
   router.push('/setting')
 }

 const formatNumber = (number) => {
  return globaljs.formatPhoneNumber(number)
 }

 const submit = () => {
      if(password.value == '' || captchaCode.value == ''
      ) return  showToast('请输入所有字段')
        if (password.value.length < 6) return showToast("密码必须至少有6个字符长");
        if (!/(?=.*\d)(?=.*[A-Z])/.test(password.value)) {
          return showToast("密码应至少包含一个大写字母和数字");
        }
      let data = {
        "phone":'',
        "password":md5(password.value),
        "auth_code":captchaCode.value,
      }
    showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:2000,
  });
   loading.value = true
     allApi.ChangePasswordApi(data).then((res)=>{
      loading.value = false
      showToast({message:res?.data?.msg,duration:2000});
      if (res?.data?.success == true && res?.data?.code == 200) {
      //store.commit("app/LOGIN_DATA", res.data?.data);
        router.push("/setting");
      }
     }).catch((err)=>{
      loading.value = false
      closeToast()
      console.log(err, "error");
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