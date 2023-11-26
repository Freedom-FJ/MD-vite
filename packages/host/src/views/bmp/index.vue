<template>
    <div class="bmp">
        <div class="panel">
            <div class="title">
                监测预警
            </div>
            <DvBmpAlgaeMonitoring />
        </div>
        <div class="panel">
            <div class="title">
                日常管控
            </div>
            <div style="display: grid;grid-template-columns: repeat(2, auto);gap: 12px;">
                <DvBmpEarlyWarningEvent />
                <DvBmpReportEvent />
            </div>
        </div>
        <div class="panel">
            <div class="title">
                各要素详情
            </div>
            <DvBmpEventList :env-type-code-list="envTypeCodeList" :site-code-list="siteCodeList" :time-stamp="timeStamp" :center-latitude="centerLatitude" :center-longitude="centerLongitude" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    DvBmpAlgaeMonitoring,
    DvBmpEarlyWarningEvent,
    DvBmpEventList,
    DvBmpReportEvent
} from 'data-visual/bmp'

defineOptions({
    name: 'Bmp'
})

const envTypeCodeList = ref(['water'])
const siteCodeList = ref([
    'YHWSZZ004',
    'YHWSZZ006',
    'YHWSZZ007',
    'YHWSZZ014',
    'YHWSZZ015',
    'YHWSZZ016',
    'YHWSZZ018',
    'YHWSZZ019',
    'YHWSZZJCD002',
    'YHWSZZJCD004',
    'YHWSZZJCD005',
    'YHWSZZJCD011',
    'YHWSZZJCD012',
    'YHWSZZJCD013',
    'YHWSZZJCD014',
    'YHWSZZJCD015',
    'YHWSZZJCD016',
    'YHWSZZJCD027',
    'YHWSZZJCD028',
    'YHWSZZJCD029',
    'YHWSZZJCD055',
    'YHWSZZJCD056',
    'YHWSZZJCD057',
    'YHWSZZJCD059',
    'YHWSZZJCD060',
    'YHWSZZJCD061',
    'YHWSZZJCD062',
    'YHWSZZJCD063',
    'YHWSZZJCD064',
    'YHWSZZJCD065',
    'YHWSZZJCD066',
    'YHWSZZJCD071',
    'YHWSZZJCD072',
    'YHWSZZJCD073',
    'YHWSZZJCD074',
    'YHWSZZJCD076',
    'YHWSZZJCD079',
    'YHWSZZJCD080',
    'YHWSZZJCD082',
    'YHWSZZJCD084',
    'YHWSZZJCD085',
    'YHWSZZJCD086',
    'YHWSZZJCD087',
    'YHWSZZJCD088',
    'YHWSZZJCD096',
    'YHWSZZJCD097',
    'YHWSZZJCD098',
    'YHWSZZJCD099',
    'YHWSZZJCD100',
    'YHWSZZJCD101',
    'YHWSZZJCD102',
    'YHWSZZJCD103',
    'YHWSZZJCD104',
    'YHWSZZJCD105',
    'YHWSZZJCD106',
    'YHWSZZJCD107',
    'YHWSZZJCD108',
    'YHWSZZJCD109',
    'YHWSZZJCD110',
    'YHWSZZJCD111',
    'YHWSZZJCD112',
    'YHWSZZJCD113',
    'YHWSZZJCD114',
    'YHWSZZJCD122',
    'YHWSZZJCD134',
    'YHWSZZJCD136',
    'YHWSZZJCD138',
    'YHWSZZJCD139',
    'YHWSZZJCD148',
    'YHWSZZJCD149',
    'YHWSZZJCD154',
    'YHWSZZJCD181',
    'YHWSZZJCD184',
    'YHWSZZJCD190',
    'zlyjyh001',
    'zaoleitest',
    'zlyj01',
    'zlyj06',
    'GKA330100_2009',
    'JMSZSY0006',
    'JMSZSY0007',
    'JMSZSY0008',
    'HZOLD33011000001',
    'YHWSZZ004',
    'YHWSZZ006',
    'YHWSZZ007',
    'YHWSZZ014',
    'YHWSZZ015',
    'YHWSZZ016',
    'YHWSZZ018',
    'YHWSZZ019',
])

const timeStamp = ref(1659283140000)
const centerLatitude = ref('30.395101')
const centerLongitude = ref('119.986453')
</script>

<style scoped lang="scss">
.bmp {
    display: flex;
    flex-wrap: wrap;
    padding: 12px;

    .panel {
        padding: 12px;
        margin: 0 16px 16px 0;
        background-color: #05213d;
    }

    .title {
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
    }
}
</style>
