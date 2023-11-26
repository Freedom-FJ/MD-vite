<template>
    <div class="dv-aims-air-quality-calendar-container">
        <div class="flex date-time">
            <div class="flex img-left">
                <div class="arrow left-arrow-double" @click="changeTime(-1, 'year')">
                    <ElIcon>
                        <DArrowLeft />
                    </ElIcon>
                </div>
                <div class="arrow left-arrow" @click="changeTime(-1, 'month')">
                    <ElIcon>
                        <ArrowLeft />
                    </ElIcon>
                </div>
            </div>
            <ElDatePicker
                v-model="dateTime"
                class="reset-date-picker" :teleported="false" type="month" :clearable="false" :disabled-date="pickerOptions"
                format="YYYY年 M月"
                @change="changeDatePicker"
            />
            <div class="flex img-right">
                <div class="arrow right-arrow" @click="changeTime(1, 'month')">
                    <ElIcon>
                        <ArrowRight />
                    </ElIcon>
                </div>
                <div class="arrow right-arrow-double" @click="changeTime(1, 'year')">
                    <ElIcon>
                        <DArrowRight />
                    </ElIcon>
                </div>
            </div>
        </div>
        <div class="flex weeks">
            <div v-for="(item, index) in weeks" :key="index" class="item">
                {{ item }}
            </div>
        </div>
        <div v-show="calendarData.list.length" class="calendar-content">
            <div v-for="(item, index) in calendarData.preNullList" :key="index" class="item pre-null" />
            <div
                v-for="(item, index) in calendarData.list" :key="index" class="item"
                :style="{ background: getDayBgColor(item) }"
            >
                <div class="day">
                    {{ index + 1 }}
                </div>
                <div class="num">
                    {{ getDayValue(item) }}
                </div>
            </div>
            <div v-for="(item, index) in calendarData.suffNullList" :key="index" class="item flex suff-null">
                <div class="suff-null-day">
                    {{ index + 1 + calendarData.list.length }}
                </div>
            </div>
        </div>
        <NoData v-show="!calendarData.list.length" />
        <div class="flex legends">
            <div v-for="(item, index) in calendarData.legends" :key="index" class="item">
                <div class="level">
                    {{ item.level }}
                </div>
                <div class="flex num" :style="{ color: item.color, background: item.bgColor }">
                    {{ item.num }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ArrowLeft, ArrowRight, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { factorToColor } from 'fpi-tg-factor-tools'
import NoData from '../common/BasicNoData'
import { getEnvFeatureCalendar } from './api'

/**
 * 定义props
 */
const props = withDefaults(
    defineProps<{
        // 查询参数
        apiParams?: {
            codeType: string
            code: string
            factorCode: string
        }
    }>(),
    {
        apiParams: () => ({
            codeType: 'grid',
            code: '0101000000',
            factorCode: 'aqi',
        }),
    }
)
/**
 * 定义 emits
 */
// defineEmits({})

const dateTime = ref<number>(dayjs().startOf('month').valueOf())
const pickerOptions = (time: Date) => {
    return time.getTime() > Date.now()
}
// date-picker change事件
const changeDatePicker = (val: any) => {
    dateTime.value = val.getTime()
    getAirQualityCalendar()
}

// 点击arrow改变date
const changeTime = (num: number, type: any) => {
    const time = dayjs(dateTime.value)[num > 0 ? 'add' : 'subtract'](Math.abs(num), type)
        .startOf('month')
        .valueOf()
    if (time < Date.now()) {
        dateTime.value = time
        getAirQualityCalendar()
    }
}

const weeks = ['一', '二', '三', '四', '五', '六', '日']
const calendarData = reactive<any>({
    preNullList: [],
    suffNullList: [], // 最新月份补全剩余日子方格
    list: [],
    legends: [
        {
            level: '优',
            key: 'veryGood',
            color: '#30D385',
            bgColor: 'rgba(48, 211, 133, 0.2)',
        },
        {
            level: '良',
            key: 'good',
            color: '#DFBE00',
            bgColor: 'rgba(255, 217, 2, 0.2)',
        },
        {
            level: '轻度',
            key: 'mild',
            color: '#F7C212',
            bgColor: 'rgba(255, 153, 2, 0.2)',
        },
        {
            level: '中度',
            key: 'medium',
            color: '#FF0200',
            bgColor: 'rgba(255, 2, 0, 0.2)',
        },
        {
            level: '重度',
            key: 'serious',
            color: '#F97D1C',
            bgColor: 'rgba(153, 0, 153, 0.2)',
        },
        {
            level: '严重',
            key: 'verySerious',
            color: '#990000',
            bgColor: 'rgba(153, 0, 0, 0.2)',
        },
        {
            level: '无数据',
            key: 'noData',
            color: '#FFFFFF',
            bgColor: '#909399',
        },
    ],
})

// 返回背景色
const getDayBgColor = (item: any) => {
    return Number(item.value) && Number(item.value) > 0 ? factorToColor(props.apiParams.factorCode, item.value, 'day') : '#909399'
}
// 返回值
const getDayValue = (item: any) => {
    return !item.value && item.value !== 0
        ? '-'
        : String(item.value).includes('.')
            ? item.value.toFixed(2)
            : item.value
}

// 获取数据
const getAirQualityCalendar = async () => {
    const params = {
        time: dateTime.value,
        ...props.apiParams,
    }
    getEnvFeatureCalendar(params).then((res) => {
        if (res.data) {
            const data = res.data
            const time = dateTime.value
            const month = dayjs(time).month()
            const monthSumItem: any = data.monthSum[month] || {}
            calendarData.legends.map((item: any) =>
                Object.assign(item, { num: monthSumItem[item.key] })
            )
            // 获取当月开始前有nullDay是空白的
            const nullDay = dayjs(time).day() - 1
            calendarData.preNullList = Array.from(
                { length: nullDay },
                () => ({})
            )
            // 过滤出当月数据
            const endTime = dayjs(time).endOf('month').valueOf()
            calendarData.list = data.values.filter(
                (item: any) => item.time >= time && item.time <= endTime
            )
            // 获取当月天数
            const days = dayjs(time).daysInMonth()
            calendarData.suffNullList = []
            // 最新月份补全剩余日子方格
            if (time === dayjs().startOf('month').valueOf()) {
                calendarData.suffNullList = Array.from(
                    { length: days - calendarData.list.length },
                    () => ({})
                )
            }
        }
    })
}

onMounted(() => {
    getAirQualityCalendar()
})
watch(
    () => props.apiParams,
    () => {
        getAirQualityCalendar()
    }
)
</script>

<style lang="scss">
@import "./style/index";
</style>
