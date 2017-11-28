<!-- TOC -->

* [meow-pi](#meow-pi)
* [Part 01](#part-01)
* [Part 02](#part-02)
* [Part 03](#part-03)
* [Part 04](#part-04)
* [Part 05](#part-05)

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
* Require API route and wire up app.use for articles

# Part 03

* Articles Model with basic properties
* and our '/api/articles' with a GET request now returns a hardcoded 10, in
  order of most recent 'createdAt'
* We should now be able to use [Postman](https://www.getpostman.com/) and do a
  GET request to 'localhost:3000/api/articles' and see 10 articles of the more
  recent come back!

# Part 04

* User Model `npm install bcrypt-nodejs`
* Bcrypt, hashing & storing passwords
* Users route for login at '/api/users/login'

# Part 05

* Configure Passport for JWT and for Local
* Apply to User Login endpoint '/api/users/login'

```js
npm install passport passport-jwt passport-local jwt-simple
```
