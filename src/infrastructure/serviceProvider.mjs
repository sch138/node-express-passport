const ServiceTypes = {
    transient: 'transient',
    scoped: 'scoped',
    singleton: 'singleton'
}

export class ServiceProvider {

    #services;
    constructor() {
        this.#services = new Map();
    }
    addTransient(name, service) {
        this.#services.set(name, { type: ServiceTypes.transient, serviceFactory: service });
    }

    addSingleton(name, service) {
        this.#services.set(name, { type: ServiceTypes.singleton, serviceFactory: service });
    }

    resolve(name) {
        if (this.#services.has(name)) {
            const item = this.#services.get(name);
            switch (item.type) {
                case ServiceTypes.transient:
                    return new item.serviceFactory();
                case ServiceTypes.singleton:
                    return item.object ?? (item.object = new item.serviceFactory());
                default:
                    return undefined;
            }
        }

        return undefined;
    }
}