/*
 * @Author: mjh
 * @Date: 2023-07-10 12:09:01
 * @LastEditors: mjh
 * @LastEditTime: 2023-08-25 10:10:37
 * @Description:
 */
import path from 'path'
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { dest, src } from 'gulp'
import { componentsPath, docsPath } from './path'
export function copyReadmeFiles(directory: string, destination: string) {
    if (!existsSync(destination))
        mkdirSync(destination, { recursive: true })

    readdirSync(directory).forEach((file) => {
        const filePath = path.join(directory, file)

        if (statSync(filePath).isDirectory() && file !== 'node_modules') {
            copyReadmeFiles(filePath, destination)
        }
        else {
            if (file.toLowerCase() === 'readme.md') {
                const folderName = path.basename(path.dirname(filePath))
                const newFilePath = path.join(destination, `${folderName}.md`)

                copyFileSync(filePath, newFilePath)
                console.log(`Copied file: ${filePath} to ${newFilePath}`)
            }
        }
    })
}

export function copyChangeLog() {
    return src(`${componentsPath}/CHANGELOG.md`)
        .pipe(dest(`${docsPath}`))
}
