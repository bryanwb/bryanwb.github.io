(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{271:function(e,t,r){"use strict";r.r(t);var n=r(23),o=r.n(n),i=r(0),a=r.n(i),s=r(282),l=Object(s.a)("button",{target:"eabt6gu0"})("margin-left:0.1em;margin-right:0.1em;border-radius:4px;cursor:pointer;text-align:center;outline:none !important;::-moz-focus-inner{border:0;}background-color:",function(e){return e.bgColor},";font-weight:",function(e){return e.fontWeight},";"),c=function(e){function t(){return e.apply(this,arguments)||this}o()(t,e);var r=t.prototype;return r.showIfSelected=function(e,t){var r="#f7f7f7",n="normal";return e===t&&(r="#e6ebf5",n="bold"),[r,n]},r.render=function(){var e=this;return a.a.createElement("div",{style:{marginRight:"1em"}},a.a.createElement("span",{style:{marginRight:"0.2em"}},"Zoom"),this.props.ranges.map(function(t){var r=e.showIfSelected(t,e.props.current),n=r[0],o=r[1];return a.a.createElement(l,{key:t,backgroundColor:n,fontWeight:o,onClick:e.props.onClick},t)}))},t}(a.a.Component);t.default=c},282:function(e,t,r){"use strict";var n,o=r(0),i=r.n(o),a=r(136),s=r(4),l=r.n(s),c=r(92),u=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|valueLink|accept|acceptCharset|accessKey|action|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class)|(on[A-Z].*)|((data|aria|x)-.*))$/i,p=Object(c.a)(u.test.bind(u)),d="__EMOTION_THEMING__",f=((n={})[d]=l.a.object,n),m=p,h=function(e){return"theme"!==e&&"innerRef"!==e},g=function(){return!0},y=function(e,t){for(var r=2,n=arguments.length;r<n;r++){var o=arguments[r],i=void 0;for(i in o)e(i)&&(t[i]=o[i])}return t};r.d(t,!1,function(){return a.flush}),r.d(t,!1,function(){return a.hydrate}),r.d(t,!1,function(){return a.cx}),r.d(t,!1,function(){return a.merge}),r.d(t,!1,function(){return a.getRegisteredStyles}),r.d(t,!1,function(){return a.injectGlobal}),r.d(t,!1,function(){return a.keyframes}),r.d(t,!1,function(){return a.css}),r.d(t,!1,function(){return a.sheet}),r.d(t,!1,function(){return a.caches});var v=function(e,t){var r=function(n,o){var i,a,s,l;void 0!==o&&(i=o.e,a=o.label,s=o.target,l=n.__emotion_forwardProp&&o.shouldForwardProp?function(e){return n.__emotion_forwardProp(e)&&o.shouldForwardProp(e)}:o.shouldForwardProp);var c=n.__emotion_real===n,u=void 0===i&&c&&n.__emotion_base||n;return"function"!=typeof l&&(l="string"==typeof u&&u.charAt(0)===u.charAt(0).toLowerCase()?m:h),function(){var p=arguments,m=c&&void 0!==n.__emotion_styles?n.__emotion_styles.slice(0):[];if(void 0!==a&&m.push("label:"+a+";"),void 0===i)if(null==p[0]||void 0===p[0].raw)m.push.apply(m,p);else{m.push(p[0][0]);for(var h=p.length,v=1;v<h;v++)m.push(p[v],p[0][v])}var b=function(r){var n,o;function a(){return r.apply(this,arguments)||this}o=r,(n=a).prototype=Object.create(o.prototype),n.prototype.constructor=n,n.__proto__=o;var c=a.prototype;return c.componentWillMount=function(){void 0!==this.context[d]&&(this.unsubscribe=this.context[d].subscribe(function(e){this.setState({theme:e})}.bind(this)))},c.componentWillUnmount=function(){void 0!==this.unsubscribe&&this.context[d].unsubscribe(this.unsubscribe)},c.render=function(){var r=this.props,n=this.state;this.mergedProps=y(g,{},r,{theme:null!==n&&n.theme||r.theme||{}});var o="",a=[];return r.className&&(o+=void 0===i?e.getRegisteredStyles(a,r.className):r.className+" "),o+=void 0===i?e.css.apply(this,m.concat(a)):i,void 0!==s&&(o+=" "+s),t.createElement(u,y(l,{},r,{className:o,ref:r.innerRef}))},a}(t.Component);return b.displayName=void 0!==a?a:"Styled("+("string"==typeof u?u:u.displayName||u.name||"Component")+")",void 0!==n.defaultProps&&(b.defaultProps=n.defaultProps),b.contextTypes=f,b.__emotion_styles=m,b.__emotion_base=u,b.__emotion_real=b,b.__emotion_forwardProp=l,Object.defineProperty(b,"toString",{value:function(){return"."+s}}),b.withComponent=function(e,t){return r(e,void 0!==t?y(g,{},o,t):o).apply(void 0,m)},b}};return r}(a,i.a);t.a=v}}]);
//# sourceMappingURL=component---src-pages-projects-bitcoinvsgold-components-zoom-buttons-js-b81393e65c6e14473716.js.map