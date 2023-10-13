<template>
    <section class="h-screen w-full relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"></span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-4 px-3 w-full relative">
        <div class="font-semibold text-xl tracking-wide">本人实名认证 激活服务</div>
        <div class="py-1 flex items-center space-x-1 text-sm text-[#858688]">
            <img src="@/assets/an-icon.png" alt="an-icon" class="w-4">
            <span>用于身份实名核验、资料将被加密保护</span>
        </div>

       <div class=" mt-7 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
            <span class=" pl-4 whitespace-nowrap text-[#858688]">真实姓名</span>
            <input  v-model="realname"  placeholder=" 请输入真实姓名" autocomplete="off"  type="tel"   maxlength="6" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
             
      </div>

       <div class=" mt-5 mb-4 h-12 not_round w-full text-sm flex items-center  active_btn ">
            <span class=" pl-4 whitespace-nowrap text-[#858688]">身份证号</span>
            <input v-model="idCode"   placeholder=" 请输入身份证号" autocomplete="off"  type="tel"   maxlength="30" class="w-full h-full bg-transparent px-6  border-none outline-none outline-0 focus:outline-none">
             
      </div>

      <div class=" mt-5 mb-4 h-28 not_round w-full  text-sm flex items-center justify-around 
       active_btn ">
         <div class="">
                      <van-uploader
                            accept="image/*"
                            :max-count="1"
                            :max-size="3000 * 1024"
                            @oversize="onOversize"
                            v-model="frontImage"
                            :after-read="frontafterRead"
                            class="w-full"
                            > 
                            <div class="w-full">
                                <van-image
                                v-if="frontImageUrl == ''"
                            width="100%"
                            height="80px"
                            :src="front"
                            fit="cover"
                            />
                                <van-image
                                v-else
                            width="100%"
                            height="80px"
                            :src="'http://45.116.165.93:4195' + frontImageUrl"
                            fit="cover"
                            />
                            </div>
                            
       </van-uploader>
         </div>
          <div class="">
              <van-uploader
                            accept="image/*"
                            :max-count="1"
                            :max-size="3000 * 1024"
                            @oversize="onOversize"
                            v-model="backImage"
                            :after-read="backafterRead"
                            class="w-full"
                            > 
                            <div class=" w-full ">
                            <van-image
                            v-if="backImageUrl == ''"
                               width="100%"
                            height="80px"
                            :src="back"
                            fit="cover"
                            />
                            <van-image
                            v-else
                               width="100%"
                            height="80px"
                            :src=" 'http://45.116.165.93:4195' + backImageUrl"
                            fit="cover"
                            />
                            </div>
                            
       </van-uploader>
          </div>
      </div>

     <div class="mt-8 tracking-wider flex flex-col items-center justify-center  text-center w-full ">
            <van-button :loading="loading" :disabled="loading" @click="submit" block type="primary" color="#41a7d8" style="height:40px">已认证</van-button>
     </div>

     <div class="mt-12">
        <span class="font-semibold text-xl tracking-wide">上传须知</span>
        <div class="flex items-center justify-between pt-2 text-[#858688]">
            <div class="flex-1 flex flex-col">
                <img src="@/assets/p-1.png" alt="p1" class="w-20">
                <div class="flex items-center text-xs space-x-1 pt-1">
                    <van-icon name="success" size="16" color="#008000" />
                    <span>标准拍摄</span>
                </div>
            </div>
            <div class="flex-1 flex flex-col">
                <img src="@/assets/p-2.png" alt="p1" class="w-20">
                <div class="flex items-center text-xs space-x-1 pt-1">
                    <van-icon name="cross" size="16" color="#FF0000" />
                    <span>信息不全</span>
                </div>
            </div>
            <div class="flex-1 flex flex-col">
                <img src="@/assets/p-3.png" alt="p1" class="w-20">
                <div class="flex items-center text-xs space-x-1 pt-1">
                    <van-icon name="cross" size="16" color="#FF0000" />
                    <span>信息模糊</span>
                </div>
            </div>
            <div class="flex-1 flex flex-col">
                <img src="@/assets/p-4.png" alt="p1" class="w-20">
                <div class="flex items-center text-xs space-x-1 pt-1">
                    <van-icon name="cross" size="16" color="#FF0000" />
                    <span>闪光强烈</span>
                </div>
            </div>
        </div>
     </div>

    </section>
    </section>
</template>


<script setup>
 import {  ref  } from "vue";
import { useRouter } from "vue-router";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import front from "@/assets/sfz1.png"
import back from "@/assets/sfz2.png"
import allApi from "@/network/allApi.js";

const router = useRouter();
const frontImage = ref([]);//
const backImage = ref([]);//
const frontImageUrl = ref("");//
const backImageUrl = ref("");//
const realname = ref("");//
const idCode = ref("");//
const loading = ref(false)

 const goBack = () => {
   router.push('/setting')
 }
 
 const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 3MB");
};

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

  async function backafterRead(file, detail) {
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
    backImage.value = []
     showToast({ message: res?.data?.message, duration: 2000 });
    // console.log(res);
    if (res?.data?.code == '0') {
      
      backImageUrl.value = res?.data?.data?.url;
    }
    console.log(res, "resssssssss");
  } catch (err) {
    backImage.value = [];
    showToast("图片上传错误");
    console.log(err, "imageupload error");
  }
 }

 const submit = async () => {
    if(realname.value == '' || idCode.value == '' || frontImageUrl.value == '' || backImageUrl.value == '') return showToast('请输入所有字段')
    let data = {
     real_name:realname.value,
     id_code:idCode.value,
     frontend_image:frontImageUrl.value,
     backend_image:backImageUrl.value,
    }
    showLoadingToast({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration:1000,
    });
    loading.value = true
       try {
        const res = await allApi.BindRealNameApi(data);
        loading.value = false
		console.log(res.data,"BindRealNameApi")
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