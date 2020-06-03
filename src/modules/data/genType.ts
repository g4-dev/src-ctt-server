/// setup
type MapSchemaTypes = {
  string: string;
  integer: number;
  // any others, like these?
  boolean: boolean;
  float: number;
  number: number;
  regexp: RegExp;
  // more?
};
type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  [K in keyof T]: MapSchemaTypes[T[K]];
};
function asSchema<T extends Record<string, keyof MapSchemaTypes>>(t: T): T {
  return t;
}

export { asSchema, MapSchema };
