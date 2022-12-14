import path from 'path';
import passport from "passport";
import { configurePassport } from "./config/configurePassport.mjs";
import { configureServer } from "./config/configureServer.mjs";
import { configureSession } from "./config/configureSession.mjs";
import { configureRoutes } from "./routes.js";
import { UsersDataProvider } from "./model/usersDataProvider.mjs";
import { configureViewsEngine } from "./config/configureViewsEngine.mjs";


export class Startup {
    configureServices({services}) {
        services.addTransient('UsersDataProvider', UsersDataProvider);
    }

    configure({app, services, root}) {
        configureServer(app);
        const viewsRoot = path.join(root, 'src', 'views');
        configureViewsEngine(app, viewsRoot);
        configureSession(app);
        configurePassport(app, passport, services.resolve('UsersDataProvider'));
        configureRoutes(app, passport);
    }
}