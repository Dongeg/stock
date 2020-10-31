<template>
  <div class="searchBar" :class="{'showBar': state.showSearchInput}">
    <input
      type="text"
      v-model="state.searchKey"
      class="searchBar-input"
      placeholder="请输入关键词查询，如：0000001 或 上证指数"
      @keyup.enter="searchStock"
    >
  </div>
</template>

<script lang="ts">
  import { reactive } from 'vue'
  import { getStockSuggestList } from '../api/api'
  interface stateType {
    showSearchInput:boolean
  }
  export default {
    name: 'searchBar',
    components :{

    },
    setup(){
      let state = reactive({
        searchKey:'',
        showSearchInput:false
      })
      function searchStock() {
        if(state.searchKey){
          const result = getStockSuggestList(state.searchKey).then((res)=>{
            console.log(res)
          })
        }
      }
      monitorKey(state)
      return {
        state,
        searchStock
      }
    },
  }
  function monitorKey(state:stateType){
    document.onkeyup = (e)=>{
      if (e && e.keyCode == 70) { // 按 f 显示搜索框
        state.showSearchInput = true
      }
      if (e && e.keyCode == 27) { // 按 Esc 隐藏搜搜框
        state.showSearchInput = false
      }
    }
  }


</script>
<style lang="less" scoped>
  .searchBar {
    position: absolute;
    top: -40px;
    left: 50%;
    width: 500px;
    transform: translate(-50%,0);
    transition: all 0.3s;
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
