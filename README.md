# moj-extract-city-border

登記所備付地図データ (法務省) から市区町村境界データを抽出するスクリプトです。
具体的には、`線種別` が `市区町村界線` のデータを抽出し、GeoJSON として出力します。

```
<筆界線>
  <形状 idref="C000000038"/>
  <線種別>市区町村界線</線種別>
</筆界線>
```

## 実行方法

任意の登記所備付地図データを `data` ディレクトリに配置し、zip を解凍し以下のコマンドを実行します。
実行後、`docs` ディレクトリに GeoJSON が出力されます。

```
npm install
npm run build -path='./data/<登記所備付地図データのディレクトリ名>'
```

例
```
npm run build -path='./data/30422-1704'
```


## 【データーソース】
- [「登記所備付データ」（法務省）](https://front.geospatial.jp/houmu-chiseki/)


## 備考

メモリ不足で失敗する場合は npm scripts の `build` コマンド内の `--max-old-space-size` メモリの値を変更してください。
デフォルトは 10240 MB です。

```
node --max-old-space-size=10240 index.js ${npm_config_path}"
```