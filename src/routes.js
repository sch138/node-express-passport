import { AuthController } from "./controllers/auth.mjs"
import { HomeController } from "./controllers/home.mjs";

export function configureRoutes(app, passport) {
	const auth = new AuthController({ root: '/auth', passport });
	const home = new HomeController({ authFailedPath: '/auth/' + auth.signupRoute });
	app.use('/auth', auth.router);
	app.use(['/home', '/'], home.router);
}
