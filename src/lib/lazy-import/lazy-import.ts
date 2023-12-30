import React from "react";

export function lazyImport<
  // biome-ignore lint/suspicious/noExplicitAny: Any component is acceptable
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}
