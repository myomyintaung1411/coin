<template>
    <section class="w-full h-full pb-5 relative overscroll-y-auto">
        <div class="pt-7 px-5">
            <span class="text-2xl tracking-wide font-bold">新人注册</span>
        </div>
        <form @click.prevent>
          <div class="py-5 px-5 relative w-full">
                <span class="text-sm text-[#7bc3e7]">手机号</span>
            <div class=" my-3 h-12 not_round w-full text-base flex items-center  active_btn ">
                <input  v-model.trim="phoneNumber" type="tel"  placeholder=" 请输入手机号码" autocomplete="off"  minlength="11"   maxlength="11" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
            </div> 
                <span class="text-sm text-[#7bc3e7]">密码</span>
            <div class=" my-3 h-12 not_round w-full text-base flex items-center  active_btn ">
                <input v-model.trim="password"   placeholder=" 6-20位,数字、字母或字符" autocomplete="off"  type="password"   maxlength="16" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
            </div> 

              <span class="text-sm text-[#7bc3e7]">验证码</span>
              <div class=" my-3 h-12 not_round w-full text-base flex items-center  active_btn ">
                <input  v-model.trim="codeNum"  placeholder=" 请输入验证码" autocomplete="off"  type="tel"   maxlength="6" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
                <button :disabled="codeDisable" @click="getCode()" class=" whitespace-nowrap mr-4 px-3 py-1 text-white rounded tracking-wide text-sm bg-[#41a7d8]" :class="!codeDisable ? '' : ' opacity-80 cursor-not-allowed'">{{codeMsg}}</button>
            </div>

                <span class="text-sm text-[#7bc3e7]">图文验证码</span>
            <div class=" my-3 h-12 not_round w-full text-base flex items-center  active_btn ">
                <input v-model="recaptcha"   placeholder=" 请输入图文验证码" autocomplete="off"  type="text"   maxlength="6" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
             <!-- <div class="absolute right-6 cursor-pointer">
                <canvas ref="verify" class="" width="100"  height="40" @click="handleDraw"></canvas>
             </div> -->
             <div class="absolute right-6 cursor-pointer">
               <button v-if="!svgCodeData" @click="getSvgCode()" class=" whitespace-nowrap mr-4 px-3 py-1 text-white rounded tracking-wide text-sm bg-[#41a7d8]" :class="!codeDisable ? '' : ' opacity-80 cursor-not-allowed'">验证码</button>
                <div v-else @click="getSvgCode()" class="w-24  flex items-center justify-center tracking-wider">
                  <!-- <div v-html="svgCodeData"></div> -->
                  {{svgCodeData}}
                </div>
             </div>
            </div> 
             <span class="text-sm text-[#7bc3e7]">请输</span>
            <div class=" my-3 h-12 not_round w-full text-base flex items-center  active_btn ">
                <input v-model="inviteCode"  placeholder=" 请输入邀请码" autocomplete="off"  type="text"   maxlength="8" class="w-full h-full bg-transparent px-3  border-none outline-none outline-0 focus:outline-none">
            </div> 
            <div class="pt-5  relative w-full">
                <van-button @click="Register" :loading="loading" :disabled="loading" block type="primary" color="#41a7d8">立即注册</van-button>
            </div>
            <div class="pt-5  relative w-full">
                <div @click="goLogin"  class="shadow_color py-3 w-full h-full text-[#41a7d8] flex items-center justify-center" >
                立即登录
                </div>
            </div>
         </div>
        </form>
        <div class="pt-6 flex items-center justify-center  w-full text-xs tracking-wider space-x-1">
            <van-checkbox v-model="checked" checked-color="#41a7d8" icon-size="18px"></van-checkbox>

            <span class="">我已阅读并同意</span> <span class="text-[#41a7d8]">《平台服务协议》</span>
        </div>
    </section>
</template>


