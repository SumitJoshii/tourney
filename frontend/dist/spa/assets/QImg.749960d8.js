import{v as h,g as Q,c as C,h as j,Q as M}from"./QSpinner.d7ece43c.js";import{G as $,n as F,g as E,c as u,k as X,r as c,v as Y,o as A,h as a,H as G,w as U}from"./index.5cf026e6.js";function q(){let e=null;const i=E();function n(){e!==null&&(clearTimeout(e),e=null)}return $(n),F(n),{removeTimeout:n,registerTimeout(o,d){n(),h(i)===!1&&(e=setTimeout(()=>{e=null,o()},d))}}}const te=[Element,String],V=[null,document,document.body,document.scrollingElement,document.documentElement];function ie(e,i){let n=Q(i);if(n===void 0){if(e==null)return window;n=e.closest(".scroll,.scroll-y,.overflow-auto")}return V.includes(n)?window:n}function ne(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function oe(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let v;function le(){if(v!==void 0)return v;const e=document.createElement("p"),i=document.createElement("div");C(e,{width:"100%",height:"200px"}),C(i,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),i.appendChild(e),document.body.appendChild(i);const n=e.offsetWidth;i.style.overflow="scroll";let o=e.offsetWidth;return n===o&&(o=i.clientWidth),i.remove(),v=n-o,v}function re(e,i=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:i?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}const J={ratio:[String,Number]};function K(e,i){return u(()=>{const n=Number(e.ratio||(i!==void 0?i.value:void 0));return isNaN(n)!==!0&&n>0?{paddingBottom:`${100/n}%`}:null})}const Z=1.7778;var ae=X({name:"QImg",props:{...J,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:Z},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:i,emit:n}){const o=c(e.initialRatio),d=K(e,o),S=E(),{registerTimeout:N,removeTimeout:w}=q(),{registerTimeout:z,removeTimeout:T}=q(),y=u(()=>e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null),k=u(()=>e.errorSrc!==void 0?{src:e.errorSrc,__qerror:!0}:null),l=[c(null),c(y.value)],r=c(0),g=c(!1),f=c(!1),H=u(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),I=u(()=>({width:e.width,height:e.height})),R=u(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition q-img__image--`),W=u(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));function x(){if(T(),e.loadingShowDelay===0){g.value=!0;return}z(()=>{g.value=!0},e.loadingShowDelay)}function b(){T(),g.value=!1}function B({target:t}){h(S)===!1&&(w(),o.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,_(t,1))}function _(t,s){s===1e3||h(S)===!0||(t.complete===!0?D(t):N(()=>{_(t,s+1)},50))}function D(t){h(S)!==!0&&(r.value=r.value^1,l[r.value].value=null,b(),t.getAttribute("__qerror")!=="true"&&(f.value=!1),n("load",t.currentSrc||t.src))}function O(t){w(),b(),f.value=!0,l[r.value].value=k.value,l[r.value^1].value=y.value,n("error",t)}function L(t){const s=l[t].value,m={key:"img_"+t,class:R.value,style:W.value,alt:e.alt,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...s};return r.value===t?Object.assign(m,{class:m.class+"current",onLoad:B,onError:O}):m.class+="loaded",a("div",{class:"q-img__container absolute-full",key:"img"+t},a("img",m))}function P(){return g.value===!1?a("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},j(i[f.value===!0?"error":"default"])):a("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},i.loading!==void 0?i.loading():e.noSpinner===!0?void 0:[a(M,{color:e.spinnerColor,size:e.spinnerSize})])}{let t=function(){U(()=>e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null,s=>{w(),f.value=!1,s===null?(b(),l[r.value^1].value=y.value):x(),l[r.value].value=s},{immediate:!0})};Y.value===!0?A(t):t()}return()=>{const t=[];return d.value!==null&&t.push(a("div",{key:"filler",style:d.value})),l[0].value!==null&&t.push(L(0)),l[1].value!==null&&t.push(L(1)),t.push(a(G,{name:"q-transition--fade"},P)),a("div",{key:"main",class:H.value,style:I.value,role:"img","aria-label":e.alt},t)}}});export{ae as Q,ne as a,oe as b,le as c,ie as g,re as h,te as s,q as u};