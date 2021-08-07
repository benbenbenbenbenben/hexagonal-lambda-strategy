import { includes, createService } from "./infrastructure/rpc";

import helloWorld from "./functions/helloWorld";
import welcomeMessage from "./functions/welcomeMessage";
import helloWorldWithContext from "./functions/helloWorldWithContext";

import { audit } from "./middleware/audit";

export const complexApiExample = createService({
    functions: {
        ...includes({ helloWorld }),
        ...includes({ welcomeMessageAudit: audit(welcomeMessage) }),
        ...includes({ welcomeMessageAuditWithHooks: audit(welcomeMessage) }, {
            before: (_startContext, callContext) => {
                console.log(`calling, random_id: ${callContext.set("call_id", Math.random())}`);
            },
            after: (_startContext, callContext) => {
                console.log(`called, random_id: ${callContext.get("call_id")}`);
            },
            catch: (_startContext, _callContext, error) => {
                console.log(`error: ${error.name}`);
            }
        }),
    },
    startup: (context) => {
        console.log(`started, start: ${context.set("start", Date.now())}`);
    },
    shutdown: (context) => {
        console.log(`stopped, start: ${context.get<number>("start") - Date.now()}`);
    },
    domain: "example.company.api",
    path: {
        prefix: "/complex/rpc"
    }
})

export const simpleApiExample = createService({
    functions: includes({ helloWorld }),
    domain: "example.company.api",
    path: {
        prefix: "/simple/rpc"
    }
})

export const simpleApiWithContextExample = createService({
    functions: includes({ helloWorldWithContext }, {
        before: (_startupContext, callContext) => callContext.set("call_message", "Maailm")
    }),
    startup: (context) => context.set("startup_message", "Tere"),
    domain: "example.company.api",
    path: {
        prefix: "/simple/rpc"
    }
})