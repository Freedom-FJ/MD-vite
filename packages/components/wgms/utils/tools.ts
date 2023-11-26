/*
 * @Author: Tian
 * @Date: 2021-11-01 10:48:16
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-10 18:23:04
 * @Description: , redirectLogin, removeToken
 */
import { ElMessage } from 'element-plus'
import type { App, ComponentInternalInstance, Plugin } from 'vue'
import { getCurrentInstance } from 'vue'

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
 * @description Is Tcp Url
 * @param {String} url
 */
export function isTcp(url: string) {
    return !!url.match(/^https?:\/\//)
}

/**
 * @desc 驼峰转为非驼峰链接
 * @param str 字符串
 * @param type  链接字符串 -
 */
export function toLowerLine(str: string, type?: string) {
    type = type || '-'
    if (str.includes(type)) return str
    let tuo = ''
    const arr = str.split('')
    const newArr = arr.map((ite) => {
        return ite.toUpperCase() === ite
            ? (ite = type + ite.toLowerCase())
            : ite
    })
    tuo = newArr.join('')
    if (tuo.slice(0, 1) === type)
        return tuo.slice(1)
    return tuo
}

/**
 * @description Get Query Value
 * @param {String} key
 * @return {String}
 */
export function getQueryValue(key: string) {
    const url = window.location.search
    const theRequest: any = {}
    if (url.includes('?')) {
        const str = url.substr(1)
        const queryList = str.split('&')
        for (let i = 0; i < queryList.length; i++) {
            theRequest[queryList[i].split('=')[0]] = unescape(
                queryList[i].split('=')[1]
            )
        }
    }
    return theRequest[key] ? theRequest[key] : ''
}

/**
 * 获取图片资源
 * @param url 图片路径
 * @returns
 */
export const getAssetsFile = (url: string) => {
    if (url.charAt(0) === '/') url = url.slice(1)
    return new URL(`../assets/images/${url}`, import.meta.url).href
}

/**
 * @description Encode Url Query
 * @param {Object} query
 * @return {String}
 */
export function encodeQuery(query: Record<string, any>) {
    let queryStr = ''
    const keys = Object.keys(query)
    keys.forEach((item, index) => {
        queryStr = index
            ? `${queryStr}&${item}=${query[item]}`
            : `${queryStr}${item}=${query[item]}`
    })
    return queryStr
}

/**
 * @description Decode Url Query
 * @param {String} queryStr
 * @return {Object}
 */
export function decodeQuery(queryStr: string) {
    const query: Record<string, any> = {}
    queryStr = decodeURI(queryStr.replace('?', ''))
    const queryArr = queryStr.split('&')
    queryArr.forEach((item) => {
        const keyAndValue = item.split('=')
        query[keyAndValue[0]] = keyAndValue[1]
    })
    return query
}
export function useCurrentInstance() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const proxy = appContext.config.globalProperties
    return {
        proxy
    }
}
/**
 * 获取类型方法 返回 参数类型 或者 true/false
 * @param {*} tgt 需要判断类型的变量
 * @param {*} type? 可传可不传， 不传的话方法返回变量类型，传的话返回参数类型是否一致true/false
 * 可确定的类型：undefined、null、string、number、boolean、array、object、symbol、
 * date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
 */
export function DataType(tgt: any): string
export function DataType(tgt: any, type: string): boolean
export function DataType(tgt: any, type?: string) {
    const dataType = Object.prototype.toString
        .call(tgt)
        .replace(/\[object (\w+)\]/, '$1')
        .toLowerCase()
    return (type ? dataType === type : dataType)
}

/**
 * 方法名：
 * 功能介绍：返回一个对象里面包含后一个数组比第一个数组增加、减少的数据（适用于去重过后的数组）
 * 参数：
 * @param {*} beforeArr 前一个数组
 * @param {*} afterArr 后一个数组
 * 返回： resObj：{
 *      add: Array<number | string>
        del: Array<number | string>
 * }
 */
export function compare(
    beforeArr: Array<number | string>,
    afterArr: Array<number | string>
) {
    const resObj: {
            add: Array<number | string>
            del: Array<number | string>
        } = {
            add: [],
            del: []
        }
    const cenObj: {
            [key: number | string]: any
        } = {}
    // 把beforeArr数组去重放入cenObj
    for (let i = 0; i < beforeArr.length; i++)
        cenObj[beforeArr[i]] = beforeArr[i]

    // 遍历afterArr，查看其元素是否在cenObj中
    for (let j = 0; j < afterArr.length; j++) {
        if (!cenObj[afterArr[j]])
            resObj.add.push(afterArr[j])

        else
            delete cenObj[afterArr[j]]
    }
    for (const k in cenObj)
        resObj.del.push(k)

    return resObj
}

