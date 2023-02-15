import{_ as w,g as _,u as A,q as O,h as D,s as L,A as P,o,c as d,a as t,F as U,i as V,t as a,k as f,p as b,f as j}from"./index-feffca74.js";const F={setup(){const r=_(["cancel","confirmed","preparing","checking","delivering","delivered","completed"]),c=_([]),i=_(!1),s=_(void 0),h=_(""),v=A(),e=v.admin,l=v.setAdmin,m=O(),u=async()=>{c.value=(await axios.get("/orderstatus")).data},y=D(()=>c.value.filter(n=>n.order_status<6&&n.order_status>0)),S=n=>{s.value=n,i.value=!i.value},g=()=>{i.value=!i.value},x=()=>{l("")},B=async n=>{await axios.put("/orderstatus/"+n),u()},C=async n=>{await axios.put("/orderstatus/paid/"+n),u()},I=async n=>{await axios.put("/orderstatus/cancel/"+n),u()},p=()=>{h.value=setInterval(function(){u()}.bind(this),1e3)};return L(()=>p()),P(()=>clearInterval(h.value)),e||m.push("/"),{avaiableStatus:r,setAdmin:l,admin:e,filterOrders:y,getAllOrders:u,sendBillId:S,closeView:g,handleLogout:x,nextStatusBtn:B,paidBtn:C,cancelBtn:I,autoUpdate:p}}},k=r=>(b("data-v-ed91577f"),r=r(),j(),r),N={class:"admin-container"},q={class:"d-flex justify-content-between"},E=k(()=>t("h1",null,"Hello Admin!",-1)),H={class:"table-responsive"},M={class:"table colored-header datatable project-list"},R=k(()=>t("thead",null,[t("tr",null,[t("th",null,"Order Id"),t("th",null,"User Id"),t("th",null,"Phone"),t("th",null,"Address"),t("th",null,"When"),t("th",null,"Paid"),t("th",null,"Total"),t("th",null,"Status"),t("th",null,"Action")])],-1)),T=["onClick"],W=["onClick"],$=["onClick"],z=["onClick"];function G(r,c,i,s,h,v){return o(),d("div",N,[t("div",q,[E,t("button",{class:"btn",onClick:c[0]||(c[0]=e=>s.handleLogout())},"Logout")]),t("div",H,[t("table",M,[R,t("tbody",null,[(o(!0),d(U,null,V(s.filterOrders.slice().reverse(),e=>(o(),d("tr",{key:e.order_id},[t("td",null,a(e.order_id),1),t("td",null,a(e.user_id),1),t("td",null,a(e.order_phone),1),t("td",null,a(e.order_address),1),t("td",null,a(e.order_when),1),t("td",null,a(e.order_paid),1),t("td",null,"$"+a(e.order_total),1),t("td",null,a(s.avaiableStatus[e.order_status]),1),t("td",null,[e.order_status<5?(o(),d("button",{key:0,class:"action-btn",onClick:l=>s.nextStatusBtn(e.order_id)},a(s.avaiableStatus[e.order_status+1]),9,T)):f("",!0),e.order_status==1?(o(),d("button",{key:1,class:"cancel-btn",onClick:l=>s.cancelBtn(e.order_id)}," Cancel ",8,W)):e.order_status==5&&e.order_paid=="false"?(o(),d("button",{key:2,class:"paid-btn",onClick:l=>s.paidBtn(e.order_id)}," Paid ",8,$)):e.order_status==5&&e.order_paid=="true"?(o(),d("button",{key:3,class:"action-btn",onClick:l=>s.nextStatusBtn(e.order_id)},a(s.avaiableStatus[e.order_status+1]),9,z)):f("",!0)])]))),128))])])])])}const K=w(F,[["render",G],["__scopeId","data-v-ed91577f"]]);export{K as default};
