/**
 * time: '',
        aqiValue: 0,
        aqiColor: '',
        aqiLevel: '',
        mainPolluter: '',
        yearRatio: 0,
        goal: 0,
 */
export interface AirQuality {
    time: string
    aqiValue: number | null
    aqiColor: string
    aqiLevel: string
    mainPolluter: string
    yearRatio: string
    goal: number | null
  }

export interface Factor {
    factorName: string // PM2.5
    factorValue: number | null // 100
    targetValue: number | null // 50
    color: string // #00ff00
  }
