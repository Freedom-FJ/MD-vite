import { ElMessage } from 'element-plus'

/**
 * @desc 函数
 * @param msg 显示文字
 * @param type 提示类型
 */
export const messageBox = (msg: string, type?: any) => {
    ElMessage({
        message: msg,
        type: type || 'warning',
        duration: 2000
    })
}

/**
 * @desc 错误状态处理
 * @param status 错误状态
 * @param message 消息提示
 */
export const errorStatusHandler = (status: number, message: string) => {
    switch (status) {
    case 400:
    case 401:
        messageBox(`${message} 请重新登录`)
        break
    case 403:
        messageBox('登录过期，请重新登录')
        break
    case 500:
        messageBox('服务端错误')
        break
    case 502:
        messageBox('网络拥堵')
        break
        // 404请求不存在
    case 404:
        messageBox('请求的资源不存在', 'error')
        break
    default:
        break
    }
}

/**
 * @desc 错误业务编码处理
 * @param code 错误的业务编码
 * @param message 消息提示
 */
export const errorCodeHandler = (code: string | Number, message: string) => {
    const newCode = Number(code)
    console.log(`qpi error code: ${newCode}`)
    messageBox(message, 'error')
}

/**
 * 将16进制转化为可设置透明度的rgba颜色
 */
export const getHexOpacityColor = (color = '#000', opacity = 0.5) => {
    opacity = Math.max(opacity, 0)
    opacity = Math.min(opacity, 1)
    color = color.replace(/\#/g, '').toUpperCase()
    if (color.length === 3) {
        const arr = color.split('')
        color = ''
        for (let i = 0; i < arr.length; i++)
            color += (arr[i] + arr[i])// 将简写的3位字符补全到6位字符
    }
    let num = Math.round(255 * opacity)// 四舍五入
    let str = ''
    const arrHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']// 十六进制数组
    while (num > 0) {
        const mod = num % 16
        num = (num - mod) / 16
        str = arrHex[mod] + str
    }
    if (str.length === 1)str = `0${str}`
    if (str.length === 0)str = '00'
    return `#${color + str}`
}

export const copyText = (str: string) => {
    // 创建一个input对象
    const oInput = document.createElement('input')
    // 赋值
    oInput.value = str
    // 添加到页面的body下
    document.body.appendChild(oInput)
    // 选择对象
    oInput.select()
    // 执行浏览器复制命令
    document.execCommand('Copy')
    // 隐藏内容
    oInput.className = 'oInput'
    oInput.style.display = 'none'
    setTimeout(() => {
        oInput.remove()
    }, 1000)
}
