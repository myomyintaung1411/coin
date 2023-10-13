<template>
    <section class="w-full h-screen relative text-[#303437] overflow-y-auto">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 系统公告 </span>
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
        <div v-for="notice in noticeApiList" :key="notice?.title" class="py-2 text-sm">
            <div class="un_active px-3 py-2 not_round">
                <div class="text-sm font-bold tracking-wide py-2 space-x-2 flex items-center justify-between">
                    <img src="@/assets/lb-icon.png" alt="lb-icon" class="w-12">
                    <div class="flex-1">
                        公告:{{notice?.title}}
                    </div>

                </div>
                <!-- <div v-html="notice.content" class=""></div> -->
                <div class="pl-14">{{notice?.date}}</div>

            </div>
        </div>
    </section>
      </van-list>
    </van-pull-refresh>
<van-back-top  bottom="10vh" style="background:#41a7d8" />

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

const noticeApiList = ref([])
const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const getNoticeData = async () => {
  let data = {
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  };
  try {
    const res = await allApi.SystemNoticeApi(data);
    console.log(res.data)
    if (res?.data?.success && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      noticeApiList.value = [
        ...noticeApiList.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (noticeApiList.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //noticeApiList.value = res?.data?.data?.record;
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
  noticeApiList.value = []; //reset data
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
    noticeApiList.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    getNoticeData();
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