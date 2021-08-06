import helloWorldInit from "../src/functions/helloWorld";

test("returns Hello World", () => {
  const helloWorld = helloWorldInit();
  const theMessage = helloWorld();
  expect(theMessage).toBe("Hello World");
});
