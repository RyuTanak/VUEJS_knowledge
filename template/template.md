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
また、v-bindは省略可能である  

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
```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="number += 1">カウントアップ</button>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0
    }
 })
```
いろんな書き方があるよ(上の書き方はあまりしない)  
```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp">カウントアップ</button>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0
    },
    methods: {
        countUp: function() {
            this.number += 1
        }
    }
 })
```

v-onの後ろに書くことのできるDOMイベントの[公式サイト](https://developer.mozilla.org/en-US/docs/Web/Events)  

## イベントオブジェクトの取得方法  
イベント発生時のイベントに関する全ての情報（マウスの位置とか）が入っているオブジェクトのこと  
```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp">カウントアップ</button>
    <p v-on:mousemove="changeMousePosition">マウスを載せてください</p>
    <p>X:{{x}}、Y:{{y}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        x:0,
        y:0
    },
    methods: {
        countUp: function() {
            this.number += 1
        },
        changeMousePosition: function(event) {
            //console.log(event)でeventオブジェクトの中身を見ることができる
            this.x = event.clientX;
            this.y = event.clientY;
        }
    }
 })
```
changeMousePositionの引数にあるeventにイベントオブジェクトが格納されている  

## v-onの関数に引数を持たせる  
イベントオブジェクトを使うときは$eventのように書く  
```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp(2)">カウントアップ</button>
    <p v-on:mousemove="changeMousePosition(3, $event)">マウスを載せてください</p>
    <p>X:{{x}}、Y:{{y}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        x:0,
        y:0
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        },
        //引数の場所はどこでもいい
        changeMousePosition: function(divide, event) {
            //console.log(event)でeventオブジェクトの中身を見ることができる
            this.x = event.clientX;
            this.y = event.clientY;
        }
    }
 })
```

## イベント修飾子  
イベント修飾子→イベントオブジェクトにつけるメソッド  
例）event.stopPropagetion とか  
```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp(2)">カウントアップ</button>
    <p v-on:mousemove="changeMousePosition(3, $event)">マウスを載せてください</p>
    <p>X:{{x}}、Y:{{y}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        x:0,
        y:0
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        },
        //引数の場所はどこでもいい
        changeMousePosition: function(divide, event) {
            //console.log(event)でeventオブジェクトの中身を見ることができる
            this.x = event.clientX;
            this.y = event.clientY;
        }
    }
 })
```

## イベント修飾子を更に詳しく  

### stopPropagation  

```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp(2)">カウントアップ</button>
    <p v-on:mousemove="changeMousePosition(3, $event)">マウスを載せてください
        <span v-on:click="noEvent">反応しないでください</span>
    </p>    
    <p>X:{{x}}、Y:{{y}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        x:0,
        y:0
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        },
        //引数の場所はどこでもいい
        changeMousePosition: function(divide, event) {
            //console.log(event)でeventオブジェクトの中身を見ることができる
            this.x = event.clientX;
            this.y = event.clientY;
        },
        noEvent: function(event) {
            event.stopPropagation()
        }
    }
 })
```
event.stopPropagetion()でmousemovイベントを止めることができる。  
更に、省略して書きこともできる  
```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp(2)">カウントアップ</button>
    <p v-on:mousemove="changeMousePosition(3, $event)">マウスを載せてください
        <span v-on:mousemove.stop>反応しないでください</span>
    </p>    
    <p>X:{{x}}、Y:{{y}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        x:0,
        y:0
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        },
        //引数の場所はどこでもいい
        changeMousePosition: function(divide, event) {
            //console.log(event)でeventオブジェクトの中身を見ることができる
            this.x = event.clientX;
            this.y = event.clientY;
        }
    }
 })
```

### preventDefault  
Googleのリンクを作りつつ、googleのサイトには飛ばしたくないとき  

```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp(2)">カウントアップ</button>
    <p v-on:mousemove="changeMousePosition(3, $event)">マウスを載せてください
        <span v-on:mousemove.stop>反応しないでください</span>
    </p>
    <a v-on:click.prevent href="https://google.com">Google</a>
    <!--繋げることをできる。順番も関係ない-->
    <a v-on:click.prevent.stop href="https://google.com">Google</a>
    <p>X:{{x}}、Y:{{y}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        x:0,
        y:0
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        },
        //引数の場所はどこでもいい
        changeMousePosition: function(divide, event) {
            //console.log(event)でeventオブジェクトの中身を見ることができる
            this.x = event.clientX;
            this.y = event.clientY;
        }
    }
 })
```

## キー修飾子  
キーアップやキーダウンのキーボード操作に関するイベント  
keyup→キーボードを押して離した瞬間に発生するイベント  

```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:click="countUp(2)">カウントアップ</button>
    <p v-on:mousemove="changeMousePosition(3, $event)">マウスを載せてください
        <span v-on:mousemove.stop>反応しないでください</span>
    </p>
    <a v-on:click.prevent href="https://google.com">Google</a>
    <p>X:{{x}}、Y:{{y}}</p>
    <input type="text" v-on:keyup.enter="myAlert">
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        x:0,
        y:0
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        },
        //引数の場所はどこでもいい
        changeMousePosition: function(divide, event) {
            //console.log(event)でeventオブジェクトの中身を見ることができる
            this.x = event.clientX;
            this.y = event.clientY;
        },
        myAlert: function() {
            alert('アラート');
        }
    }
 })
```
keyup.enterでエンターを押したときだけアラートを出すようにできる。  
繋げることもできる→keyup.space.enter　　

## v-onディレクティブの引数を動的に表現する  

```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button v-on:[event]="countUp(2)">カウントアップ</button>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        event: 'click'
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        }
    }
 })
```
## @を使ってv-onを省略  

```html
<div id="app">
    <p>現在{{number}}回クリックされています</p>
    <button @[event]="countUp(2)">カウントアップ</button>
    <button @click="countUp(2)">カウントアップ</button>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        number:0,
        event: 'click'
    },
    methods: {
        countUp: function(times) {
            this.number += 1 * times
        }
    }
 })
```

## v-modelを使用した双方向バインディング  

v-modelとは  
双方向データバインディングを作成する  
データバインディングとは  
抽象的な言葉で、html部分とjs部分が結合（バインディング）していること  


```html
<div id="app">
    <h1>{{message}}</h1>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        message: 'こんにちは'
    }
 })
```
message部分の「こんにちは」を「こんばんは」に変える時  
jsのmessageを「こんばんは」にかえれば対応可能だが、jsをそのままで対応する方法がある  

```html
<div id="app">
    <input type="text" v-model="message">
    <h1>{{message}}</h1>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        message: 'こんにちは'
    }
 })
```
これでテキスト部分に文字を打つことで、こんばんはにすることができる。  

## computedプロパティを使って、動的なデータを表現する  
簡単なカウントアップのプログラムを作ってみる  
```html
<div id="app">
    <p>{{count}}</p>
    <button @click="counter += 1">+1</button>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        counter: 1
    }
 })
```
ここにカウントが3以下であれば、3以下ですと表示し、それ以上だと別の文字を表示する仕組みを取り入れる  
簡単な例だと、  
```html
<p>{{counter > 3 ? '3より上' : '3以下'}}</p>
```
でできるが、もっと簡単な方法  

```html
<div id="app">
    <p>{{count}}</p>
    <button @click="counter += 1">+1</button>
    <p>{{lessThanThree}}</p>
</div>
```
```js
 new Vue({
    el: '#app',
    data: {
        counter: 1
    },
    computed: {
        lessThanThree: function() {
            return this.conter > 3 ? '3より上' : '3以下'
        }
    }
 })
```
dataの部分ではあくまでも初期値みたいな扱いしか出来なくて、thisをつけても他のdataプロパティにはアクセスできない  
そういう時に、conputedプロパティを使用する  
動的なプロパティなので、関数にすること、戻り値が必須などがある。  
s