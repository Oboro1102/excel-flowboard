import{Et as e,Lt as t}from"./index-iuVyTblz.js";import{u as n}from"./vue-flow-core-Cc_dvh3i.js";var r=()=>`dndnode_${crypto.randomUUID()}`,i={draggedType:t(null),isDragOver:t(!1),isDragging:t(!1)},a=t(null);function o(){let{draggedType:t,isDragOver:o,isDragging:s}=i,{addNodes:c,screenToFlowCoordinate:l,onNodesInitialized:u,updateNode:d}=n();e(s,e=>{document.body.style.userSelect=e?`none`:``});function f(e,n){if(e.dataTransfer&&(e.dataTransfer.setData(`application/vueflow`,n),e.dataTransfer.effectAllowed=`move`,e.target instanceof HTMLElement)){let t=e.target,n=t.cloneNode(!0);a.value=`vueflow-drag-image-${Date.now()}-${Math.random().toString(36).substring(2,9)}`,n.id=a.value,n.style.cssText=`
          width: ${t.offsetWidth}px;
          height: ${t.offsetHeight}px;
          opacity: 0.7;
          background-color: white;
          pointer-events: none;
          position: absolute;
          z-index: 9999;
          left: -1000px;
          top: -1000px;
        `,document.body.appendChild(n),e.dataTransfer.setDragImage(n,t.offsetWidth/2,t.offsetHeight/2)}t.value=n,s.value=!0,document.addEventListener(`drop`,h)}function p(e){e.preventDefault(),t.value&&(o.value=!0,e.dataTransfer&&(e.dataTransfer.dropEffect=`move`))}function m(){o.value=!1}function h(){if(s.value=!1,o.value=!1,t.value=null,document.removeEventListener(`drop`,h),a.value){let e=document.getElementById(a.value);e&&e.parentNode===document.body&&document.body.removeChild(e),a.value=null}}function g(e){let n=l({x:e.clientX,y:e.clientY}),i=r(),a={id:i,type:t.value,position:n,data:{label:i,type:t.value}},{off:o}=u(()=>{d(i,e=>({position:{x:e.position.x-e.dimensions.width/2,y:e.position.y-e.dimensions.height/2}})),o()});c(a)}return{draggedType:t,isDragOver:o,isDragging:s,onDragStart:f,onDragLeave:m,onDragOver:p,onDrop:g}}export{o as t};