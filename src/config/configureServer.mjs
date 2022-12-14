import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

export function configureServer(app) {
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
}