(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{158:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return u}),n.d(t,"blogQuery",function(){return l});n(88),n(50);var r=n(163),o=n.n(r),i=n(187),a=n(0),c=n.n(a),s=n(196);function u(e){var t=e.data.allMarkdownRemark.edges;return c.a.createElement(i.a,null,c.a.createElement("div",{className:"blog-posts"},t.filter(function(e){return e.node.frontmatter.title.length>0}).map(function(e){var t=e.node,n={identifier:t.id,title:t.frontmatter.title};return c.a.createElement("div",null,c.a.createElement("h1",null,c.a.createElement(o.a,{to:t.frontmatter.path},t.frontmatter.title)),c.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}),c.a.createElement(s.DiscussionEmbed,{shortname:"hotair-tech",config:n}))})))}var l="2861824952"},166:function(e,t,n){var r;e.exports=(r=n(176))&&r.default||r},173:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return h}),n.d(t,"StaticQueryContext",function(){return p}),n.d(t,"StaticQuery",function(){return f});var r=n(0),o=n.n(r),i=n(4),a=n.n(i),c=n(163),s=n.n(c);n.d(t,"Link",function(){return s.a}),n.d(t,"withPrefix",function(){return c.withPrefix}),n.d(t,"navigate",function(){return c.navigate}),n.d(t,"push",function(){return c.push}),n.d(t,"replace",function(){return c.replace}),n.d(t,"navigateTo",function(){return c.navigateTo});var u=n(30);n.d(t,"waitForRouteChange",function(){return u.c});var l=n(166),d=n.n(l);n.d(t,"PageRenderer",function(){return d.a});var m=n(37);n.d(t,"parsePath",function(){return m.a});var p=o.a.createContext({}),f=function(e){return o.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):o.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:a.a.object,query:a.a.string.isRequired,render:a.a.func,children:a.a.func}},175:function(e){e.exports={data:{site:{siteMetadata:{siteName:"Hot Air",description:"What's Legit and What to Quit in Finance and Cryptocurrencies"}}}}},176:function(e,t,n){"use strict";n.r(t);n(36);var r=n(0),o=n.n(r),i=n(4),a=n.n(i),c=n(57),s=n(1),u=function(e){var t=e.location,n=s.default.getResourcesForPathnameSync(t.pathname);return o.a.createElement(c.a,Object.assign({location:t,pageResources:n},n.json))};u.propTypes={location:a.a.shape({pathname:a.a.string.isRequired}).isRequired},t.default=u},177:function(e,t,n){},187:function(e,t,n){"use strict";var r=n(0),o=n.n(r),i=(n(36),n(175)),a=n(173),c=n(191),s=n.n(c),u=n(4),l=n.n(u),d=n(163),m=n.n(d),p=n(165),f=Object(p.a)("div",{target:"e1duu8xz0"})("z-index:1;position:relative;@media (min-width:820px){height:50vh;}@media (max-width:820px){height:80vh;}"),h=Object(p.a)("div",{target:"e1duu8xz1"})("filter:brightness(70%);height:100%;position:absolute;width:100%;z-index:-1;@media (min-width:820px){background-image:url(/aerial-view-cappadocia-2.jpg);}@media (max-width:820px){background-image:url(/aerial-view-cappadocia-vert.jpg);}"),y=function(e){return o.a.createElement("li",{style:{display:"inline-block",marginRight:"1rem"}},o.a.createElement(m.a,{to:e.to},e.children))},b=function(e){return o.a.createElement("div",null,o.a.createElement(s.a,{link:[{rel:"shortcut icon",type:"image/png",href:"favicon.png"}]},o.a.createElement("title",null,e.data.site.siteMetadata.siteName),o.a.createElement("link",{rel:"canonical",href:"https://hotair.tech"}),o.a.createElement("meta",{name:"description",content:e.data.site.siteMetadata.description})),o.a.createElement("header",{id:"header"},o.a.createElement(f,null,o.a.createElement(h,null),o.a.createElement("div",{className:"inner",style:{color:"white",fontWeight:"bolder",textAlign:"center",textShadow:"5px 5px 5px rgba(0, 0, 0, 0.7)"}},o.a.createElement("div",{style:{fontSize:"8vh",paddingTop:"2vh"}},"Welcome to ",o.a.createElement("span",{style:{display:"inline-block"}},"Hot Air")),o.a.createElement("br",null),o.a.createElement("div",{style:{fontSize:"6vh"}},"What's Legit ",o.a.createElement("span",{style:{display:"inline-block"}},"and What to Quit")),o.a.createElement("br",null),o.a.createElement("div",{style:{fontSize:"6vh"}},"in Finance and Technology"),o.a.createElement("br",null))),o.a.createElement("div",{style:{textAlign:"center",bottom:0}},o.a.createElement("ul",{style:{listStyle:"none",float:"none",color:"white",fontSize:"3vh",display:"inline-block",marginRight:"1.5rem"}},o.a.createElement(y,{to:"/"},"Home"),o.a.createElement(y,{to:"/blog/"},"Blog"),o.a.createElement(y,{to:"/podcast/"},"Podcast"),o.a.createElement(y,{to:"/learn/"},"Learn"),o.a.createElement(y,{to:"/about/"},"About")))))},g=function(e){return o.a.createElement(a.StaticQuery,{query:"1731611311",render:function(t){return o.a.createElement(b,Object.assign({data:t},e))},data:i})};b.propTypes={data:l.a.shape({site:l.a.shape({siteMetadata:l.a.shape({siteName:l.a.string.isRequired,description:l.a.string.isRequired}).isRequired}).isRequired}).isRequired};var v=function(e){return o.a.createElement("footer",{id:"footer",style:{backgroundColor:"rgba(96, 135, 192, 0.82)",color:"white",textAlign:"center",bottom:0,clear:"left"}},o.a.createElement("div",{className:"copyright",style:{marginLeft:"1rem",paddingTop:"1rem"}},o.a.createElement(m.a,{to:"/"},o.a.createElement("img",{style:{maxWidth:57.5,maxHeight:75,verticalAlign:"middle"},src:"/favicon.png",alt:"Cool balloon"})),"  © 2018 Bryan Willson Berry  ",o.a.createElement("a",{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"}),o.a.createElement("a",{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"},"  ",o.a.createElement("img",{alt:"Creative Commons License",style:{borderWidth:0,marginBottom:0,verticalAlign:"middle"},src:"https://i.creativecommons.org/l/by/4.0/88x31.png"}))))};n(177),t.a=function(e){var t=e.children;e.data,e.location;return o.a.createElement("div",null,o.a.createElement("div",{id:"wrapper"},o.a.createElement(g,null),o.a.createElement("div",{style:{margin:"0 auto",maxWidth:1200,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t),o.a.createElement(v,null)))}},188:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.insertScript=function(e,t,n){var r=window.document.createElement("script");return r.async=!0,r.src=e,r.id=t,n.appendChild(r),r},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var r=void 0;return function(){var o=this,i=arguments,a=n&&!r;window.clearTimeout(r),r=setTimeout(function(){r=null,n||e.apply(o,i)},t),a&&e.apply(o,i)}}},196:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DiscussionEmbed=t.CommentEmbed=t.CommentCount=void 0;var r=n(197),o=n(198),i=n(199);t.CommentCount=r.CommentCount,t.CommentEmbed=o.CommentEmbed,t.DiscussionEmbed=i.DiscussionEmbed;var a={CommentCount:r.CommentCount,CommentEmbed:o.CommentEmbed,DiscussionEmbed:i.DiscussionEmbed};t.default=a},197:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CommentCount=void 0;var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=(r=i)&&r.__esModule?r:{default:r},c=n(188);var s=(0,c.debounce)(function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})},300,!1);t.CommentCount=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),o(t,[{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){if(this.props.shortname!==e.shortname)return!0;var t=e.config,n=this.props.config;return t.url!==n.url&&t.identifier!==n.identifier}},{key:"componentWillUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance()}},{key:"componentDidUpdate",value:function(){this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;e.getElementById("dsq-count-scr")?s():(0,c.insertScript)("https://"+this.props.shortname+".disqus.com/count.js","dsq-count-scr",e.body)}},{key:"cleanInstance",value:function(){var e=window.document.body;(0,c.removeScript)("dsq-count-scr",e),window.DISQUSWIDGETS=void 0}},{key:"render",value:function(){return a.default.createElement("span",{className:"disqus-comment-count","data-disqus-identifier":this.props.config.identifier,"data-disqus-url":this.props.config.url},this.props.children)}}]),t}()},198:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CommentEmbed=void 0;var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=(r=i)&&r.__esModule?r:{default:r};(t.CommentEmbed=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),o(t,[{key:"getSrc",value:function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")}},{key:"render",value:function(){return a.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0"})}}]),t}()).defaultProps={showMedia:!0,showParentComment:!0,width:420,height:320}},199:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DiscussionEmbed=void 0;var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=(r=i)&&r.__esModule?r:{default:r},c=n(188);t.DiscussionEmbed=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),o(t,[{key:"componentWillMount",value:function(){"undefined"!=typeof window&&window.disqus_shortname&&window.disqus_shortname!==this.props.shortname&&this.cleanInstance()}},{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){if(this.props.shortname!==e.shortname)return!0;var t=e.config,n=this.props.config;return t.url!==n.url&&t.identifier!==n.identifier}},{key:"componentWillUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance()}},{key:"componentDidUpdate",value:function(){this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;window&&window.DISQUS&&e.getElementById("dsq-embed-scr")?window.DISQUS.reset({reload:!0,config:this.getDisqusConfig(this.props.config)}):(window.disqus_config=this.getDisqusConfig(this.props.config),window.disqus_shortname=this.props.shortname,(0,c.insertScript)("https://"+this.props.shortname+".disqus.com/embed.js","dsq-embed-scr",e.body))}},{key:"cleanInstance",value:function(){var e=window.document;(0,c.removeScript)("dsq-embed-scr",e.body),window&&window.DISQUS&&window.DISQUS.reset({});try{delete window.DISQUS}catch(e){window.DISQUS=void 0}var t=e.getElementById("disqus_thread");if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild)}},{key:"getDisqusConfig",value:function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.callbacks.onNewComment=[e.onNewComment]}}},{key:"render",value:function(){return a.default.createElement("div",{id:"disqus_thread"})}}]),t}()}}]);
//# sourceMappingURL=component---src-pages-blog-index-jsx-900a6faa7ea64fa78e08.js.map