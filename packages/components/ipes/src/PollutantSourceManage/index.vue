<template>
    <div class="dv-ipes-pollutant-source-manage">
        <div v-for="item in cardList" :key="item.key" class="card-box" :class="{ active: activeCard === `${item.key}Site` }" @click="clickCard(item.key, 'Site')">
            <div class="title">
                {{ item.title }}排口
            </div>
            <div class="flex-c">
                <div v-for="option, index in statusOption" :key="option.key" class="status">
                    <div class="value" :class="[option.key]">
                        {{ statusData && statusData[item.key] ? statusData[item.key][option.key] : '--' }}
                    </div>
                    <span v-if="index < statusOption.length - 1">/</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, toRefs } from 'vue'
import type { CardItem, StatusData, StatusOption } from './type'
const props = withDefaults(
    defineProps<{
        statusData: StatusData
    }>(),
    {
        statusData: () => {
            return {
                wg: {
                    abnormal: 0,
                    normal: 0,
                    offline: 0,
                    total: 0,
                },
                ww: {
                    abnormal: 0,
                    normal: 0,
                    offline: 0,
                    total: 0,
                }
            }
        }
    }
)

const emit = defineEmits<{
    (e: 'openPopup', key: string): void
}>()

const { statusData } = toRefs(props)

const activeCard = ref<string>('')

const cardList = ref<CardItem[]>([
    { title: '废气', key: 'wg' },
    { title: '废水', key: 'ww' },
])

const statusOption = ref<StatusOption[]>([
    { key: 'normal', color: '#0EED9B' },
    { key: 'abnormal', color: '#F84439' },
    { key: 'offline', color: '#FFFFFF' },
])
const clickCard = (key: string, type: string) => {
    if (activeCard.value === key + type)
        activeCard.value = ''
    else
        activeCard.value = key + type

    emit('openPopup', key + type)
}
// const statusData = reactive({})
// onMounted(() => {})
</script>

<script lang="ts">
export default {
    name: 'DvIpesPollutantSourceManage',
    title: '污染源排放管理'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