/**
 * 获取树结构第一级的最小子集
 * list 树结构
 */
export const getTreeDataSub = (list: Array<Record<string, any>>) => {
    const resultUrl = {
        url: '',
        code: ''
    }
    const getTargetUrl = (arr: Record<string, any>) => {
        if (arr.subs && arr.subs.length) {
            getTargetUrl(arr.subs[0])
        }
        else {
            resultUrl.url = arr.url
            resultUrl.code = arr.code
        }
    }
    getTargetUrl(list)
    return resultUrl
}
/**
 * 获取匹配的树节点
 * list 树结构
 */
export const getTreeNode = (list: Array<Record<string, any>>, code: string | number) => {
    const result = {
        label: '',
        code: ''
    }
    const getTargetNode = (arr: Array<Record<string, any>>, code: string | number) => {
        arr.forEach((item: any) => {
            if (item.code === code) {
                result.label = item.label
                result.code = item.code
            }
            else if (item.children && item.children.length) {
                getTargetNode(item.children, code)
            }
        })
    }
    getTargetNode(list, code)
    return result
}
/**
 * 获取匹配的树节点
 * list 树结构
 */
export const getTargetNodeList = (list: Array<Record<string, any>>, name: string | number) => {
    const result: any = []
    const getTargetList = (arr: Array<Record<string, any>>, name: string | number) => {
        arr.forEach((item: any) => {
            if (item.label.includes(name))
                result.push(item)

            else if (item.children && item.children.length)
                getTargetList(item.children, name)
        })
    }
    getTargetList(list, name)
    return result
}

/**
 * @dec 替换{{}}变量
 * @param {*} vm 变量对象
 * @param {*} expr 变量在对象内的位置  如server.base
 */
export const getVal = (vm: any, expr: string) => {
    if (!expr)
        return vm
    const value = expr.split('.').reduce((data: any, current: any) => {
        return data[current]
    }, vm)
    return value
}

/**
 * @dec 赋值对象
 * @param {*} obj 变量对象
 * @param {*} key 变量在对象内的位置  如server.base
 * @param {*} val 变量的值
 */
export const getDeepObj = (obj: Record<string, any>, key: string, val: string | number) => {
    const keyArr = key.split('.')
    keyArr.reduce((data: any, current: any, arr) => {
        if (arr === keyArr.length - 1)
            data[current] = val
        return data[current]
    }, obj)
}
/**
 * @name 模板解析
 * @dec 处理{{}}字符串，替换变量值
 * @param {*} vm 变量对象
 * @param {*} expr 字符串内部包含{{变量}}  如http://{{server.base}}/{{path}}
 */
export const getContentValue = (vm: any, expr: string) => {
    // expr: 我是{{person.name}}
    // 遍历表达式将内容重新特换成一个完整的内容，返回回去
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        return getVal(vm, args[1])
    })
}
// 复制文本内容
export const copyText = (text: string) => {
    const inputDom = document.createElement('input') // 创建一个input元素
    inputDom.setAttribute('readonly', 'readonly') // 防止手机上弹出软键盘
    inputDom.value = text // 给input元素赋值
    document.body.appendChild(inputDom) // 添加到body
    inputDom.select() // 选中input元素的内容
    document.execCommand('Copy') // 执行浏览器复制命令
    inputDom.style.display = 'none'
    inputDom.remove() // 移除input元素
    messageBox('复制到剪贴板成功', 'success')
}

type SFCWithInstall<T> = T & Plugin
export const install = <T>(comp: T, named?: string) => {
    (comp as SFCWithInstall<T>).install = (app: App) => {
    // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
    // 所以要加上这个条件
        const name = (comp as any).name || (comp as any).__name || named
        // 注册组件
        app.component(name, comp as SFCWithInstall<T>)
    }
    return comp as SFCWithInstall<T>
}

/**
 * 获取css变量值
 * @param key | getCssValue('--font-family-text')
 * @returns {string} | 'Microsoft YaHei'
 */
export const getCssValue = (key: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(key)
}

/**
 * 获取css变量中的font-family
 * 掐头去尾得到最终fontFamily
 * @param key
 * @return {*} ' "shzhjt"' ==> shzhjt
 */
export const getFontFamily = (key: string) => {
    return getCssValue(key).replace(/(^\s"|"$)/g, '')
}
