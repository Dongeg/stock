<template>
  <div class="iframeView-ctn">
<!--    <iframeView></iframeView>-->
    <stockList></stockList>
  </div>
</template>
<script lang="ts">
  import iframeView from '../components/iframeView.vue'
  import stockList from '../components/stockList.vue'
  export default {
    name: 'Index',
    components :{
      iframeView,
      stockList
    },
    setup(){

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
