import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { IntlProvider } from "react-intl";

import { resultsItemAction as defaultAction } from "./components/DefaultResultsItem";
import { Input } from "./components/Input";
import { Results } from "./components/Results";
import search from "./search";

import { ISearchBar, ResultsItem } from "./types";
import { DEFAULT_BLUR_DELAY, DEFAULT_HEIGHT, KEYS } from "./constants";
import { debounce } from "./utils";

import zh_CN from "./locales/zh-CN";
import en_US from "./locales/en-US";

import "./SearchBar.css";

export function SearchBar<T extends ResultsItem>({
  maxResults = 0,
  maxViewableResults = 0,
  extensions,
  inputDelay = 200,
  className,
  rootStyle,
  resultsStyle,
  theme = "light",
  children,
  render,
  onQuery,
  onSelect,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: ISearchBar<T>) {
  if (!render) {
    render = children;
  }

  const maxHeight = maxViewableResults
    ? maxViewableResults * DEFAULT_HEIGHT
    : null;

  const [displayResults, toggleDisplayResults] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Array<T>>([]);
  const [currLocaleMessage, setCurrLocaleMessage] = useState(zh_CN);

  const inputValueRef = useRef("");

  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  const query = useCallback(
    debounce((value: string) => {
      if (extensions && extensions.length > 0) {
        search<T>(value, extensions).then((results) => {
          if (inputValueRef.current !== "") {
            setResults(maxResults > 0 ? results.slice(0, maxResults) : results);
            toggleDisplayResults(results.length > 0);
            setSelectedIndex(Math.min(selectedIndex, results.length - 1));
            onQuery && onQuery(results);
          }
        });
      }
    }, inputDelay),
    [inputDelay]
  );

  const reset = () => {
    setResults([]);
    toggleDisplayResults(false);
  };

  const prev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const next = () => {
    if (selectedIndex < results.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const action = () => {
    const idx = hoveredIndex > -1 ? hoveredIndex : selectedIndex;
    const item = results[idx];
    const resultsItemAction = onSelect || defaultAction;
    resultsItemAction.call(null, item);
  };

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(evt);
    setTimeout(() => toggleDisplayResults(false), DEFAULT_BLUR_DELAY);
  };

  const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    onFocus && onFocus(evt);
    if (inputValueRef.current !== "") {
      toggleDisplayResults(true);
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    switch (evt.keyCode) {
      case KEYS.UP:
        prev();
        evt.preventDefault();
        break;

      case KEYS.DOWN:
        next();
        evt.preventDefault();
        break;

      case KEYS.ENTER:
        action();
        break;
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValue(value);

    if (inputValue) {
      query(inputValue);
    } else {
      reset();
    }

    onChange && onChange(value);
  };

  const handleClickItem = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hoveredIndex > -1) {
      action();
    }
  };

  const handleMouseEnterItem = (currHoveredIndex: number) => {
    setHoveredIndex(currHoveredIndex);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  useEffect(() => {
    switch (navigator.language.split("-")[0]) {
      case "zh":
        setCurrLocaleMessage(zh_CN);
        break;

      case "en":
        setCurrLocaleMessage(en_US);
        break;

      default:
        setCurrLocaleMessage(zh_CN);
        break;
    }
  }, []);

  return (
    <IntlProvider locale={navigator.language} messages={currLocaleMessage}>
      <div
        style={rootStyle}
        className={`searchBar-container ${className || ""}`}
      >
        <Input
          {...rest}
          theme={theme}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />

        {displayResults && (
          <Results
            children={render}
            items={results}
            maxHeight={maxHeight}
            onClickItem={handleClickItem}
            onMouseEnterItem={handleMouseEnterItem}
            onMouseLeave={handleMouseLeave}
            selectedIndex={selectedIndex}
            style={resultsStyle}
          />
        )}
      </div>
    </IntlProvider>
  );
}
