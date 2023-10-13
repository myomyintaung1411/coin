<template>
    <section class="w-full h-screen relative text-[#303437]">
        <div class="h-14 flex items-center justify-between px-3">
        <div @click="goBack" class="flex-1">
            <van-icon name="arrow-left" size="20" color="text-[#303437]" />
        </div>
        <span class="text-base tracking-wide w-1/3 text-center">  </span>
        <span class="text-xs tracking-wide w-1/3"></span>
        </div>
        <section class="py-5 px-3 relative">
            <div class="py-2 flex items-center space-x-2">
                <img src="@/assets/vip-1.png" alt="vip" class="w-20">
                <div>
                    <div class="text-[#a3a7aa]">
                        团队人数
                    </div>
                    <div class="text-2xl font-bold">
                        {{teamReportData?.count}}
                    </div>
                </div>
            </div>
            <div class="py-3 w-full flex items-center justify-between space-x-3">
                <div class="flex-1 flex items-center space-x-2  bg-[#e6e9eb]  shadow-md p-2 h-20">
                    <img src="@/assets/hz-icon.png" alt="hz-icon" class="w-12">
                    <div class="text-xs ">
                        <div class=" tracking-wide text-[#787a7c]"> 团队合作总额</div>
                        <div class="text-base"> {{teamReportData?.team_invest_amount}}</div>
                    </div>
                </div>
                <div class="flex-1  flex items-center space-x-2 bg-[#e6e9eb]  shadow-md p-2 h-20">
                     <img src="@/assets/tx-icon.png" alt="tex-icon" class="w-8">
                     <div class="text-xs ">
                        <div class=" tracking-wide text-[#787a7c]"> 团队提现总额</div>
                    <div class="text-base"> {{teamReportData?.team_withdraw_amount}}</div>
                    </div>
                </div>
            </div>

         <div class="py-4  w-full relative ">
            <div class="  w-full h-12 active_btn flex items-center justify-between">
                <button :disabled="buttonDisable" :class="acitveTab === 1 ? 'un_active animate-fade' : ''" @click="clickTab(1)" class="flex-1   h-full flex items-center justify-center  text-center text-base" >
                    一级(0)
                </button>
                <button :disabled="buttonDisable" :class="acitveTab === 2 ? 'un_active animate-fadeleft' : ''"  @click="clickTab(2)" class="flex-1  flex h-full items-center justify-center  text-center text-base">
                    二级
                </button>
                <button :disabled="buttonDisable" :class="acitveTab === 3 ? 'un_active animate-fadeleft' : ''"  @click="clickTab(3)" class="flex-1  flex h-full items-center justify-center  text-center text-base">
                    三级
                </button>
            </div>
        </div>

        <div class="py-4 text-center w-full relative text-xs tracking-wide">
            暂无更多数据
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
const acitveTab = ref(1)

const teamLevelData = ref([])
const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);

const buttonDisable = ref(false)

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const teamReportData = ref(null)
 const goBack = () => {
   router.push('/user')
 }

 const clickTab = (number) => {
    buttonDisable.value = true
    acitveTab.value = number
    teamLevelData.value = [];
    currentPage.value = 1;
    totalPage.value = 0;
    setTimeout(() => {
        GetTeamLevelDetail()
    }, 500);
 }

 const GetTeamReportApi = async () => {
    try {
        const res = await allApi.GetTeamReportApi();
		console.log(res.data,"GetTeamReportApi")
         //showToast(res?.data?.msg);
        if (res?.data?.success && res?.data?.code == 200) {
            teamReportData.value = res?.data?.data
            //store.commit("app/BANK_ADDRESS",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
 }

 const GetTeamLevelDetail = async () => {
  let data = {
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    level:acitveTab.value
  };
  buttonDisable.value = true
  try {

    const res = await allApi.GetTeamLevelDetail(data);
    buttonDisable.value = false
    console.log(res.data)
    if (res?.data?.success && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      teamLevelData.value = [
        ...teamLevelData.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (teamLevelData.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //teamLevelData.value = res?.data?.data?.record;
    }else{
      loading.value = false
      refreshing.value = false
      finished.value = true
       buttonDisable.value = false
    }
  } catch (error) {
    console.log(error);
    loading.value = false
      refreshing.value = false
      finished.value = true
     buttonDisable.value = false
  }
};

function onRefresh() {
  // 清空列表数据
  teamLevelData.value = []; //reset data
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
    teamLevelData.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    GetTeamLevelDetail();
  }, 500);
};

const onCallMethod = async () => {
  window.scrollTo(0, 0);
  onRefresh();
};

onMounted(()=>{
 GetTeamReportApi()
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