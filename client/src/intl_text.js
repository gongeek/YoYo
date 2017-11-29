const LANG = window.navigator.userLanguage || window.navigator.language

let emailPlaceholderText
let publlishButtonTitleText

emailPlaceholderText = '电邮地址'
publlishButtonTitleText = '发布'

// switch (LANG) {
//   case 'zh-TW':
//   case 'zh-CN':
//   case 'zh-HK':
//   case 'zh-SG':
//     emailPlaceholderText = '电邮地址'
//     publlishButtonTitleText = '发布'
//     break
//   default:
  
//     emailPlaceholderText = '电邮地址'
//     publlishButtonTitleText = '发布'
// }

export default {
  emailPlaceholderText,
  publlishButtonTitleText
}
