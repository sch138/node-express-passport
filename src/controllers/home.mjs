import { Router } from "express";

export class HomeController {
    #router;
    #signupPath;

    constructor({ authFailedPath }) {
        this.#router = new Router();
        this.#signupPath = authFailedPath;
        // HOME PAGE (with login links) ========
        this.#router.get(['/', '/index'], this.getIndex);
    }

    get router() {
        return this.#router;
    }

    getIndex(req, res) {
        if (this.#signupPath === undefined ||res.isAuthenticated?.()) {
            res.render('index.ejs'); // load the index.ejs file
        }
        else {
            res.redirect(this.#signupPath)
        }
    }
}