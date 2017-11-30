<!-- TOC -->

* [meow-pi](#meow-pi)
* [Part 01](#part-01)
* [Part 02](#part-02)
* [Part 03](#part-03)
* [Part 04](#part-04)
* [Part 05](#part-05)
* [Part 06](#part-06)
* [Part 07](#part-07)
* [Part 08](#part-08)
* [Part 09](#part-09)

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
* Passport will need 2 strategies, local and jwt. We've got a root file
  'passport.js' that will have a new instance of each strategy.
* We've had to back track on comparePassword and our pre-save methods to use
  crypto instead of bycrypt. Why? Because the server that has been inputing info
  thus far, has been using a particular hash that we need to follow.
* Once passport local has verified the user email and password, it will append
  that user object to the request object, and call next.

```js
npm install passport passport-jwt passport-local jwt-simple, crypto
```

* email and password for login verify

```js
{
      "email":"meow@pants.com",
      "password":"testing001"
}
```

# Part 06

* User Sign up, and expanded model
* Route for signup is 'api/users' that is POST http method with the following
  object properties.

```js
{
    "username": "StoneWashJackson",
    "email": "StoneWashJackson@codercamps.com",
    "password": "testing001"
}
```

* Update to the user model with username with type and requirements
* Notice that the import on the route not the schema, but the mongoose.model of
  'User'

# Part 07

* `npm install slug express-jwt`
* user route '/api/users' as GET request should return the users profile,
  cleaned up using our jsonForUser method. Sweet.
* Create auth.required to make protected routes. These are ones that require a
  valid JWT in order to execute, otherwise returning 401 unauthorized.
* Add an author property to the Articles Model, that is a ref to 'Users'
* Article also has a pre 'validate' method and slugify method.

# Part 08

* The Article model is fleshed out. Now we are looking to make 2 routes.
* POST http request to '/api/articles' that will allow users, who are signed in,
  to add a new article. You will need to pass your jwt token in the POST as a
  `Header authoriztion: Bearer <Actual Token Here>`
* Sample JSON for POST request

```js
{"article":{"title":"Meow","description":"hope","body":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","tagList":[]}}
```

# Part 09

* We need an endpoint that will allow us to send the article slug to the server
  and get back the entire article back. From the client this is called when the
  user clicks on an article preview.
* '/api/article/<SLUG>' keep in mind that <SLUG> is dynamic! This is like our
  routing for the client, we need a single endpoint that can take in any slug
  and return that particular article,
* it should also populate the author details, and not just the author Object ID
