<template>
    <section class="w-full  relative __invite text-[#303437]">
       <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-sm tracking-wide  ">邀请规则</span>
    </div>
    <section class="absolute bottom-[22vh] w-full  px-10">
        <div class="w-full text-center flex flex-col justify-center items-center">
            <span class="text-base tracking-wide">您的邀请码</span>
            <div class="flex items-center font-bold text-base space-x-1">
                <span>G24115</span>
                <van-icon @click="copyCode" name="completed" color="#000000" size="20" />
            </div>
            <div class="py-3">
                <div class="w-32 h-32 bg-slate-300"></div>
            </div>
            <div class="py-3 w-full px-6">
                <van-button @click="copyUrl" block type="primary" color="#41a7d8">复制链接</van-button>
            </div>
            <div class="py-2 text-center">
                扫描图片二维码,朋友即可加入
            </div>
        </div>
    </section>
    <section class="absolute bottom-[4.5vh] space-y-1 w-full px-10 ">
        <div class="flex items-center space-x-1 text-sm">
            <van-icon name="warning" color="#1e90ff" size="20"/>
            <span>注释:</span>
        </div>
        <div class="text-sm tracking-wide">1、邀请的好友也可在注册时直接填写邀请码</div>
        <div class="text-sm tracking-wide">2、点击转发邀请按钮,复制到手机默认浏览器中打开下载软件</div>
    </section>
    </section>
</template>

<script setup>
 import {  ref,onMounted  } from "vue";
import { useRouter } from "vue-router";
import useClipboard from 'vue-clipboard3'
import { showToast,showLoadingToast ,closeToast  } from "vant";

const router = useRouter();
const { toClipboard } = useClipboard()

const host = ref(null)

 const goBack = () => {
   router.push('/user')
 }

 const copyCode = () => {}

 const copyUrl = async () => {
    let copydata = host.value + '/register' + '?shareCode='
    try {
        await toClipboard(copydata)
        return showToast ('复制成功')
    } catch (e) {
        showToast('复制错误')
        console.error(e)
    }
 }

onMounted(()=> {
    host.value = window?.location?.origin
})
</script>


<style scoped>
    .__invite{
        background-image: url(@/assets/yq-bg.png);
        background-repeat: no-repeat;
        height: 900px;
        width: 100%;
        background-size: 100% 100%;
    }
</style>