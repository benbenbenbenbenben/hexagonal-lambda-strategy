import { build } from "./build";

import helloWorld from "./functions/helloWorld";
import welcomeMessage from "./functions/welcomeMessage";

const AWSCDK = {
    strategies: {
        ALB: {

        }
    }
}

build.api({
    with: AWSCDK
}).using({
    strategy: "ALB"
}).and({
    endpoint: { helloWorld }
}).and({
    endpoint: () => () => 1
})