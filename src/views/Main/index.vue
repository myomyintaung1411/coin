<template>
  <div
    id="main"
    class="w-full h-full sm:max-w-md sm:mx-auto sm:flex sm:justify-center sm:items-center"
  >
    <div class="relative h-[calc(100vh_-_75px)] w-full main">
      <router-view></router-view>
      <section
        class="fixed left-0 bottom-0 z-50 h-[75px] bg-[#edf1f3]  flex w-full sm:max-w-md sm:relative"
      >
        <div
          @click="TabClick(1)"
          class="text-sm flex-1 flex flex-col items-center justify-top cursor-pointer"
          style="line-height: 1"
        >
          <div
            class="relative p-2"
            :class="activeRoute === '/home' ? 'active_tab' : 'un_active'"
          >
            <img
              v-if="activeRoute === '/home'"
              src="@/assets/Tab/home2.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
            <img
              v-else
              src="@/assets/Tab/home.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
          </div>
        </div>
        <div
          @click="TabClick(2)"
          class="text-sm flex-1 flex flex-col items-center justify-top cursor-pointer"
          style="line-height: 1"
        >
          <div
            class="relative p-2"
            :class="activeRoute === '/system' ? 'active_tab' : 'un_active'"
          >
            <img
              v-if="activeRoute === '/system'"
              src="@/assets/Tab/sys2.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
            <img
              v-else
              src="@/assets/Tab/sys.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
          </div>
        </div>
        <div
          @click="TabClick(3)"
          class="text-sm flex-1 flex flex-col items-center justify-top cursor-pointer"
          style="line-height: 1"
        >
          <div
            class="relative p-2"
            :class="activeRoute === '/project' ? 'active_tab' : 'un_active'"
          >
            <img
              v-if="activeRoute === '/project'"
              src="@/assets/Tab/project2.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
            <img
              v-else
              src="@/assets/Tab/project.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
          </div>
        </div>
        <div
          @click="TabClick(4)"
          class="text-sm flex-1 flex flex-col items-center justify-top cursor-pointer"
          style="line-height: 1"
        >
          <div
            class="relative p-2"
            :class="activeRoute === '/kefu' ? 'active_tab' : 'un_active'"
          >
            <img
              v-if="activeRoute === '/kefu'"
              src="@/assets/Tab/msg2.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
            <img
              v-else
              src="@/assets/Tab/msg.svg"
              alt="home"
              class="w-7 block p-[2px]"
            />
          </div>
        </div>
        <div
          @click="TabClick(5)"
          class="text-sm flex-1 flex flex-col items-center justify-top cursor-pointer"
          style="line-height: 1"
        >
          <div
            class="relative p-2"
            :class="activeRoute === '/user' ? 'active_tab' : 'un_active'"
          >
            <img
              v-if="activeRoute === '/user'"
              src="@/assets/Tab/my2.svg"
              alt="home"
              class=" w-7 block p-[2px]"
            />
            <img
              v-else
              src="@/assets/Tab/my.svg"
              alt="home"
              class=" w-7 block p-[2px]"
            />
          </div>
        </div>



      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { useStore } from "vuex";
const activeRoute = ref("");
const router = useRouter();
const route = useRoute();

let activeTab = ref(1);
// const token = computed(() => store.getters["user/LToken"]);

watch(
  () => route.path,
  () => {
    console.log(route.path, "watching");
    activeRoute.value = route.path;
  },
  { immediate: true, deep: true }
);

const TabClick = (n) => {
  console.log(n);
  activeTab.value = n;
  switch (n) {
    case 1:
      router.push("/home");
      break;
    case 2:
      router.push("/system");
      break;
    case 3:
      router.push("/project");
      break;
    case 4:
      router.push("/kefu");
      break;
    case 5:
      router.push("/user");
      break;

    default:
      break;
  }
};
</script>



<style scoped>
.main {
  @apply overflow-y-scroll sm:overflow-y-visible;
}
.active_tab {
border-radius: 6px;
background: #edf1f3;
box-shadow: inset 5px 5px 5px #d5d9db,
            inset -5px -5px 5px #ffffff;
}
.un_active {
  border-radius: 6px;
  background: linear-gradient(145deg, #d5d9db, #feffff);
  box-shadow: 7px 7px 13px #dce0e2, -7px -7px 13px #feffff;
}
</style>
