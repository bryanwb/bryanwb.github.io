(window.webpackJsonp=window.webpackJsonp||[]).push([[13,15],{264:function(t,e,r){"use strict";r.r(e),r.d(e,"commarize",function(){return a}),r.d(e,"formatNum",function(){return n}),r(292),r(146),r(293);var a=function(t){if(t>=1e3){var e=3*Math.floor((t.toFixed(0).length-1)/3);return(t/Number("1e"+e)).toFixed(1)+" "+["k","M","Billion","Trillion"][Math.floor(e/3)-1]}return t.toFixed(2)},n=function(t,e){var r=e.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g,"$1,");return t.measure&&(r+=t.measure),r}},265:function(t,e,r){"use strict";r.r(e);var a=r(23),n=r.n(a),o=r(0),i=r.n(o),s=r(303),l=r(302),u=function(t){function e(e){var r;return(r=t.call(this,e)||this).state={datum:e.datum},r}return n()(e,t),e.prototype.render=function(){var t=this.props,e=t.margin,r=t.width,a=t.height,n=(t.datum,t.coords),o=t.show;return t.symbols,o&&n&&i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{key:"crosshairs-horizontal",from:new l.a({x:0,y:n.y-e.top}),to:new l.a({x:r-e.left-e.right,y:n.y-e.top}),strokeDasharray:[4]}),i.a.createElement(s.a,{key:"crosshairs-vertical",from:new l.a({x:n.x-e.left,y:0}),to:new l.a({x:n.x-e.left,y:a-e.top-e.bottom}),strokeDasharray:[4]}))},e}(i.a.Component);e.default=u},266:function(t,e,r){"use strict";r.r(e);var a=r(23),n=r.n(a),o=(r(286),r(0)),i=r.n(o),s=r(264),l=function(t){function e(){return t.apply(this,arguments)||this}return n()(e,t),e.prototype.render=function(){var t=this.props,e=t.datum,r=t.symbols;return e&&i.a.createElement("div",null,i.a.createElement("div",null,e.date.toDateString()),r.map(function(t){return function(t,e){return i.a.createElement("div",{key:t.name},i.a.createElement("div",null,i.a.createElement("span",{style:{color:t.color}},"●")," ",t.name),i.a.createElement("div",null," Price (USD): ",Object(s.formatNum)(t,e[t.name].close)),e[t.name].cap&&i.a.createElement("div",null," Market Cap (USD): ",Object(s.commarize)(e[t.name].cap)))}(t,e)}))},e}(i.a.Component);e.default=l},268:function(t,e,r){"use strict";r.r(e),r(318),r(286),r(319);var a=r(23),n=r.n(a),o=r(0),i=r.n(o),s=r(4),l=r.n(s),u=r(305),c=r(369),h=r(370),d=r(330),m=r(303),f=r(287),p=r(368),g=r(282),b=r(265),v=r(266),y=(r(338),r(364)),w=r.n(y),D=r(373),k=Object(g.a)("rect",{target:"epdy6ir0"})("cursor:crosshair;visibility:hidden;:active{cursor:grab;}"),E=function(t){function e(e){var r;return(r=t.call(this,e)||this).componentWillMount=function(){r.unlockCrosshairs=w()(function(){return r.crosshairsLock=!1},10)},r.handleMouseOver=function(t,e){if(!r.state.isDragging){r.unlockCrosshairs.cancel();var a=Object(p.a)(e.target.ownerSVGElement,e),n=t(a.x);r.crosshairsLock=!0,r.setState(function(t){return{isDragging:t.isDragging,datum:n,crosshairsCoords:a,showCrosshairs:!0}}),r.props.showTooltip({tooltipLeft:a.x,tooltipTop:a.y,tooltipData:n}),r.unlockCrosshairs()}},r.handleMouseOut=function(t){r.crosshairsLock||(r.setState(function(t){return{isDragging:t.isDragging,datum:t.datum,showCrosshairs:!1}}),t())},r.handleDragStart=function(t){t.preventDefault(),r.setState({isDragging:!0})},r.handleDrag=function(t,e,a){if(r.state.isDragging){a.preventDefault();var n=-Math.sign(a.movementX),o=Math.ceil(Math.abs(a.movementX)/Math.floor(e));o>0&&t(n*o)}},r.handleDragEnd=function(t){t.preventDefault(),r.state.isDragging&&r.setState({isDragging:!1})},r.state={isDragging:!1,datum:null,crosshairsCoords:null,showCrosshairs:!1},r.crosshairsLock=!1,r}return n()(e,t),e.prototype.render=function(){var t=this,e=this.props,r=e.width,a=e.height,n=e.margin,o=e.data,s=(e.shift,e.symbols),l=e.tooltipData,p=e.tooltipTop,g=e.tooltipLeft,y=e.tooltipOpen,w=e.hideTooltip,E=r-n.left-n.right,M=a-n.top-n.bottom,C=function(t){return new Date(t.date)},x=Object(d.b)({range:[0,E],domain:Object(f.d)(o,C)}),O=Object(d.a)({range:[M,0],domain:[0,Object(f.e)(o,function(t){return Math.max.apply(Math,s.map(function(e){return t[e.name].close}))})]}),S=function(t){var e=x.invert(t-n.left);e.setUTCHours(0),e.setUTCMinutes(0),e.setUTCSeconds(0);var r=o.findIndex(function(t){return t.date.valueOf()>=e.valueOf()});return-1===r?(console.log("Could not find matching data point for "+e),null):o[r]},T=x(o[1].date)-x(o[0].date),j=this.props.shiftCb,F=this.handleDrag.bind(this,j,T),L=this.props.highlightedLine;return i.a.createElement(i.a.Fragment,null,i.a.createElement("svg",{width:r,height:a},i.a.createElement(u.a,{top:n.top,left:n.left,style:{cursor:"crosshair"}},i.a.createElement(k,{width:r,height:a,onMouseMove:function(t){return F(t)},onMouseUp:this.handleDragEnd,onMouseDown:this.handleDragStart,onWheel:this.props.onScroll}),s.map(function(e){return function(e,r){var a=L===e.name?6:2;return i.a.createElement(m.b,{key:e.name,data:r,xScale:x,yScale:O,x:C,y:function(t){return t[e.name].close},stroke:e.color,strokeWidth:a,onMouseOver:function(){return function(e){return t.handleMouseOver(S,e)}},onMouseOut:function(){return function(){return t.handleMouseOut(w)}},style:{pointerEvents:"all"}})}(e,o)}),i.a.createElement(b.default,{margin:n,width:r,height:a,show:this.state.showCrosshairs,coords:this.state.crosshairsCoords,datum:this.state.datum}),i.a.createElement(c.a,{xScale:x,yScale:O,width:r-n.left-n.right,height:a-n.top-n.bottom}),i.a.createElement(h.a,{scale:x,top:M,stroke:"#1b1a1e",tickTextFill:"#1b1a1e"}),i.a.createElement(h.b,{scale:O,top:0,left:r-n.left-n.right,label:"Close Price ($)",labelOffset:50,labelProps:{fontSize:15},stroke:"#1b1a1e",tickTextFill:"#1b1a1e"}))),y&&i.a.createElement(D.a,{key:Math.random(),top:p,left:g},i.a.createElement(v.default,{symbols:s,datum:l})))},e}(i.a.Component);E.propTypes={data:l.a.array.isRequired,symbols:l.a.array.isRequired,width:l.a.number.isRequired,height:l.a.number.isRequired,shiftCb:l.a.func,showMarketCap:l.a.bool,margin:l.a.object.isRequired,highlightedLine:l.a.string,onScroll:l.a.func};var M=Object(D.b)(E);e.default=M}}]);
//# sourceMappingURL=component---src-pages-projects-bitcoinvsgold-components-chart-js-3c07121d7d9472739255.js.map