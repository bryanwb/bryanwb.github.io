(window.webpackJsonp=window.webpackJsonp||[]).push([[13,15],{264:function(t,e,a){"use strict";a.r(e),a.d(e,"commarize",function(){return r}),a.d(e,"formatNum",function(){return n}),a(292),a(146),a(293);var r=function(t){if(t>=1e3){var e=3*Math.floor((t.toFixed(0).length-1)/3);return(t/Number("1e"+e)).toFixed(1)+" "+["k","M","Billion","Trillion"][Math.floor(e/3)-1]}return t.toFixed(2)},n=function(t,e){var a=e.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g,"$1,");return t.measure&&(a+=t.measure),a}},265:function(t,e,a){"use strict";a.r(e);var r=a(23),n=a.n(r),o=a(0),i=a.n(o),s=a(303),l=a(302),u=function(t){function e(e){var a;return(a=t.call(this,e)||this).state={datum:e.datum},a}return n()(e,t),e.prototype.render=function(){var t=this.props,e=t.margin,a=t.width,r=t.height,n=(t.datum,t.coords),o=t.show;return t.symbols,o&&n&&i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{key:"crosshairs-horizontal",from:new l.a({x:0,y:n.y-e.top}),to:new l.a({x:a-e.left-e.right,y:n.y-e.top}),strokeDasharray:[4]}),i.a.createElement(s.a,{key:"crosshairs-vertical",from:new l.a({x:n.x-e.left,y:0}),to:new l.a({x:n.x-e.left,y:r-e.top-e.bottom}),strokeDasharray:[4]}))},e}(i.a.Component);e.default=u},266:function(t,e,a){"use strict";a.r(e);var r=a(23),n=a.n(r),o=(a(286),a(0)),i=a.n(o),s=a(264),l=function(t){function e(){return t.apply(this,arguments)||this}return n()(e,t),e.prototype.render=function(){var t=this.props,e=t.datum,a=t.symbols;return e&&i.a.createElement("div",null,i.a.createElement("div",null,e.date.toDateString()),a.map(function(t){return function(t,e){return i.a.createElement("div",{key:t.name},i.a.createElement("div",null,i.a.createElement("span",{style:{color:t.color}},"●")," ",t.name),i.a.createElement("div",null," Price (USD): ",Object(s.formatNum)(t,e[t.name].close)),e[t.name].cap&&i.a.createElement("div",null," Market Cap (USD): ",Object(s.commarize)(e[t.name].cap)))}(t,e)}))},e}(i.a.Component);e.default=l},268:function(t,e,a){"use strict";a.r(e),a(318),a(286),a(319);var r=a(23),n=a.n(r),o=a(0),i=a.n(o),s=a(4),l=a.n(s),u=a(305),c=a(369),h=a(370),d=a(330),m=a(303),f=a(287),p=a(368),g=a(282),b=a(265),v=a(266),y=(a(338),a(364)),w=a.n(y),D=a(373),k=Object(g.a)("rect",{target:"epdy6ir0"})("cursor:crosshair;visibility:hidden;:active{cursor:grab;}"),E=function(t){function e(e){var a;return(a=t.call(this,e)||this).componentWillMount=function(){a.unlockCrosshairs=w()(function(){return a.crosshairsLock=!1},10)},a.handleMouseOver=function(t,e){if(!a.state.isDragging){a.unlockCrosshairs.cancel();var r=Object(p.a)(e.target.ownerSVGElement,e),n=t(r.x);a.crosshairsLock=!0,a.setState(function(t){return{isDragging:t.isDragging,datum:n,crosshairsCoords:r,showCrosshairs:!0}}),a.props.showTooltip({tooltipLeft:r.x,tooltipTop:r.y,tooltipData:n}),a.unlockCrosshairs()}},a.handleMouseOut=function(t){a.crosshairsLock||(a.setState(function(t){return{isDragging:t.isDragging,datum:t.datum,showCrosshairs:!1}}),t())},a.handleDragStart=function(t){t.preventDefault(),a.setState({isDragging:!0})},a.handleDrag=function(t,e,r){if(a.state.isDragging){r.preventDefault();var n=-Math.sign(r.movementX),o=Math.ceil(Math.abs(r.movementX)/Math.floor(e));o>0&&t(n*o)}},a.handleDragEnd=function(t){t.preventDefault(),a.state.isDragging&&a.setState({isDragging:!1})},a.state={isDragging:!1,datum:null,crosshairsCoords:null,showCrosshairs:!1},a.crosshairsLock=!1,a}return n()(e,t),e.prototype.render=function(){var t=this,e=this.props,a=e.width,r=e.height,n=e.margin,o=e.data,s=(e.shift,e.symbols),l=e.tooltipData,p=e.tooltipTop,g=e.tooltipLeft,y=e.tooltipOpen,w=e.hideTooltip,E=a-n.left-n.right,M=r-n.top-n.bottom,C=function(t){return new Date(t.date)},x=Object(d.b)({range:[0,E],domain:Object(f.d)(o,C)}),O=Object(d.a)({range:[M,0],domain:[0,Object(f.e)(o,function(t){return Math.max.apply(Math,s.map(function(e){return t[e.name].close}))})]}),S=function(t){var e=x.invert(t-n.left);e.setUTCHours(0),e.setUTCMinutes(0),e.setUTCSeconds(0);var a=o.findIndex(function(t){return t.date.valueOf()>=e.valueOf()});return-1===a?(console.log("Could not find matching data point for "+e),null):o[a]},T=x(o[1].date)-x(o[0].date),j=this.props.shiftCb,F=this.handleDrag.bind(this,j,T),L=this.props.highlightedLine;return i.a.createElement(i.a.Fragment,null,i.a.createElement("svg",{width:a,height:r},i.a.createElement(u.a,{top:n.top,left:n.left,style:{cursor:"crosshair"}},i.a.createElement(k,{width:a,height:r,onMouseMove:function(t){return F(t)},onMouseUp:this.handleDragEnd,onMouseDown:this.handleDragStart,onWheel:this.props.onScroll}),s.map(function(e){return function(e,a){var r=L===e.name?6:2;return i.a.createElement(m.b,{key:e.name,data:a,xScale:x,yScale:O,x:C,y:function(t){return t[e.name].close},stroke:e.color,strokeWidth:r,onMouseOver:function(){return function(e){return t.handleMouseOver(S,e)}},onMouseOut:function(){return function(){return t.handleMouseOut(w)}},style:{pointerEvents:"all"}})}(e,o)}),i.a.createElement(b.default,{margin:n,width:a,height:r,show:this.state.showCrosshairs,coords:this.state.crosshairsCoords,datum:this.state.datum}),i.a.createElement(c.a,{xScale:x,yScale:O,width:a-n.left-n.right,height:r-n.top-n.bottom}),i.a.createElement(h.a,{scale:x,top:M,stroke:"#1b1a1e",tickTextFill:"#1b1a1e"}),i.a.createElement(h.b,{scale:O,top:0,left:a-n.left-n.right,label:"Close Price ($)",labelOffset:50,labelProps:{fontSize:15},stroke:"#1b1a1e",tickTextFill:"#1b1a1e"}))),y&&i.a.createElement(D.a,{key:Math.random(),top:p,left:g},i.a.createElement(v.default,{symbols:s,datum:l})))},e}(i.a.Component);E.propTypes={data:l.a.array.isRequired,symbols:l.a.array.isRequired,width:l.a.number.isRequired,height:l.a.number.isRequired,shiftCb:l.a.func,showMarketCap:l.a.bool,margin:l.a.object,highlightedLine:l.a.string,onScroll:l.a.func};var M=Object(D.b)(E);e.default=M}}]);
//# sourceMappingURL=component---src-pages-projects-bitcoinvsgold-components-chart-js-9994c0a1458ff427cb3f.js.map