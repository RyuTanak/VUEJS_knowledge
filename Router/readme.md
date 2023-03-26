# Vue Router  

何をするものか→VueプロジェクトとURLを結びつけるもの  

npm run serveをした後に、ブラウザからlocalhost:8080にアクセスすると  
Vue.jsのデフォルト画面が表示される  

まずはインストールから  
```
npm install vue-router@3
```

router.jsを作成（一般的にこの名前が多いらしい）  
udemy-routerフォルダを参照  

最終的にhttp://localhost:8080/やhttp://localhost:8080/#/usersでアクセスできる  

## シングルページアプリケーションを理解する  

ブラウザからhttp://localhost:8080/でアクセスしても  
http://localhost:8080/#/と、＃がつく  

従来のURLはURLで指定したモノを選択して返しているが  
今回のは、vue-routerがURLから土のコンポーネントを使うかを探している  

#→idの場所を指定するもの  
ドキュメントを読むときによくあるけど  
例えば→https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/#synopsis  
このURLを指定するとsynopsisのところまでスクロールする  

http://localhost:8080/#/users  
とすると、#の後ろはidとしてとらえる  
ブラウザからすると、http://localhostまでがURLで#/userがidになる  

SPAはindex.htmlだけを返してくれればいいので、そこから#以下でコンポーネントを返している  
Homeに移動しても、usersに移動しても通信は行われない  


## #を外す方法  

router.jsにmode: "history"をつける  
```js
export default new Router({
    //#を消す方法
    mode: "history",
    //URLとコンポーネントをマッピングさせる
    routes: [
```

ただ、これをすると画面を切り替えるごとに通信が発生する  
しかし、http://localhost:8080/usersでアクセスしても、Node.jsはindex.htmlを返している  
何が来ても、index.htmlを返している  

ただ、現在使っているDevlopサーバには、何が来てもindex.htmlが変える設定が自動的にされているが  
静的ホスティングサービスにvue.jsを上げる場合は、自分で設定しないといけない  

サーバの設定例  
→https://v3.router.vuejs.org/ja/guide/essentials/history-mode.html#%E3%82%B5%E3%83%BC%E3%83%8F%E3%82%99%E3%83%BC%E3%81%AE%E8%A8%AD%E5%AE%9A%E4%BE%8B  

以下を使えばめっちゃ早い  
```
<router-link to="/">Hoem</router-link>
<router-link to="/users">Users</router-link>
```

## router-linkの様々な属性  

active-class:このroter-linkがアクティブの時にクラスを有効化する  
　アクティブな時→localhost:8080/が有効になったら、localhost:8080/userになっても、最初有効になったものは有効のままになる  

exact:URLが完全一致でアクティブになる  

# router.jsとvue.config.jsの違いをまとめる  

## router.jsとは  
```
URLとvue.jsのプロジェクトを関連付けるもの
```
## どう使うか  
まず、vue-routerパッケージをインストールする必要がある  
```
npm install vue-router
```

どう使うか
→設定ファイルは[こちら](../udemy-router/src/router.js)を参照  

```js
Vue.use(Router)
```
Vue.useはVue.jsの公式ライブラリを使うときに設定。axiosなどのVue.jsだけのライブラリでない場合は、普通にimportを書く  

```js
import Home from ./home.vue
import User from ./user.vue

New Router({
    routes[
        {
            path: "/",
            component: "Home"
        },
        {
            path: "/user",
            component: "User"
        },
    ]
})
```
このroutesに、このURLの場合はこのコンポーネントを表示する。といった設定を記載してく。  
基本のパラメータは二つで、このURLは（path）このコンポーネント（component）を表示する。となる。  

上記はrouterをどう使うかを定義したファイいるであり、実際に適用させる設定はまだ出来ていない。  
どこで適用させるか→main.js  

```js
import router from ./router

new Vue({
    router: router,  //←これ　ES6の書き方だと、routerと1つに省略できる。
    render: h => h(App),
}).$mount('#app');
```

実はまだ、設定は終わりではなくてapp.vueに次の設定をする必要がある
```html
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```
URLが変更されることによって、<router-view/>部分がコンポーネントとして動的に変更される。  

また、vue-routerはどんなURLが来てもindex.htmlを返すようになっている。  



