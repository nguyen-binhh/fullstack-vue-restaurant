import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;

app.mount("#app");
