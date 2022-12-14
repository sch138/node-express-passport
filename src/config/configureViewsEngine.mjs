export function configureViewsEngine (app, path){
    app.set('view engine', 'ejs');
    app.set('views', path);
}