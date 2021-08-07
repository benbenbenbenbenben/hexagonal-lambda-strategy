import { simpleApiWithContextExample } from "../src/myPrivateApi"

test("simpleApiWithContextExample", () => {
    const helloWorld = simpleApiWithContextExample.invoke({
        name: "helloWorldWithContext",
    }).with(
        
    );
    expect(helloWorld).toBe("Tere Maailm");
})