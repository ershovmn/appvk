(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{137:function(e,t,a){e.exports=a(180)},180:function(e,t,a){"use strict";a.r(t);a(138),a(163);var n=a(0),i=a.n(n),s=a(26),c=a.n(s),r=a(22),o=a.n(r),l=a(56),d=a.n(l),u=a(80),h=a(16),m=a(17),p=a(19),g=a(18),f=a(20),k=a(4),v=(a(179),a(21)),y=a(92),b=a.n(y),E=a(93),C=a.n(E),S=a(94),j=a.n(S),O=a(95),w=a.n(O),M=a(96),_=a.n(M),A=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(p.a)(this,Object(g.a)(t).call(this))).state={fetchedUser:null},e}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;o.a.subscribe(function(t){switch(t.detail.type){case"VKWebAppGetUserInfoResult":e.setState({fetchedUser:t.detail.data});break;default:console.log(t.detail.type)}}),o.a.send("VKWebAppGetUserInfo",{})}},{key:"render",value:function(){return console.log(localStorage.getItem("mapState")),i.a.createElement("div",null,i.a.createElement(k.t,null,"Settings"),this.state.fetchedUser&&i.a.createElement(k.i,{title:"User Data Fetched with VK Connect"},i.a.createElement(k.n,{before:this.state.fetchedUser.photo_200?i.a.createElement(k.b,{src:this.state.fetchedUser.photo_200}):null,description:this.state.fetchedUser.city&&this.state.fetchedUser.city.title?this.state.fetchedUser.city.title:""},"".concat(this.state.fetchedUser.first_name," ").concat(this.state.fetchedUser.last_name))),i.a.createElement(k.i,null,i.a.createElement(k.e,{onClick:console.log("tap"),"data-to":"tinder"},"Tinder"),i.a.createElement(k.e,{onClick:console.log("tap"),"data-to":"tinder"},"Tinder")))}}]),t}(i.a.Component),P=a(38),T=a(55),x=a.n(T),I=a(35),G=a.n(I),R=a(36),B=a.n(R),U=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(p.a)(this,Object(g.a)(t).call(this))).addToCart=function(e){fetch("https://170e4f1c.ngrok.io/api/v1/cart/push?menu_item_id="+String(e),{method:"GET",headers:{"Povysh-Token":localStorage.getItem("token")}})},e.openBase=function(t){e.state.snackbar||e.setState({snackbar:i.a.createElement(k.w,{layout:"vertical",onClose:function(){return e.setState({snackbar:null})},before:i.a.createElement(k.b,{size:24},i.a.createElement(B.a,{fill:"#fff",width:14,height:14}))},t+" \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0443")})},e.state={activePanel:"mainMenu",categories:[],items:[],currentCategory:-1,snackbar:null},e.openBase=e.openBase.bind(Object(v.a)(Object(v.a)(e))),e}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props),fetch("https://170e4f1c.ngrok.io/api/v1/places/food?restaurant_id="+String(this.props.restID),{method:"GET",headers:{"Povysh-Token":localStorage.getItem("token")}}).then(function(e){return e.json()}).then(function(t){try{e.setState({categories:t.categories,items:t.items}),e.state.categories&&e.state.categories.length>0&&e.setState({currentCategory:e.state.categories[0].id})}catch(a){}})}},{key:"render",value:function(){var e=this;return i.a.createElement(k.C,{id:this.props.id,activePanel:this.state.activePanel},i.a.createElement(k.s,{id:"mainMenu"},i.a.createElement(k.t,{left:i.a.createElement(k.j,{onClick:this.props.back},Object(k.D)()===k.l?i.a.createElement(x.a,null):i.a.createElement(G.a,null))},"Menu"),i.a.createElement(k.A,{type:"button"},i.a.createElement(k.k,null,this.state.categories.length>0&&this.state.categories.map(function(t,a){return i.a.createElement(k.B,{key:a,onClick:function(){return e.setState({currentCategory:t.id})},selected:e.state.currentCategory===t.id,style:{marginLeft:"10px"}},t.name)}))),i.a.createElement(k.m,null,this.state.items&&this.state.items.length>0&&this.state.items.map(function(t,a){return t.menu_category_id!==e.state.currentCategory?null:i.a.createElement(k.d,{before:i.a.createElement(k.b,{src:"https://burgerking.ru/images/product_images/mobile/cheezy-joe.png"}),description:t.description,asideContent:i.a.createElement(k.c,{onClick:function(){e.addToCart(t.id),e.openBase(t.name)},style:{width:"80px"}},String(t.price)+" \u0440\u0443\u0431")},t.name)})),this.state.snackbar))}}]),t}(i.a.Component),K=a(57),z=a.n(K),L=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).restaurants=[{coord:[55.7,37.6],code:0,id:12345},{coord:[55.7,37.61],code:1,id:82936},{coord:[55.7,37.62],code:2,id:12761},{coord:[55.5,37.6],code:0,id:18235},{coord:[55.8,37.31],code:1,id:11813},{coord:[55.5,36.92],code:2,id:16381},{coord:[55.9,35.6],code:0,id:12936}],a.map=null,a.rest=[{name:"Macdonalds",id:0,url:"https://www.pinclipart.com/picdir/middle/113-1137531_mcdonalds-logo-transparent-png-mcdonalds-logo-png-clipart.png"},{name:"KFC",id:1,url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjI-yxfVTMbNT6ogrdOVoKeaL3UG5zbtgWLWPZqtBs8yGJbWx9"},{name:"BurgerKing",id:2,url:"https://cdn.imgbin.com/12/7/6/imgbin-hamburger-whopper-french-fries-burger-king-chicken-sandwich-burger-king-kGm4a8Unj0yht3gTpGYpkHedg.jpg"}],a.foodCourts=[{coord:[56,37.6],restaurants:[0,1,2],id:1243},{coord:[56.2,37.6],restaurants:[0,1,2],id:4357}],a.onBoundsChange=function(){try{a.setState({map:{center:a.map.getCenter(),zoom:a.map.getZoom()}})}catch(e){}},a.onKeyPressed=function(e){console.log(e),"Enter"===e.key&&"block"===a.state.displayList&&(console.log("hi"),a.setState({displayMap:"block",displayList:"none"}))},a.state={activePanel:"map",restaurants:a.restaurants,map:{center:[56,37.6],zoom:14},id:e.id,mode:"all",contextOpened:!1,switchRest:[!0,!0,!0],rest:a.rest,foodCourts:a.foodCourts,go:a.props.go,modals:{activeModal:null,modalHistory:[],data:{type:null,id:null,title:null}},search:"",displayMap:"block",displayList:"none",restrictMapArea:[[0,0],[60,60]],rests:[],filters:[],cuisine:[{id:1,checked:!0},{id:2,checked:!0},{id:3,checked:!0}],price_tag:[!0,!0,!0,!0]},a.switchClick=a.switchClick.bind(Object(v.a)(Object(v.a)(a))),a.openModal=a.openModal.bind(Object(v.a)(Object(v.a)(a))),a.modalBack=function(){a.setActiveModal(a.state.modals.modalHistory[a.state.modals.modalHistory.length-2])},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("mapState");console.log(t);var a=[59.9339453,30.302315699999994];if(o.a.send("VKWebAppGetGeodata",{}),o.a.subscribe(function(t){switch(console.log(t.detail.data),t.detail.type){case"VKWebAppGeodataResult":console.log(t),a=[t.detail.data.lat,t.detail.data.long],console.log(a),e.setState({map:{center:a,zoom:"13"}})}}),null!==t){var n=(i=JSON.parse(t)).switchRest;null===i.map?(console.log(n),i={map:{center:a,switchRest:n}},this.setState(i)):this.setState(i)}else{console.log("elese");var i={map:{center:a,zoom:14}};this.setState(i)}console.log(localStorage.getItem("token")),fetch("https://170e4f1c.ngrok.io/api/v1/utilities/bounds?lat="+String(a[0])+"&lon="+String(a[1]),{method:"GET",headers:{"Povysh-Token":localStorage.getItem("token")}}).then(function(e){return e.json()}).then(function(t){try{var a=t.bounds;e.setState({restrictMapArea:[[a[0],a[1]],[a[2],a[3]]]})}catch(n){}}),fetch("https://170e4f1c.ngrok.io/api/v1/places/around?lat="+String(a[0])+"&lon="+String(a[1])+"&radius=10",{method:"GET",headers:{"Povysh-Token":localStorage.getItem("token")}}).then(function(e){return e.json()}).then(function(t){try{var a=t.rests;e.setState({rests:a})}catch(n){}}),fetch("https://170e4f1c.ngrok.io/api/v1/utilities/filters",{method:"GET",headers:{"Povysh-Token":localStorage.getItem("token")}}).then(function(e){return e.json()}).then(function(t){try{e.setState({filters:t})}catch(a){}})}},{key:"componentDidUpdate",value:function(){var e={map:this.state.map,switchRest:this.state.switchRest};localStorage.setItem("mapState",JSON.stringify(e))}},{key:"switchClick",value:function(e){var t=Number(e.currentTarget.dataset.mode),a=this.state.switchRest;a[t]=!a[t],this.setState({switchRest:a}),console.log(this.state)}},{key:"openModal",value:function(e){console.log(e),this.setState({modals:{data:e,activeModal:e.type}})}},{key:"setActiveModal",value:function(e){e=e||null,this.setState({modals:{activeModal:e,data:this.state.modals.data}})}},{key:"render",value:function(){var e=this;console.log(this.state);var t=i.a.createElement(k.r,{activeModal:this.state.modals.activeModal},i.a.createElement(k.o,{id:"restModalCard",onClose:function(){return e.setActiveModal(null)},title:this.state.modals.data.title,caption:String(this.state.modals.data.address),actions:[{title:"\u041c\u0435\u043d\u044e",type:"primary",action:function(){e.setActiveModal(null),e.setState({activePanel:"menu"})}}]},i.a.createElement("p",null,this.state.modals.data.description)),i.a.createElement(k.p,{id:"foodcourtModalPage",onClose:function(){return e.setActiveModal(null)},header:i.a.createElement(k.q,{right:i.a.createElement(k.j,{onClick:function(){return e.setActiveModal(null)}},Object(k.D)()===k.l?"\u0413\u043e\u0442\u043e\u0432\u043e":i.a.createElement(z.a,null))},this.state.modals.data.title)},i.a.createElement(k.m,null,i.a.createElement(k.d,{key:"1",onClick:function(){return console.log("click foodcourt")}},"Food Court"))),i.a.createElement(k.p,{id:"filter",onClose:function(){return e.setActiveModal(null)},header:i.a.createElement(k.q,{right:i.a.createElement(k.j,{onClick:function(){return e.setActiveModal(null)}},Object(k.D)()===k.l?"\u0413\u043e\u0442\u043e\u0432\u043e":i.a.createElement(z.a,null))},"\u0424\u0438\u043b\u044c\u0442\u0440\u044b")},this.state.filters&&this.state.filters.cuisine&&i.a.createElement(k.i,{title:"\u041a\u0443\u0445\u043d\u044f"},i.a.createElement(k.m,null,this.state.filters.cuisine.items&&this.state.filters.cuisine.items.length>0&&this.state.filters.cuisine.items.map(function(t,a){return e.state.cuisine[t.id-1].checked?i.a.createElement(k.d,{key:a,defaultChecked:!0,asideContent:i.a.createElement(k.x,{defaultChecked:!0,onClick:function(){var a=e.state.cuisine;a[t.id-1].checked=!a[t.id-1].checked,e.setState({cuisine:a})}})},t.name):i.a.createElement(k.d,{key:a,asideContent:i.a.createElement(k.x,{onClick:function(){var a=e.state.cuisine;a[t.id-1].checked=!a[t.id-1].checked,e.setState({cuisine:a})}})},t.name)}))),this.state.filters&&this.state.filters.price_tag&&i.a.createElement(k.i,{title:"\u0426\u0435\u043d\u043e\u0432\u043e\u0439 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d"},i.a.createElement(k.m,null,this.state.filters.price_tag.items&&this.state.filters.price_tag.items.length>0&&this.state.filters.price_tag.items.map(function(t,a){return e.state.price_tag[a]?i.a.createElement(k.d,{key:a,defaultChecked:!0,asideContent:i.a.createElement(k.x,{defaultChecked:!0,onClick:function(){var t=e.state.price_tag;t[a]=!t[a],e.setState({price_tag:t})}})},String(t[0])+"-"+String(t[1])):i.a.createElement(k.d,{key:a,asideContent:i.a.createElement(k.x,{onClick:function(){var t=e.state.price_tag;t[a]=!t[a],e.setState({price_tag:t})}})},String(t[0])+"-"+String(t[1]))})))));return"menu"===this.state.activePanel?i.a.createElement(U,{id:"menu",restID:this.state.modals.data.id,back:function(){return e.setState({activePanel:"map"})}}):i.a.createElement(k.C,{header:!1,activePanel:this.state.activePanel,modal:t},i.a.createElement(k.s,{id:"map",style:{overflow:"hidden"}},i.a.createElement(k.v,{id:"search",value:this.state.search,onChange:function(t){return e.setState({search:t})},onFocus:function(){return e.setState({displayMap:"none",displayList:"block"})},onBlur:function(){return e.setState({displayMap:"block",displayList:"none"})},onKeyDown:this.onKeyPressed,tabIndex:"0"}),i.a.createElement("div",{style:{display:this.state.displayList}},i.a.createElement(k.m,null,this.state.rests&&this.state.rests.length>0&&this.state.rests.map(function(t,a){var n=t.name.toLowerCase(),s=e.state.search.toLowerCase();return-1===n.indexOf(s)?null:i.a.createElement(k.d,{key:a,expandable:!0,onClick:function(){console.log("test"),e.setState({map:{center:[t.latitude,t.longitude],zoom:14}})}},t.name)}))),i.a.createElement("div",null,i.a.createElement(P.d,null,i.a.createElement(P.b,{height:"100vh",width:"100%",state:{center:this.state.map.center,zoom:this.state.map.zoom},options:{restrictMapArea:this.state.restrictMapArea},instanceRef:function(t){return e.map=t},onBoundsChange:this.onBoundsChange},i.a.createElement(P.a,{options:{preset:"islands#invertedVioletClusterIcons"}},this.state.rests&&this.state.rests.length>0&&this.state.rests.map(function(t,a){return e.state.cuisine[t.cuisine_id-1].checked&&e.state.price_tag[t.price_rating]?-1===t.name.indexOf(e.state.search)?null:i.a.createElement(P.c,{key:a,onClick:function(){e.openModal({type:"restModalCard",title:t.name,id:t.id,address:t.address,description:t.description})},geometry:[t.latitude,t.longitude],properties:{iconContent:t.name[0]},options:{preset:"islands#orangeIcon"}}):null}))))),i.a.createElement("div",{style:{width:"100%",height:"calc(100vh - 92px)"}},i.a.createElement("div",{style:{position:"fixed",bottom:"50px",right:"10px"}},i.a.createElement("img",{src:"http://about-telegram.ru/wp-content/uploads/2018/03/kot-persik-stickers-telegram_21.png",style:{height:"75px"},onClick:function(){return e.setActiveModal("filter")}})))))}}]),t}(i.a.Component),V=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(p.a)(this,Object(g.a)(t).call(this))).state={activeModal:"modalRoot"},e}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(k.C,{id:this.props.id,activePanel:"tinderRoot",modal:i.a.createElement(k.r,{activeModal:this.state.activeModal},i.a.createElement(k.o,{id:"modalRoot",onClose:function(){return e.setState({activeModal:null})},title:"test",actions:[{title:"push",type:"primary",action:function(){return console.log("test")}}]}))},i.a.createElement(k.s,{id:"tinderRotot"},i.a.createElement(k.t,null,"Tinder")))}}]),t}(i.a.Component),W=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(p.a)(this,Object(g.a)(t).call(this))).state={},e}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return i.a.createElement(k.C,{id:this.props.id,activePanel:"mainBag"},i.a.createElement(k.s,{id:"mainBag"},i.a.createElement(k.t,null,"Bag"),"\u0422\u0443\u0442\u044c \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435\u0442\u044c"))}}]),t}(i.a.Component),D=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).flag_name=!0,a.viewChange=function(e){a.setState({activeStory:e})},a.state={id:e.id,activeStory:"map",activePanel:"epic",idRest:null},a.onStoryChange=a.onStoryChange.bind(Object(v.a)(Object(v.a)(a))),a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"onStoryChange",value:function(e){this.setState({activeStory:e.currentTarget.dataset.story})}},{key:"render",value:function(){return i.a.createElement(k.f,{id:"epic",activeStory:this.state.activeStory,tabbar:i.a.createElement(k.y,null,i.a.createElement(k.z,{key:"map",onClick:this.onStoryChange,selected:"map"===this.state.activeStory,"data-story":"map",text:this.flag_name?"Map":null},i.a.createElement(b.a,null)),i.a.createElement(k.z,{key:"quick",onClick:this.onStoryChange,selected:"quick"===this.state.activeStory,"data-story":"quick",text:this.flag_name?"Quick":null},i.a.createElement(C.a,null)," "),i.a.createElement(k.z,{key:"tinder",onClick:this.onStoryChange,selected:"tinder"===this.state.activeStory,"data-story":"tinder",text:this.flag_name?"Tinder":null},i.a.createElement(w.a,null)," "),i.a.createElement(k.z,{key:"bag",onClick:this.onStoryChange,selected:"bag"===this.state.activeStory,"data-story":"bag",text:this.flag_name&&"Bag"},i.a.createElement(_.a,null)),i.a.createElement(k.z,{key:"settings",onClick:this.onStoryChange,selected:"settings"===this.state.activeStory,"data-story":"settings",text:this.flag_name?"Settings":null},i.a.createElement(j.a,null)," "))},i.a.createElement(L,{id:"map",viewChange:this.viewChange}),i.a.createElement(k.C,{id:"quick",activePanel:"quick"},i.a.createElement(k.s,{id:"quick"},i.a.createElement(k.t,null,"Quick"),"Quick")),i.a.createElement(V,{id:"tinder"}),i.a.createElement(k.C,{id:"settings",activePanel:"settings"},i.a.createElement(k.s,{id:"settings"},i.a.createElement(A,null))),i.a.createElement(W,{id:"bag"}))}}]),t}(i.a.Component),q=function(e){function t(){var e;return Object(h.a)(this,t),(e=Object(p.a)(this,Object(g.a)(t).call(this))).state={},e}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return i.a.createElement(k.C,{header:!1,activePanel:"main"},i.a.createElement(k.s,{id:"main"},i.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},i.a.createElement("div",{style:{height:"200px",width:"100%",display:"block"}},i.a.createElement(k.h,{slideWidth:"100%",style:{height:"100%",width:"100%"},bullets:"dark"},i.a.createElement("div",null,"Hello"),i.a.createElement("div",null,"Hi"),i.a.createElement("div",null,"H")))),i.a.createElement(k.g,{vertical:"bottom"},i.a.createElement(k.A,null,i.a.createElement(k.B,{onClick:this.props.closeThis},"\u041d\u0430\u0447\u0430\u0442\u044c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c")))))}}]),t}(i.a.Component),N=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).allertPopout=function(){return a.setState({errorAuth:!0}),i.a.createElement(k.a,{actions:[{title:"Ok",autoclose:!0,style:"default"}],onClose:a.closePopout},i.a.createElement("h2",null,"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438"),i.a.createElement("h2",null,"\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443 \u043f\u043e\u0437\u0436\u0435"))},a.closePopout=function(){console.log("test"),a.setState({popout:i.a.createElement(k.u,null)})},a.state={activePanel:"black",fetchedUser:null,token:null,mytoken:null,popout:i.a.createElement(k.u,null),test:"fail",firstLogin:!1,errorAuth:!1,blackPanel:!0},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"tryGet",value:function(){var e=Object(u.a)(d.a.mark(function e(t){var a=this;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:fetch("https://170e4f1c.ngrok.io/api/v1/users/from_vk_token?token="+t,{method:"GET"}).then(function(e){return e.json()}).then(function(e){localStorage.setItem("token",e.token),a.setState({token:t,mytoken:e.token,activePanel:"start",popout:null,errorAuth:!1,blackPanel:!1})});case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("mapState");null!==t&&(t={switchRest:(t=JSON.parse(t)).switchRest,map:null},localStorage.setItem("mapState",JSON.stringify(t))),o.a.send("VKWebAppGetAuthToken",{app_id:7150406,scope:""});var a=null;o.a.subscribe(function(t){switch(t.detail.type){case"VKWebAppAccessTokenReceived":a=t.detail.data.access_token,e.tryGet(a),setTimeout(function(){"start"!==e.state.activePanel&&e.setState({errorAuth:!0})},5e4);break;case"VKWebAppAccessTokenFailed":console.log("error connect Vk"),e.setState({errorAuth:!0})}})}},{key:"render",value:function(){var e=this;console.log(this.state);try{return this.state.errorAuth?(console.log("errorAuth"),i.a.createElement(k.C,{header:!1,activePanel:"error"},i.a.createElement(k.s,{id:"error"},"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438"))):this.state.firstLogin?(console.log("firstLogin"),i.a.createElement(q,{closeThis:function(){return e.setState({firstLogin:!1})}})):this.state.blackPanel?i.a.createElement(k.C,{header:!1,activePanel:"black"},i.a.createElement(k.s,{id:"black",popout:i.a.createElement(k.u,null)})):i.a.createElement(D,{id:"start"})}catch(t){return i.a.createElement(k.C,{activePanel:"bug"},i.a.createElement(k.s,{id:"bug"},"\u042d\u0442\u043e \u043d\u0435 \u0431\u0430\u0433, \u044d\u0442\u043e \u0444\u0438\u0447\u0430"))}}}]),t}(i.a.Component);o.a.subscribe(function(e){switch(e.detail.type){case"VKWebAppUpdateConfig":var t=document.createAttribute("scheme");t.value=e.detail.data.scheme?e.detail.data.scheme:"client_light",t.value="client_dark",document.body.attributes.setNamedItem(t);break;default:console.log(e.detail.type)}}),o.a.send("VKWebAppInit",{}),c.a.render(i.a.createElement(N,null),document.getElementById("root"))}},[[137,1,2]]]);
//# sourceMappingURL=main.805eb1da.chunk.js.map