(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{149:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return u}),a.d(t,"postQuery",function(){return s});a(50);var n=a(153),r=a.n(n),i=a(0),l=a.n(i),o=a(162),c=a(155),d=Object(c.a)("div",{target:"e17e5ej90"})("margin-left:auto;margin-right:auto;padding:1rem 1rem;@media (min-width:820px){max-width:50vw;}@media (max-width:820px){max-width:100vw;}");function u(e){var t=e.data.allMarkdownRemark.edges;return l.a.createElement(o.a,null,l.a.createElement(d,null,t.map(function(e){var t=e.node;return l.a.createElement("div",null,l.a.createElement("h3",{style:{marginBottom:"0.25em"}},l.a.createElement(r.a,{to:t.frontmatter.path},t.frontmatter.title)),l.a.createElement("small",null,l.a.createElement("strong",null,t.frontmatter.date)),l.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.excerpt}}))})))}var s="1852863393"},154:function(e,t,a){var n;e.exports=(n=a(159))&&n.default||n},156:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return g}),a.d(t,"StaticQueryContext",function(){return p}),a.d(t,"StaticQuery",function(){return h});var n=a(0),r=a.n(n),i=a(4),l=a.n(i),o=a(153),c=a.n(o);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return o.withPrefix}),a.d(t,"navigate",function(){return o.navigate}),a.d(t,"push",function(){return o.push}),a.d(t,"replace",function(){return o.replace}),a.d(t,"navigateTo",function(){return o.navigateTo});var d=a(25);a.d(t,"waitForRouteChange",function(){return d.c});var u=a(154),s=a.n(u);a.d(t,"PageRenderer",function(){return s.a});var m=a(36);a.d(t,"parsePath",function(){return m.a});var p=r.a.createContext({}),h=function(e){return r.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function g(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}h.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func}},158:function(e){e.exports={data:{site:{siteMetadata:{siteName:"Hot Air",description:"What's Legit and What to Quit in Finance and Cryptocurrencies"}}}}},159:function(e,t,a){"use strict";a.r(t);a(35);var n=a(0),r=a.n(n),i=a(4),l=a.n(i),o=a(51),c=a(1),d=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};d.propTypes={location:l.a.shape({pathname:l.a.string.isRequired}).isRequired},t.default=d},160:function(e,t,a){},162:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=(a(35),a(158)),l=a(156),o=a(164),c=a.n(o),d=a(4),u=a.n(d),s=a(153),m=a.n(s),p=a(155),h=Object(p.a)("div",{target:"e1duu8xz0"})("z-index:1;position:relative;@media (min-width:820px){height:50vh;}@media (max-width:820px){height:80vh;}"),g=Object(p.a)("div",{target:"e1duu8xz1"})("filter:brightness(70%);height:100%;position:absolute;width:100%;z-index:-1;@media (min-width:820px){background-image:url(/aerial-view-cappadocia-2.jpg);}@media (max-width:820px){background-image:url(/aerial-view-cappadocia-vert.jpg);}"),f=function(e){return r.a.createElement("li",{style:{display:"inline-block",marginRight:"1rem"}},r.a.createElement(m.a,{to:e.to},e.children))},v=function(e){return r.a.createElement("div",null,r.a.createElement(c.a,{link:[{rel:"shortcut icon",type:"image/png",href:"favicon.png"}]},r.a.createElement("title",null,e.data.site.siteMetadata.siteName),r.a.createElement("link",{rel:"canonical",href:"https://hotair.tech"}),r.a.createElement("meta",{name:"description",content:e.data.site.siteMetadata.description})),r.a.createElement("header",{id:"header"},r.a.createElement(h,null,r.a.createElement(g,null),r.a.createElement("div",{className:"inner",style:{color:"white",fontWeight:"bolder",textAlign:"center",textShadow:"5px 5px 5px rgba(0, 0, 0, 0.7)"}},r.a.createElement("div",{style:{fontSize:"8vh",paddingTop:"2vh"}},"Welcome to ",r.a.createElement("span",{style:{display:"inline-block"}},"Hot Air")),r.a.createElement("br",null),r.a.createElement("div",{style:{fontSize:"6vh"}},"What's Legit ",r.a.createElement("span",{style:{display:"inline-block"}},"and What to Quit")),r.a.createElement("br",null),r.a.createElement("div",{style:{fontSize:"6vh"}},"in Finance and Technology"),r.a.createElement("br",null))),r.a.createElement("div",{style:{textAlign:"center",bottom:0}},r.a.createElement("ul",{style:{listStyle:"none",float:"none",color:"white",fontSize:"3vh",display:"inline-block",marginRight:"1.5rem"}},r.a.createElement(f,{to:"/"},"Home"),r.a.createElement(f,{to:"/blog/"},"Blog"),r.a.createElement(f,{to:"/podcast/"},"Podcast"),r.a.createElement(f,{to:"/learn/"},"Learn"),r.a.createElement(f,{to:"/about/"},"About")))))},y=function(e){return r.a.createElement(l.StaticQuery,{query:"1731611311",render:function(t){return r.a.createElement(v,Object.assign({data:t},e))},data:i})};v.propTypes={data:u.a.shape({site:u.a.shape({siteMetadata:u.a.shape({siteName:u.a.string.isRequired,description:u.a.string.isRequired}).isRequired}).isRequired}).isRequired};var E=function(e){return r.a.createElement("footer",{id:"footer",style:{backgroundColor:"rgba(96, 135, 192, 0.82)",color:"white",textAlign:"center",bottom:0,clear:"left"}},r.a.createElement("div",{className:"copyright",style:{marginLeft:"1rem",paddingTop:"1rem"}},r.a.createElement(m.a,{to:"/"},r.a.createElement("img",{style:{maxWidth:57.5,maxHeight:75,verticalAlign:"middle"},src:"/favicon.png",alt:"Cool balloon"})),"  © 2018 Bryan Willson Berry  ",r.a.createElement("a",{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"}),r.a.createElement("a",{rel:"license",href:"http://creativecommons.org/licenses/by/4.0/"},"  ",r.a.createElement("img",{alt:"Creative Commons License",style:{borderWidth:0,marginBottom:0,verticalAlign:"middle"},src:"https://i.creativecommons.org/l/by/4.0/88x31.png"}))))};a(160),t.a=function(e){var t=e.children;e.data,e.location;return r.a.createElement("div",null,r.a.createElement("div",{id:"wrapper"},r.a.createElement(y,null),r.a.createElement("div",{style:{margin:"0 auto",maxWidth:1200,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t),r.a.createElement(E,null)))}}}]);
//# sourceMappingURL=component---src-pages-index-jsx-15978331e4b2df47775b.js.map