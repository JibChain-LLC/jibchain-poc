"use strict";(self.webpackChunkjib_reborn=self.webpackChunkjib_reborn||[]).push([[802],{"./node_modules/@radix-ui/react-presence/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>Presence});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@radix-ui/react-compose-refs/dist/index.mjs"),_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");var Presence=props=>{const{present,children}=props,presence=function usePresence(present){const[node,setNode]=react__WEBPACK_IMPORTED_MODULE_0__.useState(),stylesRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef({}),prevPresentRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(present),prevAnimationNameRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef("none"),initialState=present?"mounted":"unmounted",[state,send]=function useStateMachine(initialState,machine){return react__WEBPACK_IMPORTED_MODULE_0__.useReducer(((state,event)=>machine[state][event]??state),initialState)}(initialState,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{const currentAnimationName=getAnimationName(stylesRef.current);prevAnimationNameRef.current="mounted"===state?currentAnimationName:"none"}),[state]),(0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__.N)((()=>{const styles=stylesRef.current,wasPresent=prevPresentRef.current;if(wasPresent!==present){const prevAnimationName=prevAnimationNameRef.current,currentAnimationName=getAnimationName(styles);if(present)send("MOUNT");else if("none"===currentAnimationName||"none"===styles?.display)send("UNMOUNT");else{send(wasPresent&&prevAnimationName!==currentAnimationName?"ANIMATION_OUT":"UNMOUNT")}prevPresentRef.current=present}}),[present,send]),(0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__.N)((()=>{if(node){let timeoutId;const ownerWindow=node.ownerDocument.defaultView??window,handleAnimationEnd=event=>{const isCurrentAnimation=getAnimationName(stylesRef.current).includes(event.animationName);if(event.target===node&&isCurrentAnimation&&(send("ANIMATION_END"),!prevPresentRef.current)){const currentFillMode=node.style.animationFillMode;node.style.animationFillMode="forwards",timeoutId=ownerWindow.setTimeout((()=>{"forwards"===node.style.animationFillMode&&(node.style.animationFillMode=currentFillMode)}))}},handleAnimationStart=event=>{event.target===node&&(prevAnimationNameRef.current=getAnimationName(stylesRef.current))};return node.addEventListener("animationstart",handleAnimationStart),node.addEventListener("animationcancel",handleAnimationEnd),node.addEventListener("animationend",handleAnimationEnd),()=>{ownerWindow.clearTimeout(timeoutId),node.removeEventListener("animationstart",handleAnimationStart),node.removeEventListener("animationcancel",handleAnimationEnd),node.removeEventListener("animationend",handleAnimationEnd)}}send("ANIMATION_END")}),[node,send]),{isPresent:["mounted","unmountSuspended"].includes(state),ref:react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node2=>{node2&&(stylesRef.current=getComputedStyle(node2)),setNode(node2)}),[])}}(present),child="function"==typeof children?children({present:presence.isPresent}):react__WEBPACK_IMPORTED_MODULE_0__.Children.only(children),ref=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__.s)(presence.ref,function getElementRef(element){let getter=Object.getOwnPropertyDescriptor(element.props,"ref")?.get,mayWarn=getter&&"isReactWarning"in getter&&getter.isReactWarning;if(mayWarn)return element.ref;if(getter=Object.getOwnPropertyDescriptor(element,"ref")?.get,mayWarn=getter&&"isReactWarning"in getter&&getter.isReactWarning,mayWarn)return element.props.ref;return element.props.ref||element.ref}(child));return"function"==typeof children||presence.isPresent?react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child,{ref}):null};function getAnimationName(styles){return styles?.animationName||"none"}Presence.displayName="Presence"},"./node_modules/@radix-ui/react-tooltip/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Kq:()=>Provider,UC:()=>Content2,bL:()=>Root3,i3:()=>Arrow2,l9:()=>Trigger});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@radix-ui/primitive/dist/index.mjs"),_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@radix-ui/react-compose-refs/dist/index.mjs"),_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@radix-ui/react-context/dist/index.mjs"),_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs"),_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@radix-ui/react-id/dist/index.mjs"),_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@radix-ui/react-popper/dist/index.mjs"),_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@radix-ui/react-portal/dist/index.mjs"),_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/@radix-ui/react-presence/dist/index.mjs"),_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@radix-ui/react-primitive/dist/index.mjs"),_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@radix-ui/react-slot/dist/index.mjs"),_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs"),_radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/@radix-ui/react-visually-hidden/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),[createTooltipContext,createTooltipScope]=(0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.A)("Tooltip",[_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.Bk]),usePopperScope=(0,_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.Bk)(),DEFAULT_DELAY_DURATION=700,[TooltipProviderContextProvider,useTooltipProviderContext]=createTooltipContext("TooltipProvider"),TooltipProvider=props=>{const{__scopeTooltip,delayDuration=DEFAULT_DELAY_DURATION,skipDelayDuration=300,disableHoverableContent=!1,children}=props,[isOpenDelayed,setIsOpenDelayed]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!0),isPointerInTransitRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),skipDelayTimerRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{const skipDelayTimer=skipDelayTimerRef.current;return()=>window.clearTimeout(skipDelayTimer)}),[]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipProviderContextProvider,{scope:__scopeTooltip,isOpenDelayed,delayDuration,onOpen:react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{window.clearTimeout(skipDelayTimerRef.current),setIsOpenDelayed(!1)}),[]),onClose:react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{window.clearTimeout(skipDelayTimerRef.current),skipDelayTimerRef.current=window.setTimeout((()=>setIsOpenDelayed(!0)),skipDelayDuration)}),[skipDelayDuration]),isPointerInTransitRef,onPointerInTransitChange:react__WEBPACK_IMPORTED_MODULE_0__.useCallback((inTransit=>{isPointerInTransitRef.current=inTransit}),[]),disableHoverableContent,children})};TooltipProvider.displayName="TooltipProvider";var[TooltipContextProvider,useTooltipContext]=createTooltipContext("Tooltip"),Tooltip=props=>{const{__scopeTooltip,children,open:openProp,defaultOpen=!1,onOpenChange,disableHoverableContent:disableHoverableContentProp,delayDuration:delayDurationProp}=props,providerContext=useTooltipProviderContext("Tooltip",props.__scopeTooltip),popperScope=usePopperScope(__scopeTooltip),[trigger,setTrigger]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),contentId=(0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.B)(),openTimerRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),disableHoverableContent=disableHoverableContentProp??providerContext.disableHoverableContent,delayDuration=delayDurationProp??providerContext.delayDuration,wasOpenDelayedRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),[open=!1,setOpen]=(0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__.i)({prop:openProp,defaultProp:defaultOpen,onChange:open2=>{open2?(providerContext.onOpen(),document.dispatchEvent(new CustomEvent("tooltip.open"))):providerContext.onClose(),onOpenChange?.(open2)}}),stateAttribute=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>open?wasOpenDelayedRef.current?"delayed-open":"instant-open":"closed"),[open]),handleOpen=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{window.clearTimeout(openTimerRef.current),openTimerRef.current=0,wasOpenDelayedRef.current=!1,setOpen(!0)}),[setOpen]),handleClose=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{window.clearTimeout(openTimerRef.current),openTimerRef.current=0,setOpen(!1)}),[setOpen]),handleDelayedOpen=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{window.clearTimeout(openTimerRef.current),openTimerRef.current=window.setTimeout((()=>{wasOpenDelayedRef.current=!0,setOpen(!0),openTimerRef.current=0}),delayDuration)}),[delayDuration,setOpen]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>()=>{openTimerRef.current&&(window.clearTimeout(openTimerRef.current),openTimerRef.current=0)}),[]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.bL,{...popperScope,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContextProvider,{scope:__scopeTooltip,contentId,open,stateAttribute,trigger,onTriggerChange:setTrigger,onTriggerEnter:react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{providerContext.isOpenDelayed?handleDelayedOpen():handleOpen()}),[providerContext.isOpenDelayed,handleDelayedOpen,handleOpen]),onTriggerLeave:react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{disableHoverableContent?handleClose():(window.clearTimeout(openTimerRef.current),openTimerRef.current=0)}),[handleClose,disableHoverableContent]),onOpen:handleOpen,onClose:handleClose,disableHoverableContent,children})})};Tooltip.displayName="Tooltip";var TooltipTrigger=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeTooltip,...triggerProps}=props,context=useTooltipContext("TooltipTrigger",__scopeTooltip),providerContext=useTooltipProviderContext("TooltipTrigger",__scopeTooltip),popperScope=usePopperScope(__scopeTooltip),ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),composedRefs=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_6__.s)(forwardedRef,ref,context.onTriggerChange),isPointerDownRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),hasPointerMoveOpenedRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),handlePointerUp=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isPointerDownRef.current=!1),[]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>()=>document.removeEventListener("pointerup",handlePointerUp)),[handlePointerUp]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.Mz,{asChild:!0,...popperScope,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_7__.sG.button,{"aria-describedby":context.open?context.contentId:void 0,"data-state":context.stateAttribute,...triggerProps,ref:composedRefs,onPointerMove:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.m)(props.onPointerMove,(event=>{"touch"!==event.pointerType&&(hasPointerMoveOpenedRef.current||providerContext.isPointerInTransitRef.current||(context.onTriggerEnter(),hasPointerMoveOpenedRef.current=!0))})),onPointerLeave:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.m)(props.onPointerLeave,(()=>{context.onTriggerLeave(),hasPointerMoveOpenedRef.current=!1})),onPointerDown:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.m)(props.onPointerDown,(()=>{isPointerDownRef.current=!0,document.addEventListener("pointerup",handlePointerUp,{once:!0})})),onFocus:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.m)(props.onFocus,(()=>{isPointerDownRef.current||context.onOpen()})),onBlur:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.m)(props.onBlur,context.onClose),onClick:(0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_8__.m)(props.onClick,context.onClose)})})}));TooltipTrigger.displayName="TooltipTrigger";var[PortalProvider,usePortalContext]=createTooltipContext("TooltipPortal",{forceMount:void 0}),TooltipPortal=props=>{const{__scopeTooltip,forceMount,children,container}=props,context=useTooltipContext("TooltipPortal",__scopeTooltip);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PortalProvider,{scope:__scopeTooltip,forceMount,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.C,{present:forceMount||context.open,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_10__.Z,{asChild:!0,container,children})})})};TooltipPortal.displayName="TooltipPortal";var TooltipContent=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const portalContext=usePortalContext("TooltipContent",props.__scopeTooltip),{forceMount=portalContext.forceMount,side="top",...contentProps}=props,context=useTooltipContext("TooltipContent",props.__scopeTooltip);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.C,{present:forceMount||context.open,children:context.disableHoverableContent?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContentImpl,{side,...contentProps,ref:forwardedRef}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContentHoverable,{side,...contentProps,ref:forwardedRef})})})),TooltipContentHoverable=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const context=useTooltipContext("TooltipContent",props.__scopeTooltip),providerContext=useTooltipProviderContext("TooltipContent",props.__scopeTooltip),ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef(null),composedRefs=(0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_6__.s)(forwardedRef,ref),[pointerGraceArea,setPointerGraceArea]=react__WEBPACK_IMPORTED_MODULE_0__.useState(null),{trigger,onClose}=context,content=ref.current,{onPointerInTransitChange}=providerContext,handleRemoveGraceArea=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{setPointerGraceArea(null),onPointerInTransitChange(!1)}),[onPointerInTransitChange]),handleCreateGraceArea=react__WEBPACK_IMPORTED_MODULE_0__.useCallback(((event,hoverTarget)=>{const currentTarget=event.currentTarget,exitPoint={x:event.clientX,y:event.clientY},paddedExitPoints=function getPaddedExitPoints(exitPoint,exitSide,padding=5){const paddedExitPoints=[];switch(exitSide){case"top":paddedExitPoints.push({x:exitPoint.x-padding,y:exitPoint.y+padding},{x:exitPoint.x+padding,y:exitPoint.y+padding});break;case"bottom":paddedExitPoints.push({x:exitPoint.x-padding,y:exitPoint.y-padding},{x:exitPoint.x+padding,y:exitPoint.y-padding});break;case"left":paddedExitPoints.push({x:exitPoint.x+padding,y:exitPoint.y-padding},{x:exitPoint.x+padding,y:exitPoint.y+padding});break;case"right":paddedExitPoints.push({x:exitPoint.x-padding,y:exitPoint.y-padding},{x:exitPoint.x-padding,y:exitPoint.y+padding})}return paddedExitPoints}(exitPoint,function getExitSideFromRect(point,rect){const top=Math.abs(rect.top-point.y),bottom=Math.abs(rect.bottom-point.y),right=Math.abs(rect.right-point.x),left=Math.abs(rect.left-point.x);switch(Math.min(top,bottom,right,left)){case left:return"left";case right:return"right";case top:return"top";case bottom:return"bottom";default:throw new Error("unreachable")}}(exitPoint,currentTarget.getBoundingClientRect())),graceArea=function getHull(points){const newPoints=points.slice();return newPoints.sort(((a,b)=>a.x<b.x?-1:a.x>b.x?1:a.y<b.y?-1:a.y>b.y?1:0)),function getHullPresorted(points){if(points.length<=1)return points.slice();const upperHull=[];for(let i=0;i<points.length;i++){const p=points[i];for(;upperHull.length>=2;){const q=upperHull[upperHull.length-1],r=upperHull[upperHull.length-2];if(!((q.x-r.x)*(p.y-r.y)>=(q.y-r.y)*(p.x-r.x)))break;upperHull.pop()}upperHull.push(p)}upperHull.pop();const lowerHull=[];for(let i=points.length-1;i>=0;i--){const p=points[i];for(;lowerHull.length>=2;){const q=lowerHull[lowerHull.length-1],r=lowerHull[lowerHull.length-2];if(!((q.x-r.x)*(p.y-r.y)>=(q.y-r.y)*(p.x-r.x)))break;lowerHull.pop()}lowerHull.push(p)}return lowerHull.pop(),1===upperHull.length&&1===lowerHull.length&&upperHull[0].x===lowerHull[0].x&&upperHull[0].y===lowerHull[0].y?upperHull:upperHull.concat(lowerHull)}(newPoints)}([...paddedExitPoints,...function getPointsFromRect(rect){const{top,right,bottom,left}=rect;return[{x:left,y:top},{x:right,y:top},{x:right,y:bottom},{x:left,y:bottom}]}(hoverTarget.getBoundingClientRect())]);setPointerGraceArea(graceArea),onPointerInTransitChange(!0)}),[onPointerInTransitChange]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>()=>handleRemoveGraceArea()),[handleRemoveGraceArea]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{if(trigger&&content){const handleTriggerLeave=event=>handleCreateGraceArea(event,content),handleContentLeave=event=>handleCreateGraceArea(event,trigger);return trigger.addEventListener("pointerleave",handleTriggerLeave),content.addEventListener("pointerleave",handleContentLeave),()=>{trigger.removeEventListener("pointerleave",handleTriggerLeave),content.removeEventListener("pointerleave",handleContentLeave)}}}),[trigger,content,handleCreateGraceArea,handleRemoveGraceArea]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{if(pointerGraceArea){const handleTrackPointerGrace=event=>{const target=event.target,pointerPosition={x:event.clientX,y:event.clientY},hasEnteredTarget=trigger?.contains(target)||content?.contains(target),isPointerOutsideGraceArea=!function isPointInPolygon(point,polygon){const{x,y}=point;let inside=!1;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const xi=polygon[i].x,yi=polygon[i].y,xj=polygon[j].x,yj=polygon[j].y;yi>y!=yj>y&&x<(xj-xi)*(y-yi)/(yj-yi)+xi&&(inside=!inside)}return inside}(pointerPosition,pointerGraceArea);hasEnteredTarget?handleRemoveGraceArea():isPointerOutsideGraceArea&&(handleRemoveGraceArea(),onClose())};return document.addEventListener("pointermove",handleTrackPointerGrace),()=>document.removeEventListener("pointermove",handleTrackPointerGrace)}}),[trigger,content,pointerGraceArea,onClose,handleRemoveGraceArea]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TooltipContentImpl,{...props,ref:composedRefs})})),[VisuallyHiddenContentContextProvider,useVisuallyHiddenContentContext]=createTooltipContext("Tooltip",{isInside:!1}),TooltipContentImpl=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeTooltip,children,"aria-label":ariaLabel,onEscapeKeyDown,onPointerDownOutside,...contentProps}=props,context=useTooltipContext("TooltipContent",__scopeTooltip),popperScope=usePopperScope(__scopeTooltip),{onClose}=context;return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>(document.addEventListener("tooltip.open",onClose),()=>document.removeEventListener("tooltip.open",onClose))),[onClose]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{if(context.trigger){const handleScroll=event=>{const target=event.target;target?.contains(context.trigger)&&onClose()};return window.addEventListener("scroll",handleScroll,{capture:!0}),()=>window.removeEventListener("scroll",handleScroll,{capture:!0})}}),[context.trigger,onClose]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_11__.qW,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown,onPointerDownOutside,onFocusOutside:event=>event.preventDefault(),onDismiss:onClose,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.UC,{"data-state":context.stateAttribute,...popperScope,...contentProps,ref:forwardedRef,style:{...contentProps.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_12__.xV,{children}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(VisuallyHiddenContentContextProvider,{scope:__scopeTooltip,isInside:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_visually_hidden__WEBPACK_IMPORTED_MODULE_13__.b,{id:context.contentId,role:"tooltip",children:ariaLabel||children})})]})})}));TooltipContent.displayName="TooltipContent";var TooltipArrow=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>{const{__scopeTooltip,...arrowProps}=props,popperScope=usePopperScope(__scopeTooltip);return useVisuallyHiddenContentContext("TooltipArrow",__scopeTooltip).isInside?null:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_popper__WEBPACK_IMPORTED_MODULE_3__.i3,{...popperScope,...arrowProps,ref:forwardedRef})}));TooltipArrow.displayName="TooltipArrow";var Provider=TooltipProvider,Root3=Tooltip,Trigger=TooltipTrigger,Content2=TooltipContent,Arrow2=TooltipArrow},"./node_modules/@radix-ui/react-visually-hidden/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>Root,s:()=>VisuallyHidden});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@radix-ui/react-primitive/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),VisuallyHidden=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((props,forwardedRef)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.sG.span,{...props,ref:forwardedRef,style:{position:"absolute",border:0,width:1,height:1,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",wordWrap:"normal",...props.style}})));VisuallyHidden.displayName="VisuallyHidden";var Root=VisuallyHidden}}]);