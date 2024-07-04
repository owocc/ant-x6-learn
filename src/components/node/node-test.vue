<script lang="ts" setup>
import { defineOptions, inject, onMounted } from 'vue'
defineOptions({
    name: 'MyNode',
})
const getNode = inject('getNode')


onMounted(() => {
    console.log(getNode)
})
</script>



<template>
    <div class="p-2 border bg-white w-[200px] h-[80px] ">
        自定义组件
        <input placeholder="请输入要添加的" class="w-full"/>
    </div>
</template>
