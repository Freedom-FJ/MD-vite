/*
 * @Author: Tian
 * @Date: 2021-11-01 09:57:44
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-22 09:55:02
 * @Description:
 */
const innerNet = import.meta.env.DEV
const domain = innerNet ? '/api' : `${location.protocol}//${location.host}`
const defaultHost = 'http://ued.fpi-inc.site'
const realHost = innerNet ? defaultHost : domain

const commonConfig = {
    fileDownload: `${realHost}/file-base-server/api/v1/sys/download-preview/`,
    fileUpload: `${realHost}/file-base-server/api/v1/sys/upload`,
}
export default {
    ...commonConfig,
    domain,
    realHost,
}

