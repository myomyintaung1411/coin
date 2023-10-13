<script setup>
import { ref, computed, watch, onMounted, toRefs, reactive } from "vue";
import NoInterNet from "@/components/NoInternet.vue";
import { useNetwork,useScreenOrientation  } from "@vueuse/core";
import {load} from '@/utils/loading'

const {
  isSupported,
  orientation,
  angle,
  lockOrientation,
  unlockOrientation,
} = useScreenOrientation()

if(isSupported){
  lockOrientation('portrait-primary')
}
// Get the network information and status
const network = reactive(useNetwork());
const { isOnline, onlineAt } = toRefs(network);

load.show('加载中...', 1500); // Show loading for 2 seconds

</script>
<template>
  <div  class="w-full h-full relative sm:max-w-md sm:mx-auto">
  <div v-if="isOnline">
    <main>
      <router-view />
    </main>
    </div>
    <div v-else >
      <NoInterNet></NoInterNet>
    </div>
  </div>
</template>

<style>
:root {
  --van-field-label-color	: #000;
  --van-field-input-text-color	: #000;
  --van-field-placeholder-text-color	: #941010;
}
html {
  scroll-behavior: smooth;
}

*:focus {
  outline: none !important;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-family: "Open Sans", sans-serif;
  /* background-color: #aa0f04; */
  background: #edf1f3;
/* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23E53123'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");  min-height: 100vh; */
  width: 100%;
  color: #64677b;
  font-family: PingFang SC, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, sans-serif, arial;
  user-select: none;
}

@media (min-width: 640px) {
  body {
    background: #edf1f3;
     position: relative;
  left: 50%;
  transform: translateX(-50%);

  }
}

.shadow_color {
  border-radius: 8px;
  background: linear-gradient(145deg, #edf1f3, #feffff);
  box-shadow: 7px 7px 13px #dce0e2, -7px -7px 13px #feffff;
}




</style>
