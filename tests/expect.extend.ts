export {};

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeClass(constructor: new (...args: any[]) => any): R;
        }
    }
}

expect.extend({
    toBeClass(received, constructor) {
        const pass = received.constructor === constructor;
        if (pass) {
            return {
                message: () => `expected ${received.constructor.name} not to be ${constructor.name}`,
                pass: true
            }
        } else {
            return {
                message: () => `expected ${received.constructor.name} to be ${constructor.name}`,
                pass: false,
            }
        }
    }
})