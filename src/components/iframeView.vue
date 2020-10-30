<template>
  <iframe :src="iframeSrc" frameborder="0" width="100%" height="100%"></iframe>
  <div class="change-iframe-url-ctn" :class="{'show-input':showInput}">

    <input
      type="text"
      placeholder="Enter to change the page url"
      v-model="inputValue"
      @keyup.enter="changeUrl"
      class="change-iframe-input">
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'
  export default {
    name: 'iframeView',
    setup(){
      const iframeSrc = ref<String>("https://www.baidu.com/")
      const inputValue = ref<String>("")
      let showInput = ref<boolean>(true)
      function changeUrl() {
        if(inputValue.value){
          iframeSrc.value = inputValue.value
        }
        else {
          alert()
        }
      }
      return {
        iframeSrc,
        inputValue,
        showInput,
        changeUrl
      }
    },
  }
</script>
<style lang="less" scoped>
  .show-input {
    bottom: 0 !important;
  }
  .change-iframe-url-ctn {
    position: absolute;
    left:50%;
    bottom: -100px;
    transform: translate(-50%, -50%);
    z-index: 1;
    text-align: center;
  }
  .change-iframe-input {
    width: 500px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    outline-color: #409EFF;
    padding: 0 5px;
  }
</style>
