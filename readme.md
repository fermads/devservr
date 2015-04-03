
## Devservr

Webserver for quick development of single page apps with live-reload and dynamic routes

## Install

    npm install -g devservr

## Usage

    devservr [port] [basepath] [routesfile]

- **port**: port to Server.listen. Defaults to 80
- **basepath**: root path of your web server and also the path to watch for live-reload. Defaults to ./
- **routesfile**: a .json file with webserver routes. Defaults to app/routes.json

Parameters can be passed in any order, as long as routes.json ends with ".json"


## Live-reload
All .html and .htm files will auto reload when any change inside `basepath` happen.

## Configuring routes

##### Exact routes
Routes with exact match.
        "/test" : "/test/test.html"
When url is "/test" serve file "/test/test.html"

##### Variable routes
Urls with variables


##### Automatic routes
Routes that will serve files from disc if the url is the same as the path on disc


##### The "*/" route

##### The "*" route
The "*" will be the "else" route if every other route fails to match. It'll probably be your 404 not found page.

##### Exemple routes.json
```json
{
    "*/" : "index.html",
    "*" : "notfound.html"
}
```


##### Default routes.json
A very basic routes file with 2 routes, "/*" and "*" (for 404 not found)

```json
{
    "*/" : "index.html",
    "*" : "notfound.html"
}
```

## Example
1. Create a new project
    mkdir myproject && cd myproject && mkdir wwwroot
2. Edit html
    vi index.html <- add your code here, save, exit
3. Install devservr
    npm install -g devservr
4. Run
    ./devservr
5. Open your page
    on your browser, go to http://localhost/
6. Edit your page
    edit index.html file, save, and watch it reload automatically on your browser

It'll work with all files on the base folder. If you have a <script src="myscript.js"> file inside your index.html and myscript.js changes, then index.html will also reload.


## Mime types
    In case you need to add more mime types, they can be found
    here app/mime.json

## Disclaimer
Do not even think about using this in production. All file reads are synchronous and not cached.

## To-do
- directory listings?
- default routes.json should try ./routes.json first
- routes should accept a status code as a response to make it easy to test REST services. { "/api/save" : 200 }
- looks like fs.watch on windows with {recursive:true} is not recursive. Triggers only on base path changes.