import { RpcStartupContext, RpcCallContext } from "../infrastructure/rpc";

/**
 * A function that produces a function that produces "Hello World"
 */
export default (
    startupMessage = RpcStartupContext.get<string>("startup_message") || "Hello"
) => (
    callMessage = RpcCallContext.get<string>("call_message") || "World"
) => `${startupMessage} ${callMessage}`;