<script>
import { ref, onMounted, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import authApi from "@/network/auth.js";
import md5 from "js-md5";

export default {
  setup() {
    const router = useRouter();
    const verify = ref(null);
    const svgCodeData = ref('')
    const checked = ref(false)
    const activeSection = ref(1);
    const state = reactive({
      pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // 字符串
      width: 100,
      height: 40,
      imgCode: "",
    });
    const phoneNumber = ref('')
    const password = ref('')
    const codeNum = ref('')
    const recaptcha = ref('')
    const inviteCode = ref('')
    const codeDisable = ref(false)
    const codeMsg = ref('获取校验码')
    const timer = ref(null)
    const countdown = ref(60)
    const loading = ref(false)

    onMounted(() => {
      //state.imgCode = draw();
    });

    const goLogin = () => {
        router.push('/login')
    }

    const getCode = () => {
      if (phoneNumber.value == "") return showToast("请输入电话号码");
      if (password.value == "") return showToast("请输入密码");
      if (phoneNumber.value?.length < 11) return showToast("手机号应为 11 个字符");
      if (
        !/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          phoneNumber.value
        )
      ) {
        return showToast("手机号格式不对");
      }
    getValidStr()
    }

    const getValidStr = () => {
    console.log(phoneNumber.value, "ttttttttttt");

    console.log(codeDisable.value, "disable");
    codeMsg.value = "重发(" + countdown.value + ")";
    countdown.value--;
    if (countdown.value == 59) {
        console.log("countdown value is", countdown.value);
        createPhoneCode()
    }
    if (countdown.value <= 0) {
        countdown.value = 60;
        codeMsg.value = "获取校验码";
        codeDisable.value = false
    } else {
        codeDisable.value = true;
        timer.value = setTimeout(() => {
            getValidStr()
        }, 1000);
    }
}

const createPhoneCode = () => {
      let data = {
        "username":phoneNumber.value,
        "password":md5(password.value)
      }
    authApi.GetPhoneCaptchaApi(data).then((res) => {
        console.log(res, "reg sms code");
        showToast({message:res?.data?.msg,duration:2000});
        if (res?.data?.success == true && res?.data?.code == 200) {
            console.log("success *************************")
        }
    }).catch((e) => {
        console.log(e);
        //catch error then reset timer
        clearTimeout(timer.value)
        codeMsg.value = "获取校验码";
        codeDisable.value = false
        countdown.value = 60;
    })
}

    const Register = () =>{
      if(phoneNumber.value == '' || password.value == '' || inviteCode.value == ''
       || recaptcha.value == '' || codeNum.value == ''
      ) return  showToast('请输入完整的注册信息')
        if (password.value.length < 6) return showToast("密码必须至少有6个字符长");
        if (!/(?=.*\d)(?=.*[A-Z])/.test(password.value)) {
          return showToast("密码应至少包含一个大写字母和数字");
        }
        if(!checked.value) return  showToast("请接受条款和条件");
     let data = {
      "username":phoneNumber.value,
      "password":md5(password.value),
      "invitation_code":inviteCode.value,
      "verification_code":recaptcha.value,
      "phone_verification_code":codeNum.value
     }
   showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:2000,
  });
     loading.value = true
     authApi.RegisterApi(data).then((res)=>{
      loading.value = false
      showToast({message:res?.data?.msg,duration:2000});
      if (res?.data?.success == true && res?.data?.code == 200) {
        router.push({path:'/login',query:{acc:phoneNumber.value}});
      }
     }).catch((err)=>{
      loading.value = false
      closeToast()
      console.log(err, "error");
     })
    }


    // // 点击图片重新绘制
    // const handleDraw = () => {
    //   state.imgCode = draw();
    // };

    // // 随机数
    // const randomNum = (min, max) => {
    //   return parseInt(Math.random() * (max - min) + min);
    // };
    // // 随机颜色
    // const randomColor = (min, max) => {
    //   const r = randomNum(min, max);
    //   const g = randomNum(min, max);
    //   const b = randomNum(min, max);
    //   return `rgb(${r},${g},${b})`;
    // };

    // // 绘制图片
    // const draw = () => {
    //   // 3.填充背景颜色，背景颜色要浅一点
    //   const ctx = verify.value?.getContext("2d");
    //   // 填充颜色
    //   ctx.fillStyle = randomColor(180, 230);
    //   // 填充的位置
    //   ctx.fillRect(0, 0, state.width, state.height);
    //   // 定义paramText
    //   let imgCode = "";
    //   // 4.随机产生字符串，并且随机旋转
    //   for (let i = 0; i < 4; i++) {
    //     // 随机的四个字
    //     const text = state.pool[randomNum(0, state.pool.length)];
    //     imgCode += text;
    //     // 随机的字体大小
    //     const fontSize = randomNum(18, 25);
    //     // 字体随机的旋转角度
    //     const deg = randomNum(-30, 30);
    //     /*
    //      * 绘制文字并让四个文字在不同的位置显示的思路 :
    //      * 1、定义字体
    //      * 2、定义对齐方式
    //      * 3、填充不同的颜色
    //      * 4、保存当前的状态（以防止以上的状态受影响）
    //      * 5、平移translate()
    //      * 6、旋转 rotate()
    //      * 7、填充文字
    //      * 8、restore出栈
    //      * */
    //     ctx.font = fontSize + "px Simhei";
    //     ctx.textBaseline = "top";
    //     ctx.fillStyle = randomColor(80, 150);
    //     /*
    //      * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
    //      * 这就允许您临时地改变图像状态，
    //      * 然后，通过调用 restore() 来恢复以前的值。
    //      * save是入栈，restore是出栈。
    //      * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
    //      *
    //      * */
    //     ctx.save();
    //    // ctx.translate(30 * i + 15, 15);
    //    ctx.translate(state.width / 8 + i * state.width / 4, state.height / 2);

    //     ctx.rotate((deg * Math.PI) / 180);
    //     // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
    //     // 请使用 font 属性来定义字体和字号，并使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
    //     // context.fillText(text,x,y,maxWidth);
    //     ctx.fillText(text, -15 + 5, -15);
    //     ctx.restore();
    //   }
    //   // 5.随机产生5条干扰线,干扰线的颜色要浅一点
    //   for (let i = 0; i < 5; i++) {
    //     ctx.beginPath();
    //     ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height));
    //     ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height));
    //     ctx.strokeStyle = randomColor(180, 230);
    //     ctx.closePath();
    //     ctx.stroke();
    //   }
    //   // 6.随机产生40个干扰的小点
    //   for (let i = 0; i < 40; i++) {
    //     ctx.beginPath();
    //     ctx.arc(
    //       randomNum(0, state.width),
    //       randomNum(0, state.height),
    //       1,
    //       0,
    //       2 * Math.PI
    //     );
    //     ctx.closePath();
    //     ctx.fillStyle = randomColor(150, 200);
    //     ctx.fill();
    //   }
    //   //state.imgCode = imgCode
    //   return imgCode;
    // };

    const getSvgCode = () => {
      // if (phoneNumber.value == "") return showToast("请输入电话号码");
      // if (password.value == "") return showToast("请输入密码");
      // if (phoneNumber.value?.length < 11) return showToast("手机号应为 11 个字符");
      // if (
      //   !/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
      //     phoneNumber.value
      //   )
      // ) {
      //   return showToast("手机号格式不对");
      // }
      // let data = {
      //   "username":phoneNumber.value,
      //   "password":md5(password.value)
      // }
      authApi.GetAuthCodeApi()
    .then((res) => {
        showToast({message:res?.data?.msg,duration:2000});
        console.log(res,"dddddd")
     if (res?.data?.success == true) {
        svgCodeData.value = res.data?.data?.code;
      }
    })
    .catch((e) => {
      console.log(e);
    });
    }

    return {
      ...toRefs(state),
      phoneNumber,
      password,
      loading,
      codeNum,
      codeMsg,
      recaptcha,
      inviteCode,
      codeDisable,
      verify,
      checked,
      svgCodeData,
      getSvgCode,
     // handleDraw,
      goLogin,
      Register,
      getCode
    };
  },
};
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