import express from 'express';
import { ServiceProvider } from './infrastructure/serviceProvider.mjs';

import { Startup } from './startup.mjs';

export class App {
    #services;
    #app;

    constructor() {
        this.#port = process.env.PORT || 8080;
        this.#services = new ServiceProvider();
        this.#app = express();

        const startup = new Startup();
        startup?.configureServices({ services: this.#services });
        startup?.configure({ app: this.#app, services: this.#services, root: process.cwd() });
    }

    #port;

    run() {
        this.#app.listen(this.#port);
        console.log('The magic happens on port ' + this.#port);
    }

    get port() {
        return this.#port;
    }
}