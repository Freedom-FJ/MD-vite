<!--
 * @Author: mjh
 * @Date: 2023-07-12 09:59:04
 * @LastEditors: Tian
 * @LastEditTime: 2023-08-11 13:56:10
 * @Description:
-->
<template>
    <div class="dv-wgms-compliance">
        <div v-for="item, index in listData" :key="index" class="dv-wgms-compliance-one">
            <div class="title-text" :style="titleStyle">
                {{ item.waterSourceScaleName }}
            </div>
            <div class="dv-wgms-compliance-rate dv-wgms-flex-between-center">
                <div v-for="i, idx in list" :key="idx" class="dv-wgms-compliance-rate-one dv-wgms-flex-center-center">
                    <div class="dv-wgms-compliance-rate-one-icon">
                        <img :src="getImg(`./images/icon-${isDark ? '' : 'light-'}${idx + 1}.svg`)" alt="">
                    </div>
                    <div class="dv-wgms-compliance-rate-one-label">
                        {{ i.label }}
                    </div>
                    <div class="dv-wgms-compliance-rate-one-value">
                        <span>{{ item[i.props] }}</span>
                        <span>{{ i.unit }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { useThemeHook } from '../../../utils'
import type { DRINK_WATER_RES } from './api/types'
import { getDrinkWaterData } from './api/index'
const props = withDefaults(defineProps<{
    params: DRINK_WATER_RES.ParamsRequest
    titleStyle: Record<string, any>
    isLazy: boolean
}>(), {
    params: () => {
        return {
            startTime: dayjs().startOf('year').valueOf(),
            endTime: dayjs().endOf('year').valueOf(),
            timeType: 'hour',
            factor: '8',
            factorFlag: false,
            keyWord: '',
            treeId: '3301',
            waterSourceScaleCode: ''
        }
    },
    titleStyle: () => {
        return {
            color: '#909399'
        }
    },
    isLazy: false

})
const { isDark } = useThemeHook()
onMounted(() => {
    !props.isLazy && getResData()
})
watch(() => props.params, () => {
    !props.isLazy && getResData()
}, { deep: true })
const imgList: any = import.meta.globEager('./images/*')
const listData = ref<DRINK_WATER_RES.DataResponse[]>()
const propsKey = {
    reachRate: '',
    siteNum: '',
    waterSourceNum: ''
}
const list = [
    { label: '水源地总数', props: 'waterSourceNum', unit: '个' },
    { label: '监测点总数', props: 'siteNum', unit: '个' },
    { label: '达标率', props: 'reachRate', unit: '%' }
] as {
    label: string
    props: keyof typeof propsKey
    unit: string
}[]

const getResData = async () => {
    const { data } = await getDrinkWaterData(props.params)
    data && (listData.value = data)
}

const getImg = (url: string) => {
    return imgList[url]?.default
}

defineExpose({
    reload: getResData
})
</script>

<style lang="scss" scoped>
@import "../../styles/mixins";
@import "./style/index";
</style>
