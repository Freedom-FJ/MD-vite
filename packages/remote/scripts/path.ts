/*
 * @Author: mjh
 * @Date: 2023-04-26 18:43:50
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-14 16:33:35
 * @Description:
 */
import { resolve } from 'path'

// pkg根目录
export const pkgPath = resolve(__dirname, '../dist')
export const themePath = resolve(__dirname, '../src/theme')

// md 目录
export const docsPath = `${pkgPath}/docs`
// style 目录
export const stylesPath = `${pkgPath}/styles`
// components 目录
export const componentsPath = resolve(__dirname, '../../components')

