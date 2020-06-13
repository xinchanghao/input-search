import * as React from "react";
import { useIntl } from "react-intl";

import { IInput } from "../types";

import "./Input.css";

export function Input(props: IInput) {
  const intl = useIntl();

  const {
    style,
    theme,
    placeholder = intl.formatMessage({ id: "placeholder" }),
    ...rest
  } = props;

  return (
    <input
      className={`searchBar-input ${
        theme === "dark" ? "searchBar-input--dark" : "searchBar-input--light"
      }`}
      type="text"
      style={style}
      placeholder={placeholder}
      {...rest}
    />
  );
}
