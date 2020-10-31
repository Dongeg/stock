<template>
  <div class="iframeView-ctn">
<!--    <iframeView></iframeView>-->
    <stockList ref="stockListRef"></stockList>
    <searchBar @addStock="addStock"></searchBar>
  </div>
</template>
<script lang="ts">
  import iframeView from '../components/iframeView.vue'
  import stockList from '../components/stockList.vue'
  import searchBar from '../components/searchBar.vue'
  import { ref } from 'vue'
  export default {
    name: 'Index',
    components :{
      iframeView,
      stockList,
      searchBar
    },
    setup(){
      const stockListRef= ref(null)
      function addStock(stockCode:string) {
        stockListRef.value.addStock(stockCode)
      }
      return {
        stockListRef,
        addStock
      }
    },
  }
</script>
<style lang="less" scoped>
  .iframeView-ctn {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
