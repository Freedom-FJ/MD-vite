<template>
    <div class="dv-ipes-app-item" :class="{ 'dv-ipes-app-item-active': value }" @click="onChange">
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits({
    onChangeValue: (value: Boolean) => value,
})

const onChange = () => {
    emit('onChangeValue', !props.value)
}
</script>

<style lang="scss" scoped>
@import "../style/AppItem";
</style>
