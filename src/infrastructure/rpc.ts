
type ExactlyOneKey<K extends keyof any, V, KK extends keyof any = K> =
    { [P in K]: { [Q in P]: V } &
        { [Q in Exclude<KK, P>]?: never } extends infer O ?
        { [Q in keyof O]: O[Q] } : never
    }[K];

export type ApiPath = {
    prefix: string
}

export type FunctionHandlerDefinition<T extends ExactlyOneKey<keyof T, <I extends [], C extends []>(...args: I) => (Promise<(...args: C) => any> | ((...args: C) => any))>> = {
    handle: {
        [name: string]: <I extends [], C extends []>(...args: I) => (Promise<(...args: C) => any> | ((...args: C) => any))
    },
    alt: T
}

export type FunctionsModifier<Functions> = Functions;

export type ApiDefinition<Functions> = {
    functions: FunctionsModifier<Functions>
    domain: string
    path: ApiPath
}

export const createRpcService = <Functions>(apiDefinition: ApiDefinition<Functions>) => {
    return apiDefinition
}

export type FunctionLifeCycle<F> = {
    beforeStart: F
}

export const createHandler = <I extends any[], C extends any[], F extends (...args: I) => (Promise<(...args: C) => any> | ((...args: C) => any)), T extends ExactlyOneKey<keyof T, F>>(t: T, hooks?: FunctionLifeCycle<I>) => {
    return t;
}