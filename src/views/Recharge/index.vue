<template>
    <section  class="w-full h-screen relative text-[#303437] ">
        <div class="h-14 flex items-center justify-between px-3">
            <div @click="goBack">
                <van-icon name="arrow-left" size="20" color="text-[#303437]" />
            </div>
            <span class="text-base tracking-wide"> 充值中心 </span>
            <span @click="gorec" class="text-xs tracking-wide">充值记录</span>
        </div>

        <div class="py-4 px-7 w-full relative ">
            <div class="  w-full h-12 active_btn flex items-center justify-between">
                <div :class="acitveTab === 1 ? 'un_active animate-fade' : ''" @click="clickTab(1)" class="flex-1   h-full flex items-center justify-center  text-center text-base" >
                    银行卡
                </div>
                <div :class="acitveTab === 2 ? 'un_active animate-fadeleft' : ''"  @click="clickTab(2)" class="flex-1  flex h-full items-center justify-center  text-center text-base">
                    USDT
                </div>
            </div>
        </div>
        <section >
            <section class="py-4 w-full relative px-7">
          
            <div class="text-sm tracking-wide">提现金额</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full flex items-center px-3 active_btn ">
               <span class="text-lg pl-4">¥</span>
                <input v-model="money"  type="tel" placeholder="请输入提款金额" max="10" maxlength="10" class="w-full h-full bg-transparent px-3 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>
            <div class="text-sm tracking-wide">上传凭证(上传付款凭证有助于及时到账)</div>
            <div  class=" mt-2 mb-3 h-32 z-40 not_round w-full  active_btn flex items-center justify-center ">
                            <van-uploader
                            accept="image/*"
                            :max-count="1"
                            :max-size="3000 * 1024"
                            @oversize="onOversize"
                            v-model="frontImage"
                            :after-read="frontafterRead"
                            > 
                            <van-image v-if="frontImageUrl == ''"
                            width="5rem"
                            height="5rem"
                            :src="upload"
                            />
                            <van-image v-else
                            width="5rem"
                            height="5rem"
                            :src="'http://45.116.165.93:4195' + frontImageUrl"
                            />
                            </van-uploader>
                
            </div>
            <div class="text-sm tracking-wide">留言</div>
            <div class=" mt-2 mb-3 h-12 not_round w-full active_btn flex items-center ">
                
                <input type="text"  placeholder="请输入备注" class="w-full h-full bg-transparent pl-12 pr-4 text-lg border-none outline-none outline-0 focus:outline-none">
            </div>
        </section>
        <div class="absolute bottom-20 tracking-wider flex flex-col items-center justify-center  text-center w-full px-7">
            <van-button :loading="loading" :disabled="loading" @click="submit" block type="primary" color="#41a7d8" style="height:40px">提交申请</van-button>
            <div class="py-3 text-xs">
                <span class="text-[#41a7d8]">联系在线客服进行充值,</span>
                <span>再提交凭证申请</span>
            </div>
        </div>
        </section>

    </section>


</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import upload from "@/assets/upload.png"
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import allApi from "@/network/allApi.js";
import {useStore} from 'vuex'

const router = useRouter();
const route = useRoute();
const store = useStore()

const acitveTab = ref(1)
const money = ref('500')
const message = ref('')
const frontImage = ref([]);//
const frontImageUrl = ref("");//
const loading = ref(false)

const userInfo = computed(() => store.getters["app/UserInfo"]);

 const goBack = () => {
   router.push('/home')
 }


const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 3MB");
};

 const clickTab = (number) => {
    acitveTab.value = number
 }

 const submit = () => {
     if(money.value == '' || frontImageUrl.value == '') return  showToast('请输入完整的登录信息')
    
    let data = {
      amount:money.value,
      url:frontImageUrl.value,
      memo:message.value,
      coin_type:acitveTab.value,
      userId:userInfo.value?.userId,
    }
      showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      duration:1000,
    });
    loading.value = true;
    allApi.RechargeApi(data).then((res)=>{
      showToast({message:res?.data?.msg,duration:2000});
      loading.value = false;
    if (res?.data?.success && res?.data?.code == 200) {
      //router.push('/address')
    }
    }).catch((e)=>{
      loading.value = false
      console.log(e);
    })
 }

 const addAdress = () => {
    router.push('/address')
 }

  const gorec = () => {
    router.push('/recharge-record')
 }

  async function frontafterRead(file, detail) {
    console.log(file.file, "frontafterRead");
  try {
    showLoadingToast({
      message: "上传中...",
      forbidClick: true,
      duration: 2000,
    });
    // console.log(imageUrl.value);
    let formData = new FormData();
    formData.append("file", file.file); // 因为要上传多个文件，所以需要遍历一下才行
    console.log(formData, "ddd");
    const res = await allApi.UploadImage(formData);
    frontImage.value = []
     showToast({ message: res?.data?.message, duration: 2000 });
    // console.log(res);
    if (res?.data?.code == '0') {
      
      frontImageUrl.value = res?.data?.data?.url;
    }
    console.log(res, "resssssssss");
  } catch (err) {
    frontImage.value = [];
    showToast("图片上传错误");
    console.log(err, "imageupload error");
  }
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