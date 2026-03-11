/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$5=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=true,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$2=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$4?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$3=window,r$1=e$3.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$3.reactiveElementPolyfillSupport,n$4={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:true,type:String,converter:n$4,reflect:false,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=false,this.hasUpdated=false,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=false),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return  false;this[d$1]=true;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),true}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return  false===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(true),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&true===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$4).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$4;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=true;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),true===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=false),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=true;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=false;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=false,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return  true}update(t){ void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=true,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$3.reactiveElementVersions)&&void 0!==s$2?s$2:e$3.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$1=i$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$3=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$3,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,false);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$1+s.slice(v)+n$3+w):s+n$3+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$1)||i.startsWith(n$3)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$1).split(n$3),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$3),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$3,t+1));)v.push({type:7,index:r}),t+=n$3.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,false),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,true);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=false;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(true);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(false);}render(){return T}}s.finalized=true,s._$litElement$=true,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$1(n){return (t,o)=>void 0!==o?e(n,t,o):i(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return n$1({...t,state:true})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

class SubscribeMixin extends s {
    constructor() {
        super(...arguments);
        this._unsubscribeFuncs = [];
        this._setupVersion = 0;
    }
    hassSubscribe() {
        return [];
    }
    async _setupSubscriptions() {
        this._unsubscribeAll();
        const version = ++this._setupVersion;
        if (this.hass) {
            const subscriptions = this.hassSubscribe();
            const funcs = await Promise.all(subscriptions.map((subscription) => subscription()));
            if (version !== this._setupVersion)
                return;
            this._unsubscribeFuncs = funcs;
        }
    }
    _unsubscribeAll() {
        this._unsubscribeFuncs.forEach((unsubscribe) => {
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this._unsubscribeFuncs = [];
    }
    updated(changedProperties) {
        super.updated?.(changedProperties);
        if (changedProperties.has('hass') || changedProperties.has('_config')) {
            this._setupSubscriptions();
        }
    }
    async connectedCallback() {
        super.connectedCallback();
        await this._setupSubscriptions();
    }
    disconnectedCallback() {
        this._unsubscribeAll();
        super.disconnectedCallback();
    }
}
__decorate([
    n$1({ attribute: false })
], SubscribeMixin.prototype, "hass", void 0);

var title$1 = "Skycooker Card";
var description$1 = "A card for managing Skycooker devices.";
var remaining$1 = "Remaining";
var min$1 = "min";
var delayed_start$1 = "Delayed Start";
var auto_warm$1 = "Auto warm";
var start$1 = "Start";
var stop$1 = "Stop";
var start_delayed$1 = "Start Delayed";
var delayed_launch$1 = "Delayed Launch";
var not_configured$1 = "Not configured";
var please_configure$1 = "Please configure the card in the editor";
var additional_settings$1 = "Additional Settings";
var cooking_time_label$1 = "Total cooking time";
var total_time$1 = "Total Time";
var hours$1 = "h";
var minutes$1 = "m";
var name$1 = "Title";
var icon$1 = "Icon";
var mode$1 = "Cooking Program";
var additional_mode$1 = "Cooking Subprogram";
var cooking_time_hours$1 = "Cooking Time (hours)";
var cooking_time_minutes$1 = "Cooking Time (minutes)";
var delayed_start_hours$1 = "Delayed Start (hours)";
var delayed_start_minutes$1 = "Delayed Start (minutes)";
var temperature$1 = "Temperature";
var cooking_temperature$1 = "Cooking Temperature";
var remaining_time$1 = "Remaining time";
var status$1 = "Status";
var current_mode$1 = "Current Program";
var current_additional_mode$1 = "Current Subprogram";
var selected_mode$1 = "Selected Program";
var selected_time$1 = "Selected Time";
var auto_warm_time$1 = "Auto warm time";
var delayed_launch_time$1 = "Time until delayed launch";
var success_rate$1 = "Success rate";
var error_code$1 = "Error code";
var sound_enabled$1 = "Sound enabled";
var sound_on$1 = "On";
var sound_off$1 = "Off";
var preview$1 = "Preview";
var clear_selection$1 = "Clear selection";
var configuration$1 = "Configuration";
var entities$1 = "Entities";
var sensors$1 = "Sensors";
var switches$1 = "Switches";
var selects$1 = "Selects";
var buttons$1 = "Buttons";
var favorite_modes$1 = "Favorite Programs";
var all_modes$1 = "All Programs";
var standby_mode$1 = "Standby Mode";
var auto_fill$1 = "Auto-fill by device";
var skycooker_instance$1 = "SkyCooker instance";
var enTranslations = {
	title: title$1,
	description: description$1,
	remaining: remaining$1,
	min: min$1,
	delayed_start: delayed_start$1,
	auto_warm: auto_warm$1,
	start: start$1,
	stop: stop$1,
	start_delayed: start_delayed$1,
	delayed_launch: delayed_launch$1,
	not_configured: not_configured$1,
	please_configure: please_configure$1,
	additional_settings: additional_settings$1,
	cooking_time_label: cooking_time_label$1,
	total_time: total_time$1,
	hours: hours$1,
	minutes: minutes$1,
	name: name$1,
	icon: icon$1,
	mode: mode$1,
	additional_mode: additional_mode$1,
	cooking_time_hours: cooking_time_hours$1,
	cooking_time_minutes: cooking_time_minutes$1,
	delayed_start_hours: delayed_start_hours$1,
	delayed_start_minutes: delayed_start_minutes$1,
	temperature: temperature$1,
	cooking_temperature: cooking_temperature$1,
	remaining_time: remaining_time$1,
	status: status$1,
	current_mode: current_mode$1,
	current_additional_mode: current_additional_mode$1,
	selected_mode: selected_mode$1,
	selected_time: selected_time$1,
	auto_warm_time: auto_warm_time$1,
	delayed_launch_time: delayed_launch_time$1,
	success_rate: success_rate$1,
	error_code: error_code$1,
	sound_enabled: sound_enabled$1,
	sound_on: sound_on$1,
	sound_off: sound_off$1,
	preview: preview$1,
	clear_selection: clear_selection$1,
	configuration: configuration$1,
	entities: entities$1,
	sensors: sensors$1,
	switches: switches$1,
	selects: selects$1,
	buttons: buttons$1,
	favorite_modes: favorite_modes$1,
	all_modes: all_modes$1,
	standby_mode: standby_mode$1,
	auto_fill: auto_fill$1,
	skycooker_instance: skycooker_instance$1
};

var title = "Карточка SkyCooker";
var description = "Карточка для управления устройствами SkyCooker.";
var remaining = "Оставшееся время";
var min = "мин";
var delayed_start = "Отложенный старт";
var auto_warm = "Автоподогрев";
var start = "Старт";
var stop = "Стоп";
var start_delayed = "Отложенный старт";
var delayed_launch = "Отложенный старт";
var not_configured = "Не настроено";
var please_configure = "Пожалуйста, настройте карточку в редакторе";
var additional_settings = "Дополнительные настройки";
var cooking_time_label = "Общее время приготовления";
var total_time = "Общее время";
var hours = "ч";
var minutes = "м";
var name = "Заголовок";
var icon = "Иконка";
var mode = "Программа приготовления";
var additional_mode = "Подпрограмма";
var cooking_time_hours = "Время приготовления (часы)";
var cooking_time_minutes = "Время приготовления (минуты)";
var delayed_start_hours = "Время до отложенного старта (часы)";
var delayed_start_minutes = "Время до отложенного старта (минуты)";
var temperature = "Температура";
var cooking_temperature = "Температура приготовления";
var remaining_time = "Оставшееся время";
var status = "Статус";
var current_mode = "Текущая программа";
var current_additional_mode = "Текущая подпрограмма";
var selected_mode = "Выбранная программа";
var selected_time = "Выбранное время";
var auto_warm_time = "Время автоподогрева";
var delayed_launch_time = "Время до отложенного старта";
var success_rate = "Процент успеха";
var error_code = "Код ошибки";
var sound_enabled = "Звук";
var sound_on = "Вкл";
var sound_off = "Выкл";
var preview = "Предпросмотр";
var clear_selection = "Очистить выбор";
var configuration = "Конфигурация";
var entities = "Сущности";
var sensors = "Сенсоры";
var switches = "Переключатели";
var selects = "Выпадающие списки";
var buttons = "Кнопки";
var favorite_modes = "Избранные программы";
var all_modes = "Все программы";
var standby_mode = "Режим ожидания";
var auto_fill = "Автозаполнить по устройству";
var skycooker_instance = "Экземпляр SkyCooker";
var ruTranslations = {
	title: title,
	description: description,
	remaining: remaining,
	min: min,
	delayed_start: delayed_start,
	auto_warm: auto_warm,
	start: start,
	stop: stop,
	start_delayed: start_delayed,
	delayed_launch: delayed_launch,
	not_configured: not_configured,
	please_configure: please_configure,
	additional_settings: additional_settings,
	cooking_time_label: cooking_time_label,
	total_time: total_time,
	hours: hours,
	minutes: minutes,
	name: name,
	icon: icon,
	mode: mode,
	additional_mode: additional_mode,
	cooking_time_hours: cooking_time_hours,
	cooking_time_minutes: cooking_time_minutes,
	delayed_start_hours: delayed_start_hours,
	delayed_start_minutes: delayed_start_minutes,
	temperature: temperature,
	cooking_temperature: cooking_temperature,
	remaining_time: remaining_time,
	status: status,
	current_mode: current_mode,
	current_additional_mode: current_additional_mode,
	selected_mode: selected_mode,
	selected_time: selected_time,
	auto_warm_time: auto_warm_time,
	delayed_launch_time: delayed_launch_time,
	success_rate: success_rate,
	error_code: error_code,
	sound_enabled: sound_enabled,
	sound_on: sound_on,
	sound_off: sound_off,
	preview: preview,
	clear_selection: clear_selection,
	configuration: configuration,
	entities: entities,
	sensors: sensors,
	switches: switches,
	selects: selects,
	buttons: buttons,
	favorite_modes: favorite_modes,
	all_modes: all_modes,
	standby_mode: standby_mode,
	auto_fill: auto_fill,
	skycooker_instance: skycooker_instance
};

// Файл локализации для skycooker-ha-card
const localize = {
    "en": enTranslations,
    "ru": ruTranslations
};
function getTranslation(language, key) {
    const translations = localize[language];
    const result = translations?.[key] || localize['ru']?.[key] || localize['en']?.[key] || key;
    return result;
}
function getLanguage(config, hass) {
    // Проверяем, задан ли язык в конфигурации карточки
    const configLanguage = config?.language;
    if (configLanguage) {
        return configLanguage;
    }
    // Иначе используем язык из Home Assistant
    let hassLanguage = hass?.language || 'ru';
    // Нормализуем язык (например, ru-RU -> ru, Russian -> ru)
    if (hassLanguage.startsWith('ru')) {
        hassLanguage = 'ru';
    }
    return hassLanguage;
}

// Константы для skycooker-ha-card
// Keep in sync with package.json version
const CARD_VERSION = "1.3.0";
/** Опция «Другое» в селекте избранного: только отображение, не передаём в select entity. В sync с интеграцией (favorites_other). */
const FAVORITES_OTHER_OPTIONS = ["Другое", "Other"];

// Конфигурация данных для skycooker-ha-card
const CONFIG_ENTITY_KEYS = [
    'mode_entity',
    'additional_mode_entity',
    'cooking_time_hours_entity',
    'cooking_time_minutes_entity',
    'delayed_start_hours_entity',
    'delayed_start_minutes_entity',
    'auto_warm_entity',
    'start_entity',
    'stop_entity',
    'start_delayed_entity',
    'cooking_temperature_entity',
    'temperature_entity',
    'remaining_time_entity',
    'cooking_time_entity',
    'status_entity',
    'success_rate_entity',
    'error_code_entity',
    'sound_enabled_entity',
    'current_mode_entity',
    'current_additional_mode_entity',
    'auto_warm_time_entity',
    'delayed_launch_time_entity',
    'favorite_modes_entity',
];
const DEFAULT_CONFIG = {
    type: 'custom:skycooker-ha-card',
    name: 'SkyCooker',
    icon: 'mdi:stove',
    language: 'ru',
    mode_entity: '',
    additional_mode_entity: '',
    cooking_time_hours_entity: '',
    cooking_time_minutes_entity: '',
    delayed_start_hours_entity: '',
    delayed_start_minutes_entity: '',
    auto_warm_entity: '',
    start_entity: '',
    stop_entity: '',
    start_delayed_entity: '',
    temperature_entity: '',
    cooking_temperature_entity: '',
    remaining_time_entity: '',
    cooking_time_entity: '',
    status_entity: '',
    success_rate_entity: '',
    error_code_entity: '',
    sound_enabled_entity: '',
    current_mode_entity: '',
    current_additional_mode_entity: '',
    auto_warm_time_entity: '',
    delayed_launch_time_entity: '',
    favorite_modes_entity: '',
};
function normalizeConfig(config, hass) {
    if (!config) {
        throw new Error('Configuration is required');
    }
    const lang = config.language ?? hass?.language ?? 'ru';
    return {
        type: config.type ?? DEFAULT_CONFIG.type,
        name: config.name ?? DEFAULT_CONFIG.name,
        icon: config.icon ?? DEFAULT_CONFIG.icon,
        language: lang,
        mode_entity: config.mode_entity ?? '',
        additional_mode_entity: config.additional_mode_entity ?? '',
        cooking_time_hours_entity: config.cooking_time_hours_entity ?? '',
        cooking_time_minutes_entity: config.cooking_time_minutes_entity ?? '',
        delayed_start_hours_entity: config.delayed_start_hours_entity ?? '',
        delayed_start_minutes_entity: config.delayed_start_minutes_entity ?? '',
        auto_warm_entity: config.auto_warm_entity ?? '',
        start_entity: config.start_entity ?? '',
        stop_entity: config.stop_entity ?? '',
        start_delayed_entity: config.start_delayed_entity ?? '',
        temperature_entity: config.temperature_entity ?? '',
        cooking_temperature_entity: config.cooking_temperature_entity ?? '',
        remaining_time_entity: config.remaining_time_entity ?? '',
        cooking_time_entity: config.cooking_time_entity ?? '',
        status_entity: config.status_entity ?? '',
        success_rate_entity: config.success_rate_entity ?? '',
        error_code_entity: config.error_code_entity ?? '',
        sound_enabled_entity: config.sound_enabled_entity ?? '',
        current_mode_entity: config.current_mode_entity ?? '',
        current_additional_mode_entity: config.current_additional_mode_entity ?? '',
        auto_warm_time_entity: config.auto_warm_time_entity ?? '',
        delayed_launch_time_entity: config.delayed_launch_time_entity ?? '',
        favorite_modes_entity: config.favorite_modes_entity ?? '',
    };
}

const POSSIBLE_OPTION_ATTRS = [
    'options',
    'temperature_options',
    'values',
    'list',
    'temperature_values',
    'temperature_list',
    'temp_options',
    'temp_values',
];
const FAVORITE_MODES_ATTRS = [
    'options',
    'list',
    'favorite_modes',
    'modes',
    'favoriteModes',
    'favorites',
    'favorite_list',
];
function isHaVersionAtLeast(hass, targetMajor, targetMinor) {
    const ver = hass?.connection?.haVersion ||
        hass?.config?.version ||
        '';
    if (!ver)
        return false;
    const [majorStr, minorStr] = ver.split('.');
    const major = Number(majorStr);
    const minor = Number(minorStr);
    if (!Number.isFinite(major) || !Number.isFinite(minor))
        return false;
    if (major > targetMajor)
        return true;
    if (major < targetMajor)
        return false;
    return minor >= targetMinor;
}
function getEntityState(hass, entityId) {
    if (!entityId || !hass)
        return 'N/A';
    return hass.states[entityId]?.state ?? 'N/A';
}
function getOptionsFromState(hass, entityId) {
    if (!entityId || !hass)
        return [];
    const stateObj = hass.states[entityId];
    if (!stateObj?.attributes)
        return [];
    let options;
    for (const attr of POSSIBLE_OPTION_ATTRS) {
        if (stateObj.attributes[attr]) {
            const val = stateObj.attributes[attr];
            if (Array.isArray(val)) {
                options = val;
            }
            else if (typeof val === 'object' && val !== null) {
                options = Object.values(val);
            }
            else if (typeof val === 'string') {
                options = val.split(',').map((s) => s.trim());
            }
            break;
        }
    }
    if (!options?.length)
        return [];
    // Не отфильтровываем режим ожидания, чтобы он был доступен
    // в селектах «Программа приготовления» и «Избранное».
    return options.filter((o) => o !== 'unknown' &&
        o != null &&
        o !== '');
}
function getSelectOptions(hass, entityId) {
    const options = getOptionsFromState(hass, entityId);
    const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);
    return options.map((option) => useHaDropdownItem
        ? x `<ha-dropdown-item value=${option}>${option}</ha-dropdown-item>`
        : x `<mwc-list-item value=${option}>${option}</mwc-list-item>`);
}
/** Опции подпрограммы 0-15 для select.subprogram интеграции */
const SUBPROGRAM_OPTIONS = Array.from({ length: 16 }, (_, i) => String(i));
function getSubprogramSelectOptions(hass, entityId) {
    const options = getOptionsFromState(hass, entityId);
    const opts = options.length > 0 ? options : SUBPROGRAM_OPTIONS;
    const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);
    return opts.map((option) => useHaDropdownItem
        ? x `<ha-dropdown-item value=${option}>${option}</ha-dropdown-item>`
        : x `<mwc-list-item value=${option}>${option}</mwc-list-item>`);
}
function getTemperatureOptionsWithFallback(hass, temperatureEntity) {
    if (!temperatureEntity || !hass)
        return [];
    const stateObj = hass.states[temperatureEntity];
    if (!stateObj?.attributes)
        return [];
    const standardOptions = getSelectOptions(hass, temperatureEntity);
    if (standardOptions.length > 0)
        return standardOptions;
    const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);
    for (const attrName of POSSIBLE_OPTION_ATTRS) {
        const attr = stateObj.attributes[attrName];
        if (!attr)
            continue;
        let options = Array.isArray(attr)
            ? attr
            : typeof attr === 'object' && attr !== null
                ? Object.values(attr)
                : typeof attr === 'string'
                    ? attr.split(',').map((s) => s.trim())
                    : [];
        options = options.filter((o) => o !== 'unknown' && o !== '' && o != null && o !== undefined);
        if (options.length > 0) {
            return options.map((o) => {
                const val = o.replace(/°?\s*C$/i, '').trim() || o;
                return useHaDropdownItem
                    ? x `<ha-dropdown-item value=${val}>${o}</ha-dropdown-item>`
                    : x `<mwc-list-item value=${val}>${o}</mwc-list-item>`;
            });
        }
    }
    if (stateObj.attributes) {
        const allOptions = [];
        for (const [, value] of Object.entries(stateObj.attributes)) {
            if (typeof value === 'string' &&
                (value.includes('°C') || value.includes('C') || !isNaN(Number(value)))) {
                allOptions.push(value);
            }
            else if (Array.isArray(value)) {
                allOptions.push(...value.filter((item) => typeof item === 'string' && item !== 'unknown' && item !== ''));
            }
        }
        if (allOptions.length > 0) {
            return allOptions.map((o) => {
                const val = o.replace(/°?\s*C$/i, '').trim() || o;
                return useHaDropdownItem
                    ? x `<ha-dropdown-item value=${val}>${o}</ha-dropdown-item>`
                    : x `<mwc-list-item value=${val}>${o}</mwc-list-item>`;
            });
        }
    }
    const defaultTemps = ['50', '60', '70', '80', '90', '100'];
    return defaultTemps.map((temp) => useHaDropdownItem
        ? x `<ha-dropdown-item value=${temp}>${temp} °C</ha-dropdown-item>`
        : x `<mwc-list-item value=${temp}>${temp} °C</mwc-list-item>`);
}
/** Убирает °C из значения температуры для select_option (интеграция ожидает "100", не "100°C") */
function normalizeTemperatureValue(value) {
    if (!value || typeof value !== 'string')
        return value;
    return value.replace(/°?\s*C$/i, '').trim() || value;
}
function getFavoriteModes(hass, entityId) {
    if (!entityId || !hass)
        return [];
    const stateObj = hass.states[entityId];
    if (!stateObj?.attributes)
        return [];
    let modes = [];
    for (const attr of FAVORITE_MODES_ATTRS) {
        const val = stateObj.attributes[attr];
        if (val) {
            modes = Array.isArray(val)
                ? val
                : typeof val === 'object' && val !== null
                    ? Object.values(val)
                    : typeof val === 'string'
                        ? val.split(',').map((s) => s.trim())
                        : [];
            break;
        }
    }
    const filtered = modes.filter((m) => m && typeof m === 'string' && m.trim() !== '');
    return filtered;
}
function hasFavoriteModes(hass, entityId) {
    return getFavoriteModes(hass, entityId).length > 0;
}
/** Опции избранного в виде элементов для ha-select (как getSelectOptions — версио-зависимо). */
function getFavoriteModesAsSelectOptions(hass, entityId) {
    const options = getFavoriteModes(hass, entityId);
    const useHaDropdownItem = isHaVersionAtLeast(hass, 2026, 1);
    return options.map((option) => useHaDropdownItem
        ? x `<ha-dropdown-item value=${option}>${option}</ha-dropdown-item>`
        : x `<mwc-list-item value=${option}>${option}</mwc-list-item>`);
}
/** Маппинг суффиксов entity_id интеграции skycooker-ha на ключи конфига */
const ENTITY_SUFFIX_TO_CONFIG_KEY = [
    // Сенсоры (английские суффиксы + русская транслитерация)
    { domain: 'sensor', suffix: 'status', configKey: 'status_entity' },
    { domain: 'sensor', suffix: 'temperature', configKey: 'temperature_entity' },
    { domain: 'sensor', suffix: 'temperatura', configKey: 'temperature_entity' },
    { domain: 'sensor', suffix: 'remaining_time', configKey: 'remaining_time_entity' },
    { domain: 'sensor', suffix: 'ostavsheesia_vremia', configKey: 'remaining_time_entity' },
    // Общее время приготовления
    { domain: 'sensor', suffix: 'cooking_time', configKey: 'cooking_time_entity' },
    { domain: 'sensor', suffix: 'total_time', configKey: 'cooking_time_entity' },
    { domain: 'sensor', suffix: 'vremia_prigotovleniia', configKey: 'cooking_time_entity' },
    { domain: 'sensor', suffix: 'current_program', configKey: 'current_mode_entity' },
    { domain: 'sensor', suffix: 'tekushchii_rezhim', configKey: 'current_mode_entity' },
    { domain: 'sensor', suffix: 'subprogram', configKey: 'current_additional_mode_entity' },
    { domain: 'sensor', suffix: 'auto_warm_time', configKey: 'auto_warm_time_entity' },
    { domain: 'sensor', suffix: 'vremia_avtopodogreva', configKey: 'auto_warm_time_entity' },
    { domain: 'sensor', suffix: 'delayed_launch_time', configKey: 'delayed_launch_time_entity' },
    {
        domain: 'sensor',
        suffix: 'vremia_do_otlozhennogo_zapuska',
        configKey: 'delayed_launch_time_entity',
    },
    { domain: 'sensor', suffix: 'success_rate', configKey: 'success_rate_entity' },
    { domain: 'sensor', suffix: 'protsent_uspekha', configKey: 'success_rate_entity' },
    { domain: 'sensor', suffix: 'error_code', configKey: 'error_code_entity' },
    { domain: 'sensor', suffix: 'kod_oshibki', configKey: 'error_code_entity' },
    { domain: 'sensor', suffix: 'sound_enabled', configKey: 'sound_enabled_entity' },
    { domain: 'sensor', suffix: 'zvuk', configKey: 'sound_enabled_entity' },
    // Select-ы (режимы, время, избранное)
    { domain: 'select', suffix: 'program', configKey: 'mode_entity' },
    { domain: 'select', suffix: 'mode', configKey: 'mode_entity' },
    {
        domain: 'select',
        suffix: 'programma_prigotovleniia',
        configKey: 'mode_entity',
    },
    { domain: 'select', suffix: 'subprogram', configKey: 'additional_mode_entity' },
    // потенциально: podprogramma, если такое имя появится
    { domain: 'select', suffix: 'temperature', configKey: 'cooking_temperature_entity' },
    { domain: 'select', suffix: 'temperatura', configKey: 'cooking_temperature_entity' },
    {
        domain: 'select',
        suffix: 'cooking_time_hours',
        configKey: 'cooking_time_hours_entity',
    },
    {
        domain: 'select',
        suffix: 'vremia_prigotovleniia_chasy',
        configKey: 'cooking_time_hours_entity',
    },
    {
        domain: 'select',
        suffix: 'cooking_time_minutes',
        configKey: 'cooking_time_minutes_entity',
    },
    {
        domain: 'select',
        suffix: 'vremia_prigotovleniia_minuty',
        configKey: 'cooking_time_minutes_entity',
    },
    {
        domain: 'select',
        suffix: 'delayed_start_hours',
        configKey: 'delayed_start_hours_entity',
    },
    {
        domain: 'select',
        suffix: 'vremia_otlozhennogo_starta_chasy',
        configKey: 'delayed_start_hours_entity',
    },
    {
        domain: 'select',
        suffix: 'delayed_start_minutes',
        configKey: 'delayed_start_minutes_entity',
    },
    {
        domain: 'select',
        suffix: 'vremia_otlozhennogo_starta_minuty',
        configKey: 'delayed_start_minutes_entity',
    },
    { domain: 'select', suffix: 'favorites', configKey: 'favorite_modes_entity' },
    { domain: 'select', suffix: 'izbrannoe', configKey: 'favorite_modes_entity' },
    // Переключатель автоподогрева
    { domain: 'switch', suffix: 'auto_warm', configKey: 'auto_warm_entity' },
    { domain: 'switch', suffix: 'avtopodogrev', configKey: 'auto_warm_entity' },
    // Кнопки
    { domain: 'button', suffix: 'start', configKey: 'start_entity' },
    { domain: 'button', suffix: 'stop', configKey: 'stop_entity' },
    { domain: 'button', suffix: 'start_delayed', configKey: 'start_delayed_entity' },
    {
        domain: 'button',
        suffix: 'otlozhennyi_start',
        configKey: 'start_delayed_entity',
    },
];
async function autoFillEntitiesByDevice(hass, seedEntityId) {
    if (!hass || !seedEntityId)
        return {};
    const result = {};
    const callWS = hass.callWS?.bind(hass);
    if (callWS) {
        try {
            const entityRegistry = await callWS({
                type: 'config/entity_registry/list',
            });
            const seedEntry = entityRegistry.find((entry) => entry.entity_id === seedEntityId);
            const deviceId = seedEntry?.device_id;
            if (deviceId) {
                const sameDeviceEntries = entityRegistry.filter((entry) => entry.device_id === deviceId);
                for (const entry of sameDeviceEntries) {
                    const entityId = entry.entity_id;
                    const [domain, objId] = entityId.split('.');
                    if (!domain || !objId)
                        continue;
                    for (const { domain: expectedDomain, suffix, configKey, } of ENTITY_SUFFIX_TO_CONFIG_KEY) {
                        if (domain !== expectedDomain)
                            continue;
                        if (!objId.endsWith(`_${suffix}`))
                            continue;
                        if (result[configKey])
                            continue;
                        result[configKey] = entityId;
                        break;
                    }
                }
            }
        }
        catch (_err) {
            // Молча откатываемся к префиксной логике ниже
        }
    }
    // Фолбэк: старая логика по префиксу object_id,
    // если через device_id ничего не нашли.
    if (Object.keys(result).length === 0) {
        const parts = seedEntityId.split('.');
        if (parts.length !== 2)
            return {};
        const objectId = parts[1];
        let prefix = '';
        for (const { suffix } of ENTITY_SUFFIX_TO_CONFIG_KEY) {
            const suffixWithUnderscore = '_' + suffix;
            if (objectId.endsWith(suffixWithUnderscore)) {
                prefix = objectId.slice(0, -suffixWithUnderscore.length);
                break;
            }
        }
        if (!prefix)
            return {};
        const prefixMatch = prefix + '_';
        for (const entityId of Object.keys(hass.states)) {
            const [domain, objId] = entityId.split('.');
            if (!objId?.startsWith(prefixMatch))
                continue;
            for (const { domain: d, suffix, configKey, } of ENTITY_SUFFIX_TO_CONFIG_KEY) {
                if (domain === d && objId === prefixMatch + suffix) {
                    result[configKey] = entityId;
                    break;
                }
            }
        }
    }
    return result;
}

// Утилиты для проверки статусов (поддержка RU/EN)
// Значения соответствуют sensor.status интеграции skycooker-ha
const STATUS_ACTIVE = [
    'Готовка',
    'Cooking',
    'Разогрев',
    'Warming',
    'Отложенный старт',
    'Delayed Launch',
    'Подогрев',
    'Auto Warm',
    'Ожидание',
    'Waiting',
];
const STATUS_OFF = [
    'Выключена',
    'Off',
    'Полностью выключена',
    'Fully off',
];
const STATUS_AUTO_WARM = ['Подогрев', 'Auto Warm'];
const STATUS_DELAYED_LAUNCH = ['Отложенный старт', 'Delayed Launch'];
function shouldShowTemperature(_currentMode, status) {
    return STATUS_ACTIVE.includes(status);
}
function isStatusOff(status) {
    return STATUS_OFF.includes(status);
}
function shouldShowAutoWarmTime(status, hasAutoWarmTimeEntity) {
    return STATUS_AUTO_WARM.includes(status) && hasAutoWarmTimeEntity;
}
function shouldShowDelayedLaunchTime(status, hasDelayedLaunchEntity) {
    return (STATUS_DELAYED_LAUNCH.includes(status) && hasDelayedLaunchEntity);
}

function renderSkyCookerHeader(config, hass, statusEntityId, showStatusText) {
    const statusState = statusEntityId && hass ? hass.states[statusEntityId]?.state ?? '' : '';
    const isOff = isStatusOff(statusState);
    const isActive = statusState && !isOff;
    return x `
    <div class="new-header">
      <div class="new-icon">
        <ha-icon .icon=${config.icon || 'mdi:stove'}></ha-icon>
      </div>
      <div class="new-summary">
        <div class="new-name">${config.name || 'SkyCooker'}</div>
        ${statusState
        ? x `<div class="new-header-status-text">${statusState}</div>`
        : ''}
      </div>
      <div class="new-status-indicator">
        ${isActive
        ? x `<ha-icon
              icon="mdi:circle"
              class="status-active"
            ></ha-icon>`
        : isOff
            ? x `<ha-icon
                icon="mdi:circle"
                class="status-off"
              ></ha-icon>`
            : ''}
      </div>
    </div>
  `;
}

function renderSkyCookerActionButtons(config, t, onButtonPress) {
    return x `
    <div class="new-action-buttons">
      ${config.start_entity
        ? x `
            <ha-button
              @click=${() => onButtonPress(config.start_entity)}
            >
              <ha-icon icon="mdi:play"></ha-icon>
              ${t('start')}
            </ha-button>
          `
        : ''}
      ${config.stop_entity
        ? x `
            <ha-button
              @click=${() => onButtonPress(config.stop_entity)}
            >
              <ha-icon icon="mdi:stop"></ha-icon>
              ${t('stop')}
            </ha-button>
          `
        : ''}
    </div>
  `;
}

function renderSkyCookerStatusBlock(config, hass, t) {
    const temperatureEntity = config.cooking_temperature_entity || config.temperature_entity;
    const showTemp = shouldShowTemperature(getEntityState(hass, config.current_mode_entity), getEntityState(hass, config.status_entity));
    const showAutoWarmTime = shouldShowAutoWarmTime(getEntityState(hass, config.status_entity), !!config.auto_warm_time_entity);
    const showDelayedLaunchTime = shouldShowDelayedLaunchTime(getEntityState(hass, config.status_entity), !!config.delayed_launch_time_entity);
    const successRate = config.success_rate_entity && hass
        ? getEntityState(hass, config.success_rate_entity)
        : '';
    const errorCode = config.error_code_entity && hass
        ? getEntityState(hass, config.error_code_entity)
        : '';
    const soundEnabledRaw = config.sound_enabled_entity && hass
        ? getEntityState(hass, config.sound_enabled_entity)
        : '';
    const hasSuccessRate = successRate !== '' && successRate !== 'N/A' && successRate !== 'unknown';
    const hasErrorCode = errorCode !== '' &&
        errorCode !== 'N/A' &&
        errorCode !== 'unknown' &&
        errorCode !== '0';
    const hasSoundEnabled = soundEnabledRaw !== '' && soundEnabledRaw !== 'N/A' && soundEnabledRaw !== 'unknown';
    const soundEnabled = soundEnabledRaw === 'on' ||
        soundEnabledRaw === 'true' ||
        soundEnabledRaw === 'True';
    return x `
    <div class="new-control-group">
      ${showTemp && temperatureEntity
        ? x `
            <div class="new-control-item">
              <ha-icon icon="mdi:thermometer" class="new-control-icon"></ha-icon>
              <div class="new-control-content">
                <div class="new-control-label">${t('temperature')}</div>
                <div class="new-control-value">
                  ${getEntityState(hass, temperatureEntity)}°C
                </div>
              </div>
            </div>
          `
        : ''}
      <div class="new-time-sensors-container">
        <div class="new-time-sensors-row">
          <div class="new-control-item">
            <div class="new-control-label">${t('remaining')}</div>
            <div class="new-control-icon-value">
              <ha-icon icon="mdi:timer" class="new-control-icon"></ha-icon>
              <div class="new-control-value">
                ${getEntityState(hass, config.remaining_time_entity)}
              </div>
            </div>
          </div>
          <div class="new-control-item">
            <div class="new-control-label">${t('cooking_time_label')}</div>
            <div class="new-control-icon-value">
              <ha-icon icon="mdi:clock" class="new-control-icon"></ha-icon>
              <div class="new-control-value">
                ${getEntityState(hass, config.cooking_time_entity)}
              </div>
            </div>
          </div>
        </div>
        <div class="new-time-sensors-row">
          ${showAutoWarmTime && config.auto_warm_time_entity
        ? x `
                <div class="new-control-item">
                  <div class="new-control-label">${t('auto_warm_time')}</div>
                  <div class="new-control-icon-value">
                    <ha-icon
                      icon="mdi:clock-start"
                      class="new-control-icon"
                    ></ha-icon>
                    <div class="new-control-value">
                      ${getEntityState(hass, config.auto_warm_time_entity)}
                    </div>
                  </div>
                </div>
              `
        : ''}
          ${showDelayedLaunchTime && config.delayed_launch_time_entity
        ? x `
                <div class="new-control-item">
                  <div class="new-control-label">${t('delayed_launch')}</div>
                  <div class="new-control-icon-value">
                    <ha-icon
                      icon="mdi:timer-sand"
                      class="new-control-icon"
                    ></ha-icon>
                    <div class="new-control-value">
                      ${getEntityState(hass, config.delayed_launch_time_entity)}
                    </div>
                  </div>
                </div>
              `
        : ''}
        </div>
        ${hasSuccessRate || hasErrorCode || hasSoundEnabled
        ? x `
              <div class="new-time-sensors-row">
                ${hasSuccessRate
            ? x `
                      <div class="new-control-item">
                        <div class="new-control-label">
                          ${t('success_rate')}
                        </div>
                        <div class="new-control-icon-value">
                          <ha-icon
                            icon="mdi:bluetooth-connect"
                            class="new-control-icon"
                          ></ha-icon>
                          <div class="new-control-value">
                            ${successRate}%
                          </div>
                        </div>
                      </div>
                    `
            : ''}
                ${hasErrorCode
            ? x `
                      <div class="new-control-item">
                        <div class="new-control-label">${t('error_code')}</div>
                        <div class="new-control-icon-value">
                          <ha-icon
                            icon="mdi:alert-circle"
                            class="new-control-icon"
                          ></ha-icon>
                          <div class="new-control-value">
                            ${errorCode}
                          </div>
                        </div>
                      </div>
                    `
            : ''}
                ${hasSoundEnabled
            ? x `
                      <div class="new-control-item">
                        <div class="new-control-label">
                          ${t('sound_enabled')}
                        </div>
                        <div class="new-control-icon-value">
                          <ha-icon
                            icon=${soundEnabled
                ? 'mdi:volume-high'
                : 'mdi:volume-off'}
                            class="new-control-icon"
                          ></ha-icon>
                          <div class="new-control-value">
                            ${soundEnabled ? t('sound_on') : t('sound_off')}
                          </div>
                        </div>
                      </div>
                    `
            : ''}
              </div>
            `
        : ''}
      </div>
    </div>
  `;
}

function renderSkyCookerAdditionalControls(config, hass, t, expanded, onToggle, onSelectChange, onSwitchChange) {
    const temperatureEntity = config.cooking_temperature_entity || config.temperature_entity;
    return x `
    <div class="new-additional-controls">
      <div class="new-section-header" @click=${onToggle}>
        <ha-icon icon="mdi:cog"></ha-icon>
        <span>${t('additional_settings')}</span>
        <ha-icon
          .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          class="new-expand-icon"
        ></ha-icon>
      </div>
      <div
        class="new-additional-content"
        style="display: ${expanded ? 'block' : 'none'};"
      >
        ${config.additional_mode_entity && hass
        ? x `
              <div class="new-cooking-time-section">
                <div class="new-cooking-time-header">
                  <ha-icon icon="mdi:cog-outline"></ha-icon>
                  <span class="new-cooking-time-label">
                    ${t('additional_mode')}
                  </span>
                </div>
                <div class="new-cooking-time-controls">
                  <ha-select
                    style="width: 100%;"
                    .value=${getEntityState(hass, config.additional_mode_entity)}
                    @value-changed=${(ev) => {
            onSelectChange(config.additional_mode_entity, ev);
        }}
                    @closed=${(ev) => ev.stopPropagation()}
                  >
                    ${getSubprogramSelectOptions(hass, config.additional_mode_entity)}
                  </ha-select>
                </div>
              </div>
            `
        : ''}
        ${config.auto_warm_entity
        ? x `
              <div class="new-auto-warm-section">
                <div class="new-auto-warm-header">
                  <ha-icon icon="mdi:heat-wave"></ha-icon>
                  <span class="new-auto-warm-label">${t('auto_warm')}</span>
                  <ha-switch
                    .checked=${getEntityState(hass, config.auto_warm_entity) ===
            'on'}
                    @change=${(ev) => onSwitchChange(config.auto_warm_entity, ev.target.checked)}
                  ></ha-switch>
                </div>
              </div>
            `
        : ''}
        ${temperatureEntity && hass
        ? x `
              <div class="new-temperature-section">
                <div class="new-temperature-header">
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <span class="new-temperature-label">
                    ${t('temperature')}
                  </span>
                </div>
                <div class="new-temperature-controls">
                  <ha-select
                    style="width: 100%;"
                    .value=${getEntityState(hass, temperatureEntity)}
                    @selected=${(ev) => {
            // eslint-disable-next-line no-console
            console.log('[SkyCooker Card] temperature select @selected', {
                entityId: temperatureEntity,
                detail: ev.detail,
                targetValue: ev.target?.value,
            });
            onSelectChange(temperatureEntity, ev);
        }}
                    @closed=${(ev) => ev.stopPropagation()}
                  >
                    ${getTemperatureOptionsWithFallback(hass, temperatureEntity)}
                  </ha-select>
                </div>
              </div>
            `
        : ''}
        ${config.cooking_time_hours_entity &&
        config.cooking_time_minutes_entity &&
        hass
        ? x `
              <div class="new-cooking-time-section">
                <div class="new-cooking-time-header">
                  <ha-icon icon="mdi:clock"></ha-icon>
                  <span class="new-cooking-time-label">
                    ${t('cooking_time_label')}
                  </span>
                </div>
                <div class="new-cooking-time-controls">
                  <ha-select
                    style="width: 100%;"
                    .value=${getEntityState(hass, config.cooking_time_hours_entity)}
                    @selected=${(ev) => {
            // eslint-disable-next-line no-console
            console.log('[SkyCooker Card] cooking_time_hours select @selected', {
                entityId: config.cooking_time_hours_entity,
                detail: ev.detail,
                targetValue: ev.target?.value,
            });
            onSelectChange(config.cooking_time_hours_entity, ev);
        }}
                    @closed=${(ev) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(hass, config.cooking_time_hours_entity)}
                  </ha-select>
                  <ha-select
                    style="width: 100%;"
                    .value=${getEntityState(hass, config.cooking_time_minutes_entity)}
                    @selected=${(ev) => {
            // eslint-disable-next-line no-console
            console.log('[SkyCooker Card] cooking_time_minutes select @selected', {
                entityId: config.cooking_time_minutes_entity,
                detail: ev.detail,
                targetValue: ev.target?.value,
            });
            onSelectChange(config.cooking_time_minutes_entity, ev);
        }}
                    @closed=${(ev) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(hass, config.cooking_time_minutes_entity)}
                  </ha-select>
                </div>
              </div>
            `
        : ''}
        ${config.delayed_start_hours_entity &&
        config.delayed_start_minutes_entity &&
        hass
        ? x `
              <div class="new-cooking-time-section">
                <div class="new-cooking-time-header">
                  <ha-icon icon="mdi:timer-sand"></ha-icon>
                  <span class="new-cooking-time-label">
                    ${t('delayed_start')}
                  </span>
                </div>
                <div class="new-cooking-time-controls">
                  <ha-select
                    style="width: 100%;"
                    .value=${getEntityState(hass, config.delayed_start_hours_entity)}
                    @selected=${(ev) => {
            // eslint-disable-next-line no-console
            console.log('[SkyCooker Card] delayed_start_hours select @selected', {
                entityId: config.delayed_start_hours_entity,
                detail: ev.detail,
                targetValue: ev.target?.value,
            });
            onSelectChange(config.delayed_start_hours_entity, ev);
        }}
                    @closed=${(ev) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(hass, config.delayed_start_hours_entity)}
                  </ha-select>
                  <ha-select
                    style="width: 100%;"
                    .value=${getEntityState(hass, config.delayed_start_minutes_entity)}
                    @selected=${(ev) => {
            // eslint-disable-next-line no-console
            console.log('[SkyCooker Card] delayed_start_minutes select @selected', {
                entityId: config.delayed_start_minutes_entity,
                detail: ev.detail,
                targetValue: ev.target?.value,
            });
            onSelectChange(config.delayed_start_minutes_entity, ev);
        }}
                    @closed=${(ev) => ev.stopPropagation()}
                  >
                    ${getSelectOptions(hass, config.delayed_start_minutes_entity)}
                  </ha-select>
                </div>
              </div>
            `
        : ''}
      </div>
    </div>
  `;
}

function renderSkyCookerModeSelector(params) {
    const { config, hass, t, getSelectedTime, showCurrentStatusLine = true, } = params;
    const getEntityStateLocal = (entityId) => entityId ? getEntityState(hass, entityId) : '';
    return x `
    <div class="new-control-group">
      <div class="new-mode-selector">
        ${showCurrentStatusLine
        ? x `
              <div class="new-mode-label" style="text-align: center;">
                ${t('current_mode')}: ${getEntityStateLocal(config.current_mode_entity)} |
                ${t('status')}: ${getEntityStateLocal(config.status_entity)}
              </div>
            `
        : ''}
        ${config.mode_entity
        ? x `<div class="new-selected-mode">
              ${t('selected_mode')}:
              <span class="selected-mode-text">
                ${getEntityStateLocal(config.mode_entity) || '-----'}
              </span>
            </div>`
        : ''}
        <div class="new-selected-time">
          ${t('selected_time')}: <span class="selected-time-text">${getSelectedTime() || '-----'}</span>
        </div>

        ${config.favorite_modes_entity &&
        config.mode_entity &&
        hasFavoriteModes(hass, config.favorite_modes_entity)
        ? x `
              <div class="new-mode-select">
                <div class="new-control-label">
                  ${t('favorite_modes')}
                </div>
                <ha-select
                  style="width: 100%;"
                  .value=${getEntityStateLocal(config.mode_entity)}
                  @selected=${(ev) => {
            // eslint-disable-next-line no-console
            console.log('[SkyCooker Card] favorite select @selected', {
                entityId: config.mode_entity,
                detail: ev.detail,
                targetValue: ev.target?.value,
            });
            params.onSelectChange?.(config.mode_entity, ev);
        }}
                  @closed=${(ev) => ev.stopPropagation()}
                >
                  ${getFavoriteModesAsSelectOptions(hass, config.favorite_modes_entity)}
                </ha-select>
              </div>
            `
        : ''}

        ${config.mode_entity
        ? x `
              <div class="new-mode-select">
                <div class="new-control-label">
                  ${t('mode')}
                </div>
                <ha-select
                  style="width: 100%;"
                  .value=${getEntityStateLocal(config.mode_entity)}
                  @selected=${(ev) => {
            // eslint-disable-next-line no-console
            console.log('[SkyCooker Card] mode select @selected', {
                entityId: config.mode_entity,
                detail: ev.detail,
                targetValue: ev.target?.value,
            });
            params.onSelectChange?.(config.mode_entity, ev);
        }}
                  @closed=${(ev) => ev.stopPropagation()}
                >
                  ${getSelectOptions(hass, config.mode_entity)}
                </ha-select>
              </div>
            `
        : ''}
      </div>
    </div>
  `;
}

const skycookerCardStyles = i$2 `
  :host {
    /* Размеры и отступы (fallback без Mush) */
    --skycooker-spacing: 10px;
    --skycooker-control-radius: 12px;
    --skycooker-chip-radius: 19px;
    --skycooker-chip-height: 36px;
    --skycooker-icon-radius: 50%;
    --skycooker-icon-size: 36px;
    --skycooker-control-height: 42px;
    font-family: var(--mdc-typography-font-family, inherit);
    /* Цвета только из темы HA */
    --skycooker-bg: var(--card-background-color);
    --skycooker-border: var(--divider-color);
    --skycooker-text: var(--primary-text-color);
    --skycooker-text-secondary: var(--secondary-text-color);
    --skycooker-accent: var(--primary-color);
    --skycooker-accent-text: var(--primary-inverse-color, var(--text-primary-color, inherit));
    --skycooker-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.08));
  }

  ha-card {
    padding: 16px;
    position: relative;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 10px 0;
    border-bottom: 1px solid var(--skycooker-border);
  }
  .header .icon {
    font-size: 48px;
    color: var(--skycooker-accent);
  }
  .header .summary {
    display: flex;
    flex-direction: column;
  }
  .header .name {
    font-size: 24px;
    font-weight: bold;
  }
  .header .state {
    font-size: 14px;
    color: var(--skycooker-text-secondary);
  }
  ha-button {
    --mdc-theme-primary: var(--skycooker-accent);
    --mdc-theme-secondary: var(--skycooker-text-secondary);
  }
  .setup-message {
    padding: 20px;
    text-align: center;
    color: var(--skycooker-text-secondary);
    font-size: 16px;
  }

  ha-card.new-design {
    padding: 12px;
    gap: 12px;
    background: var(--skycooker-bg);
    border-radius: var(--ha-card-border-radius, 16px);
    box-shadow: var(--skycooker-shadow);
    overflow: hidden;
  }

  ha-card.new-design.new-design-v2 {
    gap: 14px;
  }

  .new-design-v2 .new-controls-grid {
    margin-top: 2px;
  }

  /* Заголовок: рамка с отступом от края, как у остальных блоков */
  .new-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background: var(--skycooker-bg);
    border: 1px solid var(--skycooker-border);
    border-radius: var(--skycooker-control-radius);
    color: var(--skycooker-text);
  }

  .new-icon {
    width: var(--skycooker-icon-size);
    height: var(--skycooker-icon-size);
    min-width: var(--skycooker-icon-size);
    min-height: var(--skycooker-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: var(--skycooker-icon-radius);
    background: var(--secondary-background-color, rgba(128, 128, 128, 0.08));
    color: var(--skycooker-accent);
  }

  .new-icon ha-icon {
    width: calc(var(--skycooker-icon-size) - 8px);
    height: calc(var(--skycooker-icon-size) - 8px);
  }

  .new-summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .new-name {
    font-size: var(--title-font-size, 24px);
    font-weight: 600;
    font-family: inherit;
    color: var(--skycooker-text);
  }

  .new-header-status-text {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
    margin-top: 4px;
  }

  .new-state {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
  }

  .new-status-indicator {
    font-size: 20px;
  }

  .new-status-indicator .status-active {
    color: var(--state-icon-active-color, var(--success-color, var(--skycooker-accent)));
  }

  .new-status-indicator .status-off {
    color: var(--state-icon-inactive-color, var(--error-color, var(--skycooker-text-secondary)));
  }

  .new-controls-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .new-control-group {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
    border: 1px solid var(--skycooker-border);
  }

  .new-control-item {
    display: flex;
    align-items: center;
    gap: var(--skycooker-spacing);
  }

  .new-control-icon {
    font-size: 20px;
    color: var(--skycooker-accent);
  }

  .new-control-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .new-control-label {
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
  }

  .new-control-value {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
  }

  .new-mode-selector {
    display: flex;
    flex-direction: column;
    gap: 0px;
    border: none;
    background: none;
    padding: 0;
  }

  .new-mode-label {
    font-size: var(--card-secondary-font-size, 12px);
    font-weight: 500;
  }

  .new-selected-mode {
    font-size: var(--card-primary-font-size, 14px);
    color: var(--skycooker-text-secondary);
    text-align: center;
    font-family: inherit;
    font-weight: 500;
  }

  .selected-mode-text {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    color: var(--skycooker-accent);
    margin-left: 4px;
    font-family: inherit;
  }

  .new-selected-time {
    font-size: var(--card-primary-font-size, 14px);
    color: var(--skycooker-text-secondary);
    text-align: center;
    min-height: 20px;
    font-family: inherit;
    font-weight: 500;
  }

  .selected-time-text {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
    color: var(--skycooker-accent);
    margin-left: 4px;
    font-family: inherit;
  }

  .new-mode-select {
    margin-top: var(--skycooker-spacing);
  }


  /* Стандартные ha-button: только контейнер, без кастомного вида кнопок */
  .new-action-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
  }

  .new-action-buttons ha-button {
    --mdc-theme-primary: var(--skycooker-accent);
  }

  .new-additional-controls {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
    margin-top: 4px;
  }

  .new-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .new-section-header ha-icon {
    font-size: 20px;
  }

  .new-section-header span {
    flex: 1;
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
  }

  .new-expand-icon {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  .new-additional-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0;
    border-top: 1px solid var(--skycooker-border);
  }

  .new-auto-warm-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: var(--skycooker-spacing);
    background-color: var(--skycooker-bg);
    border-radius: var(--skycooker-control-radius);
    margin-bottom: var(--skycooker-spacing);
  }

  .new-auto-warm-header {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }

  .new-auto-warm-label {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
    text-align: center;
  }

  .new-temperature-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: 0;
    margin: var(--skycooker-spacing) 0 0 0;
    width: 100%;
    box-sizing: border-box;
  }

  .new-temperature-header {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  }

  .new-temperature-label {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
    text-align: center;
  }

  .new-temperature-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0;
  }

  .new-temperature-select-container {
    display: flex;
    justify-content: center;
    padding-left: 0;
    width: 100%;
  }

  .new-temperature-hidden-select {
    width: 100%;
    min-width: 120px;
    max-width: 180px;
    --mdc-theme-primary: var(--skycooker-accent);
    --mdc-shape-small: var(--skycooker-control-radius);
    --mdc-menu-min-width: 120px;
    height: var(--skycooker-control-height);
    border-radius: var(--skycooker-control-radius);
    box-shadow: var(--skycooker-shadow);
  }

  .new-cooking-time-section {
    display: flex;
    flex-direction: column;
    gap: var(--skycooker-spacing);
    padding: 0;
    margin: var(--skycooker-spacing) 0 0 0;
    width: 100%;
    box-sizing: border-box;
  }

  .new-cooking-time-header {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  }

  .new-cooking-time-label {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 600;
    text-align: center;
  }

  .new-cooking-time-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    padding-left: 0;
  }

  .entity-rows-column {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .entity-rows-column hui-generic-entity-row {
    display: block;
    width: 100%;
  }

  /* В дополнительных настройках скрываем текстовые подписи у entity-row,
     чтобы визуально оставались только стандартные селекты HA */
  .entity-rows-column hui-generic-entity-row .info {
    display: none;
  }

  .new-time-unit {
    font-size: var(--card-primary-font-size, 14px);
    font-weight: 500;
  }

  .new-auto-warm-time {
    padding-left: 30px;
    font-size: var(--card-secondary-font-size, 12px);
    color: var(--skycooker-text-secondary);
  }

  .new-time-sensors-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .new-time-sensors-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }

  .new-time-sensors-row:only-child {
    justify-content: center;
  }

  .new-time-sensors-row:nth-child(1):only-child + .new-time-sensors-row {
    display: none;
  }

  .new-time-sensors-row:nth-child(1):has(.new-control-item:nth-child(2)) + .new-time-sensors-row:has(.new-control-item:only-child) {
    justify-content: center;
  }

  .new-time-sensors-row:nth-child(1):has(.new-control-item:nth-child(2)) + .new-time-sensors-row:has(.new-control-item:nth-child(2)) {
    justify-content: flex-start;
  }

  .new-control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .new-control-icon-value {
    display: flex;
    align-items: center;
    gap: 8px;
  }

`;

let SkyCookerHaCard = class SkyCookerHaCard extends SubscribeMixin {
    constructor() {
        super(...arguments);
        this._selectedMode = 'favorite'; // По умолчанию избранные режимы
        this._selectedModeName = ''; // Отслеживаем имя нажатой кнопки режима
        this._additionalExpanded = false;
        this._configChangedHandler = (ev) => {
            const customEvent = ev;
            if (customEvent.detail?.config) {
                this._config = normalizeConfig(customEvent.detail.config, this.hass);
                this._initializeSelectedMode();
                this.requestUpdate();
            }
        };
    }
    _initializeSelectedMode() {
        const favEntity = this._config?.favorite_modes_entity;
        const hasFav = hasFavoriteModes(this.hass, favEntity);
        // Если есть сущность избранного и в ней есть режимы — показываем избранное, иначе все
        if (favEntity && hasFav) {
            this._selectedMode = 'favorite';
        }
        else {
            this._selectedMode = 'all';
        }
        this._syncSelectedModeFromEntity();
    }
    _syncSelectedModeFromEntity() {
        if (!this._config?.mode_entity || !this.hass)
            return;
        const state = getEntityState(this.hass, this._config.mode_entity);
        if (state && state !== 'N/A' && state !== 'unknown') {
            this._selectedModeName = state;
        }
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return skycookerHaCardEditor; });
        return document.createElement('skycooker-ha-card-editor');
    }
    _getLanguage() {
        return getLanguage(this._config, this.hass);
    }
    _t(key) {
        const language = this._getLanguage();
        return getTranslation(language, key);
    }
    static async getStubConfig(hass) {
        return {
            ...DEFAULT_CONFIG,
            language: hass.language || 'ru',
        };
    }
    setConfig(config) {
        this._config = normalizeConfig(config, this.hass);
        this._initializeSelectedMode();
    }
    async connectedCallback() {
        super.connectedCallback();
        this.addEventListener('config-changed', this._configChangedHandler);
    }
    disconnectedCallback() {
        this.removeEventListener('config-changed', this._configChangedHandler);
        super.disconnectedCallback();
    }
    updated(changedProperties) {
        super.updated?.(changedProperties);
        if (changedProperties.has('hass') || changedProperties.has('_config')) {
            // Инициализируем вкладку по умолчанию только когда hass только что появился (при первой загрузке).
            // Иначе при каждом обновлении hass перезаписывали бы выбор пользователя «Все программы».
            const hassJustBecameAvailable = changedProperties.has('hass') && !changedProperties.get('hass') && this.hass;
            if (hassJustBecameAvailable) {
                this._initializeSelectedMode();
            }
            else {
                this._syncSelectedModeFromEntity();
            }
        }
    }
    hassSubscribe() {
        if (!this._config || !this.hass)
            return [];
        const entities = CONFIG_ENTITY_KEYS.map((key) => this._config[key])
            .filter((entity) => !!entity);
        return entities.map((entity) => {
            return () => {
                const result = this.hass?.connection.subscribeEvents((event) => {
                    if (event.data.entity_id === entity) {
                        this._handleStateChange(event.data.entity_id, event.data.new_state);
                    }
                }, 'state_changed');
                if (!result)
                    return Promise.resolve(() => { });
                return result instanceof Promise ? result : Promise.resolve(result);
            };
        });
    }
    _handleStateChange(entityId, newState) {
        if (entityId === this._config?.mode_entity &&
            newState?.state &&
            newState.state !== 'unknown') {
            this._selectedModeName = newState.state;
        }
        this.requestUpdate();
    }
    render() {
        if (!this._config || !this.hass) {
            return x ``;
        }
        const hasAnyEntity = CONFIG_ENTITY_KEYS.some((key) => this._config[key]?.length > 0);
        if (!hasAnyEntity) {
            return x `
       <ha-card>
         <div class="header">
           <div class="icon">
             <ha-icon .icon="${this._config.icon || 'mdi:stove'}"></ha-icon>
           </div>
           <div class="summary">
             <div class="name">
               ${this._config.name || 'SkyCooker'}
             </div>
             <div class="state">
               ${this._t('not_configured')}
             </div>
           </div>
         </div>
         <div class="setup-message">
           ${this._t('please_configure')}
         </div>
       </ha-card>
     `;
        }
        return this._renderUnifiedDesign();
    }
    _renderUnifiedDesign() {
        return x `
  <ha-card class="new-design new-design-v2">
    ${renderSkyCookerHeader(this._config, this.hass, this._config.status_entity)}
    
    ${this._renderUnifiedStateBlock()}
    
    <div class="new-controls-grid">
    ${renderSkyCookerModeSelector({
            config: this._config,
            hass: this.hass,
            t: this._t.bind(this),
            getSelectedTime: () => this._getSelectedTime(),
            showCurrentStatusLine: false,
            onSelectChange: (entityId, ev) => this._handleSelectChange(entityId, ev),
        })}
    </div>
    
    ${renderSkyCookerActionButtons(this._config, this._t.bind(this), this._handleButtonPress.bind(this))}
    
    ${renderSkyCookerAdditionalControls(this._config, this.hass, this._t.bind(this), this._additionalExpanded, () => {
            this._additionalExpanded = !this._additionalExpanded;
        }, this._handleSelectChange.bind(this), this._handleSwitchChange.bind(this))}
    
  </ha-card>
`;
    }
    _renderUnifiedStateBlock() {
        const statusState = this._config?.status_entity && this.hass
            ? (this.hass.states[this._config.status_entity]?.state ?? '')
            : '';
        if (isStatusOff(statusState)) {
            return x ``;
        }
        return renderSkyCookerStatusBlock(this._config, this.hass, this._t.bind(this));
    }
    _getEntityState(entityId) {
        return getEntityState(this.hass, entityId);
    }
    _getSelectedTime() {
        // Получаем данные из скрытых селектов 'Время приготовления'
        if (!this._config?.cooking_time_hours_entity || !this._config?.cooking_time_minutes_entity || !this.hass)
            return 'N/A';
        const hours = this._getEntityState(this._config.cooking_time_hours_entity);
        const minutes = this._getEntityState(this._config.cooking_time_minutes_entity);
        // Форматируем время для отображения
        if (hours === 'N/A' || hours === '') {
            return minutes !== 'N/A' && minutes !== '' ? `${minutes} ${this._t('minutes')}` : 'N/A';
        }
        if (minutes === 'N/A' || minutes === '') {
            return hours !== 'N/A' && hours !== '' ? `${hours} ${this._t('hours')}` : 'N/A';
        }
        return `${hours} ${this._t('hours')} ${minutes} ${this._t('minutes')}`;
    }
    _handleSelectChange(entityId, ev) {
        if (!this._config || !this.hass || !entityId)
            return;
        // eslint-disable-next-line no-console
        console.log('[SkyCooker Card] _handleSelectChange event', {
            entityId,
            detail: ev?.detail,
            targetValue: ev?.target?.value,
            selectedValue: ev?.target?.selected?.value,
        });
        let value = ev?.detail?.value ??
            ev?.target?.value ??
            ev?.target?.selected?.value ??
            ev?.target?.selected?.textContent?.trim();
        // Если всё еще нет значения, пробуем получить из текущего состояния сущности
        if (value === undefined || value === null || value === '') {
            value = this._getEntityState(entityId);
        }
        if (value === undefined || value === null || value === '')
            return;
        // Приводим к строке, чтобы select.select_option получил ожидаемый тип
        value = String(value);
        // Убедимся, что не устанавливаем 'unknown' для режима готовки
        if (entityId === this._config.mode_entity && value === 'unknown') {
            value = '';
        }
        // Убедимся, что не устанавливаем 'unknown' для времени отложенного старта
        if (entityId === this._config.delayed_start_hours_entity && value === 'unknown') {
            value = '0';
        }
        // Убедимся, что не устанавливаем 'unknown' для минут отложенного старта
        if (entityId === this._config.delayed_start_minutes_entity && value === 'unknown') {
            value = '0';
        }
        // Опция «Другое» в селекте избранного — только обновить отображение, не вызывать select_option
        if (entityId === this._config.mode_entity &&
            FAVORITES_OTHER_OPTIONS.includes(value)) {
            this._selectedModeName = String(value);
            this.requestUpdate();
            return;
        }
        const temperatureEntity = this._config.cooking_temperature_entity || this._config.temperature_entity;
        if (entityId === temperatureEntity) {
            value = normalizeTemperatureValue(value);
        }
        // Для визуального отображения "Выбранная программа" сразу
        // обновляем локальное имя при смене режима.
        if (entityId === this._config.mode_entity) {
            this._selectedModeName = String(value);
            this.requestUpdate();
        }
        this.hass.callService('select', 'select_option', {
            entity_id: entityId,
            option: value
        });
    }
    _handleSwitchChange(entityId, checked) {
        if (!this._config || !this.hass || !entityId)
            return;
        const service = checked ? 'turn_on' : 'turn_off';
        this.hass.callService('switch', service, {
            entity_id: entityId
        });
    }
    _handleButtonPress(entityId) {
        if (!this._config || !this.hass || !entityId)
            return;
        // Кнопка "Стоп" — вызываем сервис skycooker.stop_cooking
        if (entityId === this._config.stop_entity) {
            const targetEntity = this._config.status_entity ||
                this._config.mode_entity ||
                this._config.start_entity ||
                this._config.stop_entity;
            this.hass.callService('skycooker', 'stop_cooking', {
                entity_id: targetEntity,
            });
            return;
        }
        // Кнопка "Старт" — вызываем сервис skycooker.start_cooking
        if (entityId === this._config.start_entity) {
            // Перед запуском убедимся, что значения отложенного старта не "unknown"
            const delayedStartHoursEntity = this._config.delayed_start_hours_entity;
            if (delayedStartHoursEntity) {
                const currentState = this._getEntityState(delayedStartHoursEntity);
                if (currentState === 'unknown') {
                    this.hass.callService('select', 'select_option', {
                        entity_id: delayedStartHoursEntity,
                        option: '0'
                    });
                }
            }
            const delayedStartMinutesEntity = this._config.delayed_start_minutes_entity;
            if (delayedStartMinutesEntity) {
                const currentState = this._getEntityState(delayedStartMinutesEntity);
                if (currentState === 'unknown') {
                    this.hass.callService('select', 'select_option', {
                        entity_id: delayedStartMinutesEntity,
                        option: '0'
                    });
                }
            }
            const targetEntity = this._config.status_entity ||
                this._config.mode_entity ||
                this._config.start_entity;
            this.hass.callService('skycooker', 'start_cooking', {
                entity_id: targetEntity,
            });
            return;
        }
    }
    static get styles() {
        return skycookerCardStyles;
    }
};
__decorate([
    n$1({ attribute: false })
], SkyCookerHaCard.prototype, "hass", void 0);
__decorate([
    t()
], SkyCookerHaCard.prototype, "_config", void 0);
__decorate([
    t()
], SkyCookerHaCard.prototype, "_selectedMode", void 0);
__decorate([
    t()
], SkyCookerHaCard.prototype, "_selectedModeName", void 0);
__decorate([
    t()
], SkyCookerHaCard.prototype, "_additionalExpanded", void 0);
SkyCookerHaCard = __decorate([
    e$1('skycooker-ha-card')
], SkyCookerHaCard);
// Красивый лог версии карточки в консоль
// eslint-disable-next-line no-console
console.log('%cSkyCooker Card%c version %c' + CARD_VERSION, 'background:#1e88e5;color:#fff;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:bold;', 'background:#424242;color:#fff;padding:2px 6px 2px 4px;border-radius:0;font-weight:normal;', 'background:#2e7d32;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;font-weight:bold;');
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'skycooker-ha-card',
    name: 'SkyCooker Card',
    description: 'Card for operating SkyCooker through Lovelace.',
    preview: true,
});

