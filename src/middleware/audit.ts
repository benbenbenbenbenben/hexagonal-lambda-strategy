export const audit = <Input extends [Fun, ...any, Output], Fun extends (...args: any) => any, Output>(...input: Input): Output => {
    console.log(JSON.stringify({
        channel: "audit",
        signal: "functionCall",
        detail: `${input[0].name} was called with ${input.slice(1, input.length - 1)}.`
    }));
    return input[input.length - 1];
}