import { useVueFlow, type XYPosition } from '@vue-flow/core'
import { ref, watch } from 'vue'

/**
 * @returns {string} - A unique id.
 */
const getId = () => {
  return `dndnode_${crypto.randomUUID()}`
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
}

const dragImageId = ref<string | null>(null)

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onDragStart(event: any, type: any) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
      if (event.target instanceof HTMLElement) {
        const originalElement = event.target
        const dragImage = originalElement.cloneNode(true) as HTMLElement
        dragImageId.value = `vueflow-drag-image-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        dragImage.id = dragImageId.value
        dragImage.style.cssText = `
          width: ${originalElement.offsetWidth}px;
          height: ${originalElement.offsetHeight}px;
          opacity: 0.7;
          background-color: white;
          pointer-events: none;
          position: absolute;
          z-index: 9999;
          left: -1000px;
          top: -1000px;
        `
        document.body.appendChild(dragImage)
        event.dataTransfer.setDragImage(
          dragImage,
          originalElement.offsetWidth / 2,
          originalElement.offsetHeight / 2,
        )
      }
    }
    draggedType.value = type
    isDragging.value = true
    document.addEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onDragOver(event: any) {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false
  }

  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
    if (dragImageId.value) {
      const dragImage = document.getElementById(dragImageId.value)
      if (dragImage && dragImage.parentNode === document.body) {
        document.body.removeChild(dragImage)
      }
      dragImageId.value = null
    }
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onDrop(event: any) {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })

    const nodeId = getId()
    const newNode = {
      id: nodeId,
      type: draggedType.value,
      position,
      data: { label: nodeId, type: draggedType.value },
    }

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2,
        },
      }))

      off()
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addNodes(newNode as any)
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
