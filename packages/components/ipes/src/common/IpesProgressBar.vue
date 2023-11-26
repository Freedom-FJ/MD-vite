<!--
 * @Name: progress.vue
 * @Author: forguo
 * @Date: 2023/3/24 16:15
 * @Description: ProgressBar
-->
<template>
    <div class="dv-ipes-progress-bar">
        <div class="progress-bar__outer__top">
            <div
                class="progress-bar__inner"
                :style="{ transform: `translate3d(${percent > 100 ? 100 : percent}%,0,0)` }"
            />
        </div>
        <div class="progress-bar__outer__bottom">
            <div
                class="progress-bar__inner"
                :style="{ transform: `translate3d(${percent > 100 ? 100 : percent}%,0,0)` }"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'IpesProgressBar',
    props: {
        percent: {
            type: Number,
            default: 0,
        },
    },
}
</script>

<style lang="scss" scoped>
@import "./style/IpesProgressBar";
</style>
