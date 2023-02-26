# Vueインスタンスとその内部構造  

## インスタンスは複数作ることが可能  
```html
<div id="app1">
</div>
<div id="app2">
</div>
```
```js
 new Vue({
    el: '#app1',
    data: {
        message: 'インスタンス1'
    }
 })
  new Vue({
    el: '#app2',
    data: {
        message: 'インスタンス2'
    }
 })
```
インスタンスを分ける時は、各インスタンスが完全に独立している時が望ましい。  


## 外側からVueインスタンスにアクセスする方法  
→とりあえずインスタンスを変数に入れる  

```html
<div id="app1">
    <p>{{message}}</p>
</div>
<div id="app2">
    <p>{{message}}</p>
    <button @click="changeMessage1">インスタンス1のmessageを変更</button>
</div>
```
```js
  var vm1 = new Vue({
    el: '#app1',
    data: {
        message: 'インスタンス1'
    }
 })
  var vm2 = new Vue({
    el: '#app2',
    data: {
        message: 'インスタンス2'
    },
    methods:{
        changeMessage: function() {
            vm1.message = "インスタンス2から変更しました"
        }
    }
 })
```

### (補足)javascriptにおける変数の型について  

||var|let|const|
|-|-|-|-|
|再代入の可否|〇|〇|×|
|再宣言の可否|〇|×|×|
|スコープ|関数内|ブロック内→{}|ブロック内→{}|
|言葉の意味|variable(変数)|let(~する)|constant(定数)|

より詳しく→[こちら](https://it-kyujin.jp/article/detail/788/#:~:text=%E4%BB%8A%E3%82%84JavaScript%EF%BC%88%E4%BB%A5%E4%B8%8B%E3%80%81JS%EF%BC%89%E3%82%92%E6%89%B1%E3%81%86%E4%B8%AD%E3%81%A7ES6%E3%81%8C%E4%B8%BB%E6%B5%81%E3%81%A8%E3%81%AA%E3%81%A3%E3%81%A6%E3%81%8D%E3%81%A6%E3%81%8A%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8C%E3%80%81%E3%80%8Cvar%20%2F%20let%20%2F%20const%E3%80%8D%E3%81%AE%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91%E3%81%A7%E6%82%A9%E3%82%80%E6%96%B9%E3%82%82%E3%81%84%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B%EF%BC%9F,%E3%80%8Cvar%20%2F%20let%20%2F%20const%E3%80%8D%E3%81%AF%E3%81%99%E3%81%B9%E3%81%A6JS%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E5%A4%89%E6%95%B0%E5%AE%A3%E8%A8%80%E3%81%AE%E6%96%B9%E6%B3%95%E3%81%A7%E3%81%99%E3%80%82)  

## リアクティブの話  

Vueインスタンスにプロパティを追加したいときは  
dataプロパティの中に書く方がいい  
インスタンスに直接書くこともできるが、、、  
```js
 var vm1 = new Vue({
    el: '#app1',
    //プロパティを追加したいときはここに書く方がおすすめ
    data: {
        message: 'インスタンス1'
        // nema: '太郎'
    }
 //インスタンスに直接書くこともできる
 vm1.name = '太郎'
 })
```

dataの中に書いたプロパティには、ゲッターとセッターが付与される  
（付与はvueが行っている）
これらを付与しないと、vueの他の機能が使えないので、付けた方がいいよ  

## よく使うVueインスタンスのプロパティ  
プロパティの一覧を見たいときはconsole.logで出力すると見れる  
ユーザ定義のプロパティ→先頭に$がつく  

data部分は外部にも定義できる  
```js
 var data = {
    message: 'インスタンス',
    name: '太郎'
 }

 var vm = new Vue({
    el: '#app1',
    data: data
 })

 //===で値と型の比較ができる
 console.log(data === vm.$data)
```

## インスタンスの内側から自身のプロパティにアクセスしたいとき  
thisを使う  
```js
 var data = {
    message: 'インスタンス',
    name: '太郎'
 }

 var vm = new Vue({
    el: '#app1',
    data: data,
    methods:{
        change: function(){
            //thisを使ったら、自身のプロパティにアクセスできる。
            return this.$data
        }
    }
 })


 //===で値と型の比較ができる
 console.log(data === vm.$data)
```

インスタンスのプロパティについてのリファレンスは[こちら](https://ja.vuejs.org/api/)  
（VueのAPI）

## $mountの紹介  
たまに使うらしい  
→el要素を指定する  
```js
 var data = {
    message: 'インスタンス',
    name: '太郎'
 }

 var vm = new Vue({
    //el: '#app1',
    data: data
 })
 
 vm.$mount('#app1')
```

## templateプロパティ  

```html
<div id="app1">
    <p>{{message}}</p>
    <p>{{name}}</p>
    <p>{{myData}}</p>
    <button @click="message = 'ボタンからの変更'">変更</button>
</div>
<div id="app2">
    <!--以下は今までのやり方
    <h1>こんにちは、{{name}}</h1>
    -->

</div>
```
```js
  var vm = new Vue({
    el: '#app2',
    data: {
        message: 'インスタンス2'
    },
    methods:{
        changeMessage: function() {
            vm1.message = "インスタンス2から変更しました"
        }
    }
 })
 
 //templateプロパティを使って書く
 new Vue({
    el: 'app2',
    data: {
        name: '太郎'
    },
    //html部分に書いていたことをそのまま書く
    template: '<h1>こんにちは、{{name}}</h1>'
 })
```
## render関数    

```html
<div id="app1">
    <p>{{message}}</p>
    <p>{{name}}</p>
    <p>{{myData}}</p>
    <button @click="message = 'ボタンからの変更'">変更</button>
</div>
<div id="app2">
    <!--以下は今までのやり方
    <h1>こんにちは、{{name}}</h1>
    -->
</div>
<div id="app3">
</div>
```
```js
  var vm = new Vue({
    el: '#app2',
    data: {
        message: 'インスタンス2'
    },
    methods:{
        changeMessage: function() {
            vm1.message = "インスタンス2から変更しました"
        }
    }

    //templateプロパティを使って書く
    new Vue({
        el: 'app2',
        data: {
            name: '太郎'
        },
        //html部分に書いていたことをそのまま書く
        template: '<h1>こんにちは、{{name}}</h1>'
    })

    new Vue({
        el: 'app3',
        data: {
            name: '太郎'
        },
        render: function(createElement) {
            return createElement('h1', 'こんにちは' + this.name);
        }
    })
 })
```

## Vueインスタンスのライフサイクル  
[png](../png/3.png)  

