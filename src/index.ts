/*
  Debouncer is used to debounce multiple calls to a given function.
  Calls are deferrered until end of a given tick, in which case the function
  is called only once. Only the args from the last call are used. Allows for
  manually flushing any pending calls synchronously as well.
*/

export type FnVariant<
  R = undefined,
  A1 = undefined,
  A2 = undefined,
  A3 = undefined,
  A4 = undefined,
  A5 = undefined,
  A6 = undefined
> = (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => R;

export type DebouncedFn<
  R = undefined,
  A1 = undefined,
  A2 = undefined,
  A3 = undefined,
  A4 = undefined,
  A5 = undefined,
  A6 = undefined
> = FnVariant<Promise<R>, A1, A2, A3, A4, A5, A6> & {
  flush: () => R|null; // Null if no calls
};

export default function<
  R = undefined,
  A1 = undefined,
  A2 = undefined,
  A3 = undefined,
  A4 = undefined,
  A5 = undefined,
  A6 = undefined
>(
  this: any,
  fn: FnVariant<R, A1, A2, A3, A4, A5, A6>
): DebouncedFn<R, A1, A2, A3, A4, A5, A6> {

  // Last known set of args, if any
  let lastArgs: any[]|undefined;

  // Pending promise for debounced function, if any
  let promise: Promise<R>|undefined;

  // Last result returned, if any
  let result: R|undefined;

  // This gets called by either flush or promise resolution.
  // Args must be set beforehand.
  const run = () => {
    const ret = fn.apply(this, lastArgs);
    lastArgs = undefined; // Clear old args
    promise = undefined;  // Clear old promise
    return (result = ret);
  };

  const debouncedFn = ((...args: any[]) => {
    lastArgs = args;
    result = undefined;
    return promise || (promise = Promise.resolve().then(() => result || run()));
  }) as DebouncedFn<R, A1, A2, A3, A4, A5, A6>;

  // No run function means not called, return null. Store result so subsequent
  // promise resolution knows to ignore.
  debouncedFn.flush = () => run ? (result = run()) : null;

  return debouncedFn;
}

