export type Prettify<TObject> = {
  [Key in keyof TObject]: TObject[Key];
} & {};

export type Result<TData, TError> = ["busy"] | ["ok", TData] | ["fail", TError];

export type Operation<TData, TError> =
  | ["idle"]
  | ["busy"]
  | ["ok", TData]
  | ["fail", TError];
