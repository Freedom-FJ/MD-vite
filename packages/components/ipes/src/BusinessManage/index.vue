<template>
    <div class="dv-ipes-business-manage">
        <el-scrollbar style="max-height: 365px;">
            <div class="device-row">
                <div class="device-row__info">
                    <div class="device-row__percent">
                        <div class="title">
                            阀门开启率
                        </div>
                        <div class="value">
                            {{ percentNum.toFixed(0) }}%
                        </div>
                        <div class="date">
                            {{ currentDate }}
                        </div>
                    </div>
                    <div class="device-row__progress">
                        <ProgressBar :percent="percentNum || 0" />
                    </div>
                    <div class="device-row__detail">
                        <div class="left">
                            <div class="title">
                                <img class="icon mgr4" :src="percentPng"><span>设备联网率</span>
                            </div>
                            <div class="percent">
                                {{ waterStatus.line.pel || 0 }}%
                            </div>
                        </div>
                        <div class="right">
                            <div class="title">
                                <span>开阀</span><span class="space">/</span><span>关阀</span>
                            </div>
                            <div class="value">
                                <span style="color: #0eed9b;"> {{ waterStatus.open.openTotal || 0 }}</span><span class="space">/</span><span style="color: #ff5d54;"> {{ (waterStatus.open.total || 0) - (waterStatus.open.openTotal || 0) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="device-row mgt12">
                <div class="device-row__info">
                    <div class="device-row__percent">
                        <div class="title">
                            亮灯率
                        </div>
                        <div class="value">
                            {{ percent.toFixed(0) }}%
                        </div>
                        <div class="date">
                            {{ currentDate }}
                        </div>
                    </div>
                    <div class="device-row__progress">
                        <ProgressBar :percent="percent || 0" />
                    </div>
                    <div class="device-row__detail">
                        <div class="left">
                            <div class="title">
                                <img class="icon mgr4" :src="percentPng"><span>设备联网率</span>
                            </div>
                            <div class="percent">
                                {{ onlinePercent || 0 }}%
                            </div>
                        </div>
                        <div class="right">
                            <div class="title">
                                <span>亮灯</span><span class="space">/</span><span>关灯</span>
                            </div>
                            <div class="value">
                                <span style="color: #0eed9b;"> {{ lightingDevice.onlamp || 0 }}</span><span class="space">/</span><span style="color: #ff5d54;"> {{ lightingDevice.offlamp || 0 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import ProgressBar from '../common/IpesProgressBar.vue'
import percentPng from './images/icon-percent.png'
const props = defineProps({
    waterStatus: {
        type: Object as PropType<any>,
        default: () => {
            return { line: { pel: 0 }, open: { openTotal: 0, total: 0 } }
        }
    },
    lightingDevice: {
        type: Object as PropType<any>,
        default: () => {
            return {
                offline: 0,
                offlamp: 0,
                name: '',
                online: 0,
                type: 0,
                onlamp: 0,
                alarmlamp: 0,
                normallamp: 0
            }
        }
    }
})
const percentNum = ref<number>(0) // 阀门开启率

const percent = ref<number>(0)
const onlinePercent = ref<number>(0) // 联网率
const currentDate = ref(dayjs().format('YYYY-MM-DD HH:mm'))

watch(() => props.waterStatus, (newValue, oldValue) => {
    percentNum.value = newValue.open.total === 0 ? 0 : (newValue.open.openTotal / newValue.open.total) * 100
}, { deep: true, immediate: true })
watch(() => props.lightingDevice, (newValue, oldValue) => {
    percent.value
            = newValue.onlamp + newValue.offlamp === 0
            ? 0
            : ((newValue.onlamp || 0)
                / (newValue.onlamp + newValue.offlamp))
                * 100
    onlinePercent.value
            = newValue.online + newValue.offline === 0
            ? 0
            : (((newValue.online || 0)
                / (newValue.online + newValue.offline))
                * 100)
}, { deep: true, immediate: true })
</script>

<script lang="ts">
export default {
    name: 'DvIpesBusinessManage',
    title: '运营管理',
}
</script>

<style lang="scss" scoped>
    @import "./style/index";
</style>
