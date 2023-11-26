<template>
    <div class="DvIpesStreetLightingManagement">
        <!-- 设备情况 -->
        <div class="module-title flex">
            <div class="title">
                <span>设备情况</span><span class="date-text">（{{ year }}）</span>
            </div>
        </div>
        <div class="lighting-device">
            <div class="lighting-device__info">
                <div class="lighting-device__percent">
                    <div class="title">
                        亮灯率
                    </div>
                    <div class="value">
                        {{ percent.toFixed(2) || 0 }}%
                    </div>
                </div>
                <div class="lighting-device__progress">
                    <IpesProgressBar :percent="percent" />
                </div>
                <div class="lighting-device__detail">
                    <div class="left">
                        <div class="title">
                            <img class="icon mgr4" src="./images/icon-percent.png"><span>设备联网率</span>
                        </div>
                        <div class="percent">
                            {{ onlinePercent || 0 }}%
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">
                            亮灯/关灯
                        </div>
                        <div class="value">
                            <span class="lightBg1"> {{ lightingDevice.onlamp || 0 }}</span><span class="space"> / </span><span class="lightBg2"> {{ lightingDevice.offlamp || 0 }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref, toRefs } from 'vue'
import dayjs from 'dayjs'
import request from '../../service/request'
import IpesProgressBar from '../common/IpesProgressBar.vue'
import type { LightingDeviceType } from './type'
// 设备联网率
const props = withDefaults(
    defineProps<{
        lightingDevice: LightingDeviceType
    }>(),
    {
        lightingDevice: () => (
            {
                online: 0,
                offline: 0,
                onlamp: 20,
                offlamp: 100,
            }
        ),
    }
)

const year = ref<string>(dayjs().format('YYYY-MM-DD HH:mm'))

const onlinePercent = ref<number>(20)// 设备亮灯/关灯
const percent = ref<number>(0)// 亮灯率

onMounted(() => {
    getLightingDevice()
})
const getLightingDevice = async () => {
    try {
        percent.value
                    = ((props.lightingDevice?.onlamp || 0)
                        / ((props.lightingDevice?.onlamp || 0) + (props.lightingDevice?.offlamp || 0)))
                    * 100
        onlinePercent.value
                    = ((props.lightingDevice?.online || 0)
                        / ((props.lightingDevice?.online || 0) + (props.lightingDevice?.offline || 0)))
                    * 100
    }
    catch (e) {
        console.log(e)
    }
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesStreetLightingManagement',
    title: '路灯管理',
}
</script>

<style lang="scss">
@import "../common";
@import "./style/index";
</style>
