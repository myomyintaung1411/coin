<template>
    <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 常见问题 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>     
    <section class="py-4 px-3 w-full relative">
        <div @click="goDetails(0)"  class="py-3 w-full flex items-center border-b border-solid justify-between text-sm">
            <span class=" tracking-wider">帮助中心001</span>
            <div class="flex items-center space-x-1 text-[#7bc3e7] text-xs">
                <van-icon name="arrow" size="16" color="#303437" />
            </div>
        </div>

        <div @click="goDetails(1)" class="py-3 w-full flex items-center border-b border-solid justify-between text-sm">
            <span class=" tracking-wider" >帮助中心002</span>
            <div class="flex items-center text-[#7bc3e7] text-sm">
               
                <van-icon name="arrow" size="16" color="#303437" />
            </div>
        </div>
    </section>
    </section>
</template>

<script setup>
import {  ref  } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

 const goBack = () => {
   router.push('/user')
 }
 const goDetails = () => {
   router.push('/problemDetails')
 }

</script>