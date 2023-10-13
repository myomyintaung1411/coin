<template>
  <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center whitespace-nowrap text-ellipsis overflow-hidden"> 并购专区并购专区并购专区并 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
      <p class="text-xs text-[#a3a7aa]">新闻中心文本详细内容文本详细内容文本详细内容文本详细内容</p>
    </section>

  </section>



</template>

<script setup>
 import {  ref  } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

 const goBack = () => {
   router.push('/home')
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