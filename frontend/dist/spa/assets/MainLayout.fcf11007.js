import{s as j,g as D,a as K,b as G,c as B,Q as N}from"./QImg.1a9d2850.js";import{k as C,c,h as v,i as A,l as q,m as k,r as w,w as x,n as I,g as H,p as U,q as J,o as X,t as Y,u as Z,v as ee,x as _,a as te,d as oe,y as ne,z as le,A as ae,B as ie,C as Q,f as T,D as F,E as re}from"./index.0883d022.js";import{h as E,a as se,b as ue}from"./QSpinner.6ff54682.js";import{Q as O}from"./QResizeObserver.7a3a8e5e.js";var ce=C({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:f}){const a=c(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>v("div",{class:a.value},E(f.default))}}),de=C({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:f}){const a=c(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>v("div",{class:a.value,role:"toolbar"},E(f.default))}}),fe=C({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:f,emit:a}){const{proxy:{$q:o}}=H(),n=A(k,q);if(n===q)return console.error("QHeader needs to be child of QLayout"),q;const i=w(parseInt(e.heightHint,10)),s=w(!0),h=c(()=>e.reveal===!0||n.view.value.indexOf("H")!==-1||o.platform.is.ios&&n.isContainer.value===!0),m=c(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return s.value===!0?i.value:0;const t=i.value-n.scroll.value.position;return t>0?t:0}),u=c(()=>e.modelValue!==!0||h.value===!0&&s.value!==!0),z=c(()=>e.modelValue===!0&&u.value===!0&&e.reveal===!0),y=c(()=>"q-header q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(u.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),b=c(()=>{const t=n.rows.value.top,g={};return t[0]==="l"&&n.left.space===!0&&(g[o.lang.rtl===!0?"right":"left"]=`${n.left.size}px`),t[2]==="r"&&n.right.space===!0&&(g[o.lang.rtl===!0?"left":"right"]=`${n.right.size}px`),g});function r(t,g){n.update("header",t,g)}function p(t,g){t.value!==g&&(t.value=g)}function P({height:t}){p(i,t),r("size",t)}function R(t){z.value===!0&&p(s,!0),a("focusin",t)}x(()=>e.modelValue,t=>{r("space",t),p(s,!0),n.animate()}),x(m,t=>{r("offset",t)}),x(()=>e.reveal,t=>{t===!1&&p(s,e.modelValue)}),x(s,t=>{n.animate(),a("reveal",t)}),x(n.scroll,t=>{e.reveal===!0&&p(s,t.direction==="up"||t.position<=e.revealOffset||t.position-t.inflectionPoint<100)});const $={};return n.instances.header=$,e.modelValue===!0&&r("size",i.value),r("space",e.modelValue),r("offset",m.value),I(()=>{n.instances.header===$&&(n.instances.header=void 0,r("size",0),r("offset",0),r("space",!1))}),()=>{const t=se(f.default,[]);return e.elevated===!0&&t.push(v("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(v(O,{debounce:0,onResize:P})),v("header",{class:y.value,style:b.value,onFocusin:R},t)}}}),ve=C({name:"QPageContainer",setup(e,{slots:f}){const{proxy:{$q:a}}=H(),o=A(k,q);if(o===q)return console.error("QPageContainer needs to be child of QLayout"),q;U(J,!0);const n=c(()=>{const i={};return o.header.space===!0&&(i.paddingTop=`${o.header.size}px`),o.right.space===!0&&(i[`padding${a.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(i.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(i[`padding${a.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),i});return()=>v("div",{class:"q-page-container",style:n.value},E(f.default))}});const{passive:W}=Z,he=["both","horizontal","vertical"];var ge=C({name:"QScrollObserver",props:{axis:{type:String,validator:e=>he.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:j},emits:["scroll"],setup(e,{emit:f}){const a={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,n,i;x(()=>e.scrollTarget,()=>{m(),h()});function s(){o!==null&&o();const y=Math.max(0,K(n)),b=G(n),r={top:y-a.position.top,left:b-a.position.left};if(e.axis==="vertical"&&r.top===0||e.axis==="horizontal"&&r.left===0)return;const p=Math.abs(r.top)>=Math.abs(r.left)?r.top<0?"up":"down":r.left<0?"left":"right";a.position={top:y,left:b},a.directionChanged=a.direction!==p,a.delta=r,a.directionChanged===!0&&(a.direction=p,a.inflectionPoint=a.position),f("scroll",{...a})}function h(){n=D(i,e.scrollTarget),n.addEventListener("scroll",u,W),u(!0)}function m(){n!==void 0&&(n.removeEventListener("scroll",u,W),n=void 0)}function u(y){if(y===!0||e.debounce===0||e.debounce==="0")s();else if(o===null){const[b,r]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];o=()=>{r(b),o=null}}}const{proxy:z}=H();return x(()=>z.$q.lang.rtl,s),X(()=>{i=z.$el.parentNode,h()}),I(()=>{o!==null&&o(),m()}),Object.assign(z,{trigger:u,getPosition:()=>a}),Y}}),me=C({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:f,emit:a}){const{proxy:{$q:o}}=H(),n=w(null),i=w(o.screen.height),s=w(e.container===!0?0:o.screen.width),h=w({position:0,direction:"down",inflectionPoint:0}),m=w(0),u=w(ee.value===!0?0:B()),z=c(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),y=c(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),b=c(()=>u.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${u.value}px`}:null),r=c(()=>u.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${u.value}px`,width:`calc(100% + ${u.value}px)`}:null);function p(l){if(e.container===!0||document.qScrollPrevented!==!0){const d={position:l.position.top,direction:l.direction,directionChanged:l.directionChanged,inflectionPoint:l.inflectionPoint.top,delta:l.delta.top};h.value=d,e.onScroll!==void 0&&a("scroll",d)}}function P(l){const{height:d,width:S}=l;let L=!1;i.value!==d&&(L=!0,i.value=d,e.onScrollHeight!==void 0&&a("scrollHeight",d),$()),s.value!==S&&(L=!0,s.value=S),L===!0&&e.onResize!==void 0&&a("resize",l)}function R({height:l}){m.value!==l&&(m.value=l,$())}function $(){if(e.container===!0){const l=i.value>m.value?B():0;u.value!==l&&(u.value=l)}}let t=null;const g={instances:{},view:c(()=>e.view),isContainer:c(()=>e.container),rootRef:n,height:i,containerHeight:m,scrollbarWidth:u,totalWidth:c(()=>s.value+u.value),rows:c(()=>{const l=e.view.toLowerCase().split(" ");return{top:l[0].split(""),middle:l[1].split(""),bottom:l[2].split("")}}),header:_({size:0,offset:0,space:!1}),right:_({size:300,offset:0,space:!1}),footer:_({size:0,offset:0,space:!1}),left:_({size:300,offset:0,space:!1}),scroll:h,animate(){t!==null?clearTimeout(t):document.body.classList.add("q-body--layout-animate"),t=setTimeout(()=>{t=null,document.body.classList.remove("q-body--layout-animate")},155)},update(l,d,S){g[l][d]=S}};if(U(k,g),B()>0){let S=function(){l=null,d.classList.remove("hide-scrollbar")},L=function(){if(l===null){if(d.scrollHeight>o.screen.height)return;d.classList.add("hide-scrollbar")}else clearTimeout(l);l=setTimeout(S,300)},V=function(M){l!==null&&M==="remove"&&(clearTimeout(l),S()),window[`${M}EventListener`]("resize",L)},l=null;const d=document.body;x(()=>e.container!==!0?"add":"remove",V),e.container!==!0&&V("add"),te(()=>{V("remove")})}return()=>{const l=ue(f.default,[v(ge,{onScroll:p}),v(O,{onResize:P})]),d=v("div",{class:z.value,style:y.value,ref:e.container===!0?void 0:n,tabindex:-1},l);return e.container===!0?v("div",{class:"q-layout-container overflow-hidden",ref:n},[v(O,{onResize:R}),v("div",{class:"absolute-full",style:b.value},[v("div",{class:"scroll",style:r.value},[d])])]):d}}}),pe="/assets/tournament.f8ee1381.png",ye="/assets/info-white.553d6083.png";const Se=oe({name:"MainLayout",__name:"MainLayout",setup(e){const f=ne(),a=()=>{f.push({name:"about"})},o=()=>{f.push({name:"index"})};return(n,i)=>{const s=le("router-view");return ae(),ie(me,{view:"lHh Lpr lFf"},{default:Q(()=>[T(fe,{elevated:""},{default:Q(()=>[T(de,null,{default:Q(()=>[F("div",{onClick:i[0]||(i[0]=h=>o()),style:{display:"flex","align-items":"center"}},[T(N,{src:pe,ratio:1,style:{height:"40px",width:"40px"},class:"q-ml-md"}),T(ce,null,{default:Q(()=>i[2]||(i[2]=[re(" Tourney - a tournament app! ")])),_:1})]),F("div",{style:{display:"flex","align-items":"center","margin-left":"auto","margin-right":"15px"},onClick:i[1]||(i[1]=h=>a())},[T(N,{src:ye,ratio:1,style:{height:"20px",width:"20px","margin-right":"4px"}}),i[3]||(i[3]=F("div",{style:{color:"white","font-size":"large"}},"about",-1))])]),_:1})]),_:1}),T(ve,null,{default:Q(()=>[T(s)]),_:1})]),_:1})}}});export{Se as default};
