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
        <div class="py-2 text-sm">
            系统等级系统等级系统等级系统等级系统等级系统等级
        </div>
    </section>

    </section>
</template>


<script setup>
 import {  onMounted, ref  } from "vue";
import { useRouter } from "vue-router";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import allApi from "@/network/allApi.js";

const router = useRouter();

const system_level_data = ref(null)

const GetSysLevel = async () => {
    try {
        const res = await allApi.SystemLevelApi();
		console.log(res.data,"SystemLevelApi")
         //showToast(res?.data?.msg);
        if (res?.data?.success && res?.data?.code == 200) {
          system_level_data.value = res.data?.data
           // store.commit("app/USDT_ADDRESS",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
}

onMounted(()=>{
  GetSysLevel()
})

 const goBack = () => {
   router.push('/user')
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