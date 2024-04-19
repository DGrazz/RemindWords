import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;

  const options = {
    // You can set your default options here
    position: "bottom-right",
    timeout: 5000,
    transition: "Vue-Toastification__bounce",
    maxToasts: 10,
  };

  app.use(Toast, options);
});
