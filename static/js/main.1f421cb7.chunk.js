(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{231:function(e,t,a){"use strict";a.r(t);a(76),a(78);var n=a(0),r=a.n(n),s=a(45),l=a.n(s),i=a(234),o=a(32),c=a(33),u=a(36),m=a(34),d=a(35),h=a(46),p=a.n(h),v=a(70),b=a(5),f=a(47),g=a(72),E=a.n(g),y=a(37),N=a.n(y),w="dbc3d84ebffed258626dd3fc30a02bc4",k=a(230),x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).displayName=t.name,a.state={episodes:[],external:[],search:[],loading:!0,value:"",test:[{label:"loading..."}],key:"",backgroundPath:"",imdbID:"",imdbNotFound:!0},a.handleChange=a.handleChange.bind(Object(b.a)(Object(b.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(b.a)(Object(b.a)(a))),a.renderSearch=a.renderSearch.bind(Object(b.a)(Object(b.a)(a))),a.dothis=a.dothis.bind(Object(b.a)(Object(b.a)(a))),a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"renderSearch",value:function(){var e=this;fetch("https://api.themoviedb.org/3/search/tv?api_key=".concat(w,"&language=en-US&query=").concat(this.state.value,"&page=1")).then(function(e){return e.json()}).then(function(t){var a=e.state.search,n=[];for(var r in a.results)n.push({label:a.results[r].name,id:a.results[r].id});e.setState({test:k.flatten(n)}),e.setState({search:t})})}},{key:"handleChange",value:function(e){this.setState({value:e.target.value,loading:!0,imdbNotFound:!0})}},{key:"dothis",value:function(e){this.setState({value:e.target.value,loading:!0,imdbNotFound:!0}),this.renderSearch()}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),function(){var e=Object(v.a)(p.a.mark(function e(){var a,n,r,s,l,i;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.themoviedb.org/3/search/tv?api_key=".concat(w,"&language=en-US&query=").concat(t.state.value,"&page=1"));case 2:return a=e.sent,e.next=5,a.json();case 5:if(n=e.sent,!(r=n.results[0].id)){e.next=17;break}return e.next=10,fetch("https://api.themoviedb.org/3/tv/".concat(r,"/external_ids?api_key=").concat(w,"&language=en-US"));case 10:return s=e.sent,e.next=13,s.json();case 13:l=e.sent,i=l.imdb_id,t.setState({imdbID:l.imdb_id,imdbNotFound:!1}),fetch("https://eppy-aa7fb.firebaseio.com/episode/episodeList.json?orderBy=%22parentTconst%22&equalTo=%22".concat(i,"%22")).then(function(e){return e.json()}).then(function(e){t.setState({episodes:e,loading:!1,imdbNotFound:!1})}).then(fetch("https://api.themoviedb.org/3/find/".concat(i,"?api_key=").concat(w,"&language=en-US&external_source=imdb_id")).then(function(e){return e.json()}).then(function(e){t.setState({external:e})}));case 17:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()()}},{key:"render",value:function(){var e=this,a=this.state.loading?r.a.createElement("p",null,r.a.createElement("em",null)):t.testClass(this.state.episodes),n=this.state.loading?r.a.createElement("p",null,r.a.createElement("em",null)):t.renderPoster(this.state.external),s=this.state.loading?r.a.createElement("p",null,r.a.createElement("em",null)):t.renderText(this.state.external);this.state.loading?r.a.createElement("p",null,r.a.createElement("em",null)):t.renderPageTitle(this.state.external);return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h1",{className:"title has-text-grey-dark"},"eppy.io"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column is-one-third"},r.a.createElement(E.a,{items:this.state.test,shouldItemRender:function(e,t){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1},getItemValue:function(e){return e.label},renderItem:function(e,t){return r.a.createElement("div",{key:e.id,style:{backgroundColor:t?"#eee":"transparent"}},e.label)},inputProps:{class:"form-control",placeholder:"Try me out"},value:this.state.value,onChange:this.dothis,onSelect:function(t){return e.setState({value:t})},wrapperStyle:{}})),r.a.createElement("div",{className:"column"},r.a.createElement("input",{type:"submit",value:"Submit",className:"button is-outlined is-primary"})))),this.state.loading?r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column"},r.a.createElement("h2",{className:"subtitle"},"Enter a TV show and click Submit to see the ratings."))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column is-narrow"},n),r.a.createElement("div",{className:"column is-6"},s),r.a.createElement("div",{className:"column"},r.a.createElement("a",{href:"https://www.imdb.com/title/".concat(this.state.imdbID),className:"subtitle"},"Link to IMDb"))),r.a.createElement("h2",{className:"subtitle"},r.a.createElement("b",null,"Series Trends")),r.a.createElement(N.a,{lockOrientation:"landscape"},r.a.createElement(y.Orientation,{orientation:"landscape",alwaysRender:!1},r.a.createElement("div",{className:"box",style:{marginBottom:"30px",marginTop:"30px"}},a)),r.a.createElement(y.Orientation,{orientation:"portrait",alwaysRender:!1},r.a.createElement("h2",{className:"subtitle"},"If viewing on mobile please rotate your device."," ",r.a.createElement("span",{role:"img"},"\ud83d\ude03")))))))}}],[{key:"renderText",value:function(e){if(e.tv_results[0]){var t=e.tv_results[0].overview,a=e.tv_results[0].origin_country[0],n=e.tv_results[0].original_language,s=e.tv_results[0].vote_average,l=e.tv_results[0].first_air_date;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{className:"subtitle is-5"},r.a.createElement("b",null,"Air Date: "),l),r.a.createElement("p",{className:"subtitle is-5"},r.a.createElement("b",null,"Origin: "),a),r.a.createElement("p",{className:"subtitle is-5"},r.a.createElement("b",null,"Language: "),n),r.a.createElement("p",{className:"subtitle is-5"},r.a.createElement("b",null,"Average Votes: "),s),r.a.createElement("p",{className:"subtitle is-5"},r.a.createElement("b",null,"Synopse: "),t))}}},{key:"renderPageTitle",value:function(e){if(e.tv_results[0]){var t=e.tv_results[0].original_name;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",{className:"subtitle is-4"},t))}}},{key:"renderPoster",value:function(e){if(e.tv_results[0]){var t=e.tv_results[0].poster_path;return r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{src:"https://image.tmdb.org/t/p/w300".concat(t),alt:"...",style:{border:"5px solid #4a4a4a"}}))}return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:"subtitle"},"No Poster :("))}},{key:"testClass",value:function(e){var t=[];for(var a in e)e.hasOwnProperty(a)&&t.push(e[a]);for(var n in t)t[n].seasonNumber=parseInt(t[n].seasonNumber),t[n].episodeNumber=parseInt(t[n].episodeNumber),t[n].averageRating=parseFloat(t[n].averageRating);var s=k.groupBy(k.sortBy(t,["seasonNumber","episodeNumber"]),"seasonNumber"),l=Object.keys(s).map(function(e){return[s[e]]}),i=k.flatten(l),o=i.map(function(e){return e.map(function(e){return e.averageRating})}),c=i.map(function(e){return e.map(function(e){return e.primaryTitle})}),u=0;for(n=0;n<i.length;n++)k.size(i[n])>u&&(u=k.size(i[n]));var m=[];for(n=1;n<=u;n++)m.push("Episode ".concat(n));var d=[];for(n=0;n<o.length;n++)d.push({label:"Season ".concat(n+1),data:o[n],fill:!1,backgroundColor:"#"+Math.random().toString(16).slice(2,8)});var h={labels:m,datasets:d},p={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{display:!0,ticks:{suggestedMin:0,beginAtZero:!0}}],yAxes:[{display:!0,ticks:{suggestedMin:0,beginAtZero:!0}}]},legend:{display:!1,position:"left",fullWidth:!0},tooltips:{callbacks:{label:function(e,t){var a=t.datasets[e.datasetIndex],n=e.index;return"".concat(a.label," ").concat(a.data[n]," ").concat(c[e.datasetIndex][n])}}}};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column is-full"},r.a.createElement("div",{className:"wrapper"},r.a.createElement(f.a,{data:h,options:p})))),r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column is-full"},r.a.createElement("div",{className:"wrapper"},r.a.createElement(f.b,{data:h,options:p})))))}}]),t}(n.Component),S=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).displayName=t.name,a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,null))}}]),t}(n.Component),j=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}var _=document.getElementById("root");l.a.render(r.a.createElement(i.a,null,r.a.createElement(S,null)),_),function(){if("serviceWorker"in navigator){if(new URL("/eppy.io",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/eppy.io","/service-worker.js");j?function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):O(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):O(e)})}}()},75:function(e,t,a){e.exports=a(231)},78:function(e,t,a){}},[[75,2,1]]]);
//# sourceMappingURL=main.1f421cb7.chunk.js.map