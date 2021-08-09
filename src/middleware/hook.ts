export type Unwrap<T> = T extends Promise<infer P> ? P : T;

export type Func<I extends any[], O> = (...args: I) => O | Promise<O>;

export const hook = <S extends any[], I extends any[], O, F extends Func<S, Func<I, O>>>(fun: F, {
    // started,
    before,
    after,
    // stopped,
}: {
    // started?: Func<[S], void>,
    before?: Func<[F, S, I], I>,
    after?: Func<[F, S, I, O], O>,
    // stopped?: Func<[S], void>,
}) => {
    return async (...s: any) => {
        const startState = await fun(...s)
        return async (...i: any) => {
            let beforeState: I | undefined;
            let funState: O;
            if (before) {
                beforeState = await before(fun, s as S, i as I);
            }
            funState = await startState(...(beforeState ? beforeState : i));
            if (after) {
                funState = await after(fun, s as S, i as I, funState);
            }
            return funState;
        }
    }
}

const simple = (a: number) => (b: string, c: string) => `${a}:${b}`;
hook(simple, { before: (f, [a], callargs) => ["", ""] as [string, string] })
hook(simple, { before: (f, [a], callargs) => callargs })

const simplep = (a: number) => async (b: string, c: string): Promise<string> => `${a}:${b}`;
hook(simplep, { before: (f, [a], callargs) => callargs });

const simplepp = async (a: number) => (b: string, c: string) => `${a}:${b}`;
hook(simplepp, { before: (f, [a], callargs) => callargs });

