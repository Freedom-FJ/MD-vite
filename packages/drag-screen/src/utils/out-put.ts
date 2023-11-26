/*
 * @Author: mjh
 * @Date: 2023-08-31 09:07:58
 * @LastEditors: mjh
 * @LastEditTime: 2023-10-09 17:10:20
 * @Description:
 */
// 使用 JSZip 库创建压缩包
import JSZip from 'jszip'
import type { ThemeDic } from '../types/panel'
import { exportCSSFile } from './tools'
import { appStr, basePanelStr, dataVisualVarElementStr, layoutBgStr, popPanelStr } from './panel-template'

export async function createZip(inputData: ThemeDic & { style: any }) {
    const zip = new JSZip()
    const [layoutPanel, basePanel, popPanel, mapPanel] = await Promise.all([
        getImgBlob(inputData.layoutPanel.img),
        getImgBlob(inputData.basePanel.img),
        getImgBlob(inputData.popPanel.img),
        getImgBlob(inputData.mapPanel.img),
    ]) as string[]
    let currStr = ''
    // style
    const cssStr = exportCSSFile({ ...inputData.style.color, fontSize: inputData.style.fontSize })
    zip.file('styles/data-visual-var.css', cssStr || '')
    zip.file('styles/data-visual-var-element.css', dataVisualVarElementStr || '')

    // layout
    zip.file('layout/layout-bg/images/layout.png', layoutPanel || '')
    zip.file('layout/layout-bg/index.vue', layoutBgStr)

    // basePanel
    zip.file('components/base-panel/images/panel.png', basePanel || '')
    currStr = basePanelStr
    if (inputData.basePanel.isBlur) currStr = basePanelStr.replace('class="common-panel"', 'class="common-panel bf-blur"')
    zip.file('components/base-panel/index.vue', currStr)

    // popPanel mapPanel
    zip.file('components/pop-panel/images/pop-panel.png', popPanel || '')
    zip.file('components/pop-panel/images/map-panel.png', mapPanel || '')
    currStr = popPanelStr
    if (inputData.popPanel.isBlur) currStr = currStr.replace('class="popup-container"', 'class="popup-container bf-blur"')
    zip.file('components/pop-panel/index.vue', currStr)
    // app.vue
    zip.file('App.vue', appStr)
    return zip
}

const getImgBlob = (url: string) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.blob())
            .then((blob) => {
                resolve(blob)
            })
            .catch((error) => {
                console.error('无法加载图片文件:', error)
                reject(error)
            })
    })
}
// 创建下载链接
export async function downloadZip(inputData: ThemeDic & { style: any }) {
    const zip = await createZip(inputData)
    zip.generateAsync({ type: 'blob' })
        .then((content) => {
            const url = URL.createObjectURL(content)

            // 创建一个下载链接并模拟点击下载
            const link = document.createElement('a')
            link.href = url
            link.download = 'screen-panel.zip'
            link.click()

            // 释放资源
            URL.revokeObjectURL(url)
        })
}

