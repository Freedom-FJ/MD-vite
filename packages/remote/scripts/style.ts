import { dest, series, src } from 'gulp'

export const copyBaseCss = (from: string, to: string) => {
    return src(`${from}/**.css`).pipe(dest(`${to}`))
}
