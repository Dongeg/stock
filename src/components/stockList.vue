<template>
    <div class="stockList">
        stockList
    </div>
</template>

<script lang="ts">
    import { reactive } from 'vue'
    import {getStockList} from '../api/api'
    export default {
        name: 'stockList',
        components :{

        },
        setup(){
            let state = reactive({
                stockList:[]
            })
            const result = getStockList(['sh601006'])
            console.log(result)
        },
    }
</script>
<style lang="less" scoped>
    .stockList {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 300px;
        height: 500px;
        background: rgba(255,255,255,0.8);
        z-index: 2;
    }
</style>
