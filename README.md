<!-- TOC -->

* [meow-pi](#meow-pi)
* [Part 01](#part-01)
* [Part 02](#part-02)

<!-- /TOC -->

# meow-pi

# Part 01

* Create Express App `express <AppName> --git`
* `npm install mongoose mongoose-unique-validator nodemon`
* reconfigure npm scripts in our package.json to `"start": "nodemon ./bin/www"`
* Create a git repo on Github, and push or init commit, please

npm run scripts

```js
//windows
"start": "set DEBUG=meow-pi:* & nodemon ./bin/www"
//mac
"start": "DEBUG=meow-pi:* nodemon ./bin/www"
```

# Part 02

* `npm install dotenv` and create a .env for our configs
* Add .env to your .gitignore
* This is where you'll put environment config stuff. Like the url for our db
* Create API routes, api folder,w/ index.js file
* Require API route and wire up app.use
