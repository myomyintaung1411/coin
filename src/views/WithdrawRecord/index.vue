<template>
  <section class="w-full h-screen relative text-[#303437] overflow-y-auto">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 提现记录 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-5">
      <div v-if="withdrawRecordData?.length !== 0" class="flex flex-col justify-center items-center pt-20">
        <img src="@/assets/no-card.png" alt="nocard" class="w-28" />
        <p class="pt-2 text-sm tracking-wider text-[#a3a7aa]">
          暂无更多数据
        </p>
      </div>
      <div v-else class="w-full p-2">
     <div v-for="n in 5" :key="n" class="active_btn not_round py-2 px-2 mb-3">
          <div class="flex items-center justify-between px-2 py-2  border-b text-[#303437]">
            <span>type</span>
            <span class="text-[#41a7d8]">USDT</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2  border-b text-[#303437]">
            <span>status</span>
            <span class="text-[#41a7d8]">3243</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2 border-b">
            <span>Price</span>
            <span class="text-[#41a7d8]">324</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2 border-b">
            <span>Address</span>
            <span class="text-[#41a7d8]">test</span>
          </div>
          <div class="flex items-center justify-between px-2 py-2 ">
            <span>Time</span>
            <span class="text-[#41a7d8]">2023-33-33 33:33:33</span>
          </div>

      </div>
      </div>
    </section>
  </section>

</template>

<script setup>
 import { onMounted, ref, watch, computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import {useStore} from 'vuex'
import allApi from "@/network/allApi.js";
import { showToast, showLoadingToast, closeToast } from "vant";


const router = useRouter();
const route = useRoute();
const store = useStore()

const withdrawRecordData = ref([])
const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const getWithdrawRecord = async () => {
  let data = {
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  };
  try {
    const res = await allApi.WithdrawRecordApi(data);
    console.log(res.data)
    if (res?.data?.success && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      withdrawRecordData.value = [
        ...withdrawRecordData.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (withdrawRecordData.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //withdrawRecordData.value = res?.data?.data?.record;
    }else{
      loading.value = false
      refreshing.value = false
      finished.value = true
    }
  } catch (error) {
      loading.value = false
      refreshing.value = false
      finished.value = true
  }
}

function onRefresh() {
  // 清空列表数据
  withdrawRecordData.value = []; //reset data
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
    withdrawRecordData.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    getWithdrawRecord();
  }, 500);
};

const onCallMethod = async () => {
  window.scrollTo(0, 0);
  onRefresh();
};

onMounted(()=>{
  onCallMethod()
})

 const goBack = () => {
   router.push('/withdraw')
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