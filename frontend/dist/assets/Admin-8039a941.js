import{_ as p,u as _,q as f,l as v,g as c,o as r,c as d,a as e,z as h,F as b,i as S,k as g,m as w,v as y,t as A,p as k,f as x}from"./index-feffca74.js";const D={setup(){const a=_().setAdmin,i=f(),s=v({pass:""}),l=c("220796"),o=c([]);return{handleSubmit:u=>{o.value=[],s.pass||o.value.push("Password is required"),!o.value.length===0?u.preventDefault():(u.preventDefault(),l.value===s.pass?(a("admin"),i.push("/admin/dashboard")):o.value.push("Admin password wrong!"))},errors:o,adminObj:s,setAdmin:a}}},m=n=>(k("data-v-d0295ef7"),n=n(),x(),n),I={class:"admin-container"},j={class:"admin-form-container"},B=m(()=>e("h3",null,"ADMIN",-1)),F={key:0,class:"error-box"},M={class:"form-group"},N=m(()=>e("div",{class:"form-group"},[e("input",{type:"submit",value:"admin access",class:"btn"})],-1));function O(n,a,i,s,l,o){return r(),d("div",I,[e("div",j,[e("form",{id:"adminForm",onSubmit:a[1]||(a[1]=h((...t)=>s.handleSubmit&&s.handleSubmit(...t),["prevent"])),novalidate:"",autocomplete:"off"},[B,s.errors.length?(r(),d("div",F,[e("ul",null,[(r(!0),d(b,null,S(s.errors,t=>(r(),d("li",{key:t},A(t),1))),128))])])):g("",!0),e("div",M,[w(e("input",{type:"password",id:"uPass",name:"uPass",class:"form-control",placeholder:"enter admin password","onUpdate:modelValue":a[0]||(a[0]=t=>s.adminObj.pass=t)},null,512),[[y,s.adminObj.pass]])]),N],32)])])}const V=p(D,[["render",O],["__scopeId","data-v-d0295ef7"]]);export{V as default};
