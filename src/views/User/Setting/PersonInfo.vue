<template>
  <section class="w-full h-screen relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> 修改个人信息 </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
             <div class=" mt-2 mb-4 h-24 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">更改头像</span>
                  <van-uploader
                            accept="image/*"
                            :max-count="1"
                            :max-size="3000 * 1024"
                            @oversize="onOversize"
                            v-model="frontImage"
                            :after-read="frontafterRead"
                            class="w-full"
                            > 
                            <div v-if="frontImageUrl == ''" class="ml-5 w-full">
                                <van-image
                            width="3rem"
                            height="3rem"
                            :src="upload"
                            />
                            </div>
                            <div v-else class="ml-5 w-full">
                                <van-image
                            width="3rem"
                            height="3rem"
                            :src="'http://45.116.165.93:4195' + frontImageUrl"
                            />
                            </div>
                            
                            </van-uploader>
             
        </div>
         <div class=" mt-2 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
               <span class=" pl-4 whitespace-nowrap">确认修改</span>
                <input  v-model="nickname"  placeholder=" 请输入确认修改" autocomplete="off"  type="tel"   maxlength="6" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
             
        </div>

    </section>
           <div class="absolute bottom-20 tracking-wider flex flex-col items-center justify-center  text-center w-full px-7">
            <van-button :loading="loading" :disabled="loading" @click="submit" block type="primary" color="#41a7d8" style="height:40px">确认修改</van-button>
        </div>
  </section>



</template>

<script setup>
 import {  ref  } from "vue";
import { useRouter } from "vue-router";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import upload from "@/assets/userava.svg"
import allApi from "@/network/allApi.js";
const loading = ref(false)

const router = useRouter();
const frontImage = ref([]);//
const frontImageUrl = ref("");//
const nickname = ref('')
const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 3MB");
};

 const goBack = () => {
   router.push('/setting')
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

  const submit = async () => {
    if(nickname.value == '' || frontImageUrl.value == '' ) return showToast('请输入所有字段')
    let data = {
     nickname:nickname.value,
     image:frontImageUrl.value,
    }
    showLoadingToast({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration:1000,
    });
    loading.value = true
       try {
        const res = await allApi.EditUserInfoApi(data);
        loading.value = false
		console.log(res.data,"EditUserInfoApi")
        showToast({message:res?.data?.msg,duration:2000});
        if (res?.data?.success && res?.data?.code == 200) {
          router.push('/setting')
        }
      } catch (error) {
        loading.value = false
        console.log(error);
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