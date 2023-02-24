# vue.jsのテンプレート構文  

## テンプレートとは何か  

```html
<div id="app">
    <p>{{message}}</p>
</div>
```

上記のコードのこと  
一見、htmlのコードを書いているだけじゃんと思いがちだが  
そうではなくて、これはvue.jsのテンプレートを書いています。  
これをvue.jsが読み込んで、最終的にvue.jsがhtmlを生成しています。  


## 二重波括弧の中身  

Javascriptの構文をそのまま書くことができる  
```html
<div id="app">
    <p>{{message}}</p>
    <p>{{number + 2}}</p>
    <p>{{ok ? 'YES' : 'NO'}}</p>
    <p>{{sayHi()}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        message: 'HelloWorld!',
        number: 3,
        ok: true
    },
    methods: {
        sayHi: function() {
            return 'Hi';
        }
    }
 })
```

## thisの理解  
インスタンス内で自信のインスタンスプロパティにアクセスするときにつける  

## ディレクティブ  
vue.js専用の要素のこと  
```html
<div id="app">
    <p>{{message}}</p>
    <p v-text="message"></p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        message: 'HelloWorld!'
    }
 })
```
pタブの意味は同じになる  

## v-once  

```html
<div id="app">
    <p>{{message}}</p>
    <p>{{syaHi()}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        message: 'HelloWorld!'
    },
    methods:{
        sayHi(){
            this.message = 'Hello VUE'
            return 'Hi'
        }
    }
 })
```

上記の処理は、messageに一度「HelloWorld」が読み込まれた後に  
最終的に「Hello VUE」が読み込まれるという流れになる  

v-onceは一度描画させると、その後の変更は行わないようにする要素のこと  
```html
<div id="app">
    <p v-once>{{message}}</p>
    <p>{{syaHi()}}</p>
</div>
```

## v-html  
htmlを組み込めるイメージ  

```html
<div id="app">
    <div>{{html}}</div>
    <div v-html="html">{{html}}</div>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        html: '<h1>H1です</h1>'
    }
 })
```

クロスサイトスクリプティングの脆弱性がある  
→ちょっとわからん  

## v-bind  
