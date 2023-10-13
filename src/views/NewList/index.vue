<template>
  <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 新闻列表 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      pulling-text="拉动刷新..."
      loosing-text="松动刷新..."
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
        loading-text="加载中..."
      >
    <section class="py-4 px-3 w-full relative">
      <div v-for="new_data in newListData" :key="new_data.n_id" @click="goDetail" class="flex shadow mb-3 rounded-md bg-[#edf1f3] h-40 px-3 space-x-4 text-[#303437]">
        <img src="@/assets/Handshake.svg" alt="img" class="w-20">
        <div class="w-[70%] flex flex-col  py-3 text-sm space-y-1 h-full relative">
          <span class="w-full text-ellipsis overflow-hidden whitespace-nowrap">{{new_data?.title}}</span>
          <span class="w-full">{{new_data?.content}}</span>
        <div class="absolute bottom-3 w-full text-[#a3a7aa] tracking-wider">
          {{new_data?.date}}
          </div>
        </div>
      </div>
    </section>
      </van-list>
    </van-pull-refresh>
      <van-back-top  bottom="10vh" style="background:#41a7d8" />


  </section>



</template>

<script setup>
 import {  onMounted, ref  } from "vue";
import { useRouter } from "vue-router";
import allApi from "@/network/allApi.js";
import { showToast, showLoadingToast, closeToast } from "vant";

const router = useRouter();


const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const newListData = ref([]);

 const goBack = () => {
   router.push('/home')
 }
 const goDetail = () => {
   router.push('/new-details')
 }

const GetNewList = async () => {
  let data = {
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  };
  try {
    const res = await allApi.GetNewListApi(data);
    console.log(res.data)
    if (res?.data?.success && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      newListData.value = [
        ...newListData.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (newListData.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //newListData.value = res?.data?.data?.record;
    }else{
      loading.value = false
      refreshing.value = false
      finished.value = true
    }
  } catch (error) {
    console.log(error);
  }
};

function onRefresh() {
  // 清空列表数据
  newListData.value = []; //reset data
  currentPage.value = 0; //reset data
  //   totalPage.value = 1; //reset data
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
}

const onLoad = async () => {
  currentPage.value++;
  if (refreshing.value) {
    newListData.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    GetNewList();
  }, 500);
};

const onCallMethod = async () => {
  window.scrollTo(0, 0);
  onRefresh();
};

onMounted(()=>{
  onCallMethod()
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