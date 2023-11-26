<!--
 * @Author: mjh
 * @Date: 2022-09-01 16:27:12
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-25 10:20:18
 * @Description:
-->
<template>
    <div class="dv-wgms-container-select">
        <div class="select-box" :class="[isShowBack ? 'select-box-father' : '']" :style="boxStyle" @click.stop="clickSelect">
            <div class="label" :style="labelStyle">
                <span v-show="activeIndex !== -1">{{ label }}</span>
                <span v-show="activeIndex === -1" class="placeholder">{{ placeholder }}</span>
            </div>
            <div v-if="arrow === 'box'" class="arrow-white tran05" :class="isShowOption ? 'ro-180' : ''" />
            <div v-if="arrow === 'line'" class="arrow-line tran05" :class="isShowOption ? 'arrow-line-ro' : ''" />
        </div>
        <Transition name="height-to-down">
            <el-scrollbar v-show="isShowOption" :id="id" class="option-list" :style="selectBoxStyle">
                <div v-for="(item, index) in option" :key="index" class="select-item" :style="selectItemStyle" :class="[activeIndex === index ? 'select-item-check' : '']" @click="clickCurrItem(item, index)">
                    {{ item.selectLabel || item.label }}
                </div>
            </el-scrollbar>
        </Transition>
    </div>
</template>

<script lang="ts" setup name="SelectPanel">
import type { PropType } from 'vue'
import { Transition, onMounted, onUnmounted, reactive, toRefs, watch } from 'vue'
import type { selectPanelTs } from '../../types/common'
const props = defineProps({
    /**
     * 配置项用于生成表格
     */
    option: {
        type: Array as PropType<selectPanelTs[]>,
        default: () => {
            return []
        }
    },
    /**
     * 默认选择index
     */
    defaultSelect: {
        type: Number,
        default: undefined
    },
    /**
     * 默认选择 defaultValue 优先级    defaultSelect>defaultValue
     */
    defaultValue: {
        type: [Number, String],
        default: undefined
    },
    boxStyle: {
        type: Object,
        default: undefined
    },
    labelStyle: {
        type: Object,
        default: undefined
    },
    selectBoxStyle: {
        type: Object,
        default: undefined
    },
    selectItemStyle: {
        type: Object,
        default: undefined
    },
    placeholder: {
        type: String,
        default: ''
    },
    /**
     * 箭头类型
     */
    arrow: {
        type: String as PropType<'box' | 'line'>,
        default: 'box'
    },
    /**
     * 箭头大小比例
     */
    arrowScale: {
        type: Number,
        default: 1
    },
    /**
     * 是否显示背景
     */
    isShowBack: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['change'])
const data = reactive({
    isShowOption: false,
    label: '--',
    activeIndex: 0,
    width: '65px',
    id: `optionList${Math.random()}`
})
watch(() => props.option, (val) => {
    if (val && val.length) {
        if (props.defaultSelect === -1) {
            data.activeIndex = props.defaultSelect
        }
        else if (typeof props.defaultSelect === 'number') {
            const currData = val[props.defaultSelect]
            data.label = currData.label
            data.activeIndex = props.defaultSelect
        }
        else {
            const index = props.defaultValue === undefined ? 0 : val.findIndex(item => item.value === props.defaultValue)
            data.label = val[~index ? index : 0].label
            data.activeIndex = ~index ? index : 0
        }
    }
}, { deep: true, immediate: true })

watch(() => props.defaultValue, (val) => {
    const index = val === undefined ? 0 : props.option.findIndex(item => item.value === val)
    data.label = props.option[~index ? index : 0].label
    data.activeIndex = ~index ? index : 0
})

let listener: any
onMounted(() => {
    listener = document.addEventListener('mouseup', (e) => {
        const pop = document.getElementById(data.id)
        if (data.isShowOption && pop) {
            if (!pop.contains(e.target as Node)) {
                setTimeout(() => {
                    data.isShowOption = false
                })
            }
        }
    })
})
onUnmounted(() => {
    listener && listener.removeEventListener()
})

const clickSelect = () => {
    data.isShowOption = !data.isShowOption
}
/**
 * @name: table 获取表格列数据
 * @param {*} item 当前列对象
 * @param {*} index 索引
 */
const clickCurrItem = (item: selectPanelTs, index: number) => {
    data.activeIndex = index
    data.isShowOption = false
    data.label = item.label
    emit('change', item, index)
}

const { isShowOption, label, activeIndex, id } = toRefs(data)
</script>

<style  lang="scss">
@import "../../styles/mixins";
@import "./style/select-panel";
</style>
