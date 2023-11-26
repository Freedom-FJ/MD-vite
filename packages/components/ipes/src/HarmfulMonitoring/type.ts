export interface AirQuality {
    time: string
    aqiValue: number | null
    aqiColor: string
    aqiLevel: string
    mainPolluter: string
    yearRatio: string
    goal: number | null
    year?: number
}

export interface Factor {
    factorName: string // PM2.5
    factorValue: number | null // 100
    targetValue: number | null // 50
    percent: number | null // 200
  }

export interface StatusMap {
  normal: string
  abnormal: string
  offline: string
}
