/*
 * @Author: mjh
 * @Date: 2023-08-31 13:47:32
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-31 13:47:47
 * @Description:
 */
export interface popTableOptionAllTs {
    label: string
    key: string
    flex: number
    type: 'tool' | 'select'
    class: string
    list: selectPanelTs[]
    defaultSelect: number
    click: (item: Record<string, any>, optionItem: popTableOptionAllTs) => any
    headerStyle: Record<string, any>
    rowStyle: Record<string, any>
    toolList: { label: string; click: (item: Record<string, any>, itemOption: Partial<popTableOptionAllTs>) => any }[]
    render: (val: Record<string, any>, optionItem: Partial<popTableOptionTs>) => string | number
    renderStyle: (val: Record<string, any>, item: Partial<popTableOptionTs>) => Record<string, any>
}
export type popTableOptionTs = Partial<popTableOptionAllTs>

export interface selectPanelTs {
    value: string | number | boolean
    label: string
    selectLabel?: string
}
