<template>
    <div class="dv-ipes-module-content ">
        <el-scrollbar v-if="levelList.length > 0" style="max-height: 282px;">
            <div v-for="(item, index) in levelList" :key="index" class="dv-ipes-mgb4">
                <div class="dv-ipes-pre-level">
                    {{ item.level }}
                </div>
                <AppItem v-for="(list, index) in item.list" :key="index" class="dv-ipes-item-module dv-ipes-item-common">
                    <div class="dv-ipes-energy-top dv-ipes-flex-bw-c">
                        <span>{{ list.name }}</span>
                        <NumberItem :value="list" />
                    </div>
                    <div class="dv-ipes-energy-bottom">
                        <Percentage :value="list" />
                    </div>
                </AppItem>
            </div>
        </el-scrollbar>
        <el-empty v-else class="empty" :image-size="180" :image="newNoDataSvg" description="" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import AppItem from './components/AppItem.vue'
import NumberItem from './components/NumberItem.vue'
import Percentage from './components/PercentageItem.vue'
import newNoDataSvg from './images/empty.png'

const props = defineProps({
    data: {
        type: Array as PropType<any>,
        default: () => [{ monitorType: 'wg', category: 'fqpk', level: 3, normal: 23, abnormal: 0, offline: 0, name: '废气排口', rank: 5 }]
    },
})
const levelList: any = reactive([])
watch(() => props.data, (newVal, oldVal) => {
    // 对数据进行组装成三个数组，分别是一级、二级、三级
    const level: any = []

    newVal.map((da: any) => {
        return level.push(da.level)
    })
    const newLevel = Array.from(new Set(level))
    newLevel.forEach((item) => {
        const newda: any = []
        newVal.forEach((da: any) => {
            if (da.level === item) {
                da.normal = da.normal.toString()
                da.offline = da.offline.toString()
                da.abnormal = da.abnormal.toString()
                newda.push(da)
            }
        })
        const levelName
            = item === 1 ? '一级防控' : item === 2 ? '二级防控' : '三级防控'
        levelList.push({ level: levelName, list: newda })
    })
}, { immediate: true, deep: true })
</script>

<script lang="ts">
export default {
    name: 'Level3AirDefense',
    title: '三级防空',
}
</script>

<style lang="scss" scoped>
    @import "./style/index";
</style>
