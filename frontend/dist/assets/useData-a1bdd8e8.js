import{g as o,u as c}from"./index-feffca74.js";function u(){const s=o([]),a=o(void 0);return c(),{foods:s,getAllFoods:async()=>{try{const t=await axios.get("/foods");s.value=t.data}catch(t){console.log(t)}},getMatchUser:async t=>{try{let e=await axios.get("/users/"+t);a.value=e.data}catch(e){console.log(e)}},matchUser:a}}export{u};