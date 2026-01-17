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
    }
    hassSubscribe() {
        return [];
    }
    async connectedCallback() {
        super.connectedCallback();
        if (this.hass) {
            // Подписываемся на изменения состояний сущностей
            const subscriptions = this.hassSubscribe();
            this._unsubscribeFuncs = await Promise.all(subscriptions.map(subscription => subscription()));
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        // Отписываемся от всех событий при отключении
        this._unsubscribeFuncs.forEach(unsubscribe => {
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this._unsubscribeFuncs = [];
    }
    _handleEvent(ev) {
        // Обработка событий
    }
}
__decorate([
    n$1({ attribute: false })
], SubscribeMixin.prototype, "hass", void 0);

var title$1 = "Skycooker Card";
var description$1 = "A card for managing Skycooker devices.";
var progress$1 = "Progress";
var remaining$1 = "Remaining";
var min$1 = "min";
var cooking_time_progress$1 = "Cooking time";
var delayed_start$1 = "Delayed Start";
var auto_warm$1 = "Auto Warm";
var start$1 = "Start";
var stop$1 = "Stop";
var start_delayed$1 = "Start Delayed";
var delayed_launch$1 = "Delayed Launch";
var select_mode$1 = "Select Mode";
var select_additional_mode$1 = "Select Additional Mode";
var select_temperature$1 = "Temperature";
var select_hours$1 = "Hours";
var select_minutes$1 = "Minutes";
var select_delayed_start_hours$1 = "Delayed Start Hours";
var select_delayed_start_minutes$1 = "Delayed Start Minutes";
var not_configured$1 = "Not configured";
var please_configure$1 = "Please configure the card in the editor";
var additional_settings$1 = "Additional Settings";
var cooking_time_label$1 = "Cooking Time";
var total_time$1 = "Total Time";
var hours$1 = "h";
var minutes$1 = "m";
var name$1 = "Title";
var icon$1 = "Icon";
var mode$1 = "Cooking Mode";
var additional_mode$1 = "Cooking Subprogram";
var cooking_time_hours$1 = "Cooking Time (hours)";
var cooking_time_minutes$1 = "Cooking Time (minutes)";
var delayed_start_hours$1 = "Delayed Start (hours)";
var delayed_start_minutes$1 = "Delayed Start (minutes)";
var temperature$1 = "Temperature";
var cooking_temperature$1 = "Cooking Temperature";
var remaining_time$1 = "Remaining Time";
var status$1 = "Status";
var current_mode$1 = "Current Mode";
var current_additional_mode$1 = "Current Subprogram";
var selected_mode$1 = "Selected Mode";
var selected_time$1 = "Selected Time";
var auto_warm_time$1 = "Auto Warm Time";
var delayed_launch_time$1 = "Delayed Launch Time";
var preview$1 = "Preview";
var clear_selection$1 = "Clear selection";
var configuration$1 = "Configuration";
var entities$1 = "Entities";
var sensors$1 = "Sensors";
var switches$1 = "Switches";
var selects$1 = "Selects";
var buttons$1 = "Buttons";
var favorite_modes$1 = "Favorite Modes";
var all_modes$1 = "All Modes";
var standby_mode$1 = "Standby Mode";
var enTranslations = {
	title: title$1,
	description: description$1,
	"button.label": "Click me",
	progress: progress$1,
	remaining: remaining$1,
	min: min$1,
	cooking_time_progress: cooking_time_progress$1,
	delayed_start: delayed_start$1,
	auto_warm: auto_warm$1,
	start: start$1,
	stop: stop$1,
	start_delayed: start_delayed$1,
	delayed_launch: delayed_launch$1,
	select_mode: select_mode$1,
	select_additional_mode: select_additional_mode$1,
	select_temperature: select_temperature$1,
	select_hours: select_hours$1,
	select_minutes: select_minutes$1,
	select_delayed_start_hours: select_delayed_start_hours$1,
	select_delayed_start_minutes: select_delayed_start_minutes$1,
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
	standby_mode: standby_mode$1
};

var title = "Карточка SkyCooker";
var description = "Карточка для управления устройствами SkyCooker.";
var progress = "Прогресс";
var remaining = "Оставшееся время";
var min = "мин";
var cooking_time_progress = "Время приготовления";
var delayed_start = "Отложенный старт";
var auto_warm = "Авторазогрев";
var start = "Старт";
var stop = "Стоп";
var start_delayed = "Старт с задержкой";
var delayed_launch = "Отложенный запуск";
var select_mode = "Выбрать режим";
var select_additional_mode = "Выбрать дополнительный режим";
var select_temperature = "Температура";
var select_hours = "Часы";
var select_minutes = "Минуты";
var select_delayed_start_hours = "Часы отложенного старта";
var select_delayed_start_minutes = "Минуты отложенного старта";
var not_configured = "Не настроено";
var please_configure = "Пожалуйста, настройте карточку в редакторе";
var additional_settings = "Дополнительные настройки";
var cooking_time_label = "Время приготовления";
var total_time = "Общее время";
var hours = "ч";
var minutes = "м";
var name = "Заголовок";
var icon = "Иконка";
var mode = "Программа приготовления";
var additional_mode = "Подпрограмма";
var cooking_time_hours = "Время приготовления (часы)";
var cooking_time_minutes = "Время приготовления (минуты)";
var delayed_start_hours = "Время отложенного старта (часы)";
var delayed_start_minutes = "Время отложенного старта (минуты)";
var temperature = "Температура";
var cooking_temperature = "Температура приготовления";
var remaining_time = "Оставшееся время";
var status = "Статус";
var current_mode = "Текущий режим";
var current_additional_mode = "Текущая подпрограмма";
var selected_mode = "Выбранный режим";
var selected_time = "Выбранное время";
var auto_warm_time = "Время автоподогрева";
var delayed_launch_time = "Время до отложенного старта";
var preview = "Предпросмотр";
var clear_selection = "Очистить выбор";
var configuration = "Конфигурация";
var entities = "Сущности";
var sensors = "Сенсоры";
var switches = "Переключатели";
var selects = "Выпадающие списки";
var buttons = "Кнопки";
var favorite_modes = "Избранные режимы";
var all_modes = "Все режимы";
var standby_mode = "Режим ожидания";
var ruTranslations = {
	title: title,
	description: description,
	"button.label": "Нажми меня",
	progress: progress,
	remaining: remaining,
	min: min,
	cooking_time_progress: cooking_time_progress,
	delayed_start: delayed_start,
	auto_warm: auto_warm,
	start: start,
	stop: stop,
	start_delayed: start_delayed,
	delayed_launch: delayed_launch,
	select_mode: select_mode,
	select_additional_mode: select_additional_mode,
	select_temperature: select_temperature,
	select_hours: select_hours,
	select_minutes: select_minutes,
	select_delayed_start_hours: select_delayed_start_hours,
	select_delayed_start_minutes: select_delayed_start_minutes,
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
	standby_mode: standby_mode
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

let SkyCookerHaCard = class SkyCookerHaCard extends SubscribeMixin {
    constructor() {
        super(...arguments);
        this.hass = undefined;
        this._config = undefined;
        this._selectedMode = 'all'; // По умолчанию показываем все режимы
        this._selectedModeName = ''; // Отслеживаем имя нажатой кнопки режима
        this._showSelectedTime = false; // Отслеживаем, нужно ли показывать выбранное время
        this._isStartButtonPressed = false; // Отслеживаем, нажата ли кнопка старта
        this._showProgress = false; // Флаг для управления отображением прогресса
    }
    _initializeSelectedMode() {
        // Устанавливаем начальное состояние _selectedMode
        // Если есть избранные режимы, показываем их, иначе - все режимы
        this._selectedMode = this._hasFavoriteModes() ? 'favorite' : 'all';
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
            type: `custom:skycooker-ha-card`,
            name: 'SkyCooker',
            icon: 'mdi:stove',
            language: hass.language || 'ru',
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
            current_mode_entity: '',
            current_additional_mode_entity: '',
            auto_warm_time_entity: '',
            delayed_launch_time_entity: '',
            favorite_modes_entity: ''
        };
    }
    setConfig(config) {
        if (!config) {
            throw new Error('Configuration is required');
        }
        // Приводим конфигурацию к новой структуре
        const newConfig = {
            type: config.type || 'custom:skycooker-ha-card',
            name: config.name || 'SkyCooker',
            icon: config.icon || 'mdi:stove',
            language: config.language || this.hass?.language || 'ru',
            mode_entity: config.mode_entity !== undefined ? config.mode_entity : '',
            additional_mode_entity: config.additional_mode_entity !== undefined ? config.additional_mode_entity : '',
            cooking_time_hours_entity: config.cooking_time_hours_entity !== undefined ? config.cooking_time_hours_entity : '',
            cooking_time_minutes_entity: config.cooking_time_minutes_entity !== undefined ? config.cooking_time_minutes_entity : '',
            delayed_start_hours_entity: config.delayed_start_hours_entity !== undefined ? config.delayed_start_hours_entity : '',
            delayed_start_minutes_entity: config.delayed_start_minutes_entity !== undefined ? config.delayed_start_minutes_entity : '',
            auto_warm_entity: config.auto_warm_entity !== undefined ? config.auto_warm_entity : '',
            start_entity: config.start_entity !== undefined ? config.start_entity : '',
            stop_entity: config.stop_entity !== undefined ? config.stop_entity : '',
            start_delayed_entity: config.start_delayed_entity !== undefined ? config.start_delayed_entity : '',
            temperature_entity: config.temperature_entity !== undefined ? config.temperature_entity : '',
            cooking_temperature_entity: config.cooking_temperature_entity !== undefined ? config.cooking_temperature_entity : '',
            remaining_time_entity: config.remaining_time_entity !== undefined ? config.remaining_time_entity : '',
            cooking_time_entity: config.cooking_time_entity !== undefined ? config.cooking_time_entity : '',
            status_entity: config.status_entity !== undefined ? config.status_entity : '',
            current_mode_entity: config.current_mode_entity !== undefined ? config.current_mode_entity : '',
            current_additional_mode_entity: config.current_additional_mode_entity !== undefined ? config.current_additional_mode_entity : '',
            auto_warm_time_entity: config.auto_warm_time_entity !== undefined ? config.auto_warm_time_entity : '',
            delayed_launch_time_entity: config.delayed_launch_time_entity !== undefined ? config.delayed_launch_time_entity : '',
            favorite_modes_entity: config.favorite_modes_entity !== undefined ? config.favorite_modes_entity : ''
        };
        this._config = newConfig;
        this._initializeSelectedMode();
    }
    async connectedCallback() {
        super.connectedCallback();
        // Добавляем слушатель событий для изменений конфигурации из редактора
        const handleConfigChanged = (ev) => {
            const customEvent = ev;
            if (customEvent.detail && customEvent.detail.config) {
                this._config = customEvent.detail.config;
                this.requestUpdate();
            }
        };
        this.addEventListener('config-changed', handleConfigChanged);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        // Удаляем слушатель событий при отключении
        const handleConfigChanged = (ev) => {
            const customEvent = ev;
            if (customEvent.detail && customEvent.detail.config) {
                this._config = customEvent.detail.config;
                this.requestUpdate();
            }
        };
        this.removeEventListener('config-changed', handleConfigChanged);
    }
    hassSubscribe() {
        if (!this._config || !this.hass)
            return [];
        const entities = [
            this._config.mode_entity,
            this._config.additional_mode_entity,
            this._config.cooking_time_hours_entity,
            this._config.cooking_time_minutes_entity,
            this._config.delayed_start_hours_entity,
            this._config.delayed_start_minutes_entity,
            this._config.auto_warm_entity,
            this._config.start_entity,
            this._config.stop_entity,
            this._config.start_delayed_entity,
            this._config.cooking_temperature_entity,
            this._config.temperature_entity,
            this._config.remaining_time_entity,
            this._config.cooking_time_entity,
            this._config.status_entity,
            this._config.current_mode_entity,
            this._config.current_additional_mode_entity,
            this._config.auto_warm_time_entity,
            this._config.delayed_launch_time_entity,
            this._config.favorite_modes_entity,
        ].filter(entity => entity);
        return entities.map(entity => {
            return () => this.hass?.connection.subscribeEvents((event) => {
                if (event.data.entity_id === entity) {
                    this._handleStateChange(event);
                }
            }, 'state_changed');
        });
    }
    _handleStateChange(event) {
        // Обновляем интерфейс
        this.requestUpdate();
        // Проверяем, изменилось ли состояние сущности, связанной с кнопкой "Старт"
        if (this._config?.start_entity && event.data.entity_id === this._config.start_entity) {
            // Сбрасываем состояние кнопки "Старт" при изменении состояния
            this._isStartButtonPressed = false;
        }
    }
    render() {
        if (!this._config || !this.hass) {
            return x ``;
        }
        // Проверяем, есть ли хотя бы один настроенный entity
        const hasAnyEntity = this._config.mode_entity ||
            this._config.additional_mode_entity ||
            this._config.cooking_time_hours_entity ||
            this._config.cooking_time_minutes_entity ||
            this._config.delayed_start_hours_entity ||
            this._config.delayed_start_minutes_entity ||
            this._config.auto_warm_entity ||
            this._config.start_entity ||
            this._config.stop_entity ||
            this._config.start_delayed_entity ||
            this._config.cooking_temperature_entity ||
            this._config.temperature_entity ||
            this._config.remaining_time_entity ||
            this._config.cooking_time_entity ||
            this._config.status_entity ||
            this._config.current_mode_entity ||
            this._config.current_additional_mode_entity ||
            this._config.auto_warm_time_entity ||
            this._config.delayed_launch_time_entity ||
            this._config.favorite_modes_entity;
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
        // Используем компактный дизайн
        return this._renderDesign();
    }
    _renderDesign() {
        // Получаем первую доступную сущность для отображения состояния
        const firstEntity = this._config.mode_entity ||
            this._config.cooking_temperature_entity ||
            this._config.temperature_entity ||
            this._config.auto_warm_entity ||
            this._config.start_entity;
        const firstEntityState = firstEntity ? this.hass?.states[firstEntity] : null;
        // Use cooking_temperature_entity if available, otherwise fall back to temperature_entity
        const temperatureEntity = this._config.cooking_temperature_entity || this._config.temperature_entity;
        return x `
 <ha-card class="new-design">
   <!-- Compact Header -->
   <div class="new-header">
     <div class="new-icon">
       <ha-icon .icon="${this._config.icon || 'mdi:stove'}"></ha-icon>
     </div>
     <div class="new-summary">
       <div class="new-name">
         ${this._config.name || 'SkyCooker'}
       </div>
     </div>
     <div class="new-status-indicator">
       ${firstEntityState?.state === 'on' ? x `<ha-icon icon="mdi:circle" style="color: var(--success-color);"></ha-icon>` :
            firstEntityState?.state === 'off' ? x `<ha-icon icon="mdi:circle" style="color: var(--error-color);"></ha-icon>` : ''}
     </div>
   </div>
   
   <!-- Main Controls Grid -->
   <div class="new-controls-grid">
      <!-- Temperature and Time -->
      <div class="new-control-group">
        ${this._shouldShowTemperature() ? x `
          <div class="new-control-item">
            <ha-icon icon="mdi:thermometer" class="new-control-icon"></ha-icon>
            <div class="new-control-content">
              <div class="new-control-label">${this._t('temperature')}</div>
              <div class="new-control-value">${this._getEntityState(temperatureEntity)}°C</div>
            </div>
          </div>
        ` : ''}
        
        <!-- Debug: Always show temperature entity info -->
        ${temperatureEntity ? x `
          <div style="display: none;" id="main-temperature-debug">
            Temperature entity configured: ${temperatureEntity}<br>
            Current temperature state: ${this._getEntityState(temperatureEntity)}
          </div>
        ` : ''}
        
        <!-- Time Sensors Container with flexible layout -->
        <div class="new-time-sensors-container">
          <!-- First row for time sensors -->
          <div class="new-time-sensors-row">
            <div class="new-control-item">
              <div class="new-control-label">${this._t('remaining')}</div>
              <div class="new-control-icon-value">
                <ha-icon icon="mdi:timer" class="new-control-icon"></ha-icon>
                <div class="new-control-value">${this._getEntityState(this._config.remaining_time_entity)}</div>
              </div>
            </div>
            
            <div class="new-control-item">
              <div class="new-control-label">${this._t('cooking_time_label')}</div>
              <div class="new-control-icon-value">
                <ha-icon icon="mdi:clock" class="new-control-icon"></ha-icon>
                <div class="new-control-value">${this._getEntityState(this._config.cooking_time_entity)}</div>
              </div>
            </div>
          </div>
          
          <!-- Second row for conditional time sensors -->
          <div class="new-time-sensors-row">
            <!-- Auto Warm Time Sensor -->
            ${this._shouldShowAutoWarmTime() ? x `
              <div class="new-control-item">
                <div class="new-control-label">${this._t('auto_warm_time')}</div>
                <div class="new-control-icon-value">
                  <ha-icon icon="mdi:clock-start" class="new-control-icon"></ha-icon>
                  <div class="new-control-value">${this._getEntityState(this._config.auto_warm_time_entity)}</div>
                </div>
              </div>
            ` : ''}
            
            <!-- Delayed Launch Time Sensor -->
            ${this._shouldShowDelayedLaunchTime() ? x `
              <div class="new-control-item">
                <div class="new-control-label">${this._t('delayed_launch')}</div>
                <div class="new-control-icon-value">
                  <ha-icon icon="mdi:timer-sand" class="new-control-icon"></ha-icon>
                  <div class="new-control-value">${this._getEntityState(this._config.delayed_launch_time_entity)}</div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        </div>
        
        <!-- Mode Selection -->
        <div class="new-control-group">
          <div class="new-mode-selector">
            <div class="new-mode-label" style="text-align: center;">${this._t('status')}: ${this._getEntityState(this._config.current_mode_entity)} - ${this._getEntityState(this._config.status_entity)}</div>
            <!-- Selected mode display - always shown -->
            <div class="new-selected-mode">
              ${this._t('selected_mode')}: <span class="selected-mode-text">${this._selectedModeName || '-----'}</span>
            </div>
            <!-- Selected time display - always shown -->
            <div class="new-selected-time">
              ${this._t('selected_time')}: <span class="selected-time-text">${this._getSelectedTime() || '-----'}</span>
            </div>
            
            ${this._config.mode_entity ? x `
              <!-- Hidden select that syncs with integration -->
              <ha-select
                class="new-mode-hidden-select"
                .value=${this._getEntityState(this._config.mode_entity)}
                @selected=${(ev) => this._handleSelectChange(this._config.mode_entity, ev)}
                @closed=${(ev) => ev.stopPropagation()}
              >
                ${this._getSelectOptions(this._config.mode_entity)}
              </ha-select>
              
              <!-- Tabs for favorite and all modes -->
              ${this._hasFavoriteModes() ? x `
                <div class="new-mode-tabs">
                  <div class="new-mode-tab ${this._selectedMode === 'favorite' ? 'active' : ''}" @click=${() => this._showFavoriteModes()}>${this._t('favorite_modes')}</div>
                  <div class="new-mode-tab ${this._selectedMode === 'all' ? 'active' : ''}" @click=${() => this._showAllModes()}>${this._t('all_modes')}</div>
                </div>
              ` : ''}
              
              <div class="new-mode-buttons">
                ${this._selectedMode === 'favorite' ?
            this._getFavoriteModeButtons(this._config.mode_entity) :
            this._getModeButtons(this._config.mode_entity)}
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Auto Warm Time Sensor moved to main controls -->
        ${this._shouldShowAutoWarmTime() ? x `
          <div class="new-control-item">
            <ha-icon icon="mdi:clock-start" class="new-control-icon"></ha-icon>
            <div class="new-control-content">
              <div class="new-control-label">${this._t('auto_warm_time')}</div>
              <div class="new-control-value">${this._getEntityState(this._config.auto_warm_time_entity)}</div>
            </div>
          </div>
        ` : ''}
   </div>
   
   <!-- Action Buttons in compact layout -->
   <div class="new-action-buttons">
     ${this._config.start_entity ? x `
       <ha-button
         @click=${() => this._handleButtonPress(this._config.start_entity)}
         class="new-action-button"
         .label=${this._t('start')}
       >
         <ha-icon icon="mdi:play"></ha-icon>
       </ha-button>
     ` : ''}
     
     ${this._config.stop_entity ? x `
       <ha-button
         @click=${() => this._handleButtonPress(this._config.stop_entity)}
         class="new-action-button"
         .label=${this._t('stop')}
       >
         <ha-icon icon="mdi:stop"></ha-icon>
       </ha-button>
     ` : ''}
     
     ${this._config.start_delayed_entity ? x `
       <ha-button
         @click=${() => this._handleButtonPress(this._config.start_delayed_entity)}
         class="new-action-button"
         .label=${this._t('start_delayed')}
       >
         <ha-icon icon="mdi:timer-play"></ha-icon>
       </ha-button>
     ` : ''}
   </div>
   
   <!-- Additional Controls (collapsible) -->
<div class="new-additional-controls">
 <div class="new-section-header" @click=${() => this._toggleAdditionalControls()}>
 <ha-icon icon="mdi:cog"></ha-icon>
 <span>${this._t('additional_settings')}</span>
 <ha-icon icon="mdi:chevron-down" class="new-expand-icon"></ha-icon>
</div>
     
     <div class="new-additional-content" style="display: none;">
       <!-- Auto Warm with Time -->
       ${this._config.auto_warm_entity ? x `
         <div class="new-auto-warm-section">
           <div class="new-auto-warm-header">
             <ha-icon icon="mdi:heat-wave"></ha-icon>
             <span class="new-auto-warm-label">${this._t('auto_warm')}</span>
             <ha-switch
               .checked=${this._getEntityState(this._config.auto_warm_entity) === 'on'}
               @change=${(ev) => this._handleSwitchChange(this._config.auto_warm_entity, ev.target.checked)}
             ></ha-switch>
           </div>
         </div>
       ` : ''}
       
       <!-- Temperature Select (hidden secondary option) -->
       ${this._config.cooking_temperature_entity || this._config.temperature_entity ? x `
         <div class="new-temperature-section">
           <div class="new-temperature-header">
             <ha-icon icon="mdi:thermometer"></ha-icon>
             <span class="new-temperature-label">${this._t('temperature')}</span>
           </div>
           <div class="new-temperature-select-container">
             <ha-select
               class="new-temperature-hidden-select"
               .value=${this._getEntityState(this._config.cooking_temperature_entity || this._config.temperature_entity)}
               @selected=${(ev) => this._handleSelectChange(this._config.cooking_temperature_entity || this._config.temperature_entity, ev)}
               @closed=${(ev) => ev.stopPropagation()}
             >
               ${this._getTemperatureOptionsWithFallback()}
             </ha-select>
           </div>
         </div>
       ` : ''}
       
       <!-- Debug info for temperature select -->
       ${this._config.cooking_temperature_entity || this._config.temperature_entity ? x `
         <div style="display: none;" id="temperature-debug-info">
           Temperature Entity: ${this._config.cooking_temperature_entity || this._config.temperature_entity}<br>
           Current State: ${this._getEntityState(this._config.cooking_temperature_entity || this._config.temperature_entity)}<br>
           Options Count: ${this._getSelectOptions(this._config.cooking_temperature_entity || this._config.temperature_entity).length}
         </div>
       ` : ''}
       
       <!-- Cooking Time Section -->
       ${this._config.cooking_time_hours_entity && this._config.cooking_time_minutes_entity ? x `
         <div class="new-cooking-time-section">
           <div class="new-cooking-time-header">
             <ha-icon icon="mdi:clock"></ha-icon>
             <span class="new-cooking-time-label">${this._t('cooking_time_label')}</span>
           </div>
           <div class="new-cooking-time-controls">
             <ha-select
               .value=${this._getEntityState(this._config.cooking_time_hours_entity)}
               @selected=${(ev) => this._handleSelectChange(this._config.cooking_time_hours_entity, ev)}
               @closed=${(ev) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.cooking_time_hours_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('hours')} </span>
             <ha-select
               .value=${this._getEntityState(this._config.cooking_time_minutes_entity)}
               @selected=${(ev) => this._handleSelectChange(this._config.cooking_time_minutes_entity, ev)}
               @closed=${(ev) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.cooking_time_minutes_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('minutes')}</span>
           </div>
         </div>
       ` : ''}
       
       <!-- Delayed Start Section -->
       ${this._config.delayed_start_hours_entity && this._config.delayed_start_minutes_entity ? x `
         <div class="new-cooking-time-section">
           <div class="new-cooking-time-header">
             <ha-icon icon="mdi:timer-sand"></ha-icon>
             <span class="new-cooking-time-label">${this._t('delayed_start')}</span>
           </div>
           <div class="new-cooking-time-controls">
             <ha-select
               .value=${this._getEntityState(this._config.delayed_start_hours_entity)}
               @selected=${(ev) => this._handleSelectChange(this._config.delayed_start_hours_entity, ev)}
               @closed=${(ev) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.delayed_start_hours_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('hours')} </span>
             <ha-select
               .value=${this._getEntityState(this._config.delayed_start_minutes_entity)}
               @selected=${(ev) => this._handleSelectChange(this._config.delayed_start_minutes_entity, ev)}
               @closed=${(ev) => ev.stopPropagation()}
             >
               ${this._getSelectOptions(this._config.delayed_start_minutes_entity)}
             </ha-select>
             <span class="new-time-unit"> ${this._t('minutes')}</span>
           </div>
         </div>
       ` : ''}
          <!-- Delayed Start Time Sensor (removed from additional controls as it's now in main controls) -->
     </div>
   </div>
   
 </ha-card>
`;
    }
    _toggleAdditionalControls() {
        const content = this.shadowRoot?.querySelector('.new-additional-content');
        const icon = this.shadowRoot?.querySelector('.new-expand-icon');
        if (content && icon) {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.setAttribute('icon', 'mdi:chevron-up');
            }
            else {
                content.style.display = 'none';
                icon.setAttribute('icon', 'mdi:chevron-down');
            }
        }
    }
    _getEntityState(entityId) {
        if (!entityId || !this.hass)
            return 'N/A';
        const state = this.hass.states[entityId]?.state || 'N/A';
        return state;
    }
    _getTemperatureOptionsWithFallback() {
        // Special method for temperature select with enhanced fallback logic
        // Use cooking_temperature_entity if available, otherwise fall back to temperature_entity
        const temperatureEntity = this._config.cooking_temperature_entity || this._config.temperature_entity;
        if (!temperatureEntity) {
            return [];
        }
        // Debug: Check if hass is available
        if (!this.hass) {
            return [];
        }
        // Debug: Check if entity exists in hass
        if (!this.hass.states[temperatureEntity]) {
            return [];
        }
        // Debug: Check entity state
        const stateObj = this.hass.states[temperatureEntity];
        // Debug: Check if attributes exist
        if (!stateObj.attributes) {
            return [];
        }
        // Debug: Check all possible attribute names for temperature options
        const possibleAttributeNames = ['options', 'temperature_options', 'values', 'list', 'temperature_values', 'temperature_list', 'temp_options', 'temp_values'];
        // First try the standard method
        const standardOptions = this._getSelectOptions(temperatureEntity);
        if (standardOptions && standardOptions.length > 0) {
            return standardOptions;
        }
        // If no options found, try to get state object directly
        // Use the stateObj we already have
        // Try different attribute names for temperature options (reuse the same array)
        for (const attrName of possibleAttributeNames) {
            if (stateObj.attributes && stateObj.attributes[attrName]) {
                let options = stateObj.attributes[attrName];
                // If options is not an array, try to convert it
                if (!Array.isArray(options)) {
                    if (typeof options === 'object' && options !== null) {
                        options = Object.values(options);
                    }
                    else if (typeof options === 'string') {
                        options = options.split(',').map((item) => item.trim());
                    }
                }
                // Filter out invalid options
                const filteredOptions = options.filter(option => option !== 'unknown' && option !== '' && option !== null && option !== undefined);
                if (filteredOptions.length > 0) {
                    return filteredOptions.map((option) => x `
           <mwc-list-item value=${option}>${option}</mwc-list-item>
         `);
                }
            }
        }
        // Try to get temperature options from state object directly
        if (stateObj.attributes) {
            const allOptions = [];
            // Look for any attribute that might contain temperature values
            for (const [key, value] of Object.entries(stateObj.attributes)) {
                if (typeof value === 'string' && (value.includes('°C') || value.includes('C') || !isNaN(Number(value)))) {
                    allOptions.push(value);
                }
                else if (Array.isArray(value)) {
                    const filtered = value.filter(item => typeof item === 'string' && item !== 'unknown' && item !== '');
                    allOptions.push(...filtered);
                }
            }
            if (allOptions.length > 0) {
                return allOptions.map((option) => x `
        <mwc-list-item value=${option}>${option}</mwc-list-item>
      `);
            }
        }
        // Return default temperature options as last resort
        const defaultTemperatures = ['50', '60', '70', '80', '90', '100'];
        return defaultTemperatures.map((temp) => x `
     <mwc-list-item value=${temp}>${temp}°C</mwc-list-item>
   `);
    }
    _shouldShowTemperature() {
        // Показывать температуру только если выбран режим "Мультиповар" и идёт процесс
        const currentMode = this._getEntityState(this._config.current_mode_entity);
        const status = this._getEntityState(this._config.status_entity);
        // Проверяем, что режим "Мультиповар" и статус указывает на активный процесс
        const result = currentMode === 'Мультиповар' &&
            (status === 'on' || status === 'heating' || status === 'delayed_start');
        return result;
    }
    _calculateProgress() {
        if (!this._config || !this.hass)
            return 100;
        const status = this._getEntityState(this._config.status_entity);
        const remainingTime = this._getEntityState(this._config.remaining_time_entity);
        const cookingTime = this._getEntityState(this._config.cooking_time_entity);
        // Проверяем статус - прогресс отображается только для "Разогрев" и "Готовка" (или "Warming" и "Cooking")
        const validStatuses = ['Разогрев', 'Готовка', 'Warming', 'Cooking'];
        if (!validStatuses.includes(status)) {
            return 100; // Значение по умолчанию
        }
        if (remainingTime === 'N/A' || cookingTime === 'N/A')
            return 100;
        const remaining = parseFloat(remainingTime);
        const cooking = parseFloat(cookingTime);
        if (isNaN(remaining) || isNaN(cooking) || cooking === 0)
            return 100;
        // Рассчитываем прогресс: (осталось / общее) * 100, шкала уменьшается
        const progress = (remaining / cooking) * 100;
        return Math.round(progress);
    }
    _shouldShowProgress() {
        // Показывать прогресс только для статусов "Разогрев" и "Готовка" (или "Warming" и "Cooking")
        const status = this._getEntityState(this._config.status_entity);
        const validStatuses = ['Разогрев', 'Готовка', 'Warming', 'Cooking'];
        return validStatuses.includes(status) && this._showProgress;
    }
    _shouldShowAutoWarmTime() {
        // Показывать время авторазогрева только для статусов "Подогрев" или "Auto Warm"
        const status = this._getEntityState(this._config.status_entity);
        const validStatuses = ['Подогрев', 'Auto Warm'];
        return validStatuses.includes(status) && !!this._config.auto_warm_time_entity;
    }
    _shouldShowDelayedLaunchTime() {
        // Показывать время отложенного запуска только для статусов "Отложенный старт" или "Delayed Launch"
        const status = this._getEntityState(this._config.status_entity);
        const validStatuses = ['Отложенный старт', 'Delayed Launch'];
        return validStatuses.includes(status) && !!this._config.delayed_launch_time_entity;
    }
    _shouldShowSelectedMode() {
        // Показывать нажатую кнопку режима
        if (!this._config?.mode_entity || !this.hass || !this._selectedModeName)
            return false;
        // Проверяем, что выбранный режим не является режимом ожидания
        const standbyModes = ['Нет', 'Режим ожидания', 'None', 'Standby Mode', ''];
        if (standbyModes.includes(this._selectedModeName))
            return false;
        // Показываем нажатую кнопку независимо от текущего режима
        return true;
    }
    _shouldShowSelectedTime() {
        // Показывать выбранное время только если кнопка режима была нажата и есть данные о времени приготовления
        if (!this._showSelectedTime || !this._config?.cooking_time_hours_entity || !this._config?.cooking_time_minutes_entity || !this.hass)
            return false;
        const hours = this._getEntityState(this._config.cooking_time_hours_entity);
        const minutes = this._getEntityState(this._config.cooking_time_minutes_entity);
        // Показываем время, если хотя бы одно из значений не равно 'N/A' или пусто
        return (hours !== 'N/A' && hours !== '') || (minutes !== 'N/A' && minutes !== '');
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
    _hasFavoriteModes() {
        // Проверяем, добавлена ли сущность favorite_modes_entity
        if (!this._config?.favorite_modes_entity) {
            return false;
        }
        // Если hass недоступен, но сущность задана, возвращаем true
        if (!this.hass) {
            return true;
        }
        const favoriteModesState = this.hass.states[this._config.favorite_modes_entity];
        if (!favoriteModesState || !favoriteModesState.attributes) {
            return false;
        }
        // Проверяем наличие атрибута options
        let favoriteModes = [];
        // Пробуем получить options из разных возможных атрибутов
        if (favoriteModesState.attributes.options) {
            favoriteModes = favoriteModesState.attributes.options;
        }
        else if (favoriteModesState.attributes.list) {
            // Некоторые сущности могут использовать 'list' вместо 'options'
            favoriteModes = favoriteModesState.attributes.list;
        }
        else if (favoriteModesState.attributes.favorite_modes) {
            // Прямой атрибут с избранными режимами
            favoriteModes = favoriteModesState.attributes.favorite_modes;
        }
        else if (favoriteModesState.attributes.modes) {
            // Атрибут с режимами
            favoriteModes = favoriteModesState.attributes.modes;
        }
        else if (favoriteModesState.attributes.favoriteModes) {
            // Прямой атрибут с избранными режимами (с большой буквы)
            favoriteModes = favoriteModesState.attributes.favoriteModes;
        }
        else if (favoriteModesState.attributes.favorites) {
            // Атрибут с избранными режимами
            favoriteModes = favoriteModesState.attributes.favorites;
        }
        else if (favoriteModesState.attributes.favorite_list) {
            // Атрибут с избранными режимами
            favoriteModes = favoriteModesState.attributes.favorite_list;
        }
        // Если массив избранных режимов пуст или не содержит валидных элементов, возвращаем false
        if (!favoriteModes || favoriteModes.length === 0) {
            return false;
        }
        // Фильтруем пустые и невалидные элементы
        const filteredModes = favoriteModes.filter(mode => mode && typeof mode === 'string' && mode.trim() !== '');
        // Если после фильтрации нет элементов, возвращаем false
        if (filteredModes.length === 0) {
            return false;
        }
        // Если сущность задана и опций больше 0, возвращаем true
        return true;
    }
    _getSelectOptions(entityId) {
        if (!entityId || !this.hass) {
            return [];
        }
        const stateObj = this.hass.states[entityId];
        if (!stateObj) {
            return [];
        }
        if (!stateObj.attributes) {
            return [];
        }
        if (!stateObj.attributes.options) {
            // Try to get options from other possible attributes for temperature entities
            if (stateObj.attributes.temperature_options) {
                stateObj.attributes.options = stateObj.attributes.temperature_options;
            }
            else if (stateObj.attributes.values) {
                stateObj.attributes.options = stateObj.attributes.values;
            }
            else if (stateObj.attributes.list) {
                stateObj.attributes.options = stateObj.attributes.list;
            }
            else {
                return [];
            }
        }
        // Фильтруем 'unknown' и режимы ожидания из опций для режима готовки
        const filteredOptions = stateObj.attributes.options.filter((option) => option !== 'unknown' && option !== 'Нет' && option !== 'Режим ожидания' &&
            option !== 'None' && option !== 'Standby Mode' && option !== '');
        // Ensure we have valid options
        if (!filteredOptions || filteredOptions.length === 0) {
            return [];
        }
        return filteredOptions.map((option) => x `
     <mwc-list-item value=${option}>${option}</mwc-list-item>
   `);
    }
    _getModeButtons(entityId) {
        if (!entityId || !this.hass)
            return [];
        const stateObj = this.hass.states[entityId];
        if (!stateObj || !stateObj.attributes || !stateObj.attributes.options) {
            return [];
        }
        this._getEntityState(entityId);
        // Фильтруем ненужные режимы, включая 'unknown'
        const filteredOptions = stateObj.attributes.options.filter((option) => option !== 'Нет' && option !== 'Режим ожидания' &&
            option !== 'None' && option !== 'Standby Mode' &&
            option !== '' && option !== 'unknown');
        return filteredOptions.map((option) => {
            switch (option.toLowerCase()) {
                            }
            return x `
        <div class="new-mode-button-wrapper">
          <ha-button
            class="new-mode-button"
            @click=${() => this._handleModeButtonClick(entityId, option)}
          >
            <span class="mode-button-text">${option}</span>
          </ha-button>
        </div>
      `;
        });
    }
    _getFavoriteModes() {
        // Получаем список избранных режимов
        if (!this._config?.favorite_modes_entity || !this.hass)
            return [];
        const favoriteModesState = this.hass.states[this._config.favorite_modes_entity];
        if (!favoriteModesState || !favoriteModesState.attributes) {
            return [];
        }
        // Пробуем получить options из разных возможных атрибутов
        let favoriteModes = [];
        if (favoriteModesState.attributes.options) {
            favoriteModes = favoriteModesState.attributes.options;
        }
        else if (favoriteModesState.attributes.list) {
            // Некоторые сущности могут использовать 'list' вместо 'options'
            favoriteModes = favoriteModesState.attributes.list;
        }
        else if (favoriteModesState.attributes.favorite_modes) {
            // Прямой атрибут с избранными режимами
            favoriteModes = favoriteModesState.attributes.favorite_modes;
        }
        else if (favoriteModesState.attributes.modes) {
            // Атрибут с режимами
            favoriteModes = favoriteModesState.attributes.modes;
        }
        // Дополнительная проверка: если favoriteModes не является массивом, пытаемся преобразовать
        if (!Array.isArray(favoriteModes)) {
            if (typeof favoriteModes === 'object' && favoriteModes !== null) {
                // Если это объект, пытаемся извлечь значения
                favoriteModes = Object.values(favoriteModes);
            }
            else if (typeof favoriteModes === 'string') {
                // Если это строка, пытаемся разделить её
                favoriteModes = favoriteModes.split(',').map(item => item.trim());
            }
        }
        // Фильтруем пустые и невалидные элементы
        const filteredModes = favoriteModes.filter(mode => mode && typeof mode === 'string' && mode.trim() !== '');
        return filteredModes;
    }
    _getFavoriteModeButtons(entityId) {
        // Получаем кнопки только для избранных режимов
        const favoriteModes = this._getFavoriteModes();
        if (favoriteModes.length === 0)
            return [];
        // Фильтруем режимы ожидания из избранных режимов
        const filteredFavoriteModes = favoriteModes.filter((option) => option !== 'Нет' && option !== 'Режим ожидания' &&
            option !== 'None' && option !== 'Standby Mode' &&
            option !== '' && option !== 'unknown');
        if (filteredFavoriteModes.length === 0)
            return [];
        this._getEntityState(entityId);
        return filteredFavoriteModes.map((option) => {
            switch (option.toLowerCase()) {
                            }
            return x `
        <div class="new-mode-button-wrapper">
          <ha-button
            class="new-mode-button"
            @click=${() => this._handleModeButtonClick(entityId, option)}
          >
            <span class="mode-button-text">${option}</span>
          </ha-button>
        </div>
      `;
        });
    }
    _showFavoriteModes() {
        // Устанавливаем флаг для отображения избранных режимов
        this._selectedMode = 'favorite';
        this.requestUpdate();
    }
    _showAllModes() {
        // Устанавливаем флаг для отображения всех режимов
        this._selectedMode = 'all';
        this.requestUpdate();
    }
    _handleModeButtonClick(entityId, option) {
        if (!this._config || !this.hass || !entityId)
            return;
        try {
            // Устанавливаем выбранный режим как нажатую кнопку
            this._selectedModeName = option; // Используем новую переменную для имени режима
            this._showSelectedTime = true; // Показываем выбранное время при нажатии кнопки режима
            this.requestUpdate();
            // Находим скрытый селект и программно устанавливаем значение
            const hiddenSelect = this.shadowRoot?.querySelector('.new-mode-hidden-select');
            if (hiddenSelect) {
                hiddenSelect.value = option;
                // Диспатчим событие selected, чтобы триггернуть обновление
                const event = new CustomEvent('selected', {
                    detail: { value: option },
                    bubbles: true,
                    composed: true
                });
                hiddenSelect.dispatchEvent(event);
            }
        }
        catch (error) {
            // Тихая обработка ошибок
        }
    }
    _handleSelectChange(entityId, ev) {
        if (!this._config || !this.hass || !entityId)
            return;
        // Извлекаем значение из события
        // Для ha-select значение может быть в ev.detail.value
        // Для mwc-list-item значение может быть в ev.target.selected
        let value = ev?.detail?.value;
        // Если нет в detail, пробуем получить из selected элемента
        if (!value && ev?.target?.selected) {
            value = ev.target.selected.value;
        }
        // Если всё еще нет значения, пробуем получить из текущего состояния сущности
        if (!value) {
            value = this._getEntityState(entityId);
        }
        if (!value) {
            return;
        }
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
        // Проверяем, является ли entityId сущностью для кнопки "Стоп"
        if (entityId === this._config.stop_entity) {
            // Устанавливаем пустую строку для select.skycooker_rmc_m40s_rezhim_gotovki
            const modeEntity = this._config.mode_entity;
            if (modeEntity) {
                // Убедимся, что устанавливаем пустую строку, а не 'unknown'
                let optionToSet = this._t('standby_mode');
                if (this._getEntityState(modeEntity) === 'unknown') {
                    optionToSet = this._t('standby_mode');
                }
                this.hass.callService('select', 'select_option', {
                    entity_id: modeEntity,
                    option: optionToSet
                });
            }
            // Сбрасываем состояние кнопки "Старт"
            this._isStartButtonPressed = false;
            // Скрываем прогресс-бар при нажатии на кнопку "Стоп"
            this._showProgress = false;
        }
        // Проверяем, является ли entityId сущностью для кнопки "Старт"
        if (entityId === this._config.start_entity) {
            // Проверяем состояние select.skycooker_rmc_m40s_vremia_otlozhennogo_starta_chasy
            const delayedStartHoursEntity = this._config.delayed_start_hours_entity;
            if (delayedStartHoursEntity) {
                const currentState = this._getEntityState(delayedStartHoursEntity);
                // Если состояние 'unknown', заменяем на '0'
                if (currentState === 'unknown') {
                    this.hass.callService('select', 'select_option', {
                        entity_id: delayedStartHoursEntity,
                        option: '0'
                    });
                }
            }
            // Проверяем состояние select.skycooker_rmc_m40s_vremia_otlozhennogo_starta_minuty
            const delayedStartMinutesEntity = this._config.delayed_start_minutes_entity;
            if (delayedStartMinutesEntity) {
                const currentState = this._getEntityState(delayedStartMinutesEntity);
                // Если состояние 'unknown', заменяем на '0'
                if (currentState === 'unknown') {
                    this.hass.callService('select', 'select_option', {
                        entity_id: delayedStartMinutesEntity,
                        option: '0'
                    });
                }
            }
            // Обновляем состояние кнопки "Старт"
            this._isStartButtonPressed = false;
            this.requestUpdate();
        }
        this.hass.callService('button', 'press', {
            entity_id: entityId
        });
    }
    static get styles() {
        return i$2 `
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
        border-bottom: 1px solid var(--divider-color);
      }
      .header .icon {
        font-size: 48px;
        color: var(--primary-color);
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
        color: var(--secondary-text-color);
      }
      .main-status {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
       gap: 12px;
       margin: 10px 0;
     }
      .status-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .status-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        flex: 1;
      }
      .status-value {
        font-size: 16px;
        font-weight: bold;
      }
      .mode-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .mode-controls {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      .mode-label {
        font-size: 16px;
        font-weight: bold;
      }
      .mode-value {
        font-size: 18px;
        color: var(--primary-color);
      }
      .controls-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .control-group {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      .control-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .delayed-start-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .section-title {
        font-size: 16px;
        font-weight: bold;
      }
      .switches-section {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .switch-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .switch-label {
        font-size: 14px;
      }
      .action-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      ha-select {
        min-width: 120px;
      }
      ha-button {
        --mdc-theme-primary: var(--primary-color);
        --mdc-theme-secondary: var(--secondary-color);
      }
      .progress-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 8px;
      }
      .progress-label {
        font-size: 16px;
        font-weight: bold;
      }
      .progress-bar {
        width: 100%;
        height: 20px;
        background-color: var(--divider-color);
        border-radius: 10px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background-color: var(--primary-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        transition: width 0.3s ease;
      }
      .setup-message {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 16px;
      }
      
      /* New Design Styles - Mushroom-inspired */
      ha-card.new-design {
        padding: 12px;
        gap: 12px;
        background: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 16px);
        box-shadow: var(--ha-card-box-shadow, 0px 2px 8px rgba(0,0,0,0.1));
        overflow: hidden;
      }
      
      .new-header {
       display: flex;
       flex-direction: column;
       align-items: center;
       gap: 8px;
       padding: 8px 0;
       border-bottom: 1px solid var(--divider-color);
     }
      
      .new-icon {
        font-size: 36px;
        color: var(--primary-color);
      }
      
      .new-summary {
       display: flex;
       flex-direction: column;
       align-items: center;
       text-align: center;
     }
      
      .new-name {
        font-size: 20px;
        font-weight: bold;
      }
      
      .new-state {
        font-size: 14px;
        color: var(--secondary-text-color);
      }
      
      .new-status-indicator {
        font-size: 20px;
      }
      
      .new-progress {
        margin: 8px 0;
      }
      
      .new-progress-bar {
        width: 100%;
        height: 16px;
        background-color: var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }
      
      .new-progress-fill {
        height: 100%;
        background-color: var(--primary-color);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        transition: width 0.3s ease;
      }
      
      .new-controls-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .new-control-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 12px;
        border: 1px solid var(--divider-color);
      }
      
      .new-control-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .new-control-icon {
        font-size: 20px;
        color: var(--primary-color);
      }
      
      .new-control-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .new-control-label {
        font-size: 15px;
        color: var(--secondary-text-color);
      }
      
      .new-control-value {
        font-size: 16px;
        font-weight: bold;
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
        font-size: 14px;
        font-weight: bold;
      }
      
      .new-mode-value {
        font-size: 16px;
        color: var(--primary-color);
        font-weight: bold;
      }
      
      .new-mode-values {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }
      
      .new-selected-mode {
        font-size: 15px;
        color: var(--secondary-text-color);
        text-align: center;
        font-family: 'Arial', sans-serif;
        font-weight: bold;
      }
          
      .selected-mode-text {
        font-size: 15px;
        font-weight: bold;
        color: var(--primary-color);
        margin-left: 4px;
        font-family: 'Arial', sans-serif;
      }
          
      .new-selected-time {
        font-size: 15px;
        color: var(--secondary-text-color);
        text-align: center;
        min-height: 20px; /* Reserve space to prevent layout shift */
        font-family: 'Arial', sans-serif;
        font-weight: bold;
      }
          
      .selected-time-text {
        font-size: 15px;
        font-weight: bold;
        color: var(--primary-color);
        margin-left: 4px;
        font-family: 'Arial', sans-serif;
      }
      
      .new-mode-select {
        min-width: 120px;
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        --mdc-menu-min-width: 120px;
        border-radius: 8px;
        background-color: var(--card-background-color);
        height: 36px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        border: none;
      }
      
      /* Hidden mode select - completely invisible but functional */
      .new-mode-hidden-select {
        display: none;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        border: none;
        pointer-events: none;
      }
      
      /* Mode tabs container */
      .new-mode-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
        justify-content: center;
      }
      
      .new-mode-tab {
        padding: 8px 16px;
        background-color: var(--card-background-color);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.2s ease;
        border: 1px solid var(--divider-color);
      }
      
      .new-mode-tab.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
      
      .new-mode-tab:hover {
        background-color: var(--card-background-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      /* Mode buttons container */
      .new-mode-buttons {
       display: flex;
       flex-wrap: wrap;
       gap: 4px;
       margin-top: 4px;
     }
      
      /* Mode buttons container */
      .new-mode-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0px;
        margin-top: 0px;
        justify-content: center;
      }
      
      /* Mode button wrapper for consistent sizing */
      .new-mode-button-wrapper {
       flex: 1 1 calc(50% - 8px);
       min-width: 120px;
       max-width: 200px;
       display: flex;
       justify-content: center;
     }

      /* Mode button styling */
      .new-mode-button {
       --mdc-theme-primary: var(--primary-color);
       --mdc-theme-secondary: var(--secondary-color);
       border-radius: 8px;
       padding: 4px 10px;
       font-size: 14px;
       background-color: var(--card-background-color);
       border: none;
       transition: all 0.2s ease;
       display: flex;
       align-items: center;
       justify-content: center;
       width: 100%;
       min-width: 120px;
       max-width: 200px;
       white-space: normal;
       word-wrap: break-word;
     }

      .new-mode-button .mode-button-text {
       font-size: 15px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       max-width: 100%;
     }
      
      /* Mode button hover effect */
      .new-mode-button:hover {
        background-color: var(--card-background-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .new-mode-select .mdc-select__anchor {
        border-radius: 12px !important;
      }
      
      .new-action-buttons {
       display: flex;
       justify-content: center;
       gap: 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin-top: -10px;
       margin-bottom: -30px;
     }
      
      .new-action-button {
       --mdc-theme-primary: var(--primary-color);
       --mdc-theme-secondary: var(--secondary-color);
       border-radius: 50%;
       width: 72px;
       height: 72px;
       padding: 0;
       display: flex;
       align-items: center;
       justify-content: center;
       position: relative;
       background-color: var(--card-background-color);
       transition: all 0.2s ease;
     }

        .new-action-button ha-icon {
          width: 32px;
          height: 32px;
          opacity: 1;
          filter: brightness(1);
          font-size: 32px;
        }

      .new-action-button.pressed {
        background-color: var(--card-background-color);
        box-shadow: none;
      }

      .new-action-button.pressed ha-icon {
        color: var(--primary-color);
      }
       
      
      .new-action-button::after {
        content: attr(label);
        position: absolute;
        bottom: -24px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      
      .new-additional-controls {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        background-color: var(--card-background-color);
        border-radius: 8px;
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
        font-size: 16px;
        font-weight: 700;
      }
      
      .new-expand-icon {
        font-size: 20px;
        transition: transform 0.3s ease;
      }
      
      .new-additional-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 8px;
        border-top: 1px solid var(--divider-color);
      }
      
      .new-switch-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .new-switch-label {
        flex: 1;
        font-size: 14px;
      }
      
      .new-time-controls-section {
       display: flex;
       flex-direction: column;
       gap: 8px;
       margin-bottom: 12px;
       padding: 16px 12px 32px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       border: 1px solid var(--divider-color);
     }

     .new-time-controls-container {
       display: flex;
       flex-direction: column;
       gap: 36px;
       align-items: center;
     }
       
      .new-time-control {
        display: flex;
        align-items: center;
        gap: 6px;
      }
       
        .new-delayed-start-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      
      .new-delayed-start-time-controls {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      
      .new-time-control ha-select {
        width: 40%;
        min-width: 70px;
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        --mdc-menu-min-width: 70px;
        height: 36px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .new-time-control ha-select .mdc-select__anchor {
        border-radius: 12px !important;
      }
      
      .new-time-control span {
        font-size: 14px;
        font-weight: bold;
      }
       
      /* Inline time control styling */
      .new-time-control-inline {
       display: flex;
       align-items: center;
       gap: 8px;
       flex-wrap: wrap;
       width: 100%;
       justify-content: center;
       margin-top: 20px;
     }
       
      .new-time-control-inline ha-select {
        width: 25%;
        min-width: 60px;
        max-width: 80px;
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        --mdc-menu-min-width: 60px;
        height: 36px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
       
      /* Ensure inline controls have proper spacing */
      .new-time-controls, .new-delayed-start-time-controls {
        width: 100%;
      }
       
      /* Sensor styling for delayed launch and auto warm time */
      .new-delayed-time-sensor, .new-auto-warm-time-sensor {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background-color: var(--card-background-color);
        border-radius: 12px;
        margin-top: 8px;
        border: 1px solid var(--divider-color);
      }
       
      .new-sensor-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        flex: 1;
      }
       
      .new-sensor-value {
        font-size: 14px;
        font-weight: bold;
        color: var(--primary-text-color);
      }
       
      /* Improved button styling with tooltips */
      .new-action-button::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        background: var(--card-background-color);
        border-radius: 50%;
        z-index: -1;
        transition: transform 0.2s ease;
      }
      
       
      /* Mushroom-inspired card header */
      .new-header {
        padding: 12px;
        background: linear-gradient(135deg, var(--primary-color) 0%, rgba(0,0,0,0) 100%);
        border-radius: 12px;
        margin: -12px -12px 12px -12px;
      }
       
      .new-name {
        color: white;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      }
       
      .new-state {
        color: rgba(255,255,255,0.9);
      }
       
      /* Better spacing for additional controls */
      .new-additional-content {
        padding: 12px 0;
      }
      
      /* Compact and modern select styling */
      ha-select {
        --mdc-theme-primary: var(--primary-color);
        --mdc-shape-small: 8px;
        min-width: 80px;
        height: 36px;
        border-radius: 8px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        font-size: 14px;
      }
      
      /* Hide select labels for cleaner look */
      ha-select .mdc-floating-label {
        display: none !important;
      }
      
      /* Hide floating labels when select is open */
      ha-select .mdc-floating-label.mdc-floating-label--float-above {
        display: none !important;
      }
      
      /* Ensure no extra space from hidden labels */
      ha-select .mdc-select__anchor {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
      
      /* Center text in select */
      ha-select .mdc-select__anchor {
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0 8px;
        border-radius: 8px;
      }
      
      /* Style for the dropdown icon */
      ha-select .mdc-select__dropdown-icon {
        margin-right: 4px;
      }
      
      /* Style for the select menu */
      ha-select .mdc-select__menu {
        min-width: 100%;
        max-width: 300px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      
      /* Prevent layout shift when select opens */
      ha-select .mdc-select__selected-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      ha-select:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      
      /* Auto Warm Section Styling */
      .new-auto-warm-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        background-color: var(--card-background-color);
        border-radius: 8px;
        margin-bottom: 12px;
      }

      .new-auto-warm-header {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
      }

      .new-auto-warm-label {
        font-size: 16px;
        font-weight: 700;
        text-align: center;
      }
      
      /* Temperature Section Styling */
      .new-temperature-section {
       display: flex;
       flex-direction: column;
       gap: 12px;
       padding: 16px 12px 24px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin: 12px 0;
       border: 1px solid var(--divider-color);
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
       font-size: 16px;
       font-weight: 700;
       text-align: center;
     }

     .new-temperature-select-container {
       display: flex;
       justify-content: center;
       padding-left: 0;
       width: 100%;
     }

     /* Temperature select styling - should match inline time selects */
     .new-temperature-hidden-select {
       width: 100%;
       min-width: 120px;
       max-width: 180px;
       --mdc-theme-primary: var(--primary-color);
       --mdc-shape-small: 8px;
       --mdc-menu-min-width: 120px;
       height: 36px;
       border-radius: 8px;
       box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
     }

     /* Cooking Time Section Styling */
     .new-cooking-time-section {
       display: flex;
       flex-direction: column;
       gap: 12px;
       padding: 16px 12px 24px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin: 12px 0;
       border: 1px solid var(--divider-color);
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
       font-size: 16px;
       font-weight: 700;
       text-align: center;
     }

     .new-cooking-time-controls {
       display: flex;
       align-items: center;
       gap: 8px;
       justify-content: center;
       padding-left: 0;
     }

     .new-time-unit {
       font-size: 14px;
       font-weight: bold;
     }

     /* Delayed Start Section Styling */
     .new-delayed-start-section {
       display: flex;
       flex-direction: column;
       gap: 12px;
       padding: 16px 12px 24px 12px;
       background-color: var(--card-background-color);
       border-radius: 8px;
       margin: 12px 0;
       border: 1px solid var(--divider-color);
       width: 100%;
       box-sizing: border-box;
     }

     .new-delayed-start-header {
       display: flex;
       align-items: center;
       gap: 8px;
       justify-content: center;
       width: 100%;
       flex-wrap: wrap;
     }

     .new-delayed-start-label {
       font-size: 16px;
       font-weight: 700;
       text-align: center;
     }

     .new-delayed-start-controls {
       display: flex;
       align-items: center;
       gap: 8px;
       justify-content: center;
       padding-left: 0;
       flex-wrap: wrap;
     }
      
      .new-auto-warm-time {
        padding-left: 30px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      
      /* Delayed Start Section Improvements */
      .new-delayed-start-controls {
        margin-top: 12px;
      }
      
      .new-delayed-start-time-controls {
        margin-top: 8px;
      }
      
      /* Better spacing for time controls */
      .new-time-controls {
        margin-bottom: 12px;
      }
        /* Time sensors container styling */
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
         
        /* Single sensor - center it */
        .new-time-sensors-row:only-child {
          justify-content: center;
        }
         
        /* Two sensors - display in one row */
        .new-time-sensors-row:nth-child(1):only-child + .new-time-sensors-row {
          display: none; /* Hide second row if only one row exists */
        }
         
        /* Three sensors - first two in first row, third centered in second row */
        .new-time-sensors-row:nth-child(1):has(.new-control-item:nth-child(2)) + .new-time-sensors-row:has(.new-control-item:only-child) {
          justify-content: center;
        }
         
        /* Four sensors - two in each row */
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
], SkyCookerHaCard.prototype, "_showSelectedTime", void 0);
__decorate([
    t()
], SkyCookerHaCard.prototype, "_isStartButtonPressed", void 0);
SkyCookerHaCard = __decorate([
    e$1('skycooker-ha-card')
], SkyCookerHaCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'skycooker-ha-card',
    name: 'SkyCooker Card',
    description: 'Card for operating SkyCooker through Lovelace.',
    preview: true,
});

let SkyCookerHaCardEditor = class SkyCookerHaCardEditor extends s {
    setConfig(config) {
        // Используем предоставленную конфигурацию напрямую без слияния с значениями по умолчанию
        // Это сохраняет все выбранные значения сущностей
        this._config = config ? { ...config } : {
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
            current_mode_entity: '',
            current_additional_mode_entity: '',
            auto_warm_time_entity: '',
            delayed_launch_time_entity: '',
            favorite_modes_entity: ''
        };
    }
    // Геттер для конфигурации, которую может читать Home Assistant
    getConfig() {
        return this._config;
    }
    // Реализуем метод configUpdated для правильной обработки обновлений конфигурации
    configUpdated(config) {
        this.setConfig(config);
        this.requestUpdate();
    }
    _dispatchConfigChanged() {
        const event = new CustomEvent('config-changed', {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
        this.requestUpdate();
    }
    _getEntityLabel(entityId) {
        if (!entityId || !this.hass)
            return '';
        return this.hass.states[entityId]?.attributes?.friendly_name || entityId;
    }
    _getEntityOptions(domain) {
        if (!this.hass)
            return [];
        const entities = Object.keys(this.hass.states).filter(entity_id => entity_id.startsWith(`${domain}.`) &&
            entity_id.toLowerCase().includes('skycooker'));
        // Добавляем опцию очистки в начало
        const options = [x `
      <mwc-list-item value="">-- ${this._t('clear_selection')} --</mwc-list-item>
    `];
        // Добавляем все опции сущностей
        entities.forEach(entity_id => {
            const stateObj = this.hass?.states[entity_id];
            const friendlyName = stateObj?.attributes?.friendly_name || entity_id;
            options.push(x `
        <mwc-list-item value="${entity_id}">${friendlyName}</mwc-list-item>
      `);
        });
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
          </div>
          <div class="grid">
            <!-- Name -->
            <ha-textfield
              .label="${this._t('name')}"
              .value="${this._config.name || 'SkyCooker'}"
              @input="${(ev) => {
            const newConfig = { ...this._config, name: ev.target.value };
            this._config = newConfig;
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: this._config },
                bubbles: true,
                composed: true,
            }));
            this.requestUpdate();
        }}"
            ></ha-textfield>

            <!-- Icon -->
            <ha-textfield
              .label="${this._t('icon')}"
              .value="${this._config.icon || 'mdi:stove'}"
              @input="${(ev) => {
            const newConfig = { ...this._config, icon: ev.target.value };
            this._config = newConfig;
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: this._config },
                bubbles: true,
                composed: true,
            }));
            this.requestUpdate();
        }}"
            ></ha-textfield>
            
          </div>
        </div>

        <!-- Sensors Section -->
        <div class="section">
          <div class="section-header">
            <h3>${this._t('sensors')}</h3>
          </div>
          <div class="entity-grid">
            <!-- Temperature Sensor -->
            <div class="entity-item">
              <label>${this._t('temperature')}</label>
              <ha-select
                .value="${this._config.temperature_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, temperature_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Remaining Time Sensor -->
            <div class="entity-item">
              <label>${this._t('remaining_time')}</label>
              <ha-select
                .value="${this._config.remaining_time_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, remaining_time_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Total Time Sensor -->
            <div class="entity-item">
              <label>${this._t('total_time')}</label>
              <ha-select
                .value="${this._config.cooking_time_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, cooking_time_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Status Sensor -->
            <div class="entity-item">
              <label>${this._t('status')}</label>
              <ha-select
                .value="${this._config.status_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, status_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Current Mode Sensor -->
            <div class="entity-item">
              <label>${this._t('current_mode')}</label>
              <ha-select
                .value="${this._config.current_mode_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, current_mode_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Auto Warm Time Sensor -->
            <div class="entity-item">
              <label>${this._t('auto_warm_time')}</label>
              <ha-select
                .value="${this._config.auto_warm_time_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, auto_warm_time_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('sensor')}
              </ha-select>
            </div>

            <!-- Delayed Launch Time Sensor -->
            <div class="entity-item">
              <label>${this._t('delayed_launch_time')}</label>
              <ha-select
                .value="${this._config.delayed_launch_time_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, delayed_launch_time_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
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
                .value="${this._config.auto_warm_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, auto_warm_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
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
                .value="${this._config.mode_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, mode_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Additional Mode Select -->
            <div class="entity-item">
              <label>${this._t('additional_mode')}</label>
              <ha-select
                .value="${this._config.additional_mode_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, additional_mode_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Hours Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_hours')}</label>
              <ha-select
                .value="${this._config.cooking_time_hours_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, cooking_time_hours_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Cooking Time Minutes Select -->
            <div class="entity-item">
              <label>${this._t('cooking_time_minutes')}</label>
              <ha-select
                .value="${this._config.cooking_time_minutes_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, cooking_time_minutes_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Hours Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_hours')}</label>
              <ha-select
                .value="${this._config.delayed_start_hours_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, delayed_start_hours_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

            <!-- Delayed Start Minutes Select -->
            <div class="entity-item">
              <label>${this._t('delayed_start_minutes')}</label>
              <ha-select
                .value="${this._config.delayed_start_minutes_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, delayed_start_minutes_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>
            
           <!-- Favorite Modes Select -->
            <div class="entity-item">
              <label>${this._t('favorite_modes')}</label>
              <ha-select
                .value="${this._config.favorite_modes_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, favorite_modes_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('select')}
              </ha-select>
            </div>

           <!-- Cooking Temperature Select -->
            <div class="entity-item">
              <label>${this._t('cooking_temperature')}</label>
              <ha-select
                .value="${this._config.cooking_temperature_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, cooking_temperature_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
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
                .value="${this._config.start_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, start_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Stop Button -->
            <div class="entity-item">
              <label>${this._t('stop')}</label>
              <ha-select
                .value="${this._config.stop_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, stop_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
              >
                ${this._getEntityOptions('button')}
              </ha-select>
            </div>

            <!-- Start Delayed Button -->
            <div class="entity-item">
              <label>${this._t('start_delayed')}</label>
              <ha-select
                .value="${this._config.start_delayed_entity || ''}"
                @selected="${(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            const selectedValue = ev.target?.value || ev.detail?.value;
            this._config = { ...this._config, start_delayed_entity: selectedValue };
            this._dispatchConfigChanged();
        }}"
                @closed="${(ev) => { ev.stopPropagation(); ev.preventDefault(); }}"
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
    `;
    }
};
__decorate([
    n$1({ attribute: false })
], SkyCookerHaCardEditor.prototype, "hass", void 0);
__decorate([
    t()
], SkyCookerHaCardEditor.prototype, "_config", void 0);
SkyCookerHaCardEditor = __decorate([
    e$1('skycooker-ha-card-editor')
], SkyCookerHaCardEditor);

var skycookerHaCardEditor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SkyCookerHaCardEditor () { return SkyCookerHaCardEditor; }
});

export { SkyCookerHaCard };
