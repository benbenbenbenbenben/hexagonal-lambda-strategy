// this file builds an rpc service

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
    }
}

export type FunctionsModifier<Functions> = Functions;

export type ApiDefinition<Functions> = {
    functions: FunctionsModifier<Functions>
    domain: string
    path: ApiPath,
    startup?: (startContext: StartupContext) => void,
    shutdown?: (startContext: StartupContext) => void,
    catch?: (startContext: StartupContext, error: Error) => void,
}

export const createService = <Functions>(apiDefinition: ApiDefinition<Functions>) => {
    return {
        apiDefinition,
        invoke: (name: {
            name: keyof Functions
        }) => {
            return {
                with: (...parameters: Parameters<Functions[typeof name.name] extends (...args:any) => any ? Functions[typeof name.name] : never>) => {

                }
            }
        }
    }
}

export type Unwrap<P> = P extends Promise<infer T> ? Unwrap<T> : P;

export interface ExecutionContext {
    get: <T = any>(name: string) => T
    set: <T>(name: string, value: T) => T
}

export interface StartupContext extends ExecutionContext { }
export interface CallContext extends ExecutionContext { }

export const includes = <F extends (...args: any) => (Promise<(...args: any) => any> | ((...args: any) => any)), T extends ExactlyOneKey<keyof T, F>>(t: T, hooks?: {
    before?: (startContext: StartupContext, callContext: CallContext) => void,
    after?: (startContext: StartupContext, callContext: CallContext) => void,
    catch?: (startContext: StartupContext, callContext: CallContext, error: Error) => void,
}) => {
    return t
}

export class RpcStartupContext {
    static get<T = any>(name: string): T {
        return {} as T
    }
    static set<T>(name: string, value: T): T {
        return value;
    }
}

export class RpcCallContext {
    static get<T = any>(name: string): T {
        return {} as T
    }
    static set<T>(name: string, value: T): T {
        return value;
    }
}