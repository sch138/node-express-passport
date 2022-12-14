/**
 * auth.mjs
 * Auth controller
 */

import { Router } from "express";

export class AuthController {
    #router;
    #passport;
    #loginRoute;
    #signupRoute;

    constructor({ root, passport }) {
        this.#passport = passport;
        this.#router = new Router();
        this.#loginRoute = 'login';
        this.#signupRoute = 'signup';

        // LOGIN ===============================
        this.#router.get('/' + this.#loginRoute, this.getLogin);
        this.#router.post('/' + this.#loginRoute, this.#authenticate(this.#loginRoute, root),
            this.postLogin);

        // SIGNUP ==============================
        this.#router.get('/' + this.#signupRoute, this.getSignup);
        this.#router.post('/' + this.#signupRoute, this.#authenticate(this.#signupRoute, root));

        // PROFILE SECTION =========================
        this.#router.get('/profile', this.#isLoggedIn, this.getProfile);

        // LOGOUT ==============================
        this.#router.get('/logout', this.getLogout);
    }

    get router() {
        return this.#router;
    }

    get loginRoute() {
        return this.#loginRoute;
    }

    get signupRoute() {
        return this.#signupRoute;
    }
    
    #authenticate(action, root = '/auth') {
        return this.#passport.authenticate('local-' + action, {
            successRedirect: root + '/profile',
            failureRedirect: root + '/' + action,
            failureFlash: true
        });
    }

    // route middleware to make sure
    #isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }


    getLogin(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    }

    postLogin(req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    }

    getSignup(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    }

    getProfile(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    }

    getLogout(req, res) {
        req.logout();
        res.redirect(301, '/');
    }
}