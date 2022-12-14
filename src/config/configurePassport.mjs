import flash from 'connect-flash';
import { Strategy as LocalStrategy } from 'passport-local';
import { hashSync, compareSync } from 'bcrypt-nodejs';

export function configurePassport(app, passport, usersDataProvider) {
    sessionSetup(passport, usersDataProvider, app);
    useSignup(passport, usersDataProvider);
    useLogin(passport, usersDataProvider);
}

function sessionSetup(passport, usersDataProvider, app) {
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(async function (id, done) {
        const user = await usersDataProvider.findByIdAsync(id);
        done(user === undefined ? 'user not found' : undefined, user);
    });

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash());// use connect-flash for flash messages stored in session
}

function useSignup(passport, usersDataProvider) {
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            async function (req, username, password, done) {
                var newUser = {
                    username: username,
                    password: hashSync(password, null, null) // use the generateHash function in our user model
                };
                newUser.id = await usersDataProvider.createAsync(newUser);
                return done(null, newUser);
            })
    );
}


function useLogin(passport, usersDataProvider) {
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            async function (req, username, password, done) { // callback with email and password from our form
                const user = await usersDataProvider.findByNameAsync(username);
                if (user === undefined) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (!compareSync(password, user.password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                return done(null, user);
            })
    );
}