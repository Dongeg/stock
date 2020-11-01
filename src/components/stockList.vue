<template>
    <div
        :class="{'show':state.show}"
        :style="{background:state.backGroundColor}"
        class="stockList-ctn">
        <div class="stockList" :style="{opacity: state.opacity}">
            <div>
                <div v-for="item in state.stockList"
                     class="stockItem"
                     :class="{'stockGreen':
             item.increase < 0 }">
                    <span v-show="item.increase < 0">↓</span>
                    <span v-show="item.increase >= 0">↑</span>
                    <span>{{item.increase}}%</span>
                    <span>{{item.price}}</span>
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div>
                <input type="color" v-model="state.backGroundColor" title="调整面板背景颜色">
                <input type="range" v-model="state.opacity" min="0" max="1" step="0.1"  title="调节面板透明度">
                {{state.opacity}}
            </div>
        </div>
        <img src="../assets/images/openleft.png" class="open-icon" @click="toggle">
    </div>
</template>

<script lang="ts">
    import { reactive } from 'vue'
    import { getStockList } from '../api/api'
    import { getLocalStorage, setLocalStorage } from '../assets/js/utils'
    interface stockMsgType {
        label:string,
        description:string
    }
    export default {
        name: 'stockList',
        components :{

        },
        setup(){
            let state = reactive({
                show:true,
                opacity:0.8,
                backGroundColor:'#ffffff',
                stockList:[],
                stockCodeList:[]
            })
            state.stockCodeList = getLocalStorage('stockCodeList') || []
            if(state.stockCodeList[0]){
                setInterval(()=>{
                    getStockList(state.stockCodeList).then((res)=>{
                        res.forEach((item)=>{
                            item.increase = ((item.price - item.open) / item.open * 100).toFixed(2)
                        })
                        state.stockList = res
                    })
                },30000)
            }
            function toggle() {
                state.show = !state.show
            }
            function addStock (stockMsg:stockMsgType){
                const code = stockMsg.label.substring(0,8)
                state.stockCodeList.push(code)
                getStockList(state.stockCodeList).then((res)=>{
                    let codeList = res.map((item:object)=>{
                        return item.code
                    })
                    setLocalStorage('stockCodeList',codeList)
                    res.forEach((item)=>{
                        item.increase = ((item.price - item.open) / item.open * 100).toFixed(2)
                    })
                    state.stockList = res
                })

            }
            return {
                state,
                addStock,
                toggle
            }
        },
    }
</script>
<style lang="less" scoped>
    .show{
        right: 0!important;
    }
    .open-icon {
        position: absolute;
        left: -30px;
        top: 50%;
        width: 40px;
        height: auto;
        cursor: pointer;
        transform: translate(0,-50%);
    }
    .stockList-ctn {
        position: absolute;
        bottom: 0;
        right: -300px;
    }
    .stockList {
        display: flex;
        flex-direction: column;
        padding: 10px;
        overflow: auto;
        width: 300px;
        height: 500px;
        background: rgba(255,255,255,0.8);
        z-index: 2;
        > div:nth-child(1){
            flex-grow: 1;
        }
    }
    .stockItem {
        color: red;
        >span {
           display: inline-block;
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
    .stockGreen {
        color: green;
    }
</style>
