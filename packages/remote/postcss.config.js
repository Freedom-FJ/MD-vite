/*
 * @Author: mjh
 * @Date: 2023-07-09 10:45:23
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-09 11:06:52
 * @Description:
 */
module.exports = {
    plugins: [
        require('postcss-url')({
            url: 'inline', // 将 URL 转换为内联形式
            maxSize: 1, // 图片大小超过 8 KB 才会被转换为 Base64
        }),
    ],
}
