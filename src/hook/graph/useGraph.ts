import { Graph, type Node, Edge, Options, } from '@antv/x6'
import { onMounted, type Ref } from 'vue'

export const useGraph = (
    target: Ref<HTMLElement | null>,
) => {
    let graph: Graph | null = null
    const getGraph = () => {
        if (graph === null) {
            throw new Error('图加载失败')
        }
        return graph
    }

    //页面加载完成,挂载Antv x6
    onMounted(() => {
        if (target.value === null) {
            throw new Error('元素不存在,图加载失败')
        }
        graph = new Graph({
            container: target.value,
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

    const setBackground = (options: Graph.BackgroundManager.Options) => {
        getGraph().drawBackground(options)
    }

    return {
        getGraph,

    }

}