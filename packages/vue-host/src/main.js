import { createApp, defineAsyncComponent } from 'vue';
import Layout from './Layout.vue';

// const Button = defineAsyncComponent(() => import('home/Button'));
const app = createApp(Layout);

// app.component('button-element', Button);

app.mount('#app');
