/*
 * @Author: mjh
 * @Date: 2022-10-21 19:26:00
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-08 11:11:49
 * @Description:
 */
export declare namespace WATER_QUALITY_REGIONAL_API_REQUEST {
    interface synthesisIndexChange {
        treeId: number | string
        treeType: number
        year: number | string
    }
}
export declare namespace WATER_QUALITY_REGIONAL_API_RESPONSE {
    interface synthesisIndexChange {
        'synthesisIndex': number
        'time': string
    }
}
