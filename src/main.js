import "./assets/main.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
