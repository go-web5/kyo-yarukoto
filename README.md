# 今日やることリストアプリ

## React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Install
```
$ npm i
```

## Development
```
$ npm run dev
```

## JSON Server
```
$ npm start
```

## Production
```
$ npm run build
```

## REST Client 使い方
VS Code上でHTTPリクエストを送信し、レスポンスを確認する方法

1. VS Code拡張機能「REST Client」インストールする

2. .httpのファイルを開き、HTTPリクエストを送信する
- 「Send Request」をクリックする

- または、各メソッドの行にカーソルを移動して以下コマンドをうつ
 - Windows : Ctrl + Alt + R
 - Mac : Cmd + Alt + R

3. Responseタブが出現し、そこにレスポンス内容が表示される