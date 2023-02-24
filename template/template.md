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
```html
<div id="app">
    <a href>{{url}}</a>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        url: 'https://google.com'
    }
 })
```
上記ではgoogle.comにはアクセスできない

```html
<div id="app">
    <a v-bind:href="url">Google</a>
</div>
```
上記のようにすることで、アクセスできるようになる  
```html
<div id="app">
    <a :href="url">Google</a>
</div>
```
まら、v-bindは省略可能である  

## v-bindの応用  
v-bindの引数を動的に表現することもできる  
```html
<div id="app">
    <a :[attribute]="url">Google</a>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        url: 'https://google.com',
        attribute: "href"
    }
 })
```

hrefに限らず他の要素にも使える  
```html
<div id="app">
    <a :[attribute]="url">Google</a>
    <a :href="urlTwitter" :id="number">Twitter</a>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        url: 'https://google.com',
        attribute: "href",
        urlTwitter: 'https://twitter.com',
        number: 31
    }
 })
```
更に、v-bindをまとめて書くこともできる  
```html
<div id="app">
    <a :[attribute]="url">Google</a>
    <a v-bind="{href:urlTwitter, id: number}">Twitter</a>
</div>
```
更にまとめることができる  
```html
<div id="app">
    <a :[attribute]="url">Google</a>
    <a v-bind="{href:urlTwitter, id: number}">Twitter</a>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        url: 'https://google.com',
        attribute: "href",
        twitterObject: {
            href:'https://twitter.com', 
            id: 31
        }
    }
 })
```

## v-on  
ボタンを押すと数字がカウントアップされるアプリを作ってみる  
