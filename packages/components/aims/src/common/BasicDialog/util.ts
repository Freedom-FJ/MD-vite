const getZIndex = () => {
    getZIndex.zIndex = getZIndex.zIndex + 1
    return getZIndex.zIndex
}
getZIndex.zIndex = 2000

export default getZIndex
