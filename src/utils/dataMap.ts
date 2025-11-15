import { icon } from '@primeuix/themes/aura/avatar'

// 內部開發辨識使用
const FESessionKeyMap = {
  name: 'a7b3c9d1e5f8',
  encodeKey: 'z2y8x4w6v1u9',
}
export const handlerStyleIn = {
  width: '8px',
  height: '20px',
  outline: '3px solid var(--color-siteBg)',
  border: 'none',
  borderRadius: 'calc(infinity * 1px)',
  background: 'var(--color-linkline)',
  transform: 'translate(-50%, -50%)',
}
export const handlerStyleOut = {
  width: '20px',
  height: '8px',
  outline: '3px solid var(--color-siteBg)',
  border: 'none',
  borderRadius: 'calc(infinity * 1px)',
  background: 'var(--color-linkline)',
  transform: 'translate(50%, -50%)',
}
export const panels = {
  units: {
    source: [
      { label: 'Excel 資料庫', card: 'FlowCardExcel', icon: 'bi bi-file-earmark-excel' },
    ],
    target: [
      { label: '圖表檢視', card: 'FlowCardChart', icon: 'bi bi-graph-up' },
    ],
  },
  control: [
    {
      label: '縮小工作區',
      icon: 'bi bi-zoom-out',
      actionKey: 'out',
    },
    {
      label: '自動調整工作區',
      icon: 'bi bi-aspect-ratio',
      actionKey: 'fit',
    },
    {
      label: '放大工作區',
      icon: 'bi bi-zoom-in',
      actionKey: 'in',
    },
  ],
}
