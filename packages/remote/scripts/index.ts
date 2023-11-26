/*
 * @Author: mjh
 * @Date: 2023-07-10 11:25:40
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-25 10:10:52
 * @Description:
 */
import { series } from 'gulp'
import { deleteSvgFiles } from './delete'
import { copyChangeLog, copyReadmeFiles } from './docs'
import { copyBaseCss } from './style'
import { componentsPath, docsPath, pkgPath, stylesPath, themePath } from './path'
export default series(
    async () => deleteSvgFiles(pkgPath),
    async () => copyReadmeFiles(componentsPath, docsPath),
    async () => copyBaseCss(themePath, stylesPath),
    async () => copyChangeLog(),
)
