<template>
  <div class="searchBar" :class="{'showBar': state.showSearchInput}">
    <input
      type="text"
      v-model="state.searchKey"
      class="searchBar-input"
      placeholder="请输入关键词查询，如：0000001 或 上证指数"
      :autofocus="state.inputAutoFocus"
      @keyup.enter="searchStock"
    >
    <div class="suggestList" v-show="state.showSearchList">
      <div
        class="suggestList-item"
        v-for="item in state.suggestList"
        @click="addStock(item)"
      >
        {{item.label}}
        {{item.description}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { reactive } from 'vue'
  import { getStockSuggestList } from '../api/api'
  interface stateType {
    inputAutoFocus:boolean,
    showSearchInput:boolean,
    showSearchList:boolean,
    searchKey:string,
    [propertys:string]:any;
  }
  export default {
    name: 'searchBar',
    props: {

    },
    components :{

    },
    setup(props:object, { emit }:any){
      let state = reactive({
        inputAutoFocus:false,
        showSearchInput:false,
        showSearchList:false,
        searchKey:'',
        suggestList:[]
      })
      function searchStock() {
        if(state.searchKey){
          getStockSuggestList(state.searchKey).then((res)=>{
            state.showSearchList = true
            state.suggestList = res
          })
        }
      }
      monitorKey(state)
      function addStock(item:object){
          emit('addStock',item)
      }
      return {
        state,
        searchStock,
        addStock
      }
    },
  }
  function monitorKey(state:stateType){
    document.onkeyup = (e)=>{
      if (e && e.keyCode == 70) { // 按 f 显示搜索框
        state.showSearchInput = true
        state.inputAutoFocus = true
      }
      if (e && e.keyCode == 27) { // 按 Esc 隐藏搜搜框
        state.showSearchInput = false
        state.showSearchList = false
        state.searchKey = ''

      }
    }
  }


</script>
<style lang="less" scoped>
  .suggestList {
    border: 1px solid rgb(204,204,204);
    border-radius: 0 0 5px 5px;
    border-top: none;
  }
  .suggestList-item {
    padding:0px 10px;
    cursor: pointer;
    line-height: 2em;
    color: gray;
    &:hover {
      background: #eeeeee;
    }
  }
  .searchBar {
    position: absolute;
    top: -60px;
    left: 50%;
    width: 500px;
    transform: translate(-50%,0);
    transition: all 0.3s;
    z-index: 3;
  }
  .showBar {
    top: 20px!important;
  }
  .searchBar-input {
    width: 500px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    outline-color: #409EFF;
    padding: 0 5px;
  }
</style>
