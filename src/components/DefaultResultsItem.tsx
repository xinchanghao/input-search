import * as React from "react";
import { COLORS } from "../constants";

import { ResultsItem, IResultsItemRenderer } from "../types";

import "./DefaultResultsItem.css";

export default function ResultsItemRenderer<T>(
  props: IResultsItemRenderer<T> & React.HTMLAttributes<HTMLAnchorElement>
) {
  const { item, isSelected, isHighlighted, style = {}, ...rest } = props;

  if (isSelected) {
    style.backgroundColor = COLORS.GRAY;
  }

  if (isHighlighted) {
    style.backgroundColor = COLORS.DARKGRAY;
  }

  return (
    <a
      className="searchBar-results__item"
      href={item.url}
      style={style}
      {...rest}
    >
      {item.title}
    </a>
  );
}

export function resultsItemAction(item: ResultsItem) {
  if (item.url) {
    window.open(item.url);
  }
}
