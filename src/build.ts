type Strategy = {

}

type With<Y> = {
    with: {
        strategies: {
            [x in keyof Y]: Strategy
        }
    }
}

type ApiUsing<H, T extends With<H>> = {
    strategy: keyof T["with"]["strategies"]
}

type Endpoint<I, C, R, F> = {
    endpoint: {
        [x in keyof F]: (...init: I[]) => (...call: C[]) => R
    }
}

type EndpointAdded<I, C, R, F> = {
    [k in keyof F]: () => void
}

export const build = {
    api: <Y>(apiWith: With<Y>) => {
        const context = {}
        return {
            using: (strategy: ApiUsing<Y, typeof apiWith>) => {
                return {
                    and: <I, C, R, F>(endpoint: Endpoint<I, C, R, F>): EndpointAdded<I, C, R, F> & { and: () => void } => ({
                        endpoint
                    })
                }
            }
        }
    }
}