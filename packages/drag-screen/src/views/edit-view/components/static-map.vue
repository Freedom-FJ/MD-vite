<!--
 * @Author: mjh
 * @Date: 2023-08-25 10:34:24
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:19:50
 * @Description:
-->
<template>
    <div id="map" :style="{ 'background-image': `url(${mapImg})` }">
        <div class="re-box">
            <img src="../../../images/country.png" alt="" @click="isCheckMap = true">
            <div v-show="isCheckMap" id="map-pop" class="map-pop-box">
                <mapPop @close="isCheckMap = false" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import mapPop from './map-pop.vue'
defineProps({
    mapImg: {
        type: String,
        default: 'http://ued.fpi-inc.site/file-base-server/api/v1/sys/download-preview/6f7a7c2af4734e63a21505a2a63d738d'
    }
})
const isCheckMap = ref(false)
let listener: any
onMounted(() => {
    listener = document.addEventListener('mouseup', (e) => {
        const pop = document.getElementById('map-pop')
        if (isCheckMap.value && pop) {
            if (!pop.contains(e.target as Node)) {
                setTimeout(() => {
                    isCheckMap.value = false
                })
            }
        }
    })
})
onUnmounted(() => {
    listener && listener.removeEventListener()
})
</script>

<style lang="scss">
#map {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .re-box {
        width: 100%;
        height: 100%;
    }

    img {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 32px;
        cursor: pointer;
        transform: translate(-50%, 100px);
    }

    .map-pop-box {
        position: absolute;
        top: 50%;
        left: 50%;
        cursor: pointer;
        transform: translate(-50%, -200px);
    }
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
