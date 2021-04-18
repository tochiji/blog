---
title: 'blog始めました'
description: 'blogを始めました'
date: '2021-04-18'
image: ''
---

[Gatsby](https://www.gatsbyjs.com/)を使って、blog を作りました！初めて使いましたが、とても表示が速いですね。
せっかくなので、Gatsby の設定などをメモしておきます。数ヶ月したら忘れそうなので。

## Gatsby

```json
// package.json
"gatsby": "^3.3.0"
```

現時点の最新版を使用している。Gatsby は v3 から TypeScript 対応が進み、`gatsby-plugin-typescript` の plugin は不要になった。

## Plugins

Gatsby は色々なプラグインを入れることで機能を拡張する。入れているプラグインをまとめておく。

### gatsby-plugin-typegen

Gatsby では GraphQL を用いてサイト情報や blog の投稿内容を取得するが、そのユーザーが自由に作る GraphQL の Query の結果データの型を自動生成してくれる。`src/＿generated__/` 配下に `gatsby-types.ts` という型ファイルが誕生する。

「Gatsby v3になったから消しても動くんじゃないか？」と思ってこのpluginを消してみたら、どうもうまく型が生成されなかったので、まだ必要そう。また、devサーバーを立ち上げつつ開発していると、ファイル更新時に型情報がたまに壊れる（特に`src/pages/配下`）ことがあり、このあたりはうまく改善されていくと嬉しい。

```json
// package.json
"gatsby-plugin-typegen": "^2.2.4"
```

```json
// gatsby-config.js の plugins 内
"gatsby-plugin-typegen"
```

### gatsby-source-filesystem

blog の markdown ファイルを置く場所を指定する。gatsby の標準の動作だと`src/` 配下のファイルしか GraphQL の読み込み対象にならないので、このプラグインを用いて `content/posts/` 配下も対象とする。

```json
// package.json
"gatsby-source-filesystem": "^3.3.0"
```

```json
// gatsby-config.js の plugins 内
{
  "resolve": "gatsby-source-filesystem",
  "options": {
    "name": "posts",
    "path": `${__dirname}/content/posts/`
  }
}
```

### gatsby-plugin-react-helmet

このプラグインを使用することで、`<head>`タグ内の title タグ、meta タグ、Open Graph Protcol の設定ができるようになる。

```json
// package.json
"gatsby-plugin-react-helmet": "^4.2.0"
```

```json
// gatsby-config.js の plugins 内
"gatsby-plugin-react-helmet"
```

### gatsby-transformer-remark

markdown を HTML に変換するために必要。

[remark - markdown processor powered by plugins](https://remark.js.org/)

`gatsby-transformer-remark` には更に関連プラグインがあるため、いくつかそれを入れている。

- `gatsby-remark-prismjs` は markdown 内のコードブロックをうまくハイライトする。便利
- `gatsby-remark-autolink-headers` は記事内の各見出しに自動でアンカーリンクを作成する。便利
- `gatsby-remark-numbered-footnotes` は脚注のリンクに自動で連番数値を振ってくれる…はずだが、なぜかそもそも脚注（ `[^1]` ）がうまく動作しないので、現状ではお飾りのプラグインになっている

```json
// package.json
"gatsby-transformer-remark": "^4.0.0",
"gatsby-remark-prismjs": "^5.0.0",
"gatsby-remark-autolink-headers": "^4.0.0",
"gatsby-remark-numbered-footnotes": "^1.0.1"
```

```json
// gatsby-config.js の plugins 内
{
  "resolve": "gatsby-transformer-remark",
  "options": {
    "plugins": [
      "gatsby-remark-prismjs",
      "gatsby-remark-autolink-headers"
      "gatsby-remark-numbered-footnotes",
    ]
  }
}
```

## types

```json
// package.json

"@types/react": "^17.0.3",
"@types/react-dom": "^17.0.3",
"@types/react-helmet": "^6.1.0",
"@typescript-eslint/eslint-plugin": "^4.20.0",
"@typescript-eslint/parser": "^4.20.0",
```

react 周りで必須のものと、`react-helmet` 関連を入れている。`@typescript-eslint/~` の二つは、ESLint に TypeScript 用の設定を追加するものと、ESLint が TypeScript をパースできるようにするもの。未来には不要になるといいなあ。

## スタイルいろいろ

`code xxxx`

| aaa | bbb | eee | ggg |
| --- | --- | --- | --- |
| ccc | ddd | fff | hhh |

## h2

### h3

- aaaa
- bbbb
- cccc
  - dddd
  - ffff

1.  aaaa
2.  bbbb
3.  cccc
    1.  dddd
    2.  ffff

```typescript
// gatsby-remark-prismjs によりコードがハイライトされます

const beautifulString = "abc"

type Props {
    name: "tochiji"
}

return true;
```

## 引用

> 神は細部に宿る

脚注 <sup id="a1">[1](#f1)</sup>

脚注はこのように記述している。不便。

```html
脚注 <sup id="a1">[1](#f1)</sup>

<b id="f1">1: </b> Footnote content here. [↩](#a1)
```

---

<b id="f1">1: </b> Footnote content here. [↩](#a1)
