import { simpleApiWithContextExample } from "../src/myPrivateApi"

test("simpleApiWithContextExample", async () => {
    const helloWorld = await simpleApiWithContextExample.functions.helloWorldWithContext();
    const result = await helloWorld();
    expect(result).toBe("Tere Maailm");
})