/*
 * @Author: mjh
 * @Date: 2023-07-12 09:59:04
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-08 09:39:02
 * @Description:
 */
import viteConfig from '../../../vite-utils'
import packageJson from './package.json'
export default viteConfig(packageJson.name)
