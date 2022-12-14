import session from 'express-session';

export function configureSession(app){
    app.use(session({
        secret: 'vidyapathaisalwaysrunning',
        resave: true,
        saveUninitialized: true
    })); // session secret
}