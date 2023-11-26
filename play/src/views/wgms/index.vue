<!--
 * @Author: mjh
 * @Date: 2023-06-30 14:56:28
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 09:48:35
 * @Description:
-->
<template>
    <div class="wgms">
        <div class="panel">
            <div class="title">
                重点因子、月份、区域、时段
            </div>
            <DvWgmsEnvironmentalAnalysis type="month" :begin-time="dayjs('2023').add(-5, 'years').startOf('year').valueOf()" :end-time="dayjs('2023').endOf('year').valueOf()" />
            <DvWgmsEnvironmentalAnalysis type="factor" :begin-time="dayjs('2023').add(-5, 'years').startOf('year').valueOf()" :end-time="dayjs('2023').endOf('year').valueOf()" />
            <DvWgmsEnvironmentalAnalysis type="area" limit-type="bottom" :begin-time="dayjs('2023').add(-5, 'years').startOf('year').valueOf()" :end-time="dayjs('2023').endOf('year').valueOf()" />
        </div>
        <div class="panel">
            <div class="title">
                水质状况
            </div>
            <DvWgmsWaterQualityStatus />
        </div>
        <div class="panel">
            <div class="title">
                水质类别
            </div>
            <DvWgmsWaterQualityClassification />
        </div>
        <div class="panel">
            <div class="title">
                环境监测在线
            </div>
            <DvWgmsWaterEnvironmentOnlineMonitor />
            <DvWgmsSewageOutletsOnlineMonitor />
        </div>
        <div class="panel">
            <div class="title">
                水质-雨量-水位趋势对比图
            </div>
            <DvWgmsWaterQualityRainfall :start-time="1687492800000" :end-time="1687539599999" time-type="hour" factor-name="总磷(以 P 计）" factor-unit="mg / L" :latitude="30.3992" :longitude="119.9681" />
        </div>
        <div class="panel">
            <div class="title">
                站点因k线与日变化
            </div>
            <DvWgmsSevenDayKline :begin-time="1687492800000" :end-time="1687539599999" :factor="27" access-code="JMSZSY0008" time-type="hour" factor-name="总磷(以 P 计）" :factor-flag="false" factor-unit="mg / L" />
        </div>
        <div class="panel">
            <div class="title">
                周边污染影响
            </div>
            <DvWgmsSurroundingPollution :distance="10000" :start-time="1687492800000" :end-time="1687539599999" time-type="hour" :access-code-list="['YHWSZZ006', 'YHWSZZ007', 'YHWSZZ014', 'YHWSZZ015']" :time-stamp="1687536000000" :latitude="30.3992" :longitude="119.9681" :limit="3" :min-wave="2" :factor="27" />
        </div>
        <div class="panel">
            <div class="title">
                辅助研判
            </div>
            <DvWgmsAuxiliaryJudgment :start-time="1653926400000" :end-time="1656691200000" :factor-id="27" site-code="GKA330100_2009" time-type="hour" :latitude="30.3992" :longitude="119.9681" />
        </div>
        <div class="panel">
            <div class="title">
                重点河道水质评价
            </div>
            <DvWgmsKeyRiverWaterQualityEvaluation />
        </div>
        <div class="panel">
            <div class="title">
                饮用水源地达标率
            </div>
            <DvWgmsDrinkingWaterComplianceRate />
        </div>
        <div class="panel">
            <div class="title">
                上游影响
            </div>
            <DvWgmsUpstreamImpact
                :time="1671667200000" factor-code="w21003"
                site-code="JMSZSY0008" source-ids="22974,22975,22982,22983,22986,22987,23024,23031,23033,23034,23036,23047,23048,23066,23069,23073,2307" time-type="hour"
                water-quality="3c70ae2734d64bbe8b598af6c6612423"
                section-type="001"
            />
        </div>
        <div class="panel">
            <div class="title">
                叶绿素a沿程变化
            </div>
            <DvWgmsChangesAlongTheProcess
                :data-type="0"
                :start-time="1653926400000" :end-time="1656691200000"
                source-ids=""
                site-code="JMSZSY0008" :station-code="1"
                time-type="hour"
            />
        </div>
        <div class="panel">
            <div class="title">
                断面相关性系数排名及最近报警统计
            </div>
            <DvWgmsCrossSectionCorrelation :time="dayjs().startOf('year').valueOf()" :analysis-time="27" :target-factor-id="27" access-code="" query-time-type="hour" source-factors="" :delayed-flag="true" :filter-empty="false" :limit="3" :begin-time="dayjs().startOf('year').valueOf()" :end-time="dayjs().endOf('year').valueOf()" />
        </div>
        <div class="panel">
            <div class="title">
                上游断面最近报警统计
            </div>
            <DvWgmsUpstreamSection
                :data-type="0"
                :start-time="1653926400000" :end-time="1656691200000"
                source-ids=""
                site-code="JMSZSY0008" :station-code="1"
                time-type="hour"
            />
        </div>
        <div class="panel">
            <div class="title">
                下级排名
            </div>
            <DvWgmsSubordinateRanking />
        </div>

        <div class="panel">
            <div class="title">
                藻类研判分析：叶绿素a变化率
            </div>
            <DvWgmsChlorophyllAChangeRate
                :end-time="1663257600000"
                :start-time="1662739200000"
                site-code="zaoleishougong"
                station-code="1"
                time-type="day"
            />
        </div>

        <div class="panel">
            <div class="title">
                藻类研判分析：排名前三关联因子
            </div>
            <DvWgmsFactorTopThreeRanking
                :end-time="1663257600000"
                :start-time="1662739200000"
                site-code="zaoleishougong"
                station-code="1"
                time-type="day"
            />
        </div>
        <div class="panel">
            <div class="title">
                要素趋势对比
            </div>
            <DvWgmsFactorTrendComparison
                :end-time="1663257600000"
                :start-time="1662739200000"
                site-code="zaoleishougong"
                station-code="1"
                time-type="day"
            />
        </div>

        <div class="panel">
            <div class="title">
                氮磷比趋势变化
            </div>
            <DvWgmsNPTrendChange
                :end-time="1663257600000"
                :start-time="1662739200000"
                site-code="zaoleishougong"
                station-code="1"
                time-type="day"
                automatic="automatic"
            />
        </div>

        <div class="panel">
            <div class="title">
                布点现状
            </div>
            <DvWgmsDistributionPoints />
        </div>
        <div class="panel">
            <div class="title">
                流域水质、水体水质、湖库富营养化指数
            </div>
            <DvWgmsLakeRiverIndex />
        </div>

        <div class="panel">
            <div class="title">
                污染源管控
            </div>
            <DvWgmsPollutionSourceControl />
        </div>
        <div class="panel">
            <div class="title">
                水质现状(1.1)
            </div>
            <DvWgmsWaterQualitySituation />
        </div>
        <div class="panel">
            <div class="title">
                区域水质分析(1.1)
            </div>
            <DvWgmsRegionalQualityAnalysis />
        </div>
        <div class="panel">
            <div class="title">
                地州水质分析(1.1)
            </div>
            <DvWgmsWaterQualityStatesAnalysis />
        </div>
        <div class="panel">
            <div class="title">
                区域水质综合指数变化(1.1)
            </div>
            <DvWgmsWaterQualityRegionalComprehensive />
        </div>
        <div class="panel">
            <div class="title">
                站点水质统计(1.1)
            </div>
            <DvWgmsStationWaterQualityStatistics />
        </div>
        <div class="panel">
            <div class="title">
                源监控(1.1)
            </div>
            <DvWgmsSourceMonitoring />
        </div>
        <div class="panel">
            <div class="title">
                水质等级分布(1.1)
            </div>
            <DvWgmsDistributionOfWaterQualityLevels style="width: 376px;" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    DvWgmsAuxiliaryJudgment,
    DvWgmsChangesAlongTheProcess,
    DvWgmsChlorophyllAChangeRate,
    DvWgmsCrossSectionCorrelation,
    DvWgmsDistributionOfWaterQualityLevels,
    DvWgmsDistributionPoints,
    DvWgmsDrinkingWaterComplianceRate,
    DvWgmsEnvironmentalAnalysis,
    DvWgmsFactorTopThreeRanking,
    DvWgmsFactorTrendComparison,
    DvWgmsKeyRiverWaterQualityEvaluation,
    DvWgmsLakeRiverIndex,
    DvWgmsNPTrendChange,
    DvWgmsPollutionSourceControl,
    DvWgmsRegionalQualityAnalysis,
    DvWgmsSevenDayKline,
    DvWgmsSewageOutletsOnlineMonitor,
    DvWgmsSourceMonitoring,
    DvWgmsStationWaterQualityStatistics,
    DvWgmsSubordinateRanking,
    DvWgmsSurroundingPollution,
    DvWgmsUpstreamImpact,
    DvWgmsUpstreamSection,
    DvWgmsWaterEnvironmentOnlineMonitor,
    DvWgmsWaterQualityClassification,
    DvWgmsWaterQualityRainfall,
    DvWgmsWaterQualityRegionalComprehensive,
    DvWgmsWaterQualitySituation,
    DvWgmsWaterQualityStatesAnalysis,
    DvWgmsWaterQualityStatus
} from '@data-visual/wgms'

import dayjs from 'dayjs'

defineOptions({
    name: 'Wgms'
})
</script>

<style scoped lang="scss">
.wgms {
    display: flex;
    flex-wrap: wrap;

    .panel {
        padding: 12px;
        margin: 0 16px 16px 0;

        // background-color: #05213d;
    }

    .title {
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
    }
}

.light {
    .title {
        color: black;
    }
}
</style>
