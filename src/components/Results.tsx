import * as React from "react";
import ResultsItem from "./ResultsItem";

import { IResults } from "../types";

import "./Results.css";

export function Results<T>(props: IResults<T>) {
  const style: React.CSSProperties = { ...props.style };

  const {
    items,
    selectedIndex,
    children,
    onMouseLeave,
    onClickItem,
    onMouseEnterItem,
    onMouseLeaveItem,
  } = props;

  if (props.maxHeight) {
    style.maxHeight = props.maxHeight;
  }

  function handleMouseEnterItem(key: number) {
    onMouseEnterItem && onMouseEnterItem(key);
  }

  function handleMouseLeaveItem(key: number) {
    onMouseLeaveItem && onMouseLeaveItem(key);
  }

  return (
    <ul
      className={`searchBar-results ${
        props.maxHeight ? "searchBar-results--withMaxHeight" : ""
      }`}
      style={style}
      onMouseLeave={onMouseLeave}
    >
      {items.map((item: any, key: number) => (
        <ResultsItem
          key={key}
          children={children}
          item={item}
          isSelected={selectedIndex === key}
          onMouseEnter={() => handleMouseEnterItem(key)}
          onMouseLeave={() => handleMouseLeaveItem(key)}
          onClickItem={onClickItem}
        />
      ))}
    </ul>
  );
}
