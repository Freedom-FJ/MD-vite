<!--
 * @Author: mjh
 * @Date: 2023-08-25 10:34:24
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-06 15:22:30
 * @Description:
-->
<template>
    <div id="map" />
</template>

<script setup lang="ts">
import pointImg from '../../../images/country.png'
import mapPop from './map-pop.vue'
import MapUtil from './map-utils'
const style = {
    version: 8,
    metadata: {},
    sprite: 'https://openmap.tech/icons/img',
    glyphs: 'https://openmap.tech/fonts/{fontstack}/{range}.pbf',
    sources: {
        'tdt-img': {
            type: 'raster',
            tiles: [
                'http://t0.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=d5cbd0c27896bb8f535dc57ecef2718c'
            ],
            tileSize: 256,
            minzoom: 0,
            maxzoom: 22
        }
    },
    layers: [
        {
            id: 'tdt-img',
            type: 'raster',
            source: 'tdt-img',
            layout: {
                visibility: 'visible'
            },
            minzoom: 0,
            maxzoom: 22
        }
    ],
    id: 'x04sv9tch'
}
let glTooltip: any = null
onMounted(() => {
    window.glMap = new mapboxgl.Map({
        container: 'map',
        style,
        center: [120.193611, 30.190278],
        zoom: 9
    })
    setTimeout(() => {
        setMapPointDomToImage()
    }, 100)
})

/**
 * @name: 通过绘制dom节点转化成图片加载
 * @desc: 可以节省大量的图片
 * @param {Record} data 点位数据
 * @param {string} layerId 图层名称
 * @param {string} popName 弹框名称
 * @param {number} size 图标大小
 */
const setMapPointDomToImage = async () => {
    const layerId = 'common-point'
    const imgNode = new Image()
    imgNode.src = pointImg
    imgNode.onload = (e) => {
        window.glMap.addImage('gradient', imgNode)
    }
    MapUtil._showOrHideMapLayer([layerId], 'show')
    if (window.glMap.getLayer(layerId)) return
    window.glMap.addLayer({
        id: layerId,
        type: 'symbol',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [120.193611, 30.190278]
                    }
                }]
            }
        },
        layout: {
            'icon-image': 'gradient',
            'icon-size': 0.85,
            'icon-ignore-placement': true, // 忽略碰撞检测
        }
    })
    window.glMap.on('mouseenter', layerId, (e: any) => {
        window.glMap.getCanvas().style.cursor = 'pointer'
        let coordinates = e.features[0].geometry.coordinates.slice()
        if (Object.prototype.toString.call(coordinates[0]) === '[object Array]') {
            let long = 0; let lat = 0
            coordinates.forEach((item: number[]) => {
                long += item[0]
                lat += item[1]
            })
            const length = coordinates.length
            coordinates = [long / length, lat / length]
        }
        const description = '测试站点'
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180)
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        _createToolTips(coordinates, { text: description })
    })

    window.glMap.on('mouseleave', layerId, () => {
        _removeToolTips()
    })

    window.glMap.on('click', layerId, (e: any) => {
        let coordinates = [] // 图片的经纬度
        coordinates = e.features[0].geometry.coordinates.slice() // 图片的经纬度
        const popContent: any = createApp(mapPop, {
            properties: e.features[0].properties,
        })
        MapUtil._showPopupOnMap(coordinates, popContent, 450)
    })
}

/**
 * @name: 创建提示框
 * @desc:
 * @return {*}
 */
const _createToolTips = (coordinates: number[] | number[][], option: { text: string | number; color?: string; offset?: number; size?: number; weight?: string | number }) => {
    const { text, color = 'white', offset = 0, size = 12, weight = 'normal' } = option
    window.glMap.getCanvas().style.cursor = 'pointer'
    if (glTooltip) glTooltip.remove()
    const html = `<div style="width: 100%;height: 100%;padding: 4px 8px;font-weight:${weight};font-size: ${size}px;background: black;color: ${color};transform: translateY(${offset}px);">${text}</div>`
    glTooltip = new mapboxgl.Popup({
        className: 'mapbox-tooltip',
        closeOnClick: false,
        closeButton: false,
    })
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(window.glMap)
    window.glMap.triggerRepaint()
}
/**
 * @name: 删除提示框
 * @desc:
 * @return {*}
 */
const _removeToolTips = () => {
    window.glMap.getCanvas().style.cursor = ''
    glTooltip.remove()
}
</script>

<style lang="scss">
#map {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
}

.mapboxgl-popup-content {
    position: relative;
    padding: 0;
    background-color: transparent !important;
}

.mapboxgl-popup-tip {
    opacity: 0;
}

.mapboxgl-popup {
    z-index: 100;
}
</style>
