import { createApp } from 'vue'
import './assets/main.css' // 👈 ต้องมีบรรทัดนี้ (ชื่อไฟล์ต้องตรงกับจุดที่ 2 นะครับ)
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
