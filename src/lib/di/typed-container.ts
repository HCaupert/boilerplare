import {
  asFunction as awilixAsFunction,
  createContainer as awilixCreateContainer,
  Lifetime,
} from "awilix";
import type {
  BuildResolver,
  DisposableResolver,
  InferCradleFromResolvers,
  Resolver,
} from "awilix";

export { asValue } from "awilix";

// Type-only metadata: Awilix infers results but does not check factory dependencies.
declare const dependencies: unique symbol;

type FactoryResolver<D, T> = BuildResolver<T> &
  DisposableResolver<T> & {
    readonly [dependencies]: D;
  };

type CheckedDependencies<S extends Record<string, Resolver<any>>> = {
  [K in keyof S]: S[K] extends { readonly [dependencies]: infer D }
    ? InferCradleFromResolvers<S> extends D
      ? unknown
      : {
          readonly __error: `service "${K & string}" has unsatisfied dependencies`;
        }
    : unknown;
};

export function asFunction<D, T>(
  factory: (dependencies: D) => T
): FactoryResolver<D, T> {
  // Each app container owns its scope: resolve lazily, then reuse within that scope.
  return awilixAsFunction(factory, {
    lifetime: Lifetime.SCOPED,
  }) as FactoryResolver<D, T>;
}

export function createContainer<S extends Record<string, Resolver<any>>>(
  services: S & CheckedDependencies<S>
) {
  return awilixCreateContainer().register<S>(services);
}
