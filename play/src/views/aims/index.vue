<template>
    <div class="conatiner">
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityRealTime" title="空气质量" sub-titie="（实时）">
            <DvAimsAirQualityRealTime :api-params="apiParams_1" time-type="hour" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityRealTime" title="空气质量" sub-titie="（今日）">
            <DvAimsAirQualityRealTime :api-params="apiParams_1" time-type="day" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityRealTimeAndDay" title="空气质量" sub-titie="（实时&今日）">
            <DvAimsAirQualityRealTimeAndDay :api-params="apiParams_2" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityPresentSituation" title="综合指数">
            <DvAimsAirQualityPresentSituation :api-params="apiParams_3" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsWeatherCondition" title="气象条件">
            <DvAimsWeatherCondition :api-params="apiParams_4" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsCieqContributionYearRatio" title="综合指数贡献比">
            <DvAimsCieqContributionYearRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsCieqContributionMonthRatio" title="年度各月综合指数贡献分析">
            <DvAimsCieqContributionMonthRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsMulGridCieqContributionMonthRatio" title="多区域综合指数贡献分析">
            <DvAimsMulGridCieqContributionMonthRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityLevelMonthRatio" title="年度各月空气质量等级占比">
            <DvAimsAirQualityLevelMonthRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsMulGridAirQualityLevelMonthRatio" title="多区域空气质量等级占比">
            <DvAimsMulGridAirQualityLevelMonthRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsFactorRealTimeRankList" title="站点因子实时排名列表">
            <DvAimsFactorRealTimeRankList :api-params="apiParams_5" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsFactorRealTimeRankChart" title="站点因子实时排名图表">
            <DvAimsFactorRealTimeRankChart :api-params="apiParams_5" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsMainPollutionMonthRatio" title="首要污染天数月份统计情况">
            <DvAimsMainPollutionMonthRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityCalendar" title="空气质量日历">
            <DvAimsAirQualityCalendar />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirTimeSeriesAnalysis" title="空气质量变化">
            <DvAimsAirTimeSeriesAnalysis :api-params="apiParams_6" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsTbHbAnalysis" title="同比趋势比较">
            <DvAimsTbHbAnalysis :api-params="apiParams_7" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsFactorTargetYearPeriod" title="大气因子目标同比">
            <DvAimsFactorTargetYearPeriod />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsTargetAssessment" title="目标考核">
            <DvAimsTargetAssessment />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsEnvChangeTrends" title="环境变化趋势">
            <DvAimsEnvChangeTrends :api-params="apiParams_8" />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsEnvironmentMonitor" title="环境监测">
            <DvAimsEnvironmentMonitor />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsPollutionSourceMonitor" title="源监控">
            <DvAimsPollutionSourceMonitor />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsMainPollutionYearRatio" title="首要污染物占比情况">
            <DvAimsMainPollutionYearRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsMainPollutionYearRatio2" title="首要污染物占比情况">
            <DvAimsMainPollutionYearRatio2 />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsMainPollutionYearRatioList" title="首要污染物占比情况">
            <DvAimsMainPollutionYearRatioList />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsPollutionSourceAnalysis" title="PM2.5源解析">
            <DvAimsPollutionSourceAnalysis />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityLevelYearRatio" title="时间范围污染等级占比">
            <DvAimsAirQualityLevelYearRatio />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsAirQualityLevelYearRatio2" title="时间范围污染等级占比">
            <DvAimsAirQualityLevelYearRatio2 />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsCieqContributionAnalysis" title="综合指数贡献分析">
            <DvAimsCieqContributionAnalysis />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsMeteorologicalAnalysis" title="风向分析">
            <DvAimsMeteorologicalAnalysis />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsSameAndCurrentPeriodRank" title="本期同期改善幅度排名">
            <DvAimsSameAndCurrentPeriodRank />
        </DvAimsBasicCard>
        <DvAimsBasicCard :show-copy="true" copy-str="DvAimsWeatherForecast" title="气象预报">
            <DvAimsWeatherForecast />
        </DvAimsBasicCard>
    </div>
</template>

<script setup lang="ts">
import {
    DvAimsAirQualityCalendar,
    DvAimsAirQualityLevelMonthRatio,
    DvAimsAirQualityLevelYearRatio,
    DvAimsAirQualityLevelYearRatio2,
    DvAimsAirQualityPresentSituation,
    DvAimsAirQualityRealTime,
    DvAimsAirQualityRealTimeAndDay,
    DvAimsAirTimeSeriesAnalysis,
    DvAimsBasicCard,
    DvAimsCieqContributionAnalysis,
    DvAimsCieqContributionMonthRatio,
    DvAimsCieqContributionYearRatio,
    DvAimsEnvChangeTrends,
    DvAimsEnvironmentMonitor,
    DvAimsFactorRealTimeRankChart,
    DvAimsFactorRealTimeRankList,
    DvAimsFactorTargetYearPeriod,
    DvAimsMainPollutionMonthRatio,
    DvAimsMainPollutionYearRatio,
    DvAimsMainPollutionYearRatio2,
    DvAimsMainPollutionYearRatioList,
    DvAimsMeteorologicalAnalysis,
    DvAimsMulGridAirQualityLevelMonthRatio,
    DvAimsMulGridCieqContributionMonthRatio,
    DvAimsPollutionSourceAnalysis,
    DvAimsPollutionSourceMonitor,
    DvAimsSameAndCurrentPeriodRank,
    DvAimsTargetAssessment,
    DvAimsTbHbAnalysis,
    DvAimsWeatherCondition,
    DvAimsWeatherForecast
} from '@data-visual/aims'

import dayjs from 'dayjs'

const apiParams_1 = ref({
    time: dayjs('2022-8-15 16').valueOf(),
    gridCode: '01010000',
    gridLevelNickName: 'city'
})
const apiParams_2 = ref({
    time: dayjs('2022-8-15 15').valueOf(),
    gridCode: '01010000'
})
const apiParams_3 = ref({
    time: dayjs('2022-8-15 15').valueOf(),
    gridCode: '0101000000',
    timeType: 'year'
})
const apiParams_4 = ref({
    time: dayjs('2022-8-15 15').valueOf(),
    gridCode: '0101000000',
    timeType: 'hour'
})
const apiParams_5 = ref({
    time: dayjs('2023-8-15 15').valueOf(),
    gridCode: '0101000000',
    timeType: 'hour',
    siteTypeCodes: 'A91230101,A91230102,A91230103',
    type: 'site',
    isAsc: false,
})
const apiParams_6 = ref({
    dataType: 'day',
    startTime: dayjs('2022-8-15 15').valueOf(),
    endTime: dayjs('2022-8-25 15').valueOf(),
    factorCodes: 'aqi,a34004,a34002,a21026,a21004,a05024,a21005',
    codeType: 'grid',
    codes: '0101000000',
})
const apiParams_7 = ref({
    dataType: 'month',
    startTime: dayjs('2022-01-01').valueOf(),
    endTime: dayjs('2022-12-25').valueOf(),
    factorCode: 'cieq',
    codeType: 'grid',
    code: '0101000000',
})
const apiParams_8 = ref({
    startTime: dayjs('2022-8-15 15').valueOf(),
    endTime: dayjs('2022-8-16 15').valueOf(),
    codeType: 'grid',
    codes: '0101000000', // 只允许传一个code
})
</script>

<style lang="scss" scoped>
.conatiner {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 80px;

    :deep(.dv-aims-basic-card-container) {
        margin-right: 40px;
        margin-bottom: 40px;
    }
}
</style>
