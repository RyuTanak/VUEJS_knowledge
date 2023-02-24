# vue.js  

Javascriptのフレームワーク。  

## Hello world  

構文：  
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

<div id="app">
    <p>{{message}}</p>
    <button v-on:click="reveseMessage">メッセージ反転</button>
</div>
```
説明：  
二重波括弧でVueインスタンスのデータを指定している  
v-on→vue.jsが用意している特別な属性  
click→ブラウザが用意しているDOMイベント  

```js
new Vue({
    el: '#app',
    data: {
        message: 'HelloWorld!'
    },
    methods: {
        reveseMessage: function() {
            this.message = this.message.split('').reverse().join('')
        }
    } 
})
```
説明：  
newでVueインスタンスを作成  
elはエレメントの略で、上記だとdivタグのid要素を指定  
dataインスタンスにデータを持たせることができる  
reveseMeaage→buttonクリック時のイベント  

また、上記の例だとvue.jsをURLで指定していますが、[公式サイト](https://v2.ja.vuejs.org/v2/guide/installation.html)  
からvue.jsをインストールして、scriptタブの部分をローカルに落としたvue.jsを指定することで実行可能になる  

## 各章  

- [vue.jsのテンプレート構文](./template/template.md)  
