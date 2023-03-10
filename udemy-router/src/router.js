import Vue from 'vue';
import Router from 'vue-router';
import Home from "./views/MyHome.vue"
import Users from "./views/MyUsers.vue"

//Vue.useでプラグインを適用するという意味になる
//プラグイン→グローバルな機能を提供するもの（明確な定義はない）
//Vuejs全体に影響を与えるもの
Vue.use(Router);

export default new Router({
    //#を消す方法
    mode: "history",
    //URLとコンポーネントをマッピングさせる
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/users/',
            component: Users
        }
    ]
})