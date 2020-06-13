import * as React from "react";
import { SearchBar } from "../SearchBar";
import { Extension } from "../types";

export function withExtensions<T extends typeof SearchBar>(
  extensions: Array<Extension<T>>
) {
  return (Component: any) =>
    function ExtendedSearchBar(props: any) {
      return <Component extensions={extensions} {...props} />;
    };
}
