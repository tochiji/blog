---
title: 'RustとbatとTerminalの変な色'
description: 'True Colorについて'
date: '2022-01-21'
image: ''
---

Rustでコードを表示するアプリを作っている。
コードをきれいな色で表示したいと思って、有名な`bat`のcrateを使って表示してみたらこんなことになった。

<img src="../images/2022/wrong_color.png" style="object-fit: contain;border-radius: 10px;" alt='おかしな色のコード'>

明らかに色がおかしい。

### 実装

```rust
use bat::{PagingMode, PrettyPrinter};

PrettyPrinter::new()
    .input_from_bytes(code.as_bytes())
    .language("Rust")
    .line_numbers(true)
    .paging_mode(PagingMode::Always)
    .print()
    .unwrap();

```


同じ実装でも、VSCode内のターミナルで実行してみるとちゃんと色が表示される？なぜ？

<img src="../images/2022/vscode_color.png" style="object-fit: contain;border-radius: 10px;" alt='求めていた色のコード'>


### Terminalの色事情

batのレポジトリを調べてみると、どうもターミナルには「True Colorをサポートしているかしていないか」の違いがあるらしい。

https://github.com/sharkdp/bat/blob/HEAD/doc/README-ja.md#%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E3%81%A8%E8%89%B2

VSCode内のターミナルは「True Color」をサポートしていて、Mac標準のTerminalはそれをサポートしていないようだ。こういうコードを実行して、きれいな虹色が表示されればサポートしているということらしい。

```shell
awk 'BEGIN{
    s="/\\/\\/\\/\\/\\"; s=s s s s s s s s;
    for (colnum = 0; colnum<77; colnum++) {
        r = 255-(colnum*255/76);
        g = (colnum*510/76);
        b = (colnum*255/76);
        if (g>255) g = 510-g;
        printf "\033[48;2;%d;%d;%dm", r,g,b;
        printf "\033[38;2;%d;%d;%dm", 255-r,255-g,255-b;
        printf "%s\033[0m", substr(s,colnum+1,1);
    }
    printf "\n";
}'
```

されていれば、こういう色

<img src="../images/2022/rainbow.png" style="object-fit: contain;border-radius: 10px;width:500px;" alt='VSCodeに表示されるきれいな虹色'>



されてなければ、こういう色。

<img src="../images/2022/boroboro_rainbow.png" style="object-fit: contain;border-radius: 10px;width:500px;" alt='VSCodeに表示されるきれいな虹色'>



なるほど。確かに虹色が表示されない。Mac標準のTerminalだと諦めるしかないのか？

## 解決策

Mac標準のTerminal上で`bat`コマンドをインストールして使うと、コードがちゃんとハイライトされて表示される。何か解決策があるはずだと思ってドキュメントを見る。


https://docs.rs/bat/0.19.0/bat/struct.PrettyPrinter.html#method.true_color

```rust
pub fn true_color(&mut self, yes: bool) -> &mut Self
# Whether or not to output 24bit colors (default: true)
```

あった。`true_color(false)` をコードに追加すると、Mac標準Terminalでも色が表示されるようになった。

```rust
use bat::{PagingMode, PrettyPrinter};

PrettyPrinter::new()
    .input_from_bytes(code.as_bytes())
    .language("Rust")
    .true_color(false)
    .line_numbers(true)
    .paging_mode(PagingMode::Always)
    .print()
    .unwrap();
```

終わり。