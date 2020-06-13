import { useState } from "react";
import DefaultResultsItemRenderer from "./DefaultResultsItem";

import { IResultsItem } from "../types";

export default function ResultsItem<T>(props: IResultsItem<T>) {
  const {
    isSelected = false,
    item,
    style,
    onMouseEnter,
    onMouseLeave,
    onClickItem,
    children,
  } = props;
  const [isHighlighted, toggleHighlighted] = useState<boolean>(false);

  const handleMouseEnter = (evt: React.MouseEvent) => {
    toggleHighlighted(true);
    onMouseEnter && onMouseEnter(evt);
  };

  const handleMouseLeave = (evt: React.MouseEvent) => {
    toggleHighlighted(false);
    onMouseLeave && onMouseLeave(evt);
  };

  const renderer = children ? children : DefaultResultsItemRenderer;

  return renderer({
    isHighlighted,
    isSelected,
    item,
    style,
    onClick: onClickItem,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });
}
