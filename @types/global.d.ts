// source: https://github.com/total-typescript/ts-reset
interface Array<T> {
  // biome-ignore lint/suspicious/noExplicitAny: Any allowed
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[];
}

interface ReadonlyArray<T> {
  // biome-ignore lint/suspicious/noExplicitAny: Any allowed
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[];
}

type NonFalsy<T> = T extends false | 0 | "" | null | undefined | 0n ? never : T;

type NullablePartial<T> = {
  [P in keyof T]?: T[P] | null;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type DeepNullablePartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]> | null;
    }
  : T;
