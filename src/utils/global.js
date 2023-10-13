
import allApi from "@/network/allApi.js";
import { showToast, showLoadingToast, closeToast } from "vant";
import store from '@/store/index'
import { computed } from 'vue'

export default {
    async GetAssest  ()  {
        try {
        const res = await allApi.GetAssestApi();
		console.log(res.data,"GetAssest")
         //showToast(res?.data?.msg);
        if (res?.data?.success && res?.data?.code == 200) {
            store.commit("app/ASSESTS_INFO",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
    },
    async Get_UserInfo  ()  {
        try {
        const res = await allApi.GetUserInfoApi();
		console.log(res.data,"GetUserInfoApi")
         //showToast(res?.data?.msg);
        if (res?.data?.success && res?.data?.code == 200) {
            store.commit("app/USER_INFO",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
    },
    async Get_Category  ()  {
        try {
        const res = await allApi.GetCategoryApi();
		console.log(res.data,"GetCategoryApi")
         //showToast(res?.data?.msg);
        if (res?.data?.success && res?.data?.code == 200) {
            store.commit("app/CATEGORY_DATA",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getBankAddress() {
        try {
        const res = await allApi.GetBankCardApi();
		console.log(res.data,"GetBankCardApi")
         //showToast(res?.data?.msg);
        if (res?.data?.success) {
            store.commit("app/BANK_ADDRESS",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUsdtAddress() {
        try {
        const res = await allApi.GetUsdtAddressApi();
		console.log(res.data,"getUsdtAddress")
         //showToast(res?.data?.msg);
        if (res?.data?.success) {
            store.commit("app/USDT_ADDRESS",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
    },
    async usdCalculator()  {
        try {
        const res = await allApi.UsdtCalculator();
		console.log(res.data,"UsdtCalculator")
         //showToast(res?.data?.msg);
        if (res?.data?.success && res?.data?.code == 200) {
            store.commit("app/USDT_CALCULATOR",res?.data?.data) 
        }
      } catch (error) {
        console.log(error);
      }
    },

	formatPhoneNumber(phoneNumber) {
		// Convert the phone number to a string
		const phoneNumberStr = phoneNumber.toString();
	  
		// Check if the phone number has at least 11 digits
		if (phoneNumberStr.length < 11) {
		  return phoneNumberStr; // Not a valid phone number, return as is
		}
	  
		// Extract the first two digits
		const firstDigits = phoneNumberStr.slice(0, 2);
	  
		// Extract the last three digits
		const lastDigits = phoneNumberStr.slice(-3);
	  
		// Calculate the number of asterisks needed in the middle
		const middleAsterisks = '*'.repeat(phoneNumberStr.length - 5);
	  
		// Combine the first digits, middle asterisks, and last digits
		const formattedPhoneNumber = `${firstDigits}${middleAsterisks}${lastDigits}`;
	  
		return formattedPhoneNumber;
	  },
	  

  identityIDCard(code) {
		console.log(code, "code from identify")
		// 身份证号前两位代表区域
		const city = {
			11: '北京',
			12: '天津',
			13: '河北',
			14: '山西',
			15: '内蒙古',
			21: '辽宁',
			22: '吉林',
			23: '黑龙江 ',
			31: '上海',
			32: '江苏',
			33: '浙江',
			34: '安徽',
			35: '福建',
			36: '江西',
			37: '山东',
			41: '河南',
			42: '湖北 ',
			43: '湖南',
			44: '广东',
			45: '广西',
			46: '海南',
			50: '重庆',
			51: '四川',
			52: '贵州',
			53: '云南',
			54: '西藏 ',
			61: '陕西',
			62: '甘肃',
			63: '青海',
			64: '宁夏',
			65: '新疆',
			71: '台湾',
			81: '香港',
			82: '澳门',
			91: '国外 ',
		};
		const idCardReg =
			/^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; // 身份证格式正则表达式
		let errorMessage = ''; // 错误提示信息
		let isPass = true; // 身份证验证是否通过（true通过、false未通过）
	
		// 如果身份证不满足格式正则表达式
		if (!code) {
			errorMessage = '请输入身份证号码';
			isPass = false;
		} else if (!code.match(idCardReg)) {
			errorMessage = '请输入正确的身份证号码';
			isPass = false;
		} else if (!city[code.substr(0, 2)]) {
			// 区域数组中不包含需验证的身份证前两位
			errorMessage = '请输入正确的身份证号码';
			isPass = false;
		} else if (code.length === 18) {
			// 18位身份证需要验证最后一位校验位
			code = code.split('');
			// ∑(ai×Wi)(mod 11)
			// 加权因子
			const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			// 校验位
			const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			let sum = 0;
			let ai = 0;
			let wi = 0;
			for (let i = 0; i < 17; i++) {
				ai = parseInt(code[i]);
				wi = factor[i];
				sum += ai * wi; // 开始计算并相加
			}
			const last = parity[sum % 11]; // 求余
			if (last.toString() !== code[17]) {
				errorMessage = '请输入正确的身份证号码';
				isPass = false;
			}
		}
		return {
			errorMessage,
			isPass
		}
	},
  
}