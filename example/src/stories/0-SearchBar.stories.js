import React from "react";
import fetch from "unfetch";
import SearchBar, { withExtensions } from "@chhxin/input-search";
import "@chhxin/input-search/dist/index.css";

import ResultsItem from "../components/CustomResultsItem";

function GitHubSearchExtension(query) {
  const prom = fetch(`https://api.github.com/search/repositories?q=${query}`);

  return prom
    .then((res) => res.json())
    .then((resp) =>
      resp.items.map((item) => ({
        title: item.full_name,
        subtitle: item.html_url,
        image: item.owner.avatar_url,
        url: item.html_url,
      }))
    );
}

function NpmSearchExtension(query) {
  const prom = fetch(
    `https://api.npms.io/v2/search/suggestions?q=${query}&size=10`
  );

  return prom
    .then((res) => res.json())
    .then((packages) =>
      packages.map((item) => ({
        title: item.package.name,
        url: item.package.links.npm,
      }))
    );
}

export default {
  title: "SearchBar",
  components: SearchBar,
};

export const SearchBarDemo = () => (
  <SearchBar maxViewableResults={5} extensions={[NpmSearchExtension]} />
);

const GitHubSearchBar = withExtensions([GitHubSearchExtension])(SearchBar);

export const GitHubSearchBarDemo = () => (
  <GitHubSearchBar
    placeholder={`github库 (eg: "react")`}
    maxViewableResults={5}
  />
);

export const OptionalRenderDemo = () => (
  <GitHubSearchBar
    maxViewableResults={5}
    render={ResultsItem}
    placeholder="render自定义了噢..."
  />
);

export const ThemeDemo = () => (
  <GitHubSearchBar
    maxViewableResults={5}
    render={ResultsItem}
    theme="dark"
    placeholder="边框变成黑色了噢..."
  />
);

SearchBarDemo.story = {
  name: "基本使用",
};

GitHubSearchBarDemo.story = {
  name: "高阶组件",
};

OptionalRenderDemo.story = {
  name: "自定义Render",
};

ThemeDemo.story = {
  name: "自定义主题",
};
