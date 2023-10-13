
export default {
    state: {
        isShowMoney:true,
        loginData: JSON.parse(localStorage.getItem('xztt')) || null,
        userInfo: JSON.parse(localStorage.getItem('tdcv')) || null,
        categoryData:null,
        bankaddress:[],
        usdtaddress:[],
        usdtcalcu:null,
        assets_info:null

    },

    getters: {
     IsShowMoney:state=> state.isShowMoney,
     LoginData:state => state.loginData,
     CategoryData:state => state.categoryData,
     BankAddress:state => state.bankaddress,
     UsdtAddress:state => state.usdtaddress,
     UsdtCalcuInfo:state => state.usdtcalcu,
     UserInfo:state => state.userInfo,
     AssetsInfo:state => state.assets_info,

    },

    mutations: {
        Is_Show_Money(state,payload){
            state.isShowMoney = !payload
        },
        LOGIN_DATA(state,payload) {
            state.loginData = payload
            localStorage.setItem('xztt',JSON.stringify(payload))
        },
        USER_INFO(state,payload) {
            state.userInfo = payload
            localStorage.setItem('tdcv',JSON.stringify(payload))
        },
        CATEGORY_DATA(state,payload) {
            state.categoryData = payload
        },
        USDT_CALCULATOR(state,payload) {
            state.usdtcalcu = payload
        },
        BANK_ADDRESS(state,payload) {
            state.bankaddress = payload
        },
        USDT_ADDRESS(state,payload) {
            state.usdtaddress = payload
        },
        ASSESTS_INFO(state,payload) {
            state.assets_info = payload
        },
    },
    namespaced: true
}
