<!--
 * @Author: Tian
 * @Date: 2023-08-11 10:10:31
 * @LastEditors: Tian
 * @LastEditTime: 2023-08-24 15:18:23
 * @Description: 箭头(上、下、右)
-->
<template>
    <div class="arrow" :class="direction">
        <div class="bar" />
        <div class="triangle" />
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
defineProps({
    direction: {
        type: String as PropType<'up' | 'down' | 'flat' | 'up-red' | 'down-green'>,
        default: 'up'
    },
})
</script>

<style lang="scss" scoped>
.down {
    .bar {
        width: 2px;
        height: 8px;
        margin: 0 3px;
        background-color: var(--dv-color-danger);
    }

    .triangle {
        width: 0;
        height: 0;
        border-top: 5px solid  var(--dv-color-danger);
        border-right: 4px solid  transparent;
        border-bottom: 0 solid  transparent;
        border-left: 4px solid  transparent;
    }
}

.down-green {
    .bar {
        width: 2px;
        height: 8px;
        margin: 0 3px;
        background-color: var(--dv-color-success);
    }

    .triangle {
        width: 0;
        height: 0;
        border-top: 5px solid  var(--dv-color-success);
        border-right: 4px solid  transparent;
        border-bottom: 0 solid  transparent;
        border-left: 4px solid  transparent;
    }
}

.up {
    display: flex;
    flex-direction: column;

    .bar {
        order: 2;
        width: 2px;
        height: 8px;
        margin: 0 3px;
        background-color: var(--dv-color-success);
    }

    .triangle {
        width: 0;
        height: 0;
        border-top: 0 solid  transparent;
        border-right: 4px solid  transparent;
        border-bottom: 5px solid  var(--dv-color-success);
        border-left: 4px solid  transparent;
    }
}

.up-red {
    display: flex;
    flex-direction: column;

    .bar {
        order: 2;
        width: 2px;
        height: 8px;
        margin: 0 3px;
        background-color: var(--dv-color-danger);
    }

    .triangle {
        width: 0;
        height: 0;
        border-top: 0 solid  transparent;
        border-right: 4px solid  transparent;
        border-bottom: 5px solid  var(--dv-color-danger);
        border-left: 4px solid  transparent;
    }
}

.flat {
    display: flex;

    .bar {
        width: 8px;
        height: 2px;
        margin: 3px 0;
        background-color: var(--dv-color-index);
    }

    .triangle {
        width: 0;
        height: 0;
        border-top: 4px solid  transparent;
        border-right: 0 solid transparent;
        border-bottom: 4px solid  transparent;
        border-left: 5px solid var(--dv-color-index);
    }
}
</style>
