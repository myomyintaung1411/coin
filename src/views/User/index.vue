<template>
    <div  class="w-full h-full relative text-[#303437] pb-10">
         <div class="py-5 w-full flex items-center justify-between px-3">
            <div  class="flex items-center space-x-1 text-[#303437]">
                <div v-if="userInfo?.real_name" class="w-8 h-8 rounded-full bg-[#bde59f] text-center leading-8">
                     {{userInfo?.real_name[0]}}
                </div>
                <span v-if="userInfo?.real_name" class="text-base font-bold tracking-wide pt-[2px]">{{userInfo?.real_name}}</span>
            </div>
            <div @click="goSetting" class="py-1 px-2 rounded shadow">
                <van-icon name="setting-o" color="#303437" size="16" />
            </div>
         </div>
         <section class="py-5 px-5 relative w-full flex items-center  justify-between">
            <div class="flex flex-col flex-1">
                <div class="flex items-center tracking-wide space-x-1">
                    <div class="mb-2">总资产(元)</div>
                    <div @click="toggleShowMoney">
                       <van-icon v-if="isShowMoney" name="eye-o" color="#303437" size="20" />
                       <van-icon v-else name="closed-eye" color="#303437" size="20" />
                    </div>
                </div>
                <div v-if="isShowMoney" class="text-[#7bc3e7] text-2xl ">{{assetsInfo?.assets || 0}}</div>
                <div v-else class="text-[#7bc3e7] text-2xl ">****</div>
            </div>
            <div class="flex flex-col flex-1">
                <div class="flex items-center tracking-wide space-x-1">
                   <div class="mb-2">
                     <div>累计合作</div>
                   </div>
                </div>
                <div v-if="isShowMoney" class="text-[#7bc3e7] text-2xl">{{assetsInfo?.cumulative_ooperation || 0}}</div>
                <div v-else class="text-[#7bc3e7] text-2xl ">****</div>
            </div>
            <div class="flex flex-col w-[20%] ">
            </div>
         </section>
         <section class="w-full px-3 relative py-5">
            <div class="rounded-md shadow_color h-24 px-3 flex items-center justify-between">
                <div class="flex flex-col justify-center items-center flex-1">
                    <div class="font-bold text-xl">{{assetsInfo?.yesterday_earning || 0}}</div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">昨日收益</div>
                </div>
                <div class="flex flex-col justify-center items-center flex-1">
                    <div class="font-bold text-xl">{{assetsInfo?.cumulative_ooperation || 0}}</div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">累计收益</div>
                </div>
                <div class="flex flex-col justify-center items-center flex-1">
                    <div class="font-bold text-xl text-[#7bc3e7]">{{assetsInfo?.available_amount || 0}}</div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">可提金额</div>
                </div>
            </div>
         </section>
         <section class="w-full px-3 relative py-5">
            <section class="rounded-md shadow_color h-80">
            <div class=" h-24 px-2 flex items-center justify-between text-xs">
                <div @click="goMore(1)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/zzb-icon.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">系统增值宝</div>
                </div>
                <div @click="goMore(2)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/jlzd-icon.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">系统等级</div>
                </div>
                <div @click="goMore(3)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/symx-icon.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">资金明细</div>
                </div>
                <div @click="goMore(4)"  class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/nrjl-icon.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">纳入记录</div>
                </div>
            </div>
            <!-- bleow -->
            <section class="  w-full px-2 ">
                <div class="h-60 bg-[#edf1f3] shadow rounded-lg">
                <div class="w-full px-3 ">
                    <div class="h-14  w-full border-b border-solid  flex items-center rounded-t-lg justify-between">
                        <span class=" tracking-wider text-base">系统增值宝</span>
                        <van-icon name="arrow" color="#a3a7aa" size="16" />
                    </div>
                </div>

                <div class=" h-28  w-full">
                    <div class="flex items-center h-full pt-2 px-3">
                        <div class="flex flex-col flex-1">
                            <span class="text-sm tracking-wide text-[#64677b]">资产</span>
                            <span class="text-2xl">{{assetsInfo?.assets || 0}}</span>
                        </div>
                        <div class="flex flex-col flex-1">
                            <span class="text-sm tracking-wide text-[#64677b]">最新收益</span>
                            <span class="text-2xl">{{assetsInfo?.all_earning || 0}}</span>
                        </div>
                    </div>
                </div>
                <div class=" h-12 ">
                    <div class="h-full flex items-center w-full px-3 space-x-2 cursor-pointer">
                        <div @click="goMore(5)" class="flex-1 h-full leading-[48px] shadow rounded text-center tracking-wide text-sm text-[#7bc3e7]">快速提现</div>
                        <div @click="goMore(6)" class="flex-1 h-full leading-[48px] text-center shadow rounded text-white font-bold tracking-wide text-sm bg-[#7bc3e7]">快速提现</div>
                    </div>
                </div>

                </div>
            </section>
            </section>

         </section>
         <section class="py-5 w-full px-3 relative text-xs">
            <div class="flex items-center justify-between relative">
                <div @click="goDetail(1)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/1.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">系统公告</div>
                </div>
                <div @click="goDetail(2)"  class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/2.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">USDT计算机</div>
                </div>
                <div @click="goDetail(3)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/3.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">活动中心</div>
                </div>
                <div @click="goDetail(4)" class="flex flex-col justify-center items-center flex-1">
                     <div>
                        <img src="@/assets/User/4.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">奖励制度</div>
                </div>
            </div>
         </section>
         <section class="pt-3 pb-5 w-full px-3 relative text-xs">
            <div class="flex items-center justify-between relative">
                <div @click="goDetail(5)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/5.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">团队报表</div>
                </div>
                <div @click="goDetail(6)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/6.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">邀请好友</div>
                </div>
                <div @click="goDetail(7)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/7.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">常见问题</div>
                </div>
                <div @click="goDetail(8)" class="flex flex-col justify-center items-center flex-1">
                    <div>
                        <img src="@/assets/User/8.png" alt="iocn1" class="w-8" draggable="flase">
                    </div>
                    <div class="text-[#a3a7aa] mt-1 tracking-wide">安全中心</div>
                </div>
            </div>
         </section>
    </div>
