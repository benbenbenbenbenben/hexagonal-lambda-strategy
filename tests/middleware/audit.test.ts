import { audit } from "../../src/middleware/audit"
import { hook } from "../../src/middleware/hook";

test("audit a function", async () => {
    console.log = jest.fn();
    const test = (x: string) => (y: string) => x + y;

    const xfunc = hook(test, { after: audit });
    const yfunc = await xfunc("x")
    const result = await yfunc("y")

    expect(result).toBe("xy");
    expect(console.log).toHaveBeenCalledWith(JSON.stringify({
        channel: "audit",
        signal: "functionCall",
        detail: "test was called with x,y."
    }));
})