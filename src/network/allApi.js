import network from './index.js'

export default {
  AddBankCardApi(data) {
    return network({
      url: '/user/add_bank_card',
      method: 'post',
      data
    })
  },
  GetBankCardApi(data) {
    return network({
      url: '/user/get_bank_card',
      method: 'post',
      data
    })
  },
  GetUsdtAddressApi(data) {
    return network({
      url: '/user/get_usdt_card',
      method: 'post',
      data
    })
  },
  UsdtCalculator(data) {
    return network({
      url: '/opt/system_usdt_computer',
      method: 'post',
      data
    })
  },
  AddUsdtApi(data) {
    return network({
      url: '/user/add_usdt',
      method: 'post',
      data
    })
  },
  WithdrawApi(data) {
    return network({
      url: '/user/withdraw',
      method: 'post',
      data
    })
  },
  EditPayPasswordApi(data) {
    return network({
      url: '/opt/edit_pay_password',
      method: 'post',
      data
    })
  },
  BuyProductApi(data) {
    return network({
      url: '/product/buy_product',
      method: 'post',
      data
    })
  },
  GetNewListApi(data) {
    return network({
      url: '/opt/get_new_list',
      method: 'post',
      data
    })
  },
  GetAssestApi(data) {
    return network({
      url: '/product/get_assets',
      method: 'post',
      data
    })
  },
  SystemAddApi(data) {
    return network({
      url: '/opt/system_add',
      method: 'post',
      data
    })
  },
  SystemYueBaoApi(data) {
    return network({
      url: '/product/system_yuebao',
      method: 'post',
      data
    })
  },
  SystemNoticeApi(data) {
    return network({
      url: '/opt/system_notice',
      method: 'post',
      data
    })
  },
  GetTeamReportApi(data) {
    return network({
      url: '/user/get_team_report',
      method: 'post',
      data
    })
  },
  GetTeamLevelDetail(data) {
    return network({
      url: '/user/get_team_level_detail',
      method: 'post',
      data
    })
  },
  SystemLevelApi(data) {
    return network({
      url: '/opt/system_level',
      method: 'post',
      data
    })
  },
  FundDetailsApi(data) {
    return network({
      url: '/opt/funds_detail',
      method: 'post',
      data
    })
  },
  RechargeApi(data) {
    return network({
      url: '/user/recharge',
      method: 'post',
      data
    })
  },
  GetCategoryApi(data) {
    return network({
      url: '/product/get_category',
      method: 'post',
      data
    })
  },
  GetProductListApi(data) {
    return network({
      url: '/product/get_product_list',
      method: 'post',
      data
    })
  },
  GetProductDetailApi(data) {
    return network({
      url: '/product/get_product_detail',
      method: 'post',
      data
    })
  },

  BindRealNameApi(data) {
    return network({ 
        url: `/user/real_name`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
  UploadImage(data) {
    return network({ //use instance instead of photo method
        url: `/opt/upload`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
  EditUserInfoApi(data) {
    return network({ 
        url: `/user/edit_user_info`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
  ChangePasswordApi(data) {
    return network({ 
        url: `/user/edit_password`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
  EditPayPasswordApi(data) {
    return network({ 
        url: `/user/edit_pay_password`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
  GetUserInfoApi(data) {
    return network({ 
        url: `/user/getUserInfo`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
  WithdrawRecordApi(data) {
    return network({ 
        url: `/user/get_withdraw_record`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
  RechargeInfoApi(data) {
    return network({ 
        url: `/user/get_recharge_info`,
        method: 'post',
        data,
        requestBase: '/api',
    })
},
}

