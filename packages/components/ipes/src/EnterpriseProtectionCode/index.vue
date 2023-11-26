<!--
 * @Author: mjh
 * @Date: 2023-08-18 10:27:49
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-19 12:13:22
 * @Description:
-->
<!-- 企业环保码 -->
<template>
    <div class="enterprise-protection-code">
        <!-- <div class="app-header-title">
            环保码统计
        </div> -->
        <div class="dv-ipes-env-code-list">
            <div class="flex">
                <div v-for="(item, index) in codeInfo.codeData" :key="index" class="dv-ipes-code-wrap" :style="{ backgroundColor: item.bgColor }">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="32" height="32" viewBox="0 0 32 32">
                        <defs>
                            <clipPath id="master_svg0_809_2528">
                                <rect x="0" y="0" width="32" height="32" rx="2" />
                            </clipPath>
                        </defs>
                        <g clip-path="url(#master_svg0_809_2528)">
                            <rect x="0" y="0" width="32" height="32" rx="2" />
                            <g>
                                <path
                                    d="M25.6667,27.999755859375L25.6667,25.666455859375L28,25.666455859375L28,27.999755859375L25.6667,27.999755859375ZM21,27.999755859375L21,25.666455859375L23.3333,25.666455859375L23.3333,27.999755859375L21,27.999755859375ZM16.6667,27.999755859375L16.6667,16.666455859375L23.3333,16.666455859375L23.3333,18.999755859375L19,18.999755859375L19,27.999755859375L16.6667,27.999755859375ZM4,27.999755859375L4,16.666455859375L15.3333,16.666455859375L15.3333,27.999755859375L4,27.999755859375ZM6.33333,25.666455859375L13,25.666455859375L13,18.999755859375L6.33333,18.999755859375L6.33333,25.666455859375ZM8.5,23.499755859375L8.5,21.166455859375L10.83333,21.166455859375L10.83333,23.499755859375L8.5,23.499755859375ZM21.3333,23.333055859375L21.3333,18.999755859375L28,18.999755859375L28,23.333055859375L21.3333,23.333055859375ZM25.6667,18.999755859375L25.6667,16.666455859375L28,16.666455859375L28,18.999755859375L25.6667,18.999755859375ZM16.6667,15.333055859375L16.6667,3.999755859375L28,3.999755859375L28,15.333055859375L16.6667,15.333055859375ZM19,12.999755859375L25.6667,12.999755859375L25.6667,6.333085859375L19,6.333085859375L19,12.999755859375ZM4,15.333055859375L4,3.999755859375L15.3333,3.999755859375L15.3333,15.333055859375L4,15.333055859375ZM6.33333,12.999755859375L13,12.999755859375L13,6.333085859375L6.33333,6.333085859375L6.33333,12.999755859375ZM21.1667,10.833085859375L21.1667,8.499755859375L23.5,8.499755859375L23.5,10.833085859375L21.1667,10.833085859375ZM8.5,10.833085859375L8.5,8.499755859375L10.83333,8.499755859375L10.83333,10.833085859375L8.5,10.833085859375Z"
                                    :fill="item.inColor" fill-opacity="1"
                                />
                            </g>
                        </g>
                    </svg>
                    <span class="dv-ipes-value"> <span :style="{ color: item.inColor }">{{ item.num }}</span>家 </span>
                    <div class="dv-ipes-rate-num">
                        {{ item.rate }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { codeInfoType } from './type'
/**
 * 定义props
 */
const props = withDefaults(
    defineProps<{
        codeInfo?: codeInfoType
    }>(),
    {
        codeInfo: () => ({
            codeData: []
        })
    }
)
const $emit = defineEmits(['clickCompany'])

function onClickCompany(item: Object) {
    $emit('clickCompany', item)
}
</script>

<script lang="ts">
export default {
    name: 'DvIpesEnterpriseProtectionCode',
    title: '环保码统计'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
