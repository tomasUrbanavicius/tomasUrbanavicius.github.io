!function(t){var s={};function e(i){if(s[i])return s[i].exports;var r=s[i]={i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var r in t)e.d(i,r,(function(s){return t[s]}).bind(null,r));return i},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="",e(e.s="WZ91")}({WZ91:function(t,s,e){"use strict";function i(t,s,e,i){return new(e||(e=Promise))((function(r,n){function h(t){try{c(i.next(t))}catch(s){n(s)}}function o(t){try{c(i.throw(t))}catch(s){n(s)}}function c(t){var s;t.done?r(t.value):(s=t.value,s instanceof e?s:new e((function(t){t(s)}))).then(h,o)}c((i=i.apply(t,s||[])).next())}))}function r(t){return"function"==typeof t}e.r(s),e.d(s,"WorkerMessage",(function(){return O}));let n=!1;const h={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){if(t){const t=new Error;console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n"+t.stack)}else n&&console.log("RxJS: Back to a better error behavior. Thank you. <3");n=t},get useDeprecatedSynchronousErrorHandling(){return n}};function o(t){setTimeout(()=>{throw t},0)}const c={closed:!0,next(t){},error(t){if(h.useDeprecatedSynchronousErrorHandling)throw t;o(t)},complete(){}},a=(()=>Array.isArray||(t=>t&&"number"==typeof t.length))(),u=(()=>{function t(t){return Error.call(this),this.message=t?`${t.length} errors occurred during unsubscription:\n${t.map((t,s)=>`${s+1}) ${t.toString()}`).join("\n  ")}`:"",this.name="UnsubscriptionError",this.errors=t,this}return t.prototype=Object.create(Error.prototype),t})();let b=(()=>{class t{constructor(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}unsubscribe(){let s;if(this.closed)return;let{_parentOrParents:e,_unsubscribe:i,_subscriptions:n}=this;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,e instanceof t)e.remove(this);else if(null!==e)for(let t=0;t<e.length;++t)e[t].remove(this);if(r(i))try{i.call(this)}catch(o){s=o instanceof u?l(o.errors):[o]}if(a(n)){let t=-1,e=n.length;for(;++t<e;){const e=n[t];if(null!==(h=e)&&"object"==typeof h)try{e.unsubscribe()}catch(o){s=s||[],o instanceof u?s=s.concat(l(o.errors)):s.push(o)}}}var h;if(s)throw new u(s)}add(s){let e=s;if(!s)return t.EMPTY;switch(typeof s){case"function":e=new t(s);case"object":if(e===this||e.closed||"function"!=typeof e.unsubscribe)return e;if(this.closed)return e.unsubscribe(),e;if(!(e instanceof t)){const s=e;e=new t,e._subscriptions=[s]}break;default:throw new Error("unrecognized teardown "+s+" added to Subscription.")}let{_parentOrParents:i}=e;if(null===i)e._parentOrParents=this;else if(i instanceof t){if(i===this)return e;e._parentOrParents=[i,this]}else{if(-1!==i.indexOf(this))return e;i.push(this)}const r=this._subscriptions;return null===r?this._subscriptions=[e]:r.push(e),e}remove(t){const s=this._subscriptions;if(s){const e=s.indexOf(t);-1!==e&&s.splice(e,1)}}}return t.EMPTY=function(t){return t.closed=!0,t}(new t),t})();function l(t){return t.reduce((t,s)=>t.concat(s instanceof u?s.errors:s),[])}const p=(()=>"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random())();class m extends b{constructor(t,s,e){switch(super(),this.syncErrorValue=null,this.syncErrorThrown=!1,this.syncErrorThrowable=!1,this.isStopped=!1,arguments.length){case 0:this.destination=c;break;case 1:if(!t){this.destination=c;break}if("object"==typeof t){t instanceof m?(this.syncErrorThrowable=t.syncErrorThrowable,this.destination=t,t.add(this)):(this.syncErrorThrowable=!0,this.destination=new d(this,t));break}default:this.syncErrorThrowable=!0,this.destination=new d(this,t,s,e)}}[p](){return this}static create(t,s,e){const i=new m(t,s,e);return i.syncErrorThrowable=!1,i}next(t){this.isStopped||this._next(t)}error(t){this.isStopped||(this.isStopped=!0,this._error(t))}complete(){this.isStopped||(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe())}_next(t){this.destination.next(t)}_error(t){this.destination.error(t),this.unsubscribe()}_complete(){this.destination.complete(),this.unsubscribe()}_unsubscribeAndRecycle(){const{_parentOrParents:t}=this;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this}}class d extends m{constructor(t,s,e,i){let n;super(),this._parentSubscriber=t;let h=this;r(s)?n=s:s&&(n=s.next,e=s.error,i=s.complete,s!==c&&(h=Object.create(s),r(h.unsubscribe)&&this.add(h.unsubscribe.bind(h)),h.unsubscribe=this.unsubscribe.bind(this))),this._context=h,this._next=n,this._error=e,this._complete=i}next(t){if(!this.isStopped&&this._next){const{_parentSubscriber:s}=this;h.useDeprecatedSynchronousErrorHandling&&s.syncErrorThrowable?this.__tryOrSetError(s,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}}error(t){if(!this.isStopped){const{_parentSubscriber:s}=this,{useDeprecatedSynchronousErrorHandling:e}=h;if(this._error)e&&s.syncErrorThrowable?(this.__tryOrSetError(s,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(s.syncErrorThrowable)e?(s.syncErrorValue=t,s.syncErrorThrown=!0):o(t),this.unsubscribe();else{if(this.unsubscribe(),e)throw t;o(t)}}}complete(){if(!this.isStopped){const{_parentSubscriber:t}=this;if(this._complete){const s=()=>this._complete.call(this._context);h.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?(this.__tryOrSetError(t,s),this.unsubscribe()):(this.__tryOrUnsub(s),this.unsubscribe())}else this.unsubscribe()}}__tryOrUnsub(t,s){try{t.call(this._context,s)}catch(e){if(this.unsubscribe(),h.useDeprecatedSynchronousErrorHandling)throw e;o(e)}}__tryOrSetError(t,s,e){if(!h.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{s.call(this._context,e)}catch(i){return h.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=i,t.syncErrorThrown=!0,!0):(o(i),!0)}return!1}_unsubscribe(){const{_parentSubscriber:t}=this;this._context=null,this._parentSubscriber=null,t.unsubscribe()}}const g=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")();function f(t){return t}let _=(()=>{class t{constructor(t){this._isScalar=!1,t&&(this._subscribe=t)}lift(s){const e=new t;return e.source=this,e.operator=s,e}subscribe(t,s,e){const{operator:i}=this,r=function(t,s,e){if(t){if(t instanceof m)return t;if(t[p])return t[p]()}return t||s||e?new m(t,s,e):new m(c)}(t,s,e);if(r.add(i?i.call(r,this.source):this.source||h.useDeprecatedSynchronousErrorHandling&&!r.syncErrorThrowable?this._subscribe(r):this._trySubscribe(r)),h.useDeprecatedSynchronousErrorHandling&&r.syncErrorThrowable&&(r.syncErrorThrowable=!1,r.syncErrorThrown))throw r.syncErrorValue;return r}_trySubscribe(t){try{return this._subscribe(t)}catch(s){h.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=s),function(t){for(;t;){const{closed:s,destination:e,isStopped:i}=t;if(s||i)return!1;t=e&&e instanceof m?e:null}return!0}(t)?t.error(s):console.warn(s)}}forEach(t,s){return new(s=S(s))((s,e)=>{let i;i=this.subscribe(s=>{try{t(s)}catch(r){e(r),i&&i.unsubscribe()}},e,s)})}_subscribe(t){const{source:s}=this;return s&&s.subscribe(t)}[g](){return this}pipe(...t){return 0===t.length?this:(0===(s=t).length?f:1===s.length?s[0]:function(t){return s.reduce((t,s)=>s(t),t)})(this);var s}toPromise(t){return new(t=S(t))((t,s)=>{let e;this.subscribe(t=>e=t,t=>s(t),()=>t(e))})}}return t.create=s=>new t(s),t})();function S(t){if(t||(t=h.Promise||Promise),!t)throw new Error("no Promise impl found");return t}const w=(()=>{function t(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return t.prototype=Object.create(Error.prototype),t})();class y extends b{constructor(t,s){super(),this.subject=t,this.subscriber=s,this.closed=!1}unsubscribe(){if(this.closed)return;this.closed=!0;const t=this.subject,s=t.observers;if(this.subject=null,!s||0===s.length||t.isStopped||t.closed)return;const e=s.indexOf(this.subscriber);-1!==e&&s.splice(e,1)}}class E extends m{constructor(t){super(t),this.destination=t}}let x=(()=>{class t extends _{constructor(){super(),this.observers=[],this.closed=!1,this.isStopped=!1,this.hasError=!1,this.thrownError=null}[p](){return new E(this)}lift(t){const s=new v(this,this);return s.operator=t,s}next(t){if(this.closed)throw new w;if(!this.isStopped){const{observers:s}=this,e=s.length,i=s.slice();for(let r=0;r<e;r++)i[r].next(t)}}error(t){if(this.closed)throw new w;this.hasError=!0,this.thrownError=t,this.isStopped=!0;const{observers:s}=this,e=s.length,i=s.slice();for(let r=0;r<e;r++)i[r].error(t);this.observers.length=0}complete(){if(this.closed)throw new w;this.isStopped=!0;const{observers:t}=this,s=t.length,e=t.slice();for(let i=0;i<s;i++)e[i].complete();this.observers.length=0}unsubscribe(){this.isStopped=!0,this.closed=!0,this.observers=null}_trySubscribe(t){if(this.closed)throw new w;return super._trySubscribe(t)}_subscribe(t){if(this.closed)throw new w;return this.hasError?(t.error(this.thrownError),b.EMPTY):this.isStopped?(t.complete(),b.EMPTY):(this.observers.push(t),new y(this,t))}asObservable(){const t=new _;return t.source=this,t}}return t.create=(t,s)=>new v(t,s),t})();class v extends x{constructor(t,s){super(),this.destination=t,this.source=s}next(t){const{destination:s}=this;s&&s.next&&s.next(t)}error(t){const{destination:s}=this;s&&s.error&&this.destination.error(t)}complete(){const{destination:t}=this;t&&t.complete&&this.destination.complete()}_subscribe(t){const{source:s}=this;return s?this.source.subscribe(t):b.EMPTY}}class P extends x{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){const s=super._subscribe(t);return s&&!s.closed&&t.next(this._value),s}getValue(){if(this.hasError)throw this.thrownError;if(this.closed)throw new w;return this._value}next(t){super.next(this._value=t)}}class M{constructor(){this._progress=0,this.name="Levy distribution density",this.miu=0,this.sigma=0,this.c=0,this.a=0,this.best={miu:-1,sigma:-1,c:-1,a:-1,estimate:Number.MAX_VALUE,text:""},this._progressSubject=new P(0),this.progress=this._progressSubject.asObservable()}findBestApprox(t){return i(this,void 0,void 0,(function*(){return this.bruteForceBigSteps(t),this.bruteForceSmallSteps(t),this.getBestPoints()}))}bruteForceBigSteps(t){for(this._progressSubject.next(this._progress=0),this.miu=0;this.miu<=100;this.miu+=1){for(this.sigma=0;this.sigma<=100;this.sigma+=1)for(this.c=0;this.c<=1e5;this.c+=100)for(this.a=0;this.a<=100;this.a+=10){let s=this.countEstimate(t);this.best.estimate>s&&this.registerNewBestEstimate(s),this._progress++}this._progressSubject.next(this._progress/1134965)}}bruteForceSmallSteps(t){let s=this.best.sigma-1<0?0:this.best.sigma-1,e=this.best.c-100<0?0:this.best.c-100,i=this.best.a-10<0?0:this.best.a-10,r=this.best.miu+1>100?100:this.best.miu+1,n=this.best.sigma+1>100?100:this.best.sigma+1,h=this.best.c+100>1e5?1e5:this.best.c+100,o=this.best.a+10>100?100:this.best.a+10;for(this.miu=this.best.miu-1<0?0:this.best.miu-1;this.miu<=r;this.miu+=.1){for(this.miu=Math.round(10*this.miu)/10,this.sigma=s;this.sigma<=n;this.sigma+=.1)for(this.sigma=Math.round(10*this.sigma)/10,this.c=e;this.c<=h;this.c+=1)for(this.a=i;this.a<=o;this.a+=1){let s=this.countEstimate(t);this.best.estimate>s&&this.registerNewBestEstimate(s),this._progress++}this._progressSubject.next(this._progress/1134965)}this._progressSubject.next(100)}countEstimate(t){let s=0;for(let e=0;e<t.length;e++){let i=this.getPoint(e);isNaN(i)&&(i=0),s+=Math.abs(Number.parseFloat(t[e])-i)}return s}registerNewBestEstimate(t){this.best={estimate:t,miu:this.miu,sigma:this.sigma,c:this.c,a:this.a,text:`\u03bc: ${this.miu}, \u03c3: ${this.sigma}, c: ${this.c}, a: ${this.a}`},this._progressSubject.next(this._progress/1134965)}getBestPoints(){this.miu=this.best.miu,this.sigma=this.best.sigma,this.c=this.best.c,this.a=this.best.a;let t=[];for(let s=0;s<365;s++){let e=this.getPoint(s);isNaN(e)&&(e=0),t.push({y:e})}return t}getPoint(t){let s=this.c*Math.sqrt(this.sigma/(2*Math.PI));return 0===s?this.a:(s*=Math.pow(Math.E,-this.sigma/(2*(t-this.miu))),0===s?this.a:(s/=Math.pow(Math.abs(t-this.miu),1.5),s+=this.a,isNaN(s)&&console.log(`NaN: x: ${t}, \u03bc: ${this.miu}, \u03c3: ${this.sigma}, c: ${this.c}, a: ${this.a}`),s))}}class j{constructor(){this._progress=0,this.name="Log-normal distribution density",this.miu=0,this.sigma=0,this.c=0,this.a=0,this.best={miu:-1,sigma:-1,c:-1,a:-1,estimate:Number.MAX_VALUE,text:""},this._progressSubject=new P(0),this.progress=this._progressSubject.asObservable()}findBestApprox(t){return i(this,void 0,void 0,(function*(){return this.bruteForceBigSteps(t),this.bruteForceSmallSteps(t),this.getBestPoints()}))}bruteForceBigSteps(t){for(this._progressSubject.next(this._progress=0),this.miu=0;this.miu<=100;this.miu+=1){for(this.sigma=.1;this.sigma<=100;this.sigma+=1)for(this.c=0;this.c<=1e5;this.c+=100)for(this.a=0;this.a<=100;this.a+=10){let s=this.countEstimate(t);this.best.estimate>s&&this.registerNewBestEstimate(s),this._progress++}this._progressSubject.next(this._progress/1134965)}}bruteForceSmallSteps(t){let s=this.best.sigma-1<.1?.1:this.best.sigma-1,e=this.best.c-100<0?0:this.best.c-100,i=this.best.a-10<0?0:this.best.a-10,r=this.best.miu+1>100?100:this.best.miu+1,n=this.best.sigma+1>100?100:this.best.sigma+1,h=this.best.c+100>1e5?1e5:this.best.c+100,o=this.best.a+10>100?100:this.best.a+10;for(this.miu=this.best.miu-1<0?0:this.best.miu-1;this.miu<=r;this.miu+=.1){for(this.miu=Math.round(10*this.miu)/10,this.sigma=s;this.sigma<=n;this.sigma+=.1)for(this.sigma=Math.round(10*this.sigma)/10,this.c=e;this.c<=h;this.c+=1)for(this.a=i;this.a<=o;this.a+=1){let s=this.countEstimate(t);this.best.estimate>s&&this.registerNewBestEstimate(s),this._progress++}this._progressSubject.next(this._progress/1134965)}this._progressSubject.next(100)}countEstimate(t){let s=0;for(let e=0;e<t.length;e++){let i=this.getPoint(e);isNaN(i)&&(i=0),s+=Math.abs(Number.parseFloat(t[e])-i)}return s}registerNewBestEstimate(t){this.best={estimate:t,miu:this.miu,sigma:this.sigma,c:this.c,a:this.a,text:`\u03bc: ${this.miu}, \u03c3: ${this.sigma}, c: ${this.c}, a: ${this.a}`},this._progressSubject.next(this._progress/1134965)}getBestPoints(){this.miu=this.best.miu,this.sigma=this.best.sigma,this.c=this.best.c,this.a=this.best.a;let t=[];for(let s=0;s<365;s++){let e=this.getPoint(s);isNaN(e)&&(e=0),t.push({y:e})}return t}getPoint(t){if(0===t)return this.a;let s=this.c/(t*this.sigma*Math.sqrt(2*Math.PI));return 0===s?this.a:(s*=Math.pow(Math.E,-Math.pow(Math.log(t)-this.miu,2)/2*Math.pow(this.sigma,2)),s+=this.a,isNaN(s)&&console.log(`NaN: x: ${t}, \u03bc: ${this.miu}, \u03c3: ${this.sigma}, c: ${this.c}, a: ${this.a}`),s)}}class N{constructor(){this._progress=0,this.name="Weibul distribution density",this.lambda=0,this.k=0,this.c=0,this.a=0,this.best={lambda:-1,k:-1,c:-1,a:-1,estimate:Number.MAX_VALUE,text:""},this._progressSubject=new P(0),this.progress=this._progressSubject.asObservable()}findBestApprox(t){return i(this,void 0,void 0,(function*(){return this.bruteForceBigSteps(t),this.bruteForceSmallSteps(t),this.getBestPoints()}))}bruteForceBigSteps(t){for(this._progressSubject.next(this._progress=0),this.lambda=.1;this.lambda<=100;this.lambda+=1){for(this.k=0;this.k<=100;this.k+=1)for(this.c=0;this.c<=1e5;this.c+=100)for(this.a=0;this.a<=100;this.a+=10){let s=this.countEstimate(t);this.best.estimate>s&&this.registerNewBestEstimate(s),this._progress++}this._progressSubject.next(this._progress/1134965)}}bruteForceSmallSteps(t){let s=this.best.k-1<0?0:this.best.k-1,e=this.best.c-100<0?0:this.best.c-100,i=this.best.a-10<0?0:this.best.a-10,r=this.best.lambda+1>100?100:this.best.lambda+1,n=this.best.k+1>100?100:this.best.k+1,h=this.best.c+100>1e5?1e5:this.best.c+100,o=this.best.a+10>100?100:this.best.a+10;for(this.lambda=this.best.lambda-1<.1?.1:this.best.lambda-1;this.lambda<=r;this.lambda+=.1){for(this.lambda=Math.round(10*this.lambda)/10,this.k=s;this.k<=n;this.k+=.1)for(this.k=Math.round(10*this.k)/10,this.c=e;this.c<=h;this.c+=1)for(this.a=i;this.a<=o;this.a+=1){let s=this.countEstimate(t);this.best.estimate>s&&this.registerNewBestEstimate(s),this._progress++}this._progressSubject.next(this._progress/1134965)}this._progressSubject.next(100)}countEstimate(t){let s=0;for(let e=0;e<t.length;e++){let i=this.getPoint(e);isNaN(i)&&(i=0),s+=Math.abs(Number.parseFloat(t[e])-i)}return s}registerNewBestEstimate(t){this.best={estimate:t,lambda:this.lambda,k:this.k,c:this.c,a:this.a,text:`\u03bb: ${this.lambda}, k: ${this.k}, c: ${this.c}, a: ${this.a}`},this._progressSubject.next(this._progress/1134965)}getBestPoints(){this.lambda=this.best.lambda,this.k=this.best.k,this.c=this.best.c,this.a=this.best.a;let t=[];for(let s=0;s<365;s++){let e=this.getPoint(s);isNaN(e)&&(e=0),t.push({y:e})}return t}getPoint(t){if(0==this.c)return this.a;let s=this.c*this.k/this.lambda;return 0===s?this.a:(s*=Math.pow(t/this.lambda,this.k-1),0===s?this.a:(s*=Math.pow(Math.E,-Math.pow(t/this.lambda,this.k)),s+=this.a,isNaN(s)&&console.log(`NaN: x: ${t}, \u03bb: ${this.lambda}, k: ${this.k}, c: ${this.c}, a: ${this.a}`),s))}}class O{}const k=self;addEventListener("message",({data:t})=>i(void 0,void 0,void 0,(function*(){let s=[new M,new j,new N];for(const[e,i]of s.entries()){i.progress.subscribe(t=>{k.postMessage({currentFunction:i.name,progress:100*e/s.length+t/s.length,estimate:i.best.estimate,bestParameters:i.best.text})});let r=i.findBestApprox(t);const n=yield r;k.postMessage({currentFunction:i.name,bestPoints:n,estimate:i.best.estimate,bestParameters:i.best.text})}k.postMessage({end:!0})})))}});