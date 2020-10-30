<template>
  <div class="iframeView-ctn">
    <iframeView></iframeView>
  </div>
</template>

<script lang="ts">
  import { reactive } from 'vue'
  import iframeView from './iframeView.vue'
  export default {
    name: 'Index',
    components :{
      iframeView
    },
    setup(){
      const title = reactive<String>("标题")
      return {title}
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
