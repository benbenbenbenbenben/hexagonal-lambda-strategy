/**
 * Creates an audited version of a function
 */
export const audit = <T extends (...args: any) => any>(fun: T): T => {
    const auditFun = (...args: any) => {
        console.log(JSON.stringify({
            channel: "audit",
            signal: "functionCall",
            detail: `${fun.name} was called with ${args?.length || 0} arguments.`
        }))
        return fun(...args);
    }
    return auditFun as unknown as T;
}