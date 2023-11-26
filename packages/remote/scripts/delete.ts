/*
 * @Author: mjh
 * @Date: 2023-07-10 11:22:39
 * @LastEditors: mjh
 * @LastEditTime: 2023-07-10 12:06:14
 * @Description:
 */
import path from 'path'
import { readdir, statSync, unlinkSync } from 'fs'

export function deleteSvgFiles(directory: string) {
    readdir(directory, (err, files) => {
        if (err) throw err

        files.forEach((file) => {
            const filePath = path.join(directory, file)

            // 检查是否为目录
            if (statSync(filePath).isDirectory()) {
                // 递归调用删除函数以处理子目录
                deleteSvgFiles(filePath)
            }
            else {
                // 检查文件扩展名是否为 .svg
                if (path.extname(file).toLowerCase() === '.svg') {
                    // 删除文件
                    unlinkSync(filePath)
                    console.log(`Deleted file: ${filePath}`)
                }
            }
        })
    })
}
