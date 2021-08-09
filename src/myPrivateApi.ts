import { createService } from "./infrastructure/rpc";

import helloWorld from "./functions/helloWorld";
import welcomeMessage from "./functions/welcomeMessage";
import helloWorldWithContext from "./functions/helloWorldWithContext";

import { hook } from "./middleware/hook";
import { audit } from "./middleware/audit";
import { setCallContext } from "./middleware/setCallContext";

export const complexApiExample = createService({
    functions: {
        helloWorld,
        welcomeMessageAudit: hook(welcomeMessage, { after: audit }),
    },
    started: (context) => {
        console.log(`started, start: ${context.set("start", Date.now())}`);
    },
    stopped: (context) => {
        console.log(`stopped, start: ${context.get<number>("start") - Date.now()}`);
    },
    domain: "example.company.api",
    path: {
        prefix: "/complex/rpc"
    }
})

export const simpleApiExample = createService({
    functions: { helloWorld },
    domain: "example.company.api",
    path: {
        prefix: "/simple/rpc"
    }
})

export const simpleApiWithContextExample = createService({
    functions: {
        helloWorldWithContext: hook(helloWorldWithContext, {
            before: setCallContext("call_message", "Tere"),
            after: audit
        })
    },
    started: (context) => context.set("startup_message", "Tere"),
    domain: "example.company.api",
    path: {
        prefix: "/simple/rpc"
    }
})