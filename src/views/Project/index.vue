<template>
    <div class="w-full h-full relative">
        <div class="text-center py-5 text-base text-black tracking-wider">产品中心</div>
    
    <div class="w-full px-3 py-2 relative">
      <van-row  gutter="8">
      <van-col v-for="cate in categoryData" :key="cate?.id"  span="12" class="w-full">
      <div   @click="goCategory(cate?.c_id,cate?.title)" class="flex-1   flex flex-col mb-2 w-full justify-center items-center bg-[#edf1f3] shadow rounded-md h-28">
       <img src="@/assets/Handshake.svg" alt="logo" class="w-10">
        <span class="mt-1">{{cate?.title}}</span>
      </div>
      </van-col>
      </van-row>

    <!-- <section class="py-3 w-full flex items-center justify-between space-x-3">
      <div @click="goCategory()"  class="flex-1 flex flex-col justify-center items-center bg-[#edf1f3] shadow rounded-md h-28">
       <img src="@/assets/Handshake.svg" alt="logo" class="w-10">
        <span>分类三</span>
      </div>
      <div @click="goCategory()" class="flex-1 flex flex-col justify-center items-center bg-[#edf1f3] shadow rounded-md h-28">
        <img src="@/assets/Handshake.svg" alt="logo" class="w-10">
        <span>分类四</span>
      </div>
    </section> -->
    </div>
 </div>

</template>


<script setup>
 import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useStore} from 'vuex'

import globaljs from "@/utils/global";

const router = useRouter();
const route = useRoute();
const store = useStore()
const categoryData = computed(()=> store.getters["app/CategoryData"])

 const goCategory = (cid,title) => {
    router.push({path:'/category',query:{cid:cid,title:title}});
 }

  onMounted(()=>{
  globaljs.Get_Category()
  //Get_Category()
 })
</script>
