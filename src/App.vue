<script lang="ts" setup>
import { ref, onMounted, defineOptions } from 'vue'
import { Graph, type Node, Edge } from '@antv/x6'
import NodeTest from './components/node/node-test.vue'
import { register, getTeleport } from '@antv/x6-vue-shape'
const container = ref(null)



const TeleportContainer = getTeleport()
// 创建画布
let graph: Graph
onMounted(() => {
  graph = new Graph({
    container: container.value!,
    autoResize: true,
    mousewheel: true,
    panning: true,
    grid: {
      size: 24,
      visible: true,
      type: 'fixedDot',
      args: [
        {
          color: '#ddd',
          thickness: 4,
        },
      ],
    }
  })
})

const btnClasses = ref('py-1 px-3 bg-white text-gray-500 border rounded-md hover:bg-gray-100 active:scale-95 transition-all')


//放大
const handlerZoomIn = () => {
  graph.zoom(0.1, { absolute: false })
}
const handlerZoomOut = () => {
  graph.zoom(-0.1, { absolute: false })
}

const handlerFit = () => {
  graph.zoomToFit({ maxScale: 1 })
}
//锁定和解锁
const handlerLock = () => {

}

const nodeList = ref<Node[]>([])

register({
  shape: 'NodeTest',
  component: NodeTest,
  height: 80,
  width: 200,
})
const addNode = () => { 
  // const node = graph.addNode({
  //   shape: 'rect',
  //   x: 100,
  //   y: 40,
  //   width: 100,
  //   height: 40,
  //   label: 'Hello',
  // })
  const node = graph.addNode({
    shape: 'NodeTest',

  })
  nodeList.value.push(node)
}

const nodeId = ref({
  source: '',
  target: ''
})
const edges = ref<Edge[]>([])
const addEdge = () => {
  const edge = graph.addEdge({
    source: nodeId.value.source,
    target: nodeId.value.target,
  })
  edges.value.push(edge)
}

</script>


<template>
  <div class="h-screen w-screen relative flex overflow-hidden">

    <div class="w-72 flex-shrink-0 border-r h-screen bg-gray-50 p-4 overflow-auto">
      <b>组件</b>
      <div class="flex flex-col gap-2 text-sm mt-4">
        <button :class="btnClasses" @click="addNode">添加节点</button>

        <div>
          <b>节点</b>
          <div class="flex flex-col gap-2 mt-2 border min-h-24 bg-white">
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <b>节点列表预览</b>
          <div v-for="item in nodeList"
            class="p-2 border rounded-md bg-white hover:bg-black hover:text-white transition-all cursor-pointer">
            <div>
              {{ item.id }}
            </div>
          </div>
        </div>


        <div>
          <b>连接</b>
          <input type="text" class="border p-1 rounded-md w-full" placeholder="输入节点ID" v-model="nodeId.source" />
          <input type="text" class="border p-1 rounded-md w-full" placeholder="输入节点ID" v-model="nodeId.target" />
          <button :class="btnClasses" @click="addEdge">添加连接</button>


        </div>
      </div>
    </div>

    <div class="fixed p-1 border bg-white bottom-2 right-2 z-[9999] text-sm rounded-md flex gap-2">
      <button :class="btnClasses" @click="handlerZoomIn">放大</button>
      <button :class="btnClasses" @click="handlerZoomOut">缩小</button>
      <button :class="btnClasses" @click="handlerFit">适应屏幕</button>
      <button :class="btnClasses" @click="handlerLock">锁定</button>
    </div>

    <!-- 画布 -->
    <div class="app-content p-2 flex-1 h-full w-full">
      <div id="container" class="h-screen" ref="container"></div>
      <TeleportContainer />
    </div>
  </div>

</template>
