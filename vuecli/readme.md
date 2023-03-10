# VueCLI  

vuecliのインストール  
```
npm install -g @vue/cli
```
-gは全部のことろで使えるよオプション  

vueというコマンドが使えるようになっている  
```
vue --version
```

新しいプロジェクトを作る  
```
vue create udemy-vuejs
```
https://registry.npm.tagoba～～とでたらnoで進む  

[png](../png/4.png)  
今回はVue2を選択  

そしてプロジェクトが作成される（udemy-vuejsフォルダ）  


## main.jsの解説  

```js
import Vue from 'vue'       //vue createとしたときにpackage.jsonにvueのインストールがされ、それをインポートしている
import App from './App.vue'

Vue.config.productionTip = false    //ブラウザの開発ツールのヘルプを非表示

new Vue({
  render: h => h(App),
}).$mount('#app')   //index.htmlに#appが定義されている

```

```js
  render: h => h(App),
```
上はES6の書き方
この文は以下のようにも書ける（ES5）
```js
  render: function(h) {
    return h(App)
  }
```

App.vueをインポートしているが、App.vueのことを単一ファイルコンポーネントという  
この単一（シングル）ファイルコンポーネントは大きく3つの構造になっている  
(App.vueを参照)  
templateで囲われた部分とscriptで囲われた部分、styleで囲われたん部分  
script部分のexport defaultがあるから、import出来ているらしい（別の書き方もある）  


## buildを使ってみる  

npm run serveは開発用らしい  
buildが本番環境用らしい  

npm run buildを実行すると、distフォルダが作られる  
中を見ると、色々変わっているが、min化されていたり最適化されている  




