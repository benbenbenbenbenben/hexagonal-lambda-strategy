import { createHandler, createRpcService } from "./infrastructure/rpc";
import helloWorld from "./functions/helloWorld";
import welcomeMessage from "./functions/welcomeMessage";

export const anApiWithManyFunctions = createRpcService({
    functions: {
        ...createHandler({ helloWorld }, { beforeStart: (x) => x }),
        ...createHandler({ welcomeMessage }, { beforeStart: (x) => x }),
    },
    domain: "example.company.api",
    path: {
        prefix: "/many/rpc"
    }
})

export const anApiWithOneFunction = createRpcService({
    functions: createHandler({ helloWorld }),
    domain: "example.company.api",
    path: {
        prefix: "/one/rpc"
    }
})