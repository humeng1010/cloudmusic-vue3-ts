import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Button, Search, Icon, List, Swipe, SwipeItem } from 'vant'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
app.use(Search)
app.use(Icon)
app.use(List)
app.use(Swipe)
app.use(SwipeItem)

app.mount('#app')
