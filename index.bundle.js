(()=>{"use strict";var e={208:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(601),a=r.n(n),i=r(314),s=r.n(i)()(a());s.push([e.id,"*,\n*::after,\n*::before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n:root {\n  --cell-size-unitless: 3;\n  --cell-size: calc(var(--cell-size-unitless) * 1rem);\n  --cell-color: #a3a3ff;\n}\n\n.board {\n  grid-area: board;\n  justify-content: center;\n  align-items: center;\n  display: grid;\n  transition: 225ms opacity ease-in-out;\n  grid:\n    repeat(10, var(--cell-size))\n    / repeat(10, var(--cell-size));\n\n  &.turn {\n    opacity: 0.8;\n    box-shadow: 2px 2px 12px 2px rgb(0 0 0 / 0.25);\n  }\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  margin: 12px;\n}\n\n.statusbar {\n  background-color: rgb(0 0 0 / 0.1);\n  padding: 8px 12px;\n  text-align: center;\n  width: 40%;\n  align-self: center;\n  justify-self: center;\n  font-size: 1.5rem;\n  border-radius: 12px;\n}\n\n.grid-cell {\n  height: var(--cell-size);\n  aspect-ratio: 1;\n  outline: 1px solid var(--cell-color);\n  transition: 225ms background-color ease-in-out;\n\n  &.hit-success {\n    color: rgb(0 255 0 / 0.3);\n    outline: 2px solid currentColor;\n    background-color: currentColor;\n  }\n\n  &.hit-miss {\n    color: rgb(255 0 0 / 0.3);\n    outline: 2px solid currentColor;\n    background-color: currentColor;\n  }\n}\n\nheader {\n  margin-bottom: 80px;\n}\n\n.game-container {\n  display: flex;\n  justify-content: space-around;\n  margin: 5% 20%;\n  gap: 72px;\n}\n\n.board-container {\n  display: grid;\n  grid: 1fr 1fr / 1fr 2fr;\n  grid-template-areas:\n    'ship-container board'\n    '. btn-ready';\n  gap: 48px;\n}\n\n.player-container {\n  display: flex;\n  flex-direction: column;\n  align-content: space-around;\n  justify-content: space-around;\n  align-items: center;\n}\n\n.btn-ready {\n  grid-area: btn-ready;\n  justify-self: center;\n  appearance: none;\n  background-color: #688fe5;\n  color: white;\n  border-radius: 12px;\n  border: 8px outset #688fe5;\n  box-shadow: 4px 4px 8px 2px rgb(0 0 0 / 0.1);\n  font-size: 1.4rem;\n  font-weight: 700;\n  width: min-content;\n  padding: 2px 36px;\n  height: 2lh;\n}\n\n.btn-ready:active {\n  border: 8px inset #688fe5;\n}\n\n#player2 {\n  display: none;\n}\n\n.btn-reset {\n  width: 20px;\n  height: 20px;\n}\n\n.ship {\n  background-color: rgb(0 0 255 / 0.02);\n  border: 3px solid rgb(0 0 255 / 0.8);\n  height: var(--cell-size);\n  width: var(--cell-size);\n  position: relative;\n  z-index: 999;\n  cursor: move;\n}\n\n.ship.dragging {\n  border: 2px solid rgb(0 255 0 / 0.8);\n}\n\n.ship-container {\n  grid-area: ship-container;\n  min-width: 320px;\n  flex: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  align-content: flex-start;\n}\n\n.occupied {\n  border: 2px solid blue;\n  background-color: rgb(0 0 0 / 0.1);\n}\n\n#btn-mode {\n  appearance: none;\n  height: 2ch;\n  aspect-ratio: 2;\n  border: 4px solid grey;\n  border-radius: 18px;\n  margin: 0 16px;\n  text-align: center;\n  transition: transform ease-in-out 150ms;\n  transform: translateX(-12px);\n\n  &:checked {\n    transform: translateX(12px);\n  }\n}\n",""]);const o=s},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",n=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),n&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),n&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,n,a,i){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(n)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(s[l]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);n&&s[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),t.push(d))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var i={},s=[],o=0;o<e.length;o++){var l=e[o],c=n.base?l[0]+n.base:l[0],d=i[c]||0,h="".concat(c," ").concat(d);i[c]=d+1;var p=r(h),u={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)t[p].references++,t[p].updater(u);else{var f=a(u,n);n.byIndex=o,t.splice(o,0,{identifier:h,updater:f,references:1})}s.push(h)}return s}function a(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,a){var i=n(e=e||[],a=a||{});return function(e){e=e||[];for(var s=0;s<i.length;s++){var o=r(i[s]);t[o].references--}for(var l=n(e,a),c=0;c<i.length;c++){var d=r(i[c]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}i=l}}},659:e=>{var t={};e.exports=function(e,r){var n=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,r)=>{e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var a=void 0!==r.layer;a&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,a&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var i=r.sourceMap;i&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={id:n,exports:{}};return e[n](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nc=void 0;var n,a,i,s,o,l,c,d=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};class h{constructor(e,t,r){n.add(this),l.set(this,(e=>{const t=document.createElement("div"),r=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cell-size-unitless"));return t.classList.add("ship"),t.id=e.id,t.draggable=!0,t.style.width=e.length*r+"rem",t.addEventListener("dragstart",this.eventHandlers.shipDragStartHandler.bind(this.eventHandlers)),t.addEventListener("dragend",this.eventHandlers.shipDragEndHandler.bind(this.eventHandlers)),t.addEventListener("click",this.eventHandlers.shipClickHandler.bind(this.eventHandlers)),t})),this.gameboard=e.gameboard,this.player=e,this.eventHandlers=t,this.container=r,d(this,n,"m",a).call(this)}reset(){d(this,n,"m",a).call(this)}disableBoard(){this.boardEl.style.pointerEvents="none"}showBoard(){this.container.parentElement.style.display="flex",this.boardEl.style.display="grid"}hideBoard(){this.container.parentElement.style.display="none",this.boardEl.style.display="none"}removeExtraElements(){this.container.querySelectorAll(".btn-ready, .ship-container").forEach((e=>e.remove()))}removeShipElements(){this.container.querySelectorAll(".ship").forEach((e=>e.remove()))}}l=new WeakMap,n=new WeakSet,a=function(){this.shipContainer=d(this,n,"m",s).call(this),this.btnReady=d(this,n,"m",c).call(this),this.boardEl=d(this,n,"m",o).call(this,this.player.gameboard),d(this,n,"m",i).call(this,this.player.ships),this.container.replaceChildren(this.shipContainer,this.boardEl,this.btnReady)},i=function(e){e.forEach((e=>{const t=d(this,l,"f").call(this,e);this.shipContainer.appendChild(t)}))},s=function(){const e=document.createElement("div");return e.classList.add("ship-container"),e},o=function(e){const t=document.createElement("div");t.classList.add("board"),t.draggable=!1;for(let r=0;r<e.rows;++r)for(let n=0;n<e.cols;++n){const e=document.createElement("div");e.classList.add("grid-cell"),e.dataset.row=String(r),e.dataset.col=String(n),t.appendChild(e)}return t.addEventListener("dragover",this.eventHandlers.boardDragOverHandler.bind(this.eventHandlers)),t.addEventListener("click",(e=>this.eventHandlers.cellClickHandler(e,this.player))),t},c=function(){const e=document.createElement("button");return e.type="button",e.textContent="Ready",e.classList.add("btn-ready"),e.addEventListener("click",this.eventHandlers.btnReadyHandler.bind(this.eventHandlers)),e};var p,u=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};class f{constructor(e,t){p.set(this,void 0),this.player=e,this.player.name="Computer",this.opponent=t,function(e,t,r,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");"a"===n?a.call(e,r):a?a.value=r:t.set(e,r)}(this,p,new Map,"f")}get gameboard(){return this.player.gameboard}get opponentBoard(){return this.opponent.gameboard}generateRandomCoords(){return[Math.round(Math.random()*(this.gameboard.rows-1)),Math.round(Math.random()*(this.gameboard.cols-1))]}attackRandomCoord(){let[e,t]=[0,0];do{[e,t]=this.generateRandomCoords()}while(u(this,p,"f").has(`${e},${t}`));const r=this.opponent.gameboard.receiveAttack([e,t]);return u(this,p,"f").set(`${e},${t}`,r.status),r}randomizeAllShipOrientations(){this.player.ships.forEach((e=>{Math.random()>.5&&e.toggleOrientation()}))}placeShipRandom(e){let[t,r]=[0,0];do{[t,r]=this.generateRandomCoords()}while(!this.gameboard.canPlaceShip(e,[t,r]));return this.player.placeShip(e,[t,r]),[t,r]}placeAllShips(){return this.randomizeAllShipOrientations(),this.player.ships.map((e=>this.placeShipRandom(e)))}}p=new WeakMap;class m{constructor(){this.ship=null,this.isHit=!1}}var g,y,b,w,v,E,S,T,x,C,k,M,P=function(e,t,r,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?a.call(e,r):a?a.value=r:t.set(e,r),r},H=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};class B{constructor([e,t]=[10,10]){g.add(this),b.set(this,void 0),w.set(this,void 0),v.set(this,void 0),E.set(this,void 0),P(this,w,e,"f"),P(this,v,t,"f"),P(this,b,Array.from({length:e},(()=>Array.from({length:t},(()=>new m)))),"f"),P(this,E,[],"f")}get board(){return Object.freeze(H(this,b,"f"))}get rows(){return H(this,w,"f")}get cols(){return H(this,v,"f")}isAreaEmpty([e,t],[r,n]){for(let a=e-1;a<=r+1;++a)for(let e=t-1;e<=n+1;++e)if(H(this,g,"m",x).call(this,[a,e])&&!H(this,g,"m",C).call(this,[a,e]))return!1;for(let a=e;a<=r;++a)for(let e=t;e<=n;++e)if(!H(this,g,"m",x).call(this,[a,e]))return!1;return!0}static vectorizeCoords(e,[t,r]){return{areaStart:[t,r],areaEnd:{horizontal:[t,r+e.length-1],vertical:[t+e.length-1,r]}[e.orientation]}}canPlaceShip(e,[t,r]){const{areaStart:n,areaEnd:a}=y.vectorizeCoords(e,[t,r]);return this.isAreaEmpty(n,a)}placeShip(e,[t,r]){const{areaStart:n,areaEnd:a}=y.vectorizeCoords(e,[t,r]);if(!this.isAreaEmpty(n,a))return!1;for(let t=n[0];t<=a[0];++t)for(let r=n[1];r<=a[1];++r)H(this,b,"f")[t][r].ship=e;return H(this,g,"m",k).call(this,e,n,a),!0}removeShip([e,t]){const r=H(this,g,"m",T).call(this,[e,t]),[n,a]=r.start,[i,s]=r.end;for(let e=n;e<=i;++e)for(let t=a;t<=s;++t)H(this,b,"f")[e][t].ship=null;return H(this,g,"m",M).call(this,r.ship),r}moveShip([e,t],[r,n]){const{ship:a,start:i}=H(this,g,"m",T).call(this,[e,t]);this.removeShip([e,t]);const{areaStart:s,areaEnd:o}=y.vectorizeCoords(a,[r,n]);return!1===this.isAreaEmpty(s,o)?(this.placeShip(a,i),!1):(this.placeShip(a,[r,n]),!0)}rotateShip([e,t]){const{ship:r}=this.removeShip([e,t]);r.toggleOrientation();const{areaStart:n,areaEnd:a}=y.vectorizeCoords(r,[e,t]);return this.isAreaEmpty(n,a)?(this.placeShip(r,[e,t]),!0):(r.toggleOrientation(),this.placeShip(r,[e,t]),!1)}receiveAttack([e,t]){const r={pos:[e,t],status:"invalid"};if(!H(this,g,"m",x).call(this,[e,t]))return r;const n=H(this,b,"f")[e][t];return n.isHit?r:(n.isHit=!0,null===n.ship?(r.status="miss",r):(n.ship.hit(),r.status="success",r))}get locations(){return H(this,E,"f")}get areAllSunk(){return H(this,E,"f").every((e=>e.ship.isSunk))}}y=B,b=new WeakMap,w=new WeakMap,v=new WeakMap,E=new WeakMap,g=new WeakSet,S=function(e,[t,r]){return e>=t&&e<r},T=function([e,t]){return H(this,E,"f").find((r=>H(y,y,"m",S).call(y,e,[r.start[0],r.end[0]+1])&&H(y,y,"m",S).call(y,t,[r.start[1],r.end[1]+1])))},x=function([e,t]){return H(y,y,"m",S).call(y,e,[0,H(this,w,"f")])&&H(y,y,"m",S).call(y,t,[0,H(this,v,"f")])},C=function([e,t]){return null===H(this,b,"f")[e][t].ship},k=function(e,t,r){H(this,E,"f").push({ship:e,start:t,end:r})},M=function(e){const t=H(this,E,"f").findIndex((t=>Object.is(t.ship,e)));P(this,E,H(this,E,"f").toSpliced(t,1),"f")};var L,z=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};class A{constructor(){L.set(this,void 0),function(e,t,r,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");"a"===n?a.call(e,r):a?a.value=r:t.set(e,r)}(this,L,new Map,"f")}addSubscriber(e,t){return z(this,L,"f").has(e)||z(this,L,"f").set(e,[]),z(this,L,"f").get(e).push(t),t}removeSubscriber(e,t){const r=z(this,L,"f").get(e).indexOf(t);if(-1===r)throw new Error("Subscriber does not exist");return z(this,L,"f").get(e).slice(r,1),!0}notifySubscribers(e,t){z(this,L,"f").has(e)?z(this,L,"f").get(e).forEach((e=>e(t))):z(this,L,"f").set(e,[])}}L=new WeakMap;var R,j,W,O=function(e,t,r,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?a.call(e,r):a?a.value=r:t.set(e,r),r},I=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};const D={Carrier:5,Battleship:4,Destroyer:3,Submarine:2,PatrolBoat:1};class G{constructor(e,t="horizontal"){R.set(this,void 0),j.set(this,void 0),W.set(this,void 0),this.length=D[e],O(this,R,0,"f"),O(this,j,`S-${Math.floor(1024*Math.random()).toString(16)}`,"f"),O(this,W,t,"f")}hit(){O(this,R,I(this,R,"f")<this.length?I(this,R,"f")+1:I(this,R,"f"),"f")}get isSunk(){return I(this,R,"f")===this.length}get id(){return I(this,j,"f")}get hits(){return I(this,R,"f")}get orientation(){return I(this,W,"f")}toggleOrientation(){return O(this,W,"horizontal"===I(this,W,"f")?"vertical":"horizontal","f")}}R=new WeakMap,j=new WeakMap,W=new WeakMap;var q,$,N,F,U=function(e,t,r,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?a.call(e,r):a?a.value=r:t.set(e,r),r},X=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};class _{constructor(e,t,r=10){q.add(this),$.set(this,void 0),N.set(this,void 0),U(this,$,e,"f"),this.name=t,U(this,N,X(this,q,"m",F).call(this,r),"f")}get ships(){return X(this,N,"f")}get gameboard(){return X(this,$,"f")}get isReady(){return X(this,N,"f").length===X(this,$,"f").locations.length}placeShip(e,[t,r]){const n=X(this,N,"f").indexOf(e),a=X(this,N,"f").at(n);return this.gameboard.placeShip(a,[t,r]),[t,r]}}$=new WeakMap,N=new WeakMap,q=new WeakSet,F=function(e){return[new G("Battleship","horizontal"),new G("Destroyer","horizontal"),new G("Destroyer","horizontal"),new G("Submarine","horizontal"),new G("Submarine","horizontal"),new G("Submarine","horizontal"),new G("PatrolBoat","horizontal"),new G("PatrolBoat","horizontal"),new G("PatrolBoat","horizontal"),new G("PatrolBoat","horizontal")].toSpliced(e)};var J,V,K,Q,Y,Z,ee,te,re,ne,ae,ie=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)},se=function(e,t,r,n,a){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!a)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?a.call(e,r):a?a.value=r:t.set(e,r),r};class oe{constructor(){if(J.add(this),Q.set(this,void 0),Y.set(this,void 0),Z.set(this,void 0),ee.set(this,void 0),te.set(this,void 0),re.set(this,void 0),ne.set(this,void 0),ie(V,V,"f",K))return ie(V,V,"f",K);se(this,Y,new _(new B,"Player 1"),"f"),se(this,Z,new _(new B,"Player 2"),"f"),se(this,ne,new f(ie(this,Z,"f"),ie(this,Y,"f")),"f"),se(this,Q,new A,"f"),se(this,ee,ie(this,Y,"f"),"f"),se(this,te,!1,"f"),se(this,re,!0,"f"),se(V,V,this,"f",K)}get isGameReady(){return ie(this,Y,"f").isReady&&ie(this,Z,"f").isReady}get isGameEnded(){return ie(this,te,"f")}get computer(){return ie(this,ne,"f")}readyPlayer(e){e.isReady&&ie(this,Q,"f").notifySubscribers("playerReady",e)}startGame(){se(this,ee,ie(this,Y,"f"),"f"),ie(this,Q,"f").notifySubscribers("gameStart",ie(this,ee,"f"))}endGame(){ie(this,Q,"f").notifySubscribers("gameEnd",{winner:ie(this,ee,"f"),loser:this.nextTurn}),se(this,te,!0,"f")}toggleComputer(){return se(this,re,!ie(this,re,"f"),"f")}get isComputerEnabled(){return ie(this,re,"f")}toggleTurn(){return se(this,ee,this.nextTurn,"f"),ie(this,Q,"f").notifySubscribers("changeTurn",ie(this,ee,"f")),this.currentTurn}attackPlayer(e,[t,r]){const n=e.gameboard.receiveAttack([t,r]);return ie(this,J,"m",ae).call(this,e,n),n}playComputerTurn(){const e=this.computer.attackRandomCoord();return ie(this,J,"m",ae).call(this,this.computer.opponent,e),e}subscribe(e,t){return ie(this,Q,"f").addSubscriber(e,t)}unsubscribe(e,t){return ie(this,Q,"f").removeSubscriber(e,t)}get currentTurn(){return ie(this,ee,"f")}get nextTurn(){return ie(this,ee,"f")===ie(this,Y,"f")?ie(this,Z,"f"):ie(this,Y,"f")}get player1(){return ie(this,Y,"f")}get player2(){return ie(this,Z,"f")}}V=oe,Q=new WeakMap,Y=new WeakMap,Z=new WeakMap,ee=new WeakMap,te=new WeakMap,re=new WeakMap,ne=new WeakMap,J=new WeakSet,ae=function(e,t){const[r,n]=t.pos;if(ie(this,Q,"f").notifySubscribers("attack",t),"invalid"===t.status)return t;if("miss"===t.status)return t;const a=e.gameboard.board[r][n].ship;return a.isSunk&&ie(this,Q,"f").notifySubscribers("shipSunk",a),e.gameboard.areAllSunk&&this.endGame(),t},K={value:void 0};const le=new oe;var ce,de,he=function(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)};ce=new WeakSet,de=function(e){switch(e){case this.player1Board.player:return this.player1Board;case this.player2Board.player:return this.player2Board;default:return this.player1Board}};class pe{constructor(e){this.player=e}boardDragOverHandler(e){if(e.preventDefault(),!(e.target instanceof HTMLElement))return;if(!(e.currentTarget instanceof HTMLElement))return;if(!e.target.classList.contains("grid-cell"))return;if(e.dataTransfer.dropEffect="move",!this.draggingShip)return;const[t,r]=[parseInt(e.target.dataset.row),parseInt(e.target.dataset.col)],n=this.draggingShip;if(n.parentElement===e.target.parentElement)return;const a=this.player.ships.find((e=>e.id===n.id));this.player.gameboard.canPlaceShip(a,[t,r])&&(n.classList.add("dragging"),e.target.appendChild(n))}boardDropHandler(e){e.currentTarget instanceof HTMLElement&&e.target instanceof HTMLElement&&e.target.classList.contains("grid-cell")&&0!==e.dataTransfer.getData("text/plain").length&&(e.dataTransfer.dropEffect="move")}shipDragStartHandler(e){if(!(e.currentTarget instanceof HTMLElement))return;e.dataTransfer.setData("text/plain",e.currentTarget.id),this.draggingShip=e.currentTarget,this.draggingShipParent=e.currentTarget.parentElement;const t=this.draggingShipParent;if(!t.classList.contains("grid-cell"))return;const[r,n]=[Number(t.dataset.row),Number(t.dataset.col)];this.player.gameboard.removeShip([r,n])}shipDragEndHandler(e){if(!(e.currentTarget instanceof HTMLElement))return;if(!(e.target instanceof HTMLElement))return;if(!e.target.parentElement.classList.contains("grid-cell"))return;e.target.classList.remove("dragging");const t=e.currentTarget,r=this.player.ships.find((e=>e.id===t.id)),n=parseInt(t.parentElement.dataset.row),a=parseInt(t.parentElement.dataset.col);this.player.gameboard.canPlaceShip(r,[n,a])&&this.player.gameboard.placeShip(r,[n,a]),this.draggingShip=null,this.draggingShipParent=null}shipClickHandler(e){const t=e.target;if(!(t instanceof HTMLElement))return;if(t.classList.contains("dragging"))return;if(!t.parentElement.classList.contains("grid-cell"))return;const[r,n]=[parseInt(t.parentElement.dataset.row),parseInt(t.parentElement.dataset.col)];if(!this.player.gameboard.rotateShip([r,n]))return;const a=t.style.height,i=t.style.width;t.style.height=i,t.style.width=a}btnReadyHandler(e){e.currentTarget instanceof HTMLElement&&this.player.isReady&&(e.currentTarget.parentElement.querySelectorAll(".ship").forEach((e=>e.remove())),le.readyPlayer(this.player),le.toggleTurn())}cellClickHandler(e,t){if(!(e.target instanceof HTMLElement))return;if(!le.isGameReady)return;if(!e.target.classList.contains("grid-cell"))return;if(le.currentTurn===t)return;const[r,n]=[parseInt(e.target.dataset.row),parseInt(e.target.dataset.col)];"invalid"!==le.attackPlayer(t,[r,n]).status&&(t.gameboard.areAllSunk?le.endGame():le.toggleTurn())}}var ue=r(72),fe=r.n(ue),me=r(825),ge=r.n(me),ye=r(659),be=r.n(ye),we=r(56),ve=r.n(we),Ee=r(540),Se=r.n(Ee),Te=r(113),xe=r.n(Te),Ce=r(208),ke={};ke.styleTagTransform=xe(),ke.setAttributes=ve(),ke.insert=be().bind(null,"head"),ke.domAPI=ge(),ke.insertStyleElement=Se(),fe()(Ce.A,ke),Ce.A&&Ce.A.locals&&Ce.A.locals;const Me=document.querySelector(".statusbar"),Pe=document.querySelector("#btn-mode"),He=document.querySelector("#player1.player-container > .board-container"),Be=new pe(le.player1),Le=new h(le.player1,Be,He),ze=document.querySelector("#player2.player-container > .board-container"),Ae=new pe(le.player2),Re=new h(le.player2,Ae,ze),je=new class{constructor(e,t,r,n){ce.add(this),this.statusbar=e,this.player1Board=r,this.player2Board=n,this.displayTurn(r.player),this.btnMode=t,this.btnMode.parentElement.addEventListener("click",this.toggleMode.bind(this)),this.displayMode()}displayTurn(e){const t=e.name;le.isGameReady?(this.statusbar.textContent=`${t}'s turn to attack`,this.toggleBoardOpacity(e)):this.statusbar.textContent=`${t}'s turn to place ships`}toggleBoardOpacity(e){const t=he(this,ce,"m",de).call(this,e);he(this,ce,"m",de).call(this,le.nextTurn).boardEl.classList.add("turn"),t.boardEl.classList.remove("turn")}displayAttackStatus(e){"success"===e.status?this.statusbar.textContent="A successful hit!":"miss"===e.status&&(this.statusbar.textContent="That was a miss!")}displayWinner(e){this.statusbar.textContent=`${e.name} has won!`}handleReady(){if(le.isGameReady)return this.player2Board.removeExtraElements(),this.player2Board.hideBoard(),this.player1Board.showBoard(),le.isComputerEnabled&&(this.player1Board.boardEl.style.pointerEvents="none"),this.player2Board.showBoard(),void le.startGame();this.player1Board.player.isReady&&(this.player1Board.removeExtraElements(),this.player1Board.hideBoard(),this.btnMode.parentElement.style.display="none",le.isComputerEnabled?(le.computer.placeAllShips(),le.readyPlayer(le.computer.player)):this.player2Board.showBoard())}handleAttack(e){const t=he(this,ce,"m",de).call(this,le.nextTurn),[r,n]=e.pos;if("invalid"===e.status)return;const a=t.boardEl.querySelector(`.grid-cell[data-row='${r}'][data-col='${n}']`);switch(e.status){case"success":a.classList.add("hit-success");break;case"miss":a.classList.add("hit-miss")}}handleGameEnd(e){this.player1Board.disableBoard(),this.player2Board.disableBoard(),this.displayWinner(e.winner)}toggleMode(){const e=le.toggleComputer();this.player2Board.player.name=e?"Computer":"Player 2",this.displayMode()}displayMode(){this.btnMode.checked=!le.isComputerEnabled}hideOtherElements(e){e.querySelectorAll(".ship-container, .button, .board").forEach((e=>e.style.display="none"))}}(Me,Pe,Le,Re);le.subscribe("playerReady",(()=>{je.handleReady()})),le.subscribe("changeTurn",(e=>{je.displayTurn(e)})),le.subscribe("gameEnd",(e=>{je.handleGameEnd(e)})),le.subscribe("attack",(e=>{je.handleAttack(e)})),le.subscribe("changeTurn",(e=>{le.isGameReady&&le.isComputerEnabled&&e===le.computer.player&&setTimeout((()=>{le.playComputerTurn(),le.toggleTurn()}),500)}))})();