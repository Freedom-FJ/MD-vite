<!--
 * @Author: mjh
 * @Date: 2023-09-05 11:48:34
 * @LastEditors: mjh
 * @LastEditTime: 2023-09-25 14:43:25
 * @Description:
-->
<template>
    <div class="edit-tools">
        <div class="tools-item">
            <div class="text-line">
                模版名称
            </div>
            <el-input v-model="themDic.title" />
        </div>
        <div class="tools-item">
            <div class="text-line">
                作者
            </div>
            <el-input v-model="themDic.name" />
        </div>
        <div class="tools-item">
            <div class="text-line">
                是否显示组件
            </div>
            <el-checkbox v-model="isShowComponents" label="组件及标题" size="large" />
        </div>
        <div class="line-item-box">
            <div class="tools-item">
                <div class="text-line">
                    界面框架图
                </div>
                <el-upload
                    class="avatar-uploader avatar"
                    :action="config.fileUpload"
                    :on-success="(e:any) => handleAvatarSuccess(e, themDic.layoutPanel)"
                    :show-file-list="false"
                    drag
                >
                    <img v-if="themDic.layoutPanel.img" :src="themDic.layoutPanel.img" class="avatar">
                    <div v-else class="avatar">
                        <el-icon class="avatar-uploader-icon">
                            +
                        </el-icon>
                    </div>
                </el-upload>
            </div>
            <div class="tools-item">
                <div class="text-line">
                    地图背景
                </div>
                <el-upload
                    class="avatar-uploader avatar"
                    :action="config.fileUpload"
                    :on-success="(e:any) => handleAvatarSuccess(e, themDic.layoutPanel, true)"
                    :show-file-list="false"
                    drag
                >
                    <img v-if="themDic.layoutPanel.mapImg" :src="themDic.layoutPanel.mapImg" class="avatar">
                    <div v-else class="avatar">
                        <el-icon class="avatar-uploader-icon">
                            +
                        </el-icon>
                    </div>
                </el-upload>
            </div>
        </div>
        <div class="tools-item">
            <div class="text-line">
                面板背景图（2倍图）
                <el-checkbox v-model="themDic.basePanel.isBlur" label="背景模糊" size="large" @change="changeTheme()" />
            </div>
            <el-upload
                class="avatar-uploader avatar"
                action="http://ued.fpi-inc.site/file-base-server/api/v1/sys/upload"
                :show-file-list="false"
                :on-success="(e:any) => handleAvatarSuccess(e, themDic.basePanel)"
                drag
            >
                <img v-if="themDic.basePanel.img" :src="themDic.basePanel.img" class="avatar">
                <div v-else class="avatar">
                    <el-icon class="avatar-uploader-icon">
                        +
                    </el-icon>
                </div>
            </el-upload>
        </div>
        <div class="tools-item">
            <div class="text-line">
                面板弹框背景图（2倍图）
                <el-checkbox v-model="themDic.popPanel.isBlur" label="背景模糊" size="large" @change="changeTheme()" />
            </div>
            <el-upload
                class="avatar-uploader avatar"
                action="http://ued.fpi-inc.site/file-base-server/api/v1/sys/upload"
                :show-file-list="false"
                :on-success="(e:any) => handleAvatarSuccess(e, themDic.popPanel)"
                drag
            >
                <img v-if="themDic.popPanel.img" :src="themDic.popPanel.img" class="avatar">
                <div v-else class="avatar">
                    <el-icon class="avatar-uploader-icon">
                        +
                    </el-icon>
                </div>
            </el-upload>
        </div>
        <div class="tools-item">
            <div class="text-line">
                地图弹框背景图（2倍图）
                <el-checkbox v-model="themDic.mapPanel.isBlur" label="背景模糊" size="large" @change="changeTheme()" />
            </div>
            <el-upload
                class="avatar-uploader avatar"
                action="http://ued.fpi-inc.site/file-base-server/api/v1/sys/upload"
                :show-file-list="false"
                :on-success="(e:any) => handleAvatarSuccess(e, themDic.mapPanel)"
                drag
            >
                <img v-if="themDic.mapPanel.img" :src="themDic.mapPanel.img" class="avatar">
                <div v-else class="avatar">
                    <el-icon class="avatar-uploader-icon">
                        +
                    </el-icon>
                </div>
            </el-upload>
        </div>
        <div>
            <el-button type="primary" @click="saveTheme()">
                保存
            </el-button>
            <el-button @click="backList">
                返回
            </el-button>
            <el-button v-if="themDic.code" type="danger" @click="deleteTheme()">
                删除
            </el-button>
            <el-button type="success" @click="outPut()">
                导出
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useModel } from 'vue'
import config from '../../../config'
import type { ThemeDic } from '../../../types/panel'
import { deleteTheme as deleteThemeApi } from '../../../api/theme'
import { useThemeStore } from '../../../store/theme'
const props = defineProps({
    isShowComponents: {
        type: Boolean,
        default: false
    }
})
const $emit = defineEmits(['save', 'backList', 'outPut'])
const themeStore = useThemeStore()
const themDic = ref<ThemeDic>({
    code: '',
    title: '亮色主题',
    name: '孔强',
    popPanel: {
        img: '',
        isBlur: true
    },
    basePanel: {
        img: '',
        isBlur: true
    },
    mapPanel: {
        img: '',
        isBlur: true
    },
    layoutPanel: {
        img: '',
        mapImg: '',
        isBlur: true
    },
})

const isShowComponents = useModel(props, 'isShowComponents')
onMounted(() => {
    themDic.value = themeStore.getCurrTheme
})

const changeTheme = () => {
    themeStore.setTheme(themDic.value)
}
const handleAvatarSuccess = (e: { ID: string }[], panel: { img: string; mapImg?: string }, isMapImg?: boolean) => {
    if (isMapImg) panel.mapImg = config.fileDownload + e?.[0].ID
    else panel.img = config.fileDownload + e?.[0].ID
    themeStore.setTheme(themDic.value)
}

const backList = () => {
    ElMessageBox.confirm('主题未保存确定返回？', '返回', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        $emit('backList')
    }).catch(() => {
    })
}
const saveTheme = () => {
    ElMessageBox.confirm('确定保存此主题修改吗', '保存', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        $emit('save', themDic.value)
    }).catch(() => {})
}

const deleteTheme = () => {
    ElMessageBox.confirm('确定删除此主题修改吗', '删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        if (!themDic.value.code) return
        const res = await deleteThemeApi({ code: themDic.value.code })
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            setTimeout(() => {
                $emit('backList')
            }, 200)
        }
        else {
            ElMessage({
                type: 'warning',
                message: '删除失败'
            })
        }
    }).catch(() => {
        ElMessage({
            type: 'warning',
            message: '删除失败'
        })
    })
}

const outPut = () => {
    ElMessageBox.confirm('确定导出此主题修改吗', '保存', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        $emit('outPut', themDic.value)
    }).catch(() => {})
}
</script>

<style scoped lang="scss">
.edit-tools {
    width: 100%;
    height: 100%;
    padding: 32px 24px;
    overflow: auto;
    background: var(--dv-color-primary-20);

    .tools-item {
        margin-bottom: 18px;
    }

    .text-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        font-size: var(--dv-text-headline1);
        font-weight: normal;
        line-height: var(--dv-text-headline1);
        color: var(--dv-color-text-primary);
        letter-spacing: 0;
    }

    .line-item-box {
        display: flex;
        gap: 40px;
    }

    .avatar {
        display: block;
        width: 178px;
        height: 178px;
    }
}
</style>

<style>
.avatar-uploader .el-upload-dragger {
    padding: 0 !important;
}

.avatar-uploader .is-dragover {
    padding: 0 !important;
}

.avatar-uploader .el-upload {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    width: 178px;
    height: 178px;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}
</style>
