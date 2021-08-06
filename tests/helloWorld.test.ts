import setupHelloWorld from "../src/functions/helloWorld";

test("returns Hello World", () => {
  const helloWorld = setupHelloWorld();
  const theMessage = helloWorld();
  expect(theMessage).toBe("Hello World");
});
