import { audit } from "../../src/middleware/audit"

test("audit a function", () => {
    console.log = jest.fn();
    const testFunction = (x: string) => x + x;
    const auditFunction = audit(testFunction);
    if (auditFunction) {
        const doubleFoobar = auditFunction("foobar");
        expect(doubleFoobar).toBe("foobarfoobar");
        expect(console.log).toHaveBeenCalledWith(JSON.stringify({ 
            channel: "audit", 
            signal: "functionCall", 
            detail: "testFunction was called with 1 arguments." 
        }));
    }
})