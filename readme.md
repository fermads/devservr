# devservr

Webserver for quick development of single page apps with live-reload and
dynamic routes

## Install

    npm install -g devservr

## Usage

### Command line tool
    devservr [port] [basepath] [routesfile]

- **port**: port to `Server.listen`. Defaults to 80
- **basepath**: root path for static files and also the path to watch for
live-reload. Defaults to `./`
- **routesfile**: a .json file with webserver routes. Defaults to
./routes.json (if exists) then `devservr/etc/routes.json`

Parameters can be passed in any order, as long as routes.json ends with ".json"

### As a module
```js
var devservr = require('devservr')
devservr.run({port:[port], basepath:[basepath], routesfile:[routesfile]})
```

## Live-reload
All .html and .htm files will auto reload when any change inside `basepath`
is detected.

##### How it works?
A small javascript code snippet will be dynamically inserted before the
`</body>`. This script will manage page reloads.

## Routes

##### Exact routes
Routes with exact match.

    "/test" : "/test/test.html"

_Example_: `http://localhost/test` will serve file `/test/test.html`


##### Variable routes
URLs with variables.

    "/product/:id" : "/product.html"

Path `/product` with any `:id` will match to `/product.html`. Single page app
frontend should work with the id to do something

_Example_: `http://localhost/product/123` will serve file `/product.html`


##### Automatic routes
Routes that will serve files from disc if the path part of the URL is the same
as the path of a static file

_Example_: `http://localhost/test.html` will automatically try to serve
file `./test.html` from disc, if it exists

##### The */ route
Default file for paths that point to a directory

    "*/": "index.html"

_Example_: `http://localhost/` will automatically try to serve
file `./index.html` from disc, if it exists

##### The * route
This will be the "else" route if every other route fails to match and there is
no static file on disc with that path. Usually a 404 not found page.

    "*": "404.html"

_Example_: `http://localhost/notFound` will not find any route nor file on
disc for 'notFound' then will serve `./404.html`

##### Default routes.json
This basic routes.json will be used if none is provided

```json
{
    "*/" : "index.html",
    "*" : "notfound.html"
}
```

## Example
1. Create a new project `mkdir myproject && cd myproject`
2. Create a .html, add your code, save, exit
3. Install devservr `npm install -g devservr`
4. Run `./devservr`
5. Open http://localhost/ on your browser
6. Edit a file, save, and watch it reload automatically

It'll work with all files on the base folder. If there is a
`<script src="myscript.js">` inside your index.html and myscript.js changes,
then index.html will also reload.

## Mime types
Mime types are at `devservr/etc/mime.json`

## Disclaimer
Do not use devservr in production. All file reads are synchronous and
not cached.

## To-do
- directory listings
- routes should accept a status code as a response to make it easy to test
REST services. { "/api/save" : 200 }
- looks like fs.watch on windows with {recursive:true} is not recursive.
Triggers only on base path changes.