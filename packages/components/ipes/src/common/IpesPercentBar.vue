<!--
 * @Name: progress.vue
 * @Author: forguo
 * @Date: 2023/3/24 16:15
 * @Description: IpesPercentBar
-->
<template>
    <div class="dv-ipes-percent-bar">
        <div
            v-for="(item, idx) in list"
            :key="idx"
            class="percent-bar__inner"
            :style="{ background: item.background, width: `${(item.value / total) * 100}%` }"
        />
    </div>
</template>

<script>
export default {
    name: 'IpesPercentBar',
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        total() {
            return this.list.reduce((total, item) => {
                return total + item.value
            }, 0)
        },
    },
}
</script>

<style lang="scss" scoped>
@import "./style/IpesPercentBar";
</style>
