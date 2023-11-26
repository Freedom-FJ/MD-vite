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
