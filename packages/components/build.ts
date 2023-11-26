/*
 * @Author: mjh
 * @Date: 2023-07-10 11:25:40
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-08 10:10:20
 * @Description:
 */
import { resolve } from 'path'
import { dest, series, src } from 'gulp'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import sass from 'gulp-dart-sass'
import cssmin from 'gulp-cssmin'

// pkg根目录
export const pkgPath = resolve(__dirname, './dist')
export const curPath = resolve(__dirname, './')
export const wgmsPath = resolve(__dirname, './wgms')
export const aimsPath = resolve(__dirname, './aims')
export const ipesPath = resolve(__dirname, './ipes')
export const bmpPath = resolve(__dirname, './bmp')
export const baseStylePath = resolve(__dirname, '../remote/src/theme')

const esPath = `${pkgPath}/es`
const libPath = `${pkgPath}/lib`

//  拷贝类型
export const cloneTypes = async () => {
    return src(`${esPath}/**/**.d.ts`)
        .pipe(dest(`${libPath}`))
}
//  拷贝样式文件
export const cloneStyle = async () => {
    await src(`${baseStylePath}/**.css`)
        .pipe(concat('base.css')).pipe(dest(`${pkgPath}/style`))
    return src([`${baseStylePath}/**.css`, `${esPath}/**/**.css`]).pipe(cssmin()).pipe(concat('style.css'))
        .pipe(dest(`${libPath}`)).pipe(dest(`${esPath}`))
}

export const cloneSingleStyle = async () => {
    const folders = ['bmp', 'aims', 'wgms', 'ipes']
    return Promise.all(folders.map((folder) => {
        return src(`${curPath}/${folder}/dist/style.css`)
            .pipe(rename(`style-${folder}.css`))
            .pipe(cssmin())
            .pipe(dest(`${pkgPath}/style`))
    }))
}
export const getWgmsCss = async () => {
    src(`${wgmsPath}/styles/mixins.scss`)
    src(`${wgmsPath}/**/**.scss`)
        .pipe(concat('style-wgms.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(dest(`${pkgPath}/style`))
}
export const getBmpCss = async () => {
    src(`${bmpPath}/**/**.scss`)
        .pipe(concat('style-bmp.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(dest(`${pkgPath}/style`))
}

export const getAimsCss = async () => {
    src(`${aimsPath}/**/**.scss`)
        .pipe(concat('style-aims.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(dest(`${pkgPath}/style`))
}
export const getIpesCss = async () => {
    src(`${ipesPath}/**/**.scss`)
        .pipe(concat('style-ipes.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(dest(`${pkgPath}/style`))
}
export default series(
    async () => cloneTypes(),
    async () => cloneStyle(),
    async () => cloneSingleStyle(),
    // async () => getWgmsCss(),
    // async () => getBmpCss(),
    // async () => getAimsCss(),
    // async () => getIpesCss(),
    // parallel(
    //     async () => buildComponent(),
    // )
)
