<script lang="ts" setup>
import { ref } from 'vue'

import { useGraph } from './hook/graph/useGraph'

const graphContaner = ref<HTMLElement | null>(null)
const { getGraph } = useGraph(graphContaner)
</script>


<template>
  <div class="h-screen w-screen">
    <div class="h-full w-full">
      <div ref="graphContaner">
      </div>
    </div>

  </div>

</template>
