# @chhxin/search-input

## TODO: 现在还没提到 npm ！！！

## 安装

```bash
npm install --save @chhxin/search-input
```

## storybook 启动

```bash
npm install
npm run storybook
```

## 使用

```jsx
import React, { Component } from "react";
import fetch from "unfetch";

import SearchBar from "@chhxin/search-input";
import "@chhxin/search-input/lib/index.css";

const URL = "https://api.npms.io/v2/search/suggestions";
function NpmSearchExtension(query) {
  const prom = fetch(`${URL}?q=${query}&size=10`);
  return prom
    .then((res) => res.json())
    .then((packages) =>
      packages.map((item) => ({
        title: item.package.name,
        url: item.package.links.npm,
      }))
    );
}

function BasicExtension() {
  return [
    { title: "a", url: "https://a.com" },
    { title: "b", url: "https://b.com" },
    { title: "c", url: "https://c.com" },
  ];
}

class Example extends Component {
  render() {
    return <SearchBar extensions={[BasicExtension]} />;
  }
}
```

## 扩展

```jsx
import React, { Component } from "react";
import fetch from "unfetch";
import SearchBar from "@chhxin/search-input";
import "@chhxin/search-input/lib/index.css";

const URL = "https://api.npms.io/v2/search/suggestions";
function NpmSearchExtension(query) {
  const prom = fetch(`${URL}?q=${query}&size=10`);
  return prom
    .then((res) => res.json())
    .then((packages) =>
      packages.map((item) => ({
        title: item.package.name,
        url: item.package.links.npm,
        author: item.package.author.name,
      }))
    );
}

function ResultItem({ item }) {
  return (
    <div>
      <a href={item.url}>{item.author + item.title}</a>
    </div>
  );
}

class Example extends Component {
  render() {
    return <SearchBar extensions={[NpmSearchExtension]} render={ResultItem} />;
  }
}

// or
class Example extends Component {
  render() {
    return (
      <SearchBar extensions={[NpmSearchExtension]}>
        {({ item }) => <div>{item.author + item.title}</div>}
      </SearchBar>
    );
  }
}
```

## HOC

```jsx
import React, { Component } from "react";
import fetch from "unfetch";
import SearchBar, { withExtensions } from "@chhxin/search-input";
import "@chhxin/search-input/lib/index.css";

function GitHubSearchExtension(query) {
  const prom = fetch(`https://api.github.com/search/repositories?q=${query}`);

  return prom
    .then((res) => res.json())
    .then((resp) =>
      resp.items.map((item) => ({
        title: item.full_name,
        url: item.html_url,
      }))
    );
}

const GitHubSearchBar = withExtensions([GitHubSearchExtension])(SearchBar);

class Example extends Component {
  render() {
    return <GitHubSearchBar />;
  }
}
```

## 国际化

简单的实现了 `placeholder` 的多语言配置

## 多主题

简单的实现了 `dark` 和 `light` 两个内置主题

## Props

| Prop                 | Type                  | Required | Description                                                          |
| :------------------- | :-------------------- | :------- | :------------------------------------------------------------------- |
| `value`              | `string`              | `false`  | 自定义搜索框 value                                                   |
| `placeholder`        | `string`              | `false`  | placeholder                                                          |
| `className`          | `string`              | `false`  | 根节点 class                                                         |
| `theme`              | `dark` `light`        | `false`  | 主题，用来修改输入框 hover 时的边框颜色                              |
| `autoFocus`          | `boolean`             | `false`  | autoFocus                                                            |
| `children`           | `Function`            | `false`  | 自定义单个结果的渲染方法， 参数`{ item, isSelected, isHighlighted }` |
| `render`             | `Function`            | `false`  | 与 children 相同                                                     |
| `maxResults`         | `number`              | `false`  | 最多展示多少条结果                                                   |
| `maxViewableResults` | `number`              | `false`  | 未滚动时最多展示多少条结果                                           |
| `inputDelay`         | `number`              | `false`  | 延迟查询 debounce 时间                                               |
| `extensions`         | `Array<Function>`     | `false`  | 查询 function 数组                                                   |
| `style`              | `React.CSSProperties` | `false`  | 输入框 style                                                         |
| `resultsStyle`       | `object`              | `false`  | 结果框 style                                                         |
| `rootStyle`          | `object`              | `false`  | 根节点 style                                                         |
| `onSelect`           | `Function`            | `false`  | 结果选中时回调                                                       |
| `onQuery`            | `Function`            | `false`  | 当触发某项搜索时回调                                                 |
| `onChange`           | `Function`            | `false`  | 输入框值变化时回调                                                   |
| `onFocus`            | `Function`            | `false`  | 输入框获得焦点时回调                                                 |
| `onBlur`             | `Function`            | `false`  | 输入框是去焦点时回调                                                 |
