import{u as S}from"./useData-a1bdd8e8.js";import{_ as B,g as h,h as F,o as l,c as i,a as e,e as c,j as A,F as V,i as C,t as d,u as b,l as j,s as M,A as k,r as $,b as N,w as D,n as q,k as E,B as m,p as P,f as T}from"./index-feffca74.js";const U={props:["order"],setup(a){const n=a.order,w=h([]),t=h([]),v=h(void 0),{getAllFoods:_,foods:r}=S();_();const u=F(()=>r.value.filter(p=>s(p,cartItem.value)));let s=(p,f)=>{let g="";return f.forEach(I=>{parseInt(p.product_id)===I&&(g=p)}),g};return{order:n,orderMatch:v,getBillStatus:async()=>{n&&(v.value=(await axios.get("/orderStatus/order/"+n)).data[0])},getAllFoodsInOrder:async()=>{n&&(await axios.get("/orderdetails/"+n)).data.forEach(f=>{w.value.push(f.product_id),t.value.push(f.item_qty)})},filterFoods:u,item_qty:t}}},X={class:"order-details"},z={class:"order-details-inner"},L={class:"d-flex justify-content-between"},W={class:"d-flex flex-wrap h-50 flex-row",style:{"overflow-y":"auto"}},Y={class:"product-detail d-flex"},G={class:"image"},H=["src"],J={class:"content"},K={class:"name"},Q={class:"desc"},R={class:"price"};function Z(a,n,w,t,v,_){return l(),i("div",X,[e("div",z,[e("h2",L,[c(" Order summary "),A(a.$slots,"default",{},void 0,!0)]),e("div",W,[(l(!0),i(V,null,C(t.filterFoods,(r,u)=>(l(),i("div",{style:{flex:"50%"},key:r.product_id},[e("div",Y,[e("div",G,[e("img",{src:require(`../assets/images/${r.product_src}`),alt:""},null,8,H)]),e("div",J,[e("p",K,[c(d(r.product_name)+" ",1),e("span",null,"X "+d(t.item_qty[u]),1)]),e("p",Q,d(r.product_desc),1)])])]))),128))]),e("div",R,[e("p",null,"Discount: $"+d(t.orderMatch.order_discount),1),e("p",null,"Delivery Fee: $"+d(t.orderMatch.order_delivery),1),e("p",null,"Total: $"+d(t.orderMatch.order_total),1)])])])}const ee=B(U,[["render",Z],["__scopeId","data-v-e4e28b68"]]),se="/images/no-orders.png";const te={components:{OrderDetails:ee},setup(){const a=b(),{getAllFoods:n,foods:w}=S();n();const t=a.user,v=j(["cancel","confirmed","preparing","checking","delivering","delivered"]),_=h([]),r=h(!1),u=h(null),s=h(""),y=async()=>{t&&(_.value=(await axios.get("/orderstatus/user/"+t.user_id)).data)},O=F(()=>_.value.filter(x=>x.order_status<6&&x.order_status>0)),p=M(()=>{s.value=setInterval(function(){y()}.bind(this),1e3)}),f=k(()=>{clearInterval(s.value)});return{foods:w,user:t,avaiableStatus:v,getAllOrders:y,allOrder:_,filterOrders:O,sendBillId:x=>{u.value=x,r.value=!r},closeView:()=>{r.value=!r.value},onBeforeUnmount:k,autoUpdate:p,beforeUnmount:f}}},o=a=>(P("data-v-8cf9a192"),a=a(),T(),a),oe={key:0,class:"my-order-cards"},re={class:"card-head d-flex flex-wrap flex-sm-nowrap justify-content-between"},de=o(()=>e("span",null,"Order No - ",-1)),ae=["onClick"],ne={class:"d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary"},ce={class:"w-100 text-center py-1 px-2"},le=o(()=>e("span",null,"Paid:",-1)),ie={class:"w-100 text-center py-1 px-2"},_e=o(()=>e("span",null,"Status:",-1)),ue={class:"w-100 text-center py-1 px-2"},pe=o(()=>e("span",null,"When:",-1)),he={class:"d-flex flex-wrap flex-sm-nowrap justify-content-between card-summary"},ve={class:"w-100 text-center py-1 px-2"},fe=o(()=>e("span",null,"Total:",-1)),me={class:"w-100 text-center py-1 px-2"},we=o(()=>e("span",null,"Address:",-1)),ye={class:"w-100 text-center py-1 px-2"},xe=o(()=>e("span",null,"Phone:",-1)),ge={class:"card-body"},Oe={class:"steps d-flex flex-wrap flex-sm-nowrap justify-content-between"},Ie=o(()=>e("div",{class:"step-icon-wrap"},[e("div",{class:"step-icon"},[e("i",{class:"fa-solid fa-utensils"})])],-1)),ke=o(()=>e("h4",{class:"step-title"},"Confirmed",-1)),$e=[Ie,ke],De=o(()=>e("div",{class:"step-icon-wrap"},[e("div",{class:"step-icon"},[e("i",{class:"fa-solid fa-fire-burner"})])],-1)),Se=o(()=>e("h4",{class:"step-title"},"Preparing",-1)),Be=[De,Se],Fe=o(()=>e("div",{class:"step-icon-wrap"},[e("div",{class:"step-icon"},[e("i",{class:"fa-solid fa-list-check"})])],-1)),Ve=o(()=>e("h4",{class:"step-title"},"Checking",-1)),Ce=[Fe,Ve],Ae=o(()=>e("div",{class:"step-icon-wrap"},[e("div",{class:"step-icon"},[e("i",{class:"fa-solid fa-route"})])],-1)),be=o(()=>e("h4",{class:"step-title"},"Delivering",-1)),je=[Ae,be],Me=o(()=>e("div",{class:"step-icon-wrap"},[e("div",{class:"step-icon"},[e("i",{class:"fa-solid fa-house"})])],-1)),Ne=o(()=>e("h4",{class:"step-title"},"Delivered",-1)),qe=[Me,Ne],Ee={key:1,class:"box-content row no-food"},Pe=o(()=>e("div",{class:"content"},[e("h2",{style:{color:"#057835fa"}},"You do not have any orders yet")],-1)),Te=o(()=>e("div",null,[e("img",{src:se,alt:""})],-1));function Ue(a,n,w,t,v,_){const r=$("router-link"),u=$("OrderDetails");return l(),i("div",{class:m(["my-order-container",t.filterOrders.length>0?"":"fit-screen"])},[t.filterOrders.length>0?(l(),i("div",oe,[(l(!0),i(V,null,C(t.filterOrders.slice().reverse(),s=>(l(),i("div",{class:"card",key:s.order_id},[e("div",re,[e("div",null,[de,e("span",null,d(s.order_id),1)]),e("button",{onClick:y=>t.sendBillId(s.order_id)},"show order details",8,ae)]),e("div",ne,[e("div",ce,[le,c(d(" "+s.order_paid),1)]),e("div",ie,[_e,c(d(" "+t.avaiableStatus[s.order_status]),1)]),e("div",ue,[pe,c(" "+d(s.order_when),1)])]),e("div",he,[e("div",ve,[fe,c(" $"+d(s.order_total),1)]),e("div",me,[we,c(d(" "+s.order_address),1)]),e("div",ye,[xe,c(d(" "+s.order_phone),1)])]),e("div",ge,[e("div",Oe,[e("div",{class:m(["step",s.order_status>=1?"completed":""])},$e,2),e("div",{class:m(["step",s.order_status>=2?"completed":""])},Be,2),e("div",{class:m(["step",s.order_status>=3?"completed":""])},Ce,2),e("div",{class:m(["step",s.order_status>=4?"completed":""])},je,2),e("div",{class:m(["step",s.order_status>=5?"completed":""])},qe,2)])])]))),128))])):(l(),i("div",Ee,[Pe,Te,N(r,{class:"btn",to:"/menu"},{default:D(()=>[c("Order now!")]),_:1})])),a.showOrderDetails?(l(),q(u,{key:2,order:a.sendId},{default:D(()=>[e("button",{class:"btn",onClick:n[0]||(n[0]=(...s)=>t.closeView&&t.closeView(...s))},"X")]),_:1},8,["order"])):E("",!0)],2)}const Le=B(te,[["render",Ue],["__scopeId","data-v-8cf9a192"]]);export{Le as default};