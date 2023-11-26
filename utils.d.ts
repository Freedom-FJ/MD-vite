/*
 * @Author: mjh
 * @Date: 2023-03-13 16:37:54
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-06 14:31:50
 * @Description: 
 */
declare module 'lodash-es'
declare module 'echarts/lib/echarts.js'
declare module 'gulp'
declare module 'gulp-concat'
declare module 'gulp-rename'
declare module 'gulp-dart-sass'
declare module 'gulp-cssmin'
declare module 'js-cookie'
declare const mapboxgl: any



declare interface Window {
    glMap: any
    glPopup: any
    glTooltip: any
    inspectPopup: any
    countryMarker: any
    _imgSourcePath: any
    checkMarker: any
    _mapLayerIdArr: any
    locationMarkerWithCircle: any
    clickPointMarker: any
    _mapMarkerObjArr: any
    markersOnScreen: any // 聚合点 marker
    markers: any 
    warnMarkers: any,
    warnMarkersSurface: any,
    waterPredictionMarkers: any,
    outletBar: any, // 研判分析 模型溯源柱形图
    gasCountryMarker: any, // 空气质量现状
    gasExamineCountryMarker: any, // 区县考核情况marker
    SYSTEM_MENUS_LIST: any,
    SYSTEM_MENUS_AUTH: any,
    countryForecastMarker: any
}