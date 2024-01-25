var e="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t={};(function(e,r){r(t)})(t,(function(t){var r=function(){function EventListener(t,r){(this||e).eventTarget=t;(this||e).eventName=r;(this||e).unorderedBindings=new Set}EventListener.prototype.connect=function(){(this||e).eventTarget.addEventListener((this||e).eventName,this||e,false)};EventListener.prototype.disconnect=function(){(this||e).eventTarget.removeEventListener((this||e).eventName,this||e,false)};EventListener.prototype.bindingConnected=function(t){(this||e).unorderedBindings.add(t)};EventListener.prototype.bindingDisconnected=function(t){(this||e).unorderedBindings.delete(t)};EventListener.prototype.handleEvent=function(t){var r=extendEvent(t);for(var n=0,o=(this||e).bindings;n<o.length;n++){var i=o[n];if(r.immediatePropagationStopped)break;i.handleEvent(r)}};Object.defineProperty(EventListener.prototype,"bindings",{get:function(){return Array.from((this||e).unorderedBindings).sort((function(e,t){var r=e.index,n=t.index;return r<n?-1:r>n?1:0}))},enumerable:true,configurable:true});return EventListener}();function extendEvent(t){if("immediatePropagationStopped"in t)return t;var r=t.stopImmediatePropagation;return Object.assign(t,{immediatePropagationStopped:false,stopImmediatePropagation:function(){(this||e).immediatePropagationStopped=true;r.call(this||e)}})}var n=function(){function Dispatcher(t){(this||e).application=t;(this||e).eventListenerMaps=new Map;(this||e).started=false}Dispatcher.prototype.start=function(){if(!(this||e).started){(this||e).started=true;(this||e).eventListeners.forEach((function(e){return e.connect()}))}};Dispatcher.prototype.stop=function(){if((this||e).started){(this||e).started=false;(this||e).eventListeners.forEach((function(e){return e.disconnect()}))}};Object.defineProperty(Dispatcher.prototype,"eventListeners",{get:function(){return Array.from((this||e).eventListenerMaps.values()).reduce((function(e,t){return e.concat(Array.from(t.values()))}),[])},enumerable:true,configurable:true});Dispatcher.prototype.bindingConnected=function(e){this.fetchEventListenerForBinding(e).bindingConnected(e)};Dispatcher.prototype.bindingDisconnected=function(e){this.fetchEventListenerForBinding(e).bindingDisconnected(e)};Dispatcher.prototype.handleError=function(t,r,n){void 0===n&&(n={});(this||e).application.handleError(t,"Error "+r,n)};Dispatcher.prototype.fetchEventListenerForBinding=function(e){var t=e.eventTarget,r=e.eventName;return this.fetchEventListener(t,r)};Dispatcher.prototype.fetchEventListener=function(e,t){var r=this.fetchEventListenerMapForEventTarget(e);var n=r.get(t);if(!n){n=this.createEventListener(e,t);r.set(t,n)}return n};Dispatcher.prototype.createEventListener=function(t,n){var o=new r(t,n);(this||e).started&&o.connect();return o};Dispatcher.prototype.fetchEventListenerMapForEventTarget=function(t){var r=(this||e).eventListenerMaps.get(t);if(!r){r=new Map;(this||e).eventListenerMaps.set(t,r)}return r};return Dispatcher}();var o=/^((.+?)(@(window|document))?->)?(.+?)(#(.+))?$/;function parseDescriptorString(e){var t=e.trim();var r=t.match(o)||[];return{eventTarget:parseEventTarget(r[4]),eventName:r[2],identifier:r[5],methodName:r[7]}}function parseEventTarget(e){return"window"==e?window:"document"==e?document:void 0}function stringifyEventTarget(e){return e==window?"window":e==document?"document":void 0}var i=function(){function Action(t,r,n){(this||e).element=t;(this||e).index=r;(this||e).eventTarget=n.eventTarget||t;(this||e).eventName=n.eventName||getDefaultEventNameForElement(t)||error("missing event name");(this||e).identifier=n.identifier||error("missing identifier");(this||e).methodName=n.methodName||error("missing method name")}Action.forToken=function(t){return new(this||e)(t.element,t.index,parseDescriptorString(t.content))};Action.prototype.toString=function(){var t=(this||e).eventTargetName?"@"+(this||e).eventTargetName:"";return""+(this||e).eventName+t+"->"+(this||e).identifier+"#"+(this||e).methodName};Object.defineProperty(Action.prototype,"eventTargetName",{get:function(){return stringifyEventTarget((this||e).eventTarget)},enumerable:true,configurable:true});return Action}();var s={a:function(e){return"click"},button:function(e){return"click"},form:function(e){return"submit"},input:function(e){return"submit"==e.getAttribute("type")?"click":"change"},select:function(e){return"change"},textarea:function(e){return"change"}};function getDefaultEventNameForElement(e){var t=e.tagName.toLowerCase();if(t in s)return s[t](e)}function error(e){throw new Error(e)}var u=function(){function Binding(t,r){(this||e).context=t;(this||e).action=r}Object.defineProperty(Binding.prototype,"index",{get:function(){return(this||e).action.index},enumerable:true,configurable:true});Object.defineProperty(Binding.prototype,"eventTarget",{get:function(){return(this||e).action.eventTarget},enumerable:true,configurable:true});Object.defineProperty(Binding.prototype,"identifier",{get:function(){return(this||e).context.identifier},enumerable:true,configurable:true});Binding.prototype.handleEvent=function(e){this.willBeInvokedByEvent(e)&&this.invokeWithEvent(e)};Object.defineProperty(Binding.prototype,"eventName",{get:function(){return(this||e).action.eventName},enumerable:true,configurable:true});Object.defineProperty(Binding.prototype,"method",{get:function(){var t=(this||e).controller[(this||e).methodName];if("function"==typeof t)return t;throw new Error('Action "'+(this||e).action+'" references undefined method "'+(this||e).methodName+'"')},enumerable:true,configurable:true});Binding.prototype.invokeWithEvent=function(t){try{(this||e).method.call((this||e).controller,t)}catch(c){var r=this||e,n=r.identifier,o=r.controller,i=r.element,s=r.index;var u={identifier:n,controller:o,element:i,index:s,event:t};(this||e).context.handleError(c,'invoking action "'+(this||e).action+'"',u)}};Binding.prototype.willBeInvokedByEvent=function(t){var r=t.target;return(this||e).element===r||(!(r instanceof Element&&(this||e).element.contains(r))||(this||e).scope.containsElement(r))};Object.defineProperty(Binding.prototype,"controller",{get:function(){return(this||e).context.controller},enumerable:true,configurable:true});Object.defineProperty(Binding.prototype,"methodName",{get:function(){return(this||e).action.methodName},enumerable:true,configurable:true});Object.defineProperty(Binding.prototype,"element",{get:function(){return(this||e).scope.element},enumerable:true,configurable:true});Object.defineProperty(Binding.prototype,"scope",{get:function(){return(this||e).context.scope},enumerable:true,configurable:true});return Binding}();var c=function(){function ElementObserver(t,r){var n=this||e;(this||e).element=t;(this||e).started=false;(this||e).delegate=r;(this||e).elements=new Set;(this||e).mutationObserver=new MutationObserver((function(e){return n.processMutations(e)}))}ElementObserver.prototype.start=function(){if(!(this||e).started){(this||e).started=true;(this||e).mutationObserver.observe((this||e).element,{attributes:true,childList:true,subtree:true});this.refresh()}};ElementObserver.prototype.stop=function(){if((this||e).started){(this||e).mutationObserver.takeRecords();(this||e).mutationObserver.disconnect();(this||e).started=false}};ElementObserver.prototype.refresh=function(){if((this||e).started){var t=new Set(this.matchElementsInTree());for(var r=0,n=Array.from((this||e).elements);r<n.length;r++){var o=n[r];t.has(o)||this.removeElement(o)}for(var i=0,s=Array.from(t);i<s.length;i++){var o=s[i];this.addElement(o)}}};ElementObserver.prototype.processMutations=function(t){if((this||e).started)for(var r=0,n=t;r<n.length;r++){var o=n[r];this.processMutation(o)}};ElementObserver.prototype.processMutation=function(e){if("attributes"==e.type)this.processAttributeChange(e.target,e.attributeName);else if("childList"==e.type){this.processRemovedNodes(e.removedNodes);this.processAddedNodes(e.addedNodes)}};ElementObserver.prototype.processAttributeChange=function(t,r){var n=t;(this||e).elements.has(n)?(this||e).delegate.elementAttributeChanged&&this.matchElement(n)?(this||e).delegate.elementAttributeChanged(n,r):this.removeElement(n):this.matchElement(n)&&this.addElement(n)};ElementObserver.prototype.processRemovedNodes=function(t){for(var r=0,n=Array.from(t);r<n.length;r++){var o=n[r];var i=this.elementFromNode(o);i&&this.processTree(i,(this||e).removeElement)}};ElementObserver.prototype.processAddedNodes=function(t){for(var r=0,n=Array.from(t);r<n.length;r++){var o=n[r];var i=this.elementFromNode(o);i&&this.elementIsActive(i)&&this.processTree(i,(this||e).addElement)}};ElementObserver.prototype.matchElement=function(t){return(this||e).delegate.matchElement(t)};ElementObserver.prototype.matchElementsInTree=function(t){void 0===t&&(t=(this||e).element);return(this||e).delegate.matchElementsInTree(t)};ElementObserver.prototype.processTree=function(t,r){for(var n=0,o=this.matchElementsInTree(t);n<o.length;n++){var i=o[n];r.call(this||e,i)}};ElementObserver.prototype.elementFromNode=function(e){if(e.nodeType==Node.ELEMENT_NODE)return e};ElementObserver.prototype.elementIsActive=function(t){return t.isConnected==(this||e).element.isConnected&&(this||e).element.contains(t)};ElementObserver.prototype.addElement=function(t){if(!(this||e).elements.has(t)&&this.elementIsActive(t)){(this||e).elements.add(t);(this||e).delegate.elementMatched&&(this||e).delegate.elementMatched(t)}};ElementObserver.prototype.removeElement=function(t){if((this||e).elements.has(t)){(this||e).elements.delete(t);(this||e).delegate.elementUnmatched&&(this||e).delegate.elementUnmatched(t)}};return ElementObserver}();var l=function(){function AttributeObserver(t,r,n){(this||e).attributeName=r;(this||e).delegate=n;(this||e).elementObserver=new c(t,this||e)}Object.defineProperty(AttributeObserver.prototype,"element",{get:function(){return(this||e).elementObserver.element},enumerable:true,configurable:true});Object.defineProperty(AttributeObserver.prototype,"selector",{get:function(){return"["+(this||e).attributeName+"]"},enumerable:true,configurable:true});AttributeObserver.prototype.start=function(){(this||e).elementObserver.start()};AttributeObserver.prototype.stop=function(){(this||e).elementObserver.stop()};AttributeObserver.prototype.refresh=function(){(this||e).elementObserver.refresh()};Object.defineProperty(AttributeObserver.prototype,"started",{get:function(){return(this||e).elementObserver.started},enumerable:true,configurable:true});AttributeObserver.prototype.matchElement=function(t){return t.hasAttribute((this||e).attributeName)};AttributeObserver.prototype.matchElementsInTree=function(t){var r=this.matchElement(t)?[t]:[];var n=Array.from(t.querySelectorAll((this||e).selector));return r.concat(n)};AttributeObserver.prototype.elementMatched=function(t){(this||e).delegate.elementMatchedAttribute&&(this||e).delegate.elementMatchedAttribute(t,(this||e).attributeName)};AttributeObserver.prototype.elementUnmatched=function(t){(this||e).delegate.elementUnmatchedAttribute&&(this||e).delegate.elementUnmatchedAttribute(t,(this||e).attributeName)};AttributeObserver.prototype.elementAttributeChanged=function(t,r){(this||e).delegate.elementAttributeValueChanged&&(this||e).attributeName==r&&(this||e).delegate.elementAttributeValueChanged(t,r)};return AttributeObserver}();function add(e,t,r){fetch(e,t).add(r)}function del(e,t,r){fetch(e,t).delete(r);prune(e,t)}function fetch(e,t){var r=e.get(t);if(!r){r=new Set;e.set(t,r)}return r}function prune(e,t){var r=e.get(t);null!=r&&0==r.size&&e.delete(t)}var p=function(){function Multimap(){(this||e).valuesByKey=new Map}Object.defineProperty(Multimap.prototype,"values",{get:function(){var t=Array.from((this||e).valuesByKey.values());return t.reduce((function(e,t){return e.concat(Array.from(t))}),[])},enumerable:true,configurable:true});Object.defineProperty(Multimap.prototype,"size",{get:function(){var t=Array.from((this||e).valuesByKey.values());return t.reduce((function(e,t){return e+t.size}),0)},enumerable:true,configurable:true});Multimap.prototype.add=function(t,r){add((this||e).valuesByKey,t,r)};Multimap.prototype.delete=function(t,r){del((this||e).valuesByKey,t,r)};Multimap.prototype.has=function(t,r){var n=(this||e).valuesByKey.get(t);return null!=n&&n.has(r)};Multimap.prototype.hasKey=function(t){return(this||e).valuesByKey.has(t)};Multimap.prototype.hasValue=function(t){var r=Array.from((this||e).valuesByKey.values());return r.some((function(e){return e.has(t)}))};Multimap.prototype.getValuesForKey=function(t){var r=(this||e).valuesByKey.get(t);return r?Array.from(r):[]};Multimap.prototype.getKeysForValue=function(t){return Array.from((this||e).valuesByKey).filter((function(e){var r=e[0],n=e[1];return n.has(t)})).map((function(e){var t=e[0],r=e[1];return t}))};return Multimap}();var f=void 0&&(void 0).__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(r,n){t(r,n);function __(){(this||e).constructor=r}r.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}();var h=function(t){f(IndexedMultimap,t);function IndexedMultimap(){var r=t.call(this||e)||this||e;r.keysByValue=new Map;return r}Object.defineProperty(IndexedMultimap.prototype,"values",{get:function(){return Array.from((this||e).keysByValue.keys())},enumerable:true,configurable:true});IndexedMultimap.prototype.add=function(r,n){t.prototype.add.call(this||e,r,n);add((this||e).keysByValue,n,r)};IndexedMultimap.prototype.delete=function(r,n){t.prototype.delete.call(this||e,r,n);del((this||e).keysByValue,n,r)};IndexedMultimap.prototype.hasValue=function(t){return(this||e).keysByValue.has(t)};IndexedMultimap.prototype.getKeysForValue=function(t){var r=(this||e).keysByValue.get(t);return r?Array.from(r):[]};return IndexedMultimap}(p);var d=function(){function TokenListObserver(t,r,n){(this||e).attributeObserver=new l(t,r,this||e);(this||e).delegate=n;(this||e).tokensByElement=new p}Object.defineProperty(TokenListObserver.prototype,"started",{get:function(){return(this||e).attributeObserver.started},enumerable:true,configurable:true});TokenListObserver.prototype.start=function(){(this||e).attributeObserver.start()};TokenListObserver.prototype.stop=function(){(this||e).attributeObserver.stop()};TokenListObserver.prototype.refresh=function(){(this||e).attributeObserver.refresh()};Object.defineProperty(TokenListObserver.prototype,"element",{get:function(){return(this||e).attributeObserver.element},enumerable:true,configurable:true});Object.defineProperty(TokenListObserver.prototype,"attributeName",{get:function(){return(this||e).attributeObserver.attributeName},enumerable:true,configurable:true});TokenListObserver.prototype.elementMatchedAttribute=function(e){this.tokensMatched(this.readTokensForElement(e))};TokenListObserver.prototype.elementAttributeValueChanged=function(e){var t=this.refreshTokensForElement(e),r=t[0],n=t[1];this.tokensUnmatched(r);this.tokensMatched(n)};TokenListObserver.prototype.elementUnmatchedAttribute=function(t){this.tokensUnmatched((this||e).tokensByElement.getValuesForKey(t))};TokenListObserver.prototype.tokensMatched=function(t){var r=this||e;t.forEach((function(e){return r.tokenMatched(e)}))};TokenListObserver.prototype.tokensUnmatched=function(t){var r=this||e;t.forEach((function(e){return r.tokenUnmatched(e)}))};TokenListObserver.prototype.tokenMatched=function(t){(this||e).delegate.tokenMatched(t);(this||e).tokensByElement.add(t.element,t)};TokenListObserver.prototype.tokenUnmatched=function(t){(this||e).delegate.tokenUnmatched(t);(this||e).tokensByElement.delete(t.element,t)};TokenListObserver.prototype.refreshTokensForElement=function(t){var r=(this||e).tokensByElement.getValuesForKey(t);var n=this.readTokensForElement(t);var o=zip(r,n).findIndex((function(e){var t=e[0],r=e[1];return!tokensAreEqual(t,r)}));return-1==o?[[],[]]:[r.slice(o),n.slice(o)]};TokenListObserver.prototype.readTokensForElement=function(t){var r=(this||e).attributeName;var n=t.getAttribute(r)||"";return parseTokenString(n,t,r)};return TokenListObserver}();function parseTokenString(e,t,r){return e.trim().split(/\s+/).filter((function(e){return e.length})).map((function(e,n){return{element:t,attributeName:r,content:e,index:n}}))}function zip(e,t){var r=Math.max(e.length,t.length);return Array.from({length:r},(function(r,n){return[e[n],t[n]]}))}function tokensAreEqual(e,t){return e&&t&&e.index==t.index&&e.content==t.content}var m=function(){function ValueListObserver(t,r,n){(this||e).tokenListObserver=new d(t,r,this||e);(this||e).delegate=n;(this||e).parseResultsByToken=new WeakMap;(this||e).valuesByTokenByElement=new WeakMap}Object.defineProperty(ValueListObserver.prototype,"started",{get:function(){return(this||e).tokenListObserver.started},enumerable:true,configurable:true});ValueListObserver.prototype.start=function(){(this||e).tokenListObserver.start()};ValueListObserver.prototype.stop=function(){(this||e).tokenListObserver.stop()};ValueListObserver.prototype.refresh=function(){(this||e).tokenListObserver.refresh()};Object.defineProperty(ValueListObserver.prototype,"element",{get:function(){return(this||e).tokenListObserver.element},enumerable:true,configurable:true});Object.defineProperty(ValueListObserver.prototype,"attributeName",{get:function(){return(this||e).tokenListObserver.attributeName},enumerable:true,configurable:true});ValueListObserver.prototype.tokenMatched=function(t){var r=t.element;var n=this.fetchParseResultForToken(t).value;if(n){this.fetchValuesByTokenForElement(r).set(t,n);(this||e).delegate.elementMatchedValue(r,n)}};ValueListObserver.prototype.tokenUnmatched=function(t){var r=t.element;var n=this.fetchParseResultForToken(t).value;if(n){this.fetchValuesByTokenForElement(r).delete(t);(this||e).delegate.elementUnmatchedValue(r,n)}};ValueListObserver.prototype.fetchParseResultForToken=function(t){var r=(this||e).parseResultsByToken.get(t);if(!r){r=this.parseToken(t);(this||e).parseResultsByToken.set(t,r)}return r};ValueListObserver.prototype.fetchValuesByTokenForElement=function(t){var r=(this||e).valuesByTokenByElement.get(t);if(!r){r=new Map;(this||e).valuesByTokenByElement.set(t,r)}return r};ValueListObserver.prototype.parseToken=function(t){try{var r=(this||e).delegate.parseValueForToken(t);return{value:r}}catch(e){return{error:e}}};return ValueListObserver}();var b=function(){function BindingObserver(t,r){(this||e).context=t;(this||e).delegate=r;(this||e).bindingsByAction=new Map}BindingObserver.prototype.start=function(){if(!(this||e).valueListObserver){(this||e).valueListObserver=new m((this||e).element,(this||e).actionAttribute,this||e);(this||e).valueListObserver.start()}};BindingObserver.prototype.stop=function(){if((this||e).valueListObserver){(this||e).valueListObserver.stop();delete(this||e).valueListObserver;this.disconnectAllActions()}};Object.defineProperty(BindingObserver.prototype,"element",{get:function(){return(this||e).context.element},enumerable:true,configurable:true});Object.defineProperty(BindingObserver.prototype,"identifier",{get:function(){return(this||e).context.identifier},enumerable:true,configurable:true});Object.defineProperty(BindingObserver.prototype,"actionAttribute",{get:function(){return(this||e).schema.actionAttribute},enumerable:true,configurable:true});Object.defineProperty(BindingObserver.prototype,"schema",{get:function(){return(this||e).context.schema},enumerable:true,configurable:true});Object.defineProperty(BindingObserver.prototype,"bindings",{get:function(){return Array.from((this||e).bindingsByAction.values())},enumerable:true,configurable:true});BindingObserver.prototype.connectAction=function(t){var r=new u((this||e).context,t);(this||e).bindingsByAction.set(t,r);(this||e).delegate.bindingConnected(r)};BindingObserver.prototype.disconnectAction=function(t){var r=(this||e).bindingsByAction.get(t);if(r){(this||e).bindingsByAction.delete(t);(this||e).delegate.bindingDisconnected(r)}};BindingObserver.prototype.disconnectAllActions=function(){var t=this||e;(this||e).bindings.forEach((function(e){return t.delegate.bindingDisconnected(e)}));(this||e).bindingsByAction.clear()};BindingObserver.prototype.parseValueForToken=function(t){var r=i.forToken(t);if(r.identifier==(this||e).identifier)return r};BindingObserver.prototype.elementMatchedValue=function(e,t){this.connectAction(t)};BindingObserver.prototype.elementUnmatchedValue=function(e,t){this.disconnectAction(t)};return BindingObserver}();var v=function(){function Context(t,r){(this||e).module=t;(this||e).scope=r;(this||e).controller=new t.controllerConstructor(this||e);(this||e).bindingObserver=new b(this||e,(this||e).dispatcher);try{(this||e).controller.initialize()}catch(e){this.handleError(e,"initializing controller")}}Context.prototype.connect=function(){(this||e).bindingObserver.start();try{(this||e).controller.connect()}catch(e){this.handleError(e,"connecting controller")}};Context.prototype.disconnect=function(){try{(this||e).controller.disconnect()}catch(e){this.handleError(e,"disconnecting controller")}(this||e).bindingObserver.stop()};Object.defineProperty(Context.prototype,"application",{get:function(){return(this||e).module.application},enumerable:true,configurable:true});Object.defineProperty(Context.prototype,"identifier",{get:function(){return(this||e).module.identifier},enumerable:true,configurable:true});Object.defineProperty(Context.prototype,"schema",{get:function(){return(this||e).application.schema},enumerable:true,configurable:true});Object.defineProperty(Context.prototype,"dispatcher",{get:function(){return(this||e).application.dispatcher},enumerable:true,configurable:true});Object.defineProperty(Context.prototype,"element",{get:function(){return(this||e).scope.element},enumerable:true,configurable:true});Object.defineProperty(Context.prototype,"parentElement",{get:function(){return(this||e).element.parentElement},enumerable:true,configurable:true});Context.prototype.handleError=function(t,r,n){void 0===n&&(n={});var o=this||e,i=o.identifier,s=o.controller,u=o.element;n=Object.assign({identifier:i,controller:s,element:u},n);(this||e).application.handleError(t,"Error "+r,n)};return Context}();var y=void 0&&(void 0).__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(r,n){t(r,n);function __(){(this||e).constructor=r}r.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}();function blessDefinition(e){return{identifier:e.identifier,controllerConstructor:blessControllerConstructor(e.controllerConstructor)}}function blessControllerConstructor(e){var t=g(e);t.bless();return t}var g=function(){function extendWithReflect(t){function Controller(){var r=(this||e)&&(this||e)instanceof Controller?(this||e).constructor:void 0;return Reflect.construct(t,arguments,r)}Controller.prototype=Object.create(t.prototype,{constructor:{value:Controller}});Reflect.setPrototypeOf(Controller,t);return Controller}function testReflectExtension(){var a=function(){(this||e).a.call(this||e)};var t=extendWithReflect(a);t.prototype.a=function(){};return new t}try{testReflectExtension();return extendWithReflect}catch(t){return function(t){return function(t){y(Controller,t);function Controller(){return null!==t&&t.apply(this||e,arguments)||this||e}return Controller}(t)}}}();var O=function(){function Module(t,r){(this||e).application=t;(this||e).definition=blessDefinition(r);(this||e).contextsByScope=new WeakMap;(this||e).connectedContexts=new Set}Object.defineProperty(Module.prototype,"identifier",{get:function(){return(this||e).definition.identifier},enumerable:true,configurable:true});Object.defineProperty(Module.prototype,"controllerConstructor",{get:function(){return(this||e).definition.controllerConstructor},enumerable:true,configurable:true});Object.defineProperty(Module.prototype,"contexts",{get:function(){return Array.from((this||e).connectedContexts)},enumerable:true,configurable:true});Module.prototype.connectContextForScope=function(t){var r=this.fetchContextForScope(t);(this||e).connectedContexts.add(r);r.connect()};Module.prototype.disconnectContextForScope=function(t){var r=(this||e).contextsByScope.get(t);if(r){(this||e).connectedContexts.delete(r);r.disconnect()}};Module.prototype.fetchContextForScope=function(t){var r=(this||e).contextsByScope.get(t);if(!r){r=new v(this||e,t);(this||e).contextsByScope.set(t,r)}return r};return Module}();var E=function(){function DataMap(t){(this||e).scope=t}Object.defineProperty(DataMap.prototype,"element",{get:function(){return(this||e).scope.element},enumerable:true,configurable:true});Object.defineProperty(DataMap.prototype,"identifier",{get:function(){return(this||e).scope.identifier},enumerable:true,configurable:true});DataMap.prototype.get=function(t){t=this.getFormattedKey(t);return(this||e).element.getAttribute(t)};DataMap.prototype.set=function(t,r){t=this.getFormattedKey(t);(this||e).element.setAttribute(t,r);return this.get(t)};DataMap.prototype.has=function(t){t=this.getFormattedKey(t);return(this||e).element.hasAttribute(t)};DataMap.prototype.delete=function(t){if(this.has(t)){t=this.getFormattedKey(t);(this||e).element.removeAttribute(t);return true}return false};DataMap.prototype.getFormattedKey=function(t){return"data-"+(this||e).identifier+"-"+dasherize(t)};return DataMap}();function dasherize(e){return e.replace(/([A-Z])/g,(function(e,t){return"-"+t.toLowerCase()}))}function attributeValueContainsToken(e,t){return"["+e+'~="'+t+'"]'}var A=function(){function TargetSet(t){(this||e).scope=t}Object.defineProperty(TargetSet.prototype,"element",{get:function(){return(this||e).scope.element},enumerable:true,configurable:true});Object.defineProperty(TargetSet.prototype,"identifier",{get:function(){return(this||e).scope.identifier},enumerable:true,configurable:true});Object.defineProperty(TargetSet.prototype,"schema",{get:function(){return(this||e).scope.schema},enumerable:true,configurable:true});TargetSet.prototype.has=function(e){return null!=this.find(e)};TargetSet.prototype.find=function(){var t=[];for(var r=0;r<arguments.length;r++)t[r]=arguments[r];var n=this.getSelectorForTargetNames(t);return(this||e).scope.findElement(n)};TargetSet.prototype.findAll=function(){var t=[];for(var r=0;r<arguments.length;r++)t[r]=arguments[r];var n=this.getSelectorForTargetNames(t);return(this||e).scope.findAllElements(n)};TargetSet.prototype.getSelectorForTargetNames=function(t){var r=this||e;return t.map((function(e){return r.getSelectorForTargetName(e)})).join(", ")};TargetSet.prototype.getSelectorForTargetName=function(t){var r=(this||e).identifier+"."+t;return attributeValueContainsToken((this||e).schema.targetAttribute,r)};return TargetSet}();var B=function(){function Scope(t,r,n){(this||e).schema=t;(this||e).identifier=r;(this||e).element=n;(this||e).targets=new A(this||e);(this||e).data=new E(this||e)}Scope.prototype.findElement=function(e){return this.findAllElements(e)[0]};Scope.prototype.findAllElements=function(t){var r=(this||e).element.matches(t)?[(this||e).element]:[];var n=this.filterElements(Array.from((this||e).element.querySelectorAll(t)));return r.concat(n)};Scope.prototype.filterElements=function(t){var r=this||e;return t.filter((function(e){return r.containsElement(e)}))};Scope.prototype.containsElement=function(t){return t.closest((this||e).controllerSelector)===(this||e).element};Object.defineProperty(Scope.prototype,"controllerSelector",{get:function(){return attributeValueContainsToken((this||e).schema.controllerAttribute,(this||e).identifier)},enumerable:true,configurable:true});return Scope}();var k=function(){function ScopeObserver(t,r,n){(this||e).element=t;(this||e).schema=r;(this||e).delegate=n;(this||e).valueListObserver=new m((this||e).element,(this||e).controllerAttribute,this||e);(this||e).scopesByIdentifierByElement=new WeakMap;(this||e).scopeReferenceCounts=new WeakMap}ScopeObserver.prototype.start=function(){(this||e).valueListObserver.start()};ScopeObserver.prototype.stop=function(){(this||e).valueListObserver.stop()};Object.defineProperty(ScopeObserver.prototype,"controllerAttribute",{get:function(){return(this||e).schema.controllerAttribute},enumerable:true,configurable:true});ScopeObserver.prototype.parseValueForToken=function(t){var r=t.element,n=t.content;var o=this.fetchScopesByIdentifierForElement(r);var i=o.get(n);if(!i){i=new B((this||e).schema,n,r);o.set(n,i)}return i};ScopeObserver.prototype.elementMatchedValue=function(t,r){var n=((this||e).scopeReferenceCounts.get(r)||0)+1;(this||e).scopeReferenceCounts.set(r,n);1==n&&(this||e).delegate.scopeConnected(r)};ScopeObserver.prototype.elementUnmatchedValue=function(t,r){var n=(this||e).scopeReferenceCounts.get(r);if(n){(this||e).scopeReferenceCounts.set(r,n-1);1==n&&(this||e).delegate.scopeDisconnected(r)}};ScopeObserver.prototype.fetchScopesByIdentifierForElement=function(t){var r=(this||e).scopesByIdentifierByElement.get(t);if(!r){r=new Map;(this||e).scopesByIdentifierByElement.set(t,r)}return r};return ScopeObserver}();var T=function(){function Router(t){(this||e).application=t;(this||e).scopeObserver=new k((this||e).element,(this||e).schema,this||e);(this||e).scopesByIdentifier=new p;(this||e).modulesByIdentifier=new Map}Object.defineProperty(Router.prototype,"element",{get:function(){return(this||e).application.element},enumerable:true,configurable:true});Object.defineProperty(Router.prototype,"schema",{get:function(){return(this||e).application.schema},enumerable:true,configurable:true});Object.defineProperty(Router.prototype,"controllerAttribute",{get:function(){return(this||e).schema.controllerAttribute},enumerable:true,configurable:true});Object.defineProperty(Router.prototype,"modules",{get:function(){return Array.from((this||e).modulesByIdentifier.values())},enumerable:true,configurable:true});Object.defineProperty(Router.prototype,"contexts",{get:function(){return(this||e).modules.reduce((function(e,t){return e.concat(t.contexts)}),[])},enumerable:true,configurable:true});Router.prototype.start=function(){(this||e).scopeObserver.start()};Router.prototype.stop=function(){(this||e).scopeObserver.stop()};Router.prototype.loadDefinition=function(t){this.unloadIdentifier(t.identifier);var r=new O((this||e).application,t);this.connectModule(r)};Router.prototype.unloadIdentifier=function(t){var r=(this||e).modulesByIdentifier.get(t);r&&this.disconnectModule(r)};Router.prototype.getContextForElementAndIdentifier=function(t,r){var n=(this||e).modulesByIdentifier.get(r);if(n)return n.contexts.find((function(e){return e.element==t}))};Router.prototype.handleError=function(t,r,n){(this||e).application.handleError(t,r,n)};Router.prototype.scopeConnected=function(t){(this||e).scopesByIdentifier.add(t.identifier,t);var r=(this||e).modulesByIdentifier.get(t.identifier);r&&r.connectContextForScope(t)};Router.prototype.scopeDisconnected=function(t){(this||e).scopesByIdentifier.delete(t.identifier,t);var r=(this||e).modulesByIdentifier.get(t.identifier);r&&r.disconnectContextForScope(t)};Router.prototype.connectModule=function(t){(this||e).modulesByIdentifier.set(t.identifier,t);var r=(this||e).scopesByIdentifier.getValuesForKey(t.identifier);r.forEach((function(e){return t.connectContextForScope(e)}))};Router.prototype.disconnectModule=function(t){(this||e).modulesByIdentifier.delete(t.identifier);var r=(this||e).scopesByIdentifier.getValuesForKey(t.identifier);r.forEach((function(e){return t.disconnectContextForScope(e)}))};return Router}();var C={controllerAttribute:"data-controller",actionAttribute:"data-action",targetAttribute:"data-target"};var x=void 0&&(void 0).__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){i(e)}}function step(e){e.done?o(e.value):new r((function(t){t(e.value)})).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};var M=void 0&&(void 0).__generator||function(t,r){var n={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},o,i,s,u;return u={next:verb(0),throw:verb(1),return:verb(2)},"function"===typeof Symbol&&(u[Symbol.iterator]=function(){return this||e}),u;function verb(e){return function(t){return step([e,t])}}function step(e){if(o)throw new TypeError("Generator is already executing.");while(n)try{if(o=1,i&&(s=i[2&e[0]?"return":e[0]?"throw":"next"])&&!(s=s.call(i,e[1])).done)return s;(i=0,s)&&(e=[0,s.value]);switch(e[0]){case 0:case 1:s=e;break;case 4:n.label++;return{value:e[1],done:false};case 5:n.label++;i=e[1];e=[0];continue;case 7:e=n.ops.pop();n.trys.pop();continue;default:if(!(s=n.trys,s=s.length>0&&s[s.length-1])&&(6===e[0]||2===e[0])){n=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){n.label=e[1];break}if(6===e[0]&&n.label<s[1]){n.label=s[1];s=e;break}if(s&&n.label<s[2]){n.label=s[2];n.ops.push(e);break}s[2]&&n.ops.pop();n.trys.pop();continue}e=r.call(t,n)}catch(t){e=[6,t];i=0}finally{o=s=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:true}}};var w=function(){function Application(t,r){void 0===t&&(t=document.documentElement);void 0===r&&(r=C);(this||e).element=t;(this||e).schema=r;(this||e).dispatcher=new n(this||e);(this||e).router=new T(this||e)}Application.start=function(e,t){var r=new Application(e,t);r.start();return r};Application.prototype.start=function(){return x(this||e,void 0,void 0,(function(){return M(this||e,(function(t){switch(t.label){case 0:return[4,domReady()];case 1:t.sent();(this||e).router.start();(this||e).dispatcher.start();return[2]}}))}))};Application.prototype.stop=function(){(this||e).router.stop();(this||e).dispatcher.stop()};Application.prototype.register=function(e,t){this.load({identifier:e,controllerConstructor:t})};Application.prototype.load=function(t){var r=this||e;var n=[];for(var o=1;o<arguments.length;o++)n[o-1]=arguments[o];var i=Array.isArray(t)?t:[t].concat(n);i.forEach((function(e){return r.router.loadDefinition(e)}))};Application.prototype.unload=function(t){var r=this||e;var n=[];for(var o=1;o<arguments.length;o++)n[o-1]=arguments[o];var i=Array.isArray(t)?t:[t].concat(n);i.forEach((function(e){return r.router.unloadIdentifier(e)}))};Object.defineProperty(Application.prototype,"controllers",{get:function(){return(this||e).router.contexts.map((function(e){return e.controller}))},enumerable:true,configurable:true});Application.prototype.getControllerForElementAndIdentifier=function(t,r){var n=(this||e).router.getContextForElementAndIdentifier(t,r);return n?n.controller:null};Application.prototype.handleError=function(e,t,r){console.error("%s\n\n%o\n\n%o",t,e,r)};return Application}();function domReady(){return new Promise((function(e){"loading"==document.readyState?document.addEventListener("DOMContentLoaded",e):e()}))}function defineTargetProperties(t){var r=t.prototype;var n=getTargetNamesForConstructor(t);n.forEach((function(t){var n;return defineLinkedProperties(r,(n={},n[t+"Target"]={get:function(){var r=(this||e).targets.find(t);if(r)return r;throw new Error('Missing target element "'+(this||e).identifier+"."+t+'"')}},n[t+"Targets"]={get:function(){return(this||e).targets.findAll(t)}},n["has"+capitalize(t)+"Target"]={get:function(){return(this||e).targets.has(t)}},n))}))}function getTargetNamesForConstructor(e){var t=getAncestorsForConstructor(e);return Array.from(t.reduce((function(e,t){getOwnTargetNamesForConstructor(t).forEach((function(t){return e.add(t)}));return e}),new Set))}function getAncestorsForConstructor(e){var t=[];while(e){t.push(e);e=Object.getPrototypeOf(e)}return t}function getOwnTargetNamesForConstructor(e){var t=e["targets"];return Array.isArray(t)?t:[]}function defineLinkedProperties(e,t){Object.keys(t).forEach((function(r){if(!(r in e)){var n=t[r];Object.defineProperty(e,r,n)}}))}function capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}var L=function(){function Controller(t){(this||e).context=t}Controller.bless=function(){defineTargetProperties(this||e)};Object.defineProperty(Controller.prototype,"application",{get:function(){return(this||e).context.application},enumerable:true,configurable:true});Object.defineProperty(Controller.prototype,"scope",{get:function(){return(this||e).context.scope},enumerable:true,configurable:true});Object.defineProperty(Controller.prototype,"element",{get:function(){return(this||e).scope.element},enumerable:true,configurable:true});Object.defineProperty(Controller.prototype,"identifier",{get:function(){return(this||e).scope.identifier},enumerable:true,configurable:true});Object.defineProperty(Controller.prototype,"targets",{get:function(){return(this||e).scope.targets},enumerable:true,configurable:true});Object.defineProperty(Controller.prototype,"data",{get:function(){return(this||e).scope.data},enumerable:true,configurable:true});Controller.prototype.initialize=function(){};Controller.prototype.connect=function(){};Controller.prototype.disconnect=function(){};Controller.targets=[];return Controller}();t.Application=w;t.Context=v;t.Controller=L;t.defaultSchema=C;Object.defineProperty(t,"__esModule",{value:true})}));const r=t.Application,n=t.Context,o=t.Controller,i=t.defaultSchema,s=t.__esModule;export default t;export{r as Application,n as Context,o as Controller,s as __esModule,i as defaultSchema};
