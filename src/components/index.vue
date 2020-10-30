<template>
  <h1>{{title}}</h1>
</template>

<script lang="ts">
  import { reactive } from 'vue'
  export default {
    name: 'Index',
    setup(){
      const title = reactive<String>("标题")
      return {title}
    },
  }
</script>
