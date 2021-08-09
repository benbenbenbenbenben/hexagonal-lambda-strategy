// this file builds an rpc service

import { Func, hook } from "../middleware/hook";

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
    started?: (startContext: StartupContext) => void,
    stopped?: (startContext: StartupContext) => void,
    catch?: (startContext: StartupContext, error: Error) => void,
}

export const createService = <Functions>(apiDefinition: ApiDefinition<Functions>) => {
    const functions = Object.entries(apiDefinition.functions).reduce((functions, thisFunction) => {
        const clearCallContext: Func<[any, any[], any[]], any[]> = (...args:any) => {
            RpcCallContext.clear();
            return args[args.length - 1];
        }
        return { ...functions, [thisFunction[0]]: hook(thisFunction[1], { before: clearCallContext }) }
    }, {});
    return {
        ...apiDefinition,
        functions
    } as ApiDefinition<Functions>;
}

export type Unwrap<P> = P extends Promise<infer T> ? Unwrap<T> : P;

export interface ExecutionContext {
    get: <T = any>(name: string) => T
    set: <T>(name: string, value: T) => T
}

export interface StartupContext extends ExecutionContext { }
export interface CallContext extends ExecutionContext { }

export class RpcStartupContext {
    static get<T = any>(name: string): T {
        return {} as T
    }
    static set<T>(name: string, value: T): T {
        return value;
    }
}

export class RpcCallContext {
    static context: Record<string, unknown>;
    static clear() {
        RpcCallContext.context = {};
    }
    static get<T = any>(name: string): T {
        return RpcCallContext.context[name] as T;
    }
    static set<T>(name: string, value: T): T {
        return RpcCallContext.context[name] = value;
    }
}