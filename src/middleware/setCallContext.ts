import { RpcCallContext } from "../infrastructure/rpc";

export const setCallContext = <T>(name: string, value: T) => <Input extends [], Output>(...input: Input): Output => {
    RpcCallContext.set(name, value);
    return input[input.length - 1];
}