</template>





<script setup>
 import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import globaljs from "@/utils/global";
import {useStore} from 'vuex'
import { showToast, showLoadingToast, closeToast } from "vant";

const router = useRouter();
const store = useStore()

const isShowMoney = computed(() => store.getters["app/IsShowMoney"]);
const userInfo = computed(() => store.getters["app/UserInfo"]);
const assetsInfo = computed(() => store.getters["app/AssetsInfo"]);

const toggleShowMoney = () => {
  store.commit("app/Is_Show_Money",isShowMoney.value)   //切换显示金额
}


 const goSetting = () => {
   router.push('/setting')
 }

const goMore = (number) => {
    switch (number) {
        case 1:
            router.push('/system-yuebao')
            break; 
        case 2:
            router.push('/system-level')
            break;
        case 3:
              router.push('/fund-details')
            break;
        case 4:
            router.push('/include-record')
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
            router.push('/withdraw')
            break;
        case 6:
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
            router.push('/recharge')
            break;
    
        default:
            break;
    }
}
const goDetail = (number) => {
    switch (number) {
        case 1:
             router.push('/noti')
            break;
        case 2:
            router.push('/usdt-calculator')
            break;
        case 3:
           
            break;
        case 4:
            router.push('/reward-system')
            break;
        case 5:
            router.push('/team-report')
            break;
        case 6:
            router.push('/invite')
            break;
        case 7:
            router.push('/commonProblem')
            break;
        case 8:
            router.push('/setting')
            break;
        default:
            break;
    }
}

onMounted(()=>{
    globaljs.Get_UserInfo()
    globaljs.GetAssest()
})
</script>