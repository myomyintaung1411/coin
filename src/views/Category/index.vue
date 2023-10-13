<template>
  <div class="category relative text-[#303437]">
    <div class="h-14 flex items-center justify-between px-3">
      <div @click="goBack" class="flex-1">
        <van-icon name="arrow-left" size="20" color="text-[#303437]" />
      </div>
      <span class="text-base tracking-wide w-1/3 text-center"> {{title}} </span>
      <span class="text-xs tracking-wide w-1/3"></span>
    </div>
    <section class="py-5 px-3 w-full relative">
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="prod in productList" @click="categoryDetail(prod)"
          :key="prod?.p_id"
          class="bg-white shadow-lg rounded-md py-3 px-2"
        >
          <div class="text-center w-full py-1 text-lg">{{prod?.name}}</div>
          <img
            class="h-24 w-full object-cover max-w-full"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
          <div
            class="flex items-center justify-between whitespace-nowrap w-full"
          >
            <div class="flex flex-col text-base">
              <span>{{prod?.unit}}%</span>
              <span class="text-xs text-[#a3a7aa]">利率</span>
            </div>
            <div class="flex flex-col text-base">
              <span class="text-right">{{prod?.p_price}}</span>
              <span class="text-xs text-[#a3a7aa]">系统/项(CNY)</span>
            </div>
          </div>
          <div class="flex items-center justify-between py-2 whitespace-nowrap">
            <div class="flex flex-col text-base">
              <span>{{prod?.rate}}天</span>
              <span class="text-xs text-[#a3a7aa]">部署周期</span>
            </div>
            <div class="flex flex-col text-base">
              <span class="text-[#7bc3e7] text-right">{{prod?.progress}}%</span>
              <span class="text-xs text-[#a3a7aa]">系统进度</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
 import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useStore} from 'vuex'
import allApi from "@/network/allApi.js";

const router = useRouter();
const route = useRoute();
const store = useStore();

const cid = ref('')
const title = ref('')
const productList = ref([])
const goBack = () => {
  router.push("/home");
};

 const Get_Category_List = async () => {
    try {
    let data = {c_id:cid.value}
    const res = await allApi.GetProductListApi(data)
    console.log(res)
    if (res?.data?.success && res?.data?.code == 200) {
      productList.value = res.data?.data
      //store.commit("app/CATEGORY_DATA",res?.data?.data)   //切换显示金额
    }
  } catch (error) {
    console.log(error);
  }
 }

const categoryDetail = (prod) => {
  //router.push("/category-details");
   router.push({path:'/category-details',query:{pid:prod?.p_id}});
};
  onMounted(() => {
      if (route?.query !== undefined && route.query?.cid !== undefined) {
        cid.value = route.query?.cid;
        title.value = route.query?.title
       }
       Get_Category_List()
    });
</script>

<style scoped>
.category {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
}
</style>