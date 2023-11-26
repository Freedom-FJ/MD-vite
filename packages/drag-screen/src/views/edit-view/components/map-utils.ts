/**
 *  与 地图操作、点位图层（图标点位、圆形点位、聚合点位）...相关的公共方法
 *  方法：
 *      _addImageToMap              添加图片资源
 *      _addSourceToMap             添加数据资源
 *      _renderMapLayer             渲染点位图层
 *
 *      _addHoverEventToLayer       添加鼠标悬浮事件
 *      _showPopupOnMap             在地图上展示弹窗
 *      _zoomToCenterWhenShowPopup  移动地图使弹窗点位居中
 *      _initHomeView               还原主视图
 *
 *      _removeMapLayer             移除图层
 *      _showOrHideMapLayer         显示或隐藏图层
 *      _hideAllMapLayers           隐藏地图所有图层
 *      _hideClusterByName          隐藏指定聚合图层
 *      _hideAllClusterLayer        隐藏所有聚合图层
 *      _removeAllHtmlMarker        移除所有Marker
 *      _removeHtmlMarker           移除指定Marker
 *      _removeMapboxPopup          关闭地图弹窗
 *
 *      _booleanPointInPolygon      判断点是否在杭州区域
 *      _addLocationMarker          添加定位标记（研判分析中心点）
 *      _addPointClickedMarker      添加地图点位选中状态
 *      _getCommonGeoJson           组织GeoJson数据
 */

const MapUtil = {
    _showPopupOnMap(coordinates: number[], popContent: any, popHeight: any = null, offset = [0, 5]) {
        if (popHeight) this._zoomToCenterWhenShowPopup(coordinates, popHeight)
        // 打开弹窗
        if (window.glPopup) window.glPopup.remove()
        const parent = document.createElement('div')
        window.glPopup = new mapboxgl.Popup({
            className: 'blue-popup',
            closeOnClick: true,
            closeButton: false,
            offset,
        })
            .setLngLat(coordinates)
            .setDOMContent(popContent.mount(parent).$el)
            .setMaxWidth('none')
            .addTo(window.glMap)

        // 窗口关闭时：取消点位动态效果
        window.glPopup.once('close', () => {
            if (window.clickPointMarker) {
                setTimeout(() => {
                    if (!window.glPopup.isOpen())
                        window.clickPointMarker.remove()
                }, 500)
            }
        })
    },
    /**
     * 移动地图使弹窗点位居中
     * @param coordinates 弹窗坐标
     * @param popupHeight 弹窗高度
     */
    _zoomToCenterWhenShowPopup(coordinates: number[], popupHeight = 450) {
        if (window.glMap.getPitch() === 0) {
            // 二维模式
            const screenLocation = window.glMap.project(coordinates) // lnglat -> xy
            screenLocation.y = screenLocation.y - popupHeight / 2
            const newCoordinates = window.glMap.unproject(screenLocation) // xy -> lnglat
            const latDeviation = newCoordinates.lat - coordinates[1]
            window.glMap.easeTo({
                center: [coordinates[0], coordinates[1] + latDeviation],
                speed: 0.6,
                curve: 1.0,
            })
        }
        else {
            window.glMap.easeTo({
                center: [coordinates[0], coordinates[1] + 0.01],
                speed: 0.6,
                curve: 1.0,
            })
        }
    },
    /**
     * 显示或隐藏单个、多个图层
     * @param layerIds<String|Array> 图层名字。String:隐藏单个图层；Array：隐藏多个图层
     * @param showOrHide<String> 显示或隐藏。'show' | 'hide'
     * @private
     */
    _showOrHideMapLayer(layerIds: string | string[], showOrHide: string) {
        // 传参为字符串：隐藏单个
        if (Object.prototype.toString.call(layerIds) === '[object String]') {
            const layerId = layerIds
            this._showOrHideMapLayerById(layerId, showOrHide)
        }
        // 传参为数组：隐藏多个
        if (Object.prototype.toString.call(layerIds) === '[object Array]') {
            const tempLayerIdArr = [...layerIds]
            tempLayerIdArr.forEach((layerId) => {
                this._showOrHideMapLayerById(layerId, showOrHide)
            })
        }
    },
    /**
     * 显示或隐藏指定图层
     * @param layerId<string> 图层名称
     * @param showOrHide<String> 显示或隐藏。'show' | 'hide'
     */
    _showOrHideMapLayerById(layerId: string | string[], showOrHide: string) {
        // 传参错误
        if (!['show', 'hide'].includes(showOrHide))
            throw new Error(` (_showOrHideMapLayerById:) 参数showOrHide不合法：${showOrHide}`)

        const isVisible = showOrHide === 'show' ? 'visible' : 'none'
        if (typeof layerId === 'object') {
            layerId.forEach((item) => {
                if (window.glMap.getLayer(item))
                    window.glMap.setLayoutProperty(item, 'visibility', isVisible)
            })
        }
        else
        if (window.glMap.getLayer(layerId)) { window.glMap.setLayoutProperty(layerId, 'visibility', isVisible) }
    },
}
export default MapUtil
