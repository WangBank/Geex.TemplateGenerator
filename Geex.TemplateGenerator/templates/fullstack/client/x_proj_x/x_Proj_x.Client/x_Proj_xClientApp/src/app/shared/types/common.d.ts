export type EditMode = "edit" | "create";

declare module "rxjs" {
  interface Observable<T> {
    lastValuePromise(this: this): Promise<T | undefined>;
    firstValuePromise(this: this): Promise<T | undefined>;
    map<R>(this: this, project: (value: T, index: number) => R): Observable<R | undefined>;
    filter<T>(this: this, predicate: (value: T, index: number) => boolean): Observable<T | undefined>;
  }
}
