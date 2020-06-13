import { flatten } from "./utils";
import { Extension, Results } from "./types";

/**
 * @param {string} query
 * @param {Array<Extension>} extension
 * @return {Promise<Array<T>>}
 */
export default function search<T>(
  query: string,
  extensions: Array<Extension<T>>
): Promise<Array<T>> {
  const results: Array<Results<T>> = [];

  for (let extension of extensions) {
    if (typeof extension === "function") {
      results.push(extension.call(null, query));
    }
  }

  return Promise.all(results).then((groups) => flatten<T>(groups));
}
