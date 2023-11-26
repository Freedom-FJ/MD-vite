/*
 * @Author: mjh
 * @Date: 2022-11-10 11:29:08
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-17 20:12:19
 * @Description: 
 */
module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ["npm run lint"],
  '*.{html,vue,css,scss,sass,less,styl}': ["npm run lint:stylelint"],
}