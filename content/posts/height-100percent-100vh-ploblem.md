---
title: 'height 100％と100vhの間（iOS）'
description: 'iOSのheightについて'
date: '2021-09-28'
image: ''
---

サイトを作り始めるとき、大体下記のように　`height`　を指定して、背景色が全画面に広がるように指定しますね。

```css
html {
  height: 100%;
}

body {
  height: 100%;
  background: var(--background-color);
}

#root {
  height: 100%;
}
```

こうして指定すると、コンテンツの内容が少なく縦幅が足りない場合でも、背景色が画面の下、すなわち URL バー部分まで広がリます。

<img src="../images/2021/100percent.jpg" style="object-fit: contain;border-radius: 10px;" alt='100% 指定した場合'>

ちゃんと URL バー部分まで背景色（ダークグレー）が適用されています。

### 100％と 100vh の間

さて、Safari でブラウザを下方向にスクロールすると、URL バーが縮まることがあります。URL バーが縮まった状態での画面全体の height が「100vh」に対応します。

この「100％と 100vh の間」については、背景色が適用されず、ブラウザの標準の背景色（ここではダークモードなので黒）が適用されてしまいます。

<img src="../images/2021/100vh.jpg" style="object-fit: contain;border-radius: 10px;" alt='100vh'>

これは意図したデザインではありません。かといって、height リレーで`100vh`を指定すると、URL バーが縮まっていない場面で意味なくスクロール可能になってしまうので、それも避けたいところです。

### 対応策

今後ベンダープレフィックスや、`height: 100％` の解釈が変更されることで解決するかもしれませんが、しばらくは JavaScript で対症療法するのが一番かと思います。

```js
const innerHeight = window.innerHeight;
document.documentElement.style.height = `${innerHeight}px`;
```

コンテンツ量が少なく縦幅が足りないページが表示されるときに、上記を実行しましょう。html の`height: 100%`を上書きし、URL バーが縮まった場合でも全画面に背景色が広がるようになります。

<img src="../images/2021/100vh_ok.jpg" style="object-fit: contain;border-radius: 10px;" alt='背景色がいっぱいに広がった画像'>