let SkyCookerHaCardEditor = class SkyCookerHaCardEditor extends s {
    constructor() {
        super(...arguments);
        /** Список экземпляров (по одному на устройство): подпись = имя устройства, value = entity_id для seed */
        this._instanceOptions = [];
        this._instanceOptionsLoaded = false;
        this._handleAutoFill = async (seedOverride) => {
            const seed = seedOverride ||
                this._instanceEntityId ||
                this._config?.mode_entity ||
                this._config?.status_entity ||
                this._config?.start_entity;
            if (!seed || !this.hass)
                return;
            const filled = await autoFillEntitiesByDevice(this.hass, seed);
            if (Object.keys(filled).length > 0) {
                this._updateConfig(filled);
            }
        };
    }
    _handleSelectConfigChangeSelected(key, ev) {
        const v = ev.detail?.value ??
            ev.target?.value ??
            ev.target?.selected?.value ??
            '';
        if (v === undefined)
            return;
        this._updateConfig({ [key]: v });
    }
    setConfig(config) {
        this._config = config
            ? { ...normalizeConfig(config, this.hass) }
            : { ...DEFAULT_CONFIG, language: 'ru' };
        // Выбранный экземпляр SkyCooker храним отдельно, чтобы в UI
        // всегда показывать ровно то, что выбрал пользователь, даже
        // если автофилл изменяет mode_entity/status_entity.
        this._instanceEntityId =
            this._config.mode_entity ||
                this._config.status_entity ||
                this._config.start_entity ||
                '';
    }
    getConfig() {
        return this._config;
    }
    // Реализуем метод configUpdated для правильной обработки обновлений конфигурации
    configUpdated(config) {
        this.setConfig(config);
        this.requestUpdate();
    }
    updated(changedProperties) {
        if (changedProperties.has('hass') && this.hass && !this._instanceOptionsLoaded) {
            this._loadInstanceOptions();
        }
    }
    _updateConfig(updates) {
        if (!this._config)
            return;
        this._config = { ...this._config, ...updates };
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    _isHaVersionAtLeast(targetMajor, targetMinor) {
        const ver = this.hass?.connection?.haVersion ||
            this.hass?.config?.version ||
            '';
        if (!ver)
            return false;
        const [majorStr, minorStr] = ver.split('.');
        const major = Number(majorStr);
        const minor = Number(minorStr);
        if (!Number.isFinite(major) || !Number.isFinite(minor))
            return false;
        if (major > targetMajor)
            return true;
        if (major < targetMajor)
            return false;
        return minor >= targetMinor;
    }
    _getEntityOptions(domain) {
        if (!this.hass)
            return [];
        const useHaDropdownItem = this._isHaVersionAtLeast(2026, 1);
        const entities = Object.keys(this.hass.states)
            .filter((entity_id) => entity_id.startsWith(`${domain}.`) &&
            entity_id.includes('skycooker'))
            .sort();
        const options = [];
        // Опция очистки
        options.push(useHaDropdownItem
            ? x `<ha-dropdown-item value=""
            >${this._t('clear_selection')}</ha-dropdown-item
          >`
            : x `<mwc-list-item value=""
            >${this._t('clear_selection')}</mwc-list-item
          >`);
        // Опции сущностей SkyCooker
        entities.forEach((entity_id) => {
            const stateObj = this.hass?.states[entity_id];
            const registryEntry = this.hass.entities?.[entity_id];
            const friendlyName = registryEntry?.name ||
                stateObj?.attributes?.friendly_name ||
                entity_id;
            options.push(useHaDropdownItem
                ? x `<ha-dropdown-item value=${entity_id}
              >${friendlyName}</ha-dropdown-item
            >`
                : x `<mwc-list-item value="${entity_id}"
              >${friendlyName}</mwc-list-item
            >`);
        });
        return options;
    }
    /** Загружает список экземпляров SkyCooker по реестрам: по одному пункту на устройство (имя устройства). */
    async _loadInstanceOptions() {
        const hass = this.hass;
        const callWS = hass?.callWS?.bind(hass);
        if (!callWS || !hass) {
            this._instanceOptions = [];
            this._instanceOptionsLoaded = true;
            return;
        }
        try {
            const [entityRegistry, deviceRegistry] = await Promise.all([
                callWS({ type: 'config/entity_registry/list' }),
                callWS({ type: 'config/device_registry/list' }),
            ]);
            const skycookerEntities = entityRegistry.filter((e) => e.entity_id &&
                String(e.entity_id).includes('skycooker') &&
                (e.entity_id.startsWith('sensor.') || e.entity_id.startsWith('select.')) &&
                (e.entity_id.endsWith('_status') || e.entity_id.endsWith('_program')));
            const byDevice = new Map();
            for (const e of skycookerEntities) {
                const did = e.device_id;
                if (!did)
                    continue;
                if (!byDevice.has(did))
                    byDevice.set(did, []);
                byDevice.get(did).push(e.entity_id);
            }
            const devicesById = new Map();
            for (const d of deviceRegistry || []) {
                if (d?.id)
                    devicesById.set(d.id, d);
            }
            const list = [];
            for (const [deviceId, entityIds] of byDevice) {
                const device = devicesById.get(deviceId);
                const name = device?.name_by_user ||
                    device?.name ||
                    (device?.manufacturer && device?.model
                        ? `${device.manufacturer} ${device.model}`
                        : null) ||
                    `SkyCooker (${entityIds[0]})`;
                const representative = entityIds.find((id) => id.endsWith('_status')) ||
                    entityIds.find((id) => id.endsWith('_program')) ||
                    entityIds[0];
                list.push({ value: representative, label: name });
            }
            list.sort((a, b) => a.label.localeCompare(b.label));
            this._instanceOptions = list;
        }
        catch {
            this._instanceOptions = [];
        }
        this._instanceOptionsLoaded = true;
        this.requestUpdate();
    }
    _getSkycookerRootOptions() {
        if (!this.hass)
            return [];
        const useHaDropdownItem = this._isHaVersionAtLeast(2026, 1);
        const options = [];
        options.push(useHaDropdownItem
            ? x `<ha-dropdown-item value=""
            >${this._t('clear_selection')}</ha-dropdown-item
          >`
            : x `<mwc-list-item value=""
            >${this._t('clear_selection')}</mwc-list-item
          >`);
        for (const { value, label } of this._instanceOptions) {
            options.push(useHaDropdownItem
                ? x `<ha-dropdown-item value=${value}>${label}</ha-dropdown-item>`
                : x `<mwc-list-item value="${value}">${label}</mwc-list-item>`);
        }
        return options;
    }
    _getLanguage() {
        return getLanguage(this._config, this.hass);
    }
    _t(key) {
        const language = this._getLanguage();
        return getTranslation(language, key);
    }
    render() {
        if (!this._config || !this.hass) {
            return x ``;
        }
        return x `
      <div class="editor-container">
        <!-- Configuration Header -->
        <div class="config-header">
          <h2>${this._t('configuration')}</h2>
        </div>

        <!-- Basic Settings -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('entities')}</h3>
            <ha-button
              @click=${() => this._handleAutoFill(this._instanceEntityId)}
            >
              ${this._t('auto_fill')}
            </ha-button>
          </div>
          <div class="grid">
            <!-- Name -->
            <ha-textfield
              .label="${this._t('name')}"
              .value="${this._config.name || 'SkyCooker'}"
              @input="${(ev) => this._updateConfig({
            name: ev.target.value,
        })}"
            ></ha-textfield>

            <!-- Icon -->
            <ha-textfield
              .label="${this._t('icon')}"
              .value="${this._config.icon || 'mdi:stove'}"
              @input="${(ev) => this._updateConfig({
            icon: ev.target.value,
        })}"
            ></ha-textfield>
          </div>

          <div class="grid">
            <!-- SkyCooker instance -->
            <div class="entity-item">
              <label>${this._t('skycooker_instance')}</label>
              <ha-select
                .value=${this._instanceEntityId || ''}
                @selected=${(ev) => {
            const v = ev.detail?.value ??
                ev.target?.value ??
                '';
            if (!v)
                return;
            this._instanceEntityId = v;
            this._handleAutoFill(this._instanceEntityId);
        }}
              >
                ${this._getSkycookerRootOptions()}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Sensors Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('sensors')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Current Program Sensor -->
            <div class="entity-item">
              <label>${this._t('current_mode')}</label>
              <ha-select
                .value=${this._config.current_mode_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('current_mode_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Delayed Launch Time Sensor -->
            <div class="entity-item">
              <label>${this._t('delayed_launch_time')}</label>
              <ha-select
                .value=${this._config.delayed_launch_time_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('delayed_launch_time_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Total Time Sensor -->
            <div class="entity-item">
              <label>${this._t('total_time')}</label>
              <ha-select
                .value=${this._config.cooking_time_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('cooking_time_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Remaining Time Sensor -->
            <div class="entity-item">
              <label>${this._t('remaining_time')}</label>
              <ha-select
                .value=${this._config.remaining_time_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('remaining_time_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Temperature Sensor -->
            <div class="entity-item">
              <label>${this._t('temperature')}</label>
              <ha-select
                .value=${this._config.temperature_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('temperature_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Status Sensor -->
            <div class="entity-item">
              <label>${this._t('status')}</label>
              <ha-select
                .value=${this._config.status_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('status_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Success Rate Sensor -->
            <div class="entity-item">
              <label>${this._t('success_rate')}</label>
              <ha-select
                .value=${this._config.success_rate_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('success_rate_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Error Code Sensor -->
            <div class="entity-item">
              <label>${this._t('error_code')}</label>
              <ha-select
                .value=${this._config.error_code_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('error_code_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Sound Enabled Sensor -->
            <div class="entity-item">
              <label>${this._t('sound_enabled')}</label>
              <ha-select
                .value=${this._config.sound_enabled_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('sound_enabled_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Current Mode Sensor -->
            <div class="entity-item">
              <label>${this._t('current_mode')}</label>
              <ha-select
                .value=${this._config.current_mode_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('current_mode_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Auto Warm Time Sensor -->
            <div class="entity-item">
              <label>${this._t('auto_warm_time')}</label>
              <ha-select
                .value=${this._config.auto_warm_time_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('auto_warm_time_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Delayed Launch Time Sensor -->
            <div class="entity-item">
              <label>${this._t('delayed_launch_time')}</label>
              <ha-select
                .value=${this._config.delayed_launch_time_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('delayed_launch_time_entity', ev)}
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Switches Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('switches')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Auto Warm Switch -->
            <div class="entity-item">
              <label>${this._t('auto_warm')}</label>
              <ha-select
                .value=${this._config.auto_warm_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('auto_warm_entity', ev)}
              >
                ${this._getEntityOptions('switch')}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Selects Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('selects')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Mode Select -->
            <div class="entity-item">
              <label>${this._t('mode')}</label>
              <ha-select
                .value=${this._config.mode_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('mode_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Favorite Modes Select -->
            <div class="entity-item">
              <label>${this._t('favorite_modes')}</label>
              <ha-select
                .value=${this._config.favorite_modes_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('favorite_modes_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Additional Mode Select -->
            <div class="entity-item">
              <label>${this._t('additional_mode')}</label>
              <ha-select
                .value=${this._config.additional_mode_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('additional_mode_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Hours Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_hours')}</label>
              <ha-select
                .value=${this._config.cooking_time_hours_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('cooking_time_hours_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Minutes Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_minutes')}</label>
              <ha-select
                .value=${this._config.cooking_time_minutes_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('cooking_time_minutes_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Hours Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_hours')}</label>
              <ha-select
                .value=${this._config.delayed_start_hours_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('delayed_start_hours_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Minutes Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_minutes')}</label>
              <ha-select
                .value=${this._config.delayed_start_minutes_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('delayed_start_minutes_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Temperature Select -->
            <div class="entity-item">
              <label>${this._t('cooking_temperature')}</label>
              <ha-select
                .value=${this._config.cooking_temperature_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('cooking_temperature_entity', ev)}
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>
          </div>
        </div>

        <!-- Buttons Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('buttons')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Start Button -->
            <div class="entity-item">
              <label>${this._t('start')}</label>
              <ha-select
                .value=${this._config.start_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('start_entity', ev)}
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Stop Button -->
            <div class="entity-item">
              <label>${this._t('stop')}</label>
              <ha-select
                .value=${this._config.stop_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('stop_entity', ev)}
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Start Delayed Button -->
            <div class="entity-item">
              <label>${this._t('start_delayed')}</label>
              <ha-select
                .value=${this._config.start_delayed_entity || ''}
                @selected=${(ev) => this._handleSelectConfigChangeSelected('start_delayed_entity', ev)}
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    static get styles() {
        return i$2 `
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .config-header {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--divider-color);
      }

      .section {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px 8px;
        margin-bottom: 15px;
      }

      .grid > * {
        display: flex;
        flex-direction: column;
        flex: 1 0 300px;
      }

      .entity-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
      }

      .entity-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .entity-item label {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      ha-select {
        flex: 1;
      }

      ha-textfield {
        width: 100%;
      }

      .design-toggle-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 15px;
      }

      .design-toggle-label {
        font-size: 14px;
        color: var(--primary-text-color);
      }
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], SkyCookerHaCardEditor.prototype, "hass", void 0);
__decorate([
    t()
], SkyCookerHaCardEditor.prototype, "_config", void 0);
__decorate([
    t()
], SkyCookerHaCardEditor.prototype, "_instanceEntityId", void 0);
__decorate([
    t()
], SkyCookerHaCardEditor.prototype, "_instanceOptions", void 0);
SkyCookerHaCardEditor = __decorate([
    e$1('skycooker-ha-card-editor')
], SkyCookerHaCardEditor);

var skycookerHaCardEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SkyCookerHaCardEditor () { return SkyCookerHaCardEditor; }
});

export { SkyCookerHaCard };
