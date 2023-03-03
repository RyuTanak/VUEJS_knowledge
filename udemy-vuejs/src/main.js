import Vue from 'vue'
import App from './App.vue'
//LikeNumber.vueをインポートする
import LikeNumber from './components/LikeNumber.vue'

Vue.config.productionTip = false
//LikeNumber.vueコンポーネントとしてグローバル登録
Vue.component('LikeNumber', LikeNumber);

new Vue({
  render: h => h(App),
}).$mount('#app')
