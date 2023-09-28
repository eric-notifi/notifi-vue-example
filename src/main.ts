import "./assets/main.css";
import "@notifi-network/notifi-react-card/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";

import { Buffer } from "buffer"; // To prevent "Buffer is not defined" error in browser

globalThis.Buffer = Buffer;

const app = createApp(App);

app.mount("#app");
