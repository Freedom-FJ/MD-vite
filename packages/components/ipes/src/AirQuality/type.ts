export interface Factor {
    NAME: string // PM2.5
    factorValue: number | null // 100
    UNIT: string | null // 50
    color: string // #00ff00
}
export interface AirQuality {
    aqi: number | null // 100
    level: string //
    levelCode: string //
    aqiColor: string // #00ff00 ｜ #ff0000 ｜ #ff0000
    primaryPollutant: string // PM2.5
    factor: Factor[]
  }

