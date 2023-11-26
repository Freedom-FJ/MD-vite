import request from '../../../service/request'

interface GetAirQualityStatisParams {
    time: number
    codeType: string
    code: string
}

interface PrimaryYearSum$1Type {
    NO2: number
    noMainPollutant: number
    total: number
    O3: number
    'PM2.5': number
    SO2: number
    PM10: number
    CO: number
}

interface PrimaryMonthSum$2Type {
    NO2: Array<number>
    noMainPollutant: Array<number>
    times: Array<string>
    O3: Array<number>
    'PM2.5': Array<number>
    SO2: Array<number>
    PM10: Array<number>
    CO: Array<number>
}

interface PrimaryPollutant$3Type {
    primaryYearSum: PrimaryYearSum$1Type
    primaryMonthSum: PrimaryMonthSum$2Type
}

interface CIEQYearValueRate$4Type {
    'V_ICIEQ_PM2.5': number
    V_ICIEQ_NO2: number
    V_ICIEQ_PM10: number
    V_ICIEQ_O3: number
    V_ICIEQ_CO: number
    V_ICIEQ_SO2: number
}

interface CIEQYearValue$5Type {
    V_ICIEQ_CO: number
    V_ICIEQ_SO2: number
    'V_ICIEQ_PM2.5': number
    V_ICIEQ_NO2: number
    V_ICIEQ_PM10: number
    cieq: number
    V_ICIEQ_O3: number
}

interface CIEQMonthValueRate$6Type {
    times: Array<string>
    V_ICIEQ_CO: Array<number | string>
    V_ICIEQ_SO2: Array<number | string>
    'V_ICIEQ_PM2.5': Array<number | string>
    V_ICIEQ_NO2: Array<string | number>
    V_ICIEQ_PM10: Array<string | number>
    V_ICIEQ_O3: Array<number | string>
}

interface CIEQMonthValue$7Type {
    times: Array<string>
    V_ICIEQ_CO: Array<number | string>
    V_ICIEQ_SO2: Array<number | string>
    'V_ICIEQ_PM2.5': Array<number | string>
    V_ICIEQ_NO2: Array<string | number>
    V_ICIEQ_PM10: Array<string | number>
    cieq: Array<number | string>
    V_ICIEQ_O3: Array<number | string>
}

interface CIEQ$8Type {
    CIEQYearValueRate: CIEQYearValueRate$4Type
    CIEQYearValue: CIEQYearValue$5Type
    CIEQMonthValueRate: CIEQMonthValueRate$6Type
    CIEQMonthValue: CIEQMonthValue$7Type
}

interface LevelMonthSum$9Type {
    veryGood: Array<number>
    total: Array<number>
    times: Array<string>
    mild: Array<number>
    serious: Array<number>
    medium: Array<number>
    verySerious: Array<number>
    good: Array<number>
}

interface LevelMonthSumRate$10Type {
    veryGood: Array<number>
    serious: Array<number>
    medium: Array<number>
    verySerious: Array<number>
    good: Array<number>
    mild: Array<number>
}

interface LevelYearSumRate$11Type {
    veryGood: number
    serious: number
    medium: number
    verySerious: number
    good: number
    mild: number
}

interface LevelYearSum$12Type {
    veryGood: number
    total: number
    mild: number
    serious: number
    medium: number
    verySerious: number
    good: number
}

interface AirQualityLevel$13Type {
    levelMonthSum: LevelMonthSum$9Type
    levelMonthSumRate: LevelMonthSumRate$10Type
    levelYearSumRate: LevelYearSumRate$11Type
    levelYearSum: LevelYearSum$12Type
}

interface Data$14Type {
    primaryPollutant: PrimaryPollutant$3Type
    CIEQ: CIEQ$8Type
    airQualityLevel: AirQualityLevel$13Type
}

export const getAirQualityStatis = (params: GetAirQualityStatisParams) => {
    return request<Data$14Type>({
        url: '/aims-server/web/api/v1/env-feature/air-quality-statis',
        method: 'get',
        params,
    })
}

export type { GetAirQualityStatisParams }
