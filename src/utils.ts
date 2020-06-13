/**
 * @param {Array<T>} lists
 * @return {Array<T>}
 */
export function flatten<T>(list: Array<Array<T>>): Array<T> {
  return list.reduce((prev: Array<T>, next: Array<T>): Array<T> => {
    return prev.concat(next);
  }, []);
}

/**
 * @param {Function} fn
 * @param {number} wait
 * @param {object} options
 * @param {object.isImmediate} boolean
 * @return {Function}
 */
export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

export function debounce<F extends Procedure>(
  fn: F,
  wait: number,
  options: Options = {
    isImmediate: false,
  }
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const ctx = this;

    const later = () => {
      timeout = undefined;
      if (!options.isImmediate) {
        fn.apply(ctx, args);
      }
    };

    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);

    const shouldCallNow = options.isImmediate && timeout === undefined;
    if (shouldCallNow) {
      fn.apply(ctx, args);
    }
  };
}
