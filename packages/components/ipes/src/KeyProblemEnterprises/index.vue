<!-- 企业环保码 -->
<template>
    <div class="enterprise-protection-code">
        <!-- <div class="app-header-title">
            环保码统计
        </div> -->
        <div class="dv-ipes-env-list">
            <div class="dv-ipes-env-list-header dv-ipes-flex-bw-c">
                <div class="dv-ipes-th">
                    重点问题企业
                </div>
                <div class="dv-ipes-th">
                    问题数
                </div>
            </div>
            <div v-if="codeInfo.data && codeInfo.data.length > 0" class="dv-ipes-env-list-con">
                <div v-for="(item, index) in codeInfo.data" :key="index" class="dv-ipes-flex-bw-c dv-ipes-body-item">
                    <div class="dv-ipes-tr dv-ipes-body-name">
                        <a href="javascript:void(0);" :title="item.companyName" @click="onClickCompany(item)"> {{ item.companyName }} </a>
                    </div>
                    <div class="dv-ipes-tr dv-ipes-value">
                        {{ item.num }}
                    </div>
                </div>
            </div>
            <div v-else class="dv-ipes-no-data">
                暂无数据
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
            data: [],
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
    name: 'DvIpesKeyProblemEnterprises',
    title: '重点问题企业'
}
</script>

<style lang="scss" scoped>
@import "./style/index";
</style>
