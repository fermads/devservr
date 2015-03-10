# devservr

Webserver for quick development of single page apps with live-reload and dynamic routes

## Install

    npm install -g devservr

## Usage

    devservr [port] [basepath] [routesfile]

- **port**: port to Server.listen. Defaults to 80
- **basepath**: root path for static files and also the path to watch for live-reload. Defaults to ./
- **routesfile**: a .json file with webserver routes. Defaults to devservr/etc/routes.json

Parameters can be passed in any order, as long as routes.json ends with ".json"


## Live-reload
All .html and .htm files will auto reload when any change inside `basepath` is detected.

##### How it works?
A small javascript code snippet will be dynamically inserted before the `</body>`. This script will manage page reloads.

## Configuring routes

##### Exact routes
Routes with exact match.
        "/test" : "/test.html"
When path is "/test" serve file "/test/test.html"


##### Variable routes
Urls with variables.
        "/product/:id" : "/product.html"
Path /product with any :id will match to /product.html. Your frontend should work with the id to do something


##### Automatic routes
Routes that will serve files from disc if the url is the same as the path of a static file


##### The */ route
Default file for paths that point to a directory
        "*/": "index.html"


##### The * route
This will be the "else" route if every other route fails to match and there is no static file on disc with that path. It'll probably be a 404 not found page.


##### Default routes.json
```json
{
    "*/" : "index.html",
    "*" : "notfound.html"
}
```

## Usage example
1. Create a new project
        mkdir myproject && cd myproject && mkdir wwwroot
2. Edit html
        vi index.html <- add your code here, save, exit
3. Install devservr
        npm install -g devservr
4. Run
        ./devservr
5. Open http://localhost/ on your browser
6. Edit a file, save, and watch it reload automatically

It'll work with all files on the base folder. If there is a `<script src="myscript.js">` inside your index.html and myscript.js changes, then index.html will also reload.


## Mime types
Mime types are at `devservr/etc/mime.json`

## Disclaimer
Do not even think about using devservr in production. All file reads are synchronous and not cached.

## To-do
- routes should accept a status code as a response to make it easy to test REST services. { "/api/save" : 200 }
