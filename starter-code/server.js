'use strict';

// TODO: Install and require the NPM Postgres package 'pg' into your server.js, and ensure that it is then listed as a dependency in your package.json

const pg = require('pg');
const fs = require('fs');
const express = require('express');
//////express gives us the interface for creating servers; express is to node for building servers as jquery is to js to manipulate the dom; express gives us the helper method to make it much easier to build and run servers

// REVIEW: Require in body-parser for post requests in our server. If you want to know more about what this does, read the docs!
///////////bodyParser takes a stringified json body of a request coming in and turn it into a js object; it's reading whether a json coming as a request. if we do have a json coming as a request; bodyParser will translate it into something that we can manipulate inside js
////////.env.PORT = port from the environment var; env var comes from the console itself; the thing that runs our server
///////process.env.PORT comes from the terminal
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

// TODO: Complete the connection string for the url that will connect to your local postgres database
// Windows and Linux users; You should have retained the user/pw from the pre-work for this course.
// Your url may require that it's composed of additional information including user and password
// const conString = 'postgres://USER:PASSWORD@HOST:PORT/DBNAME';
const conString = 'postgres://hanhthaoluu@localhost:5432/blog301';
//////////////5432 is the default port for everyone that postgres uses
//////////////as long as it's being run by your user you won't need a pw
////////////if i want pg to be connect to the wizards db then do the below
///////////const conString = 'postgres://hanhthaoluu@localhost:5432/wizards';

// TODO: Our pg module has a Client constructor that accepts one argument: the conString we just defined.
//       This is how it knows the URL and, for Windows and Linux users, our username and password for our
//       database when client.connect is called on line 26. Thus, we need to pass our conString into our
//       pg.Client() call.
const client = new pg.Client(conString);
////////this is not the part that is creating a connection to our db;  this is just a way in js to send our sql commands to sql db; this gives us the js object to create connection to our db
// REVIEW: Use the client object to connect to our DB.
client.connect();
////////////after we create the client to our specific postgres db; we can connect to it using client.connect();
//////////this is done this way so we can potentially have multiple postgres db so we can access from one single server, which is a common occurrence
//////////////////OVERVIEW
// REVIEW: Install the middleware plugins so that our app is aware and can use the body-parser module
////////middleware = software that acts as a bridge between an operating system or database and applications, especially on a network.
////////.json and .urlencoded are middlewares that run in the middle of the connection being made, the request coming in and the final response that we send back, mostly has to do with processing data that are coming in and going out or grabbing things from the db before we have our final response
app.use(bodyParser.json());
/////////we are telling our app to use bodyParser.json method for our entire app
//////////check for json on every route that got declared after this statement
app.use(bodyParser.urlencoded({extended: true}));
///////////urlencoded does not bc important until the last week of 301
app.use(express.static('./public'));
//////////serving up the public directory (html, css, js that are meant to be senf to browser and run in browser) statically


// REVIEW: Routes for requesting HTML resources

/////////when we make a get request to /new we want to respond to sendFile new.html with a route of ./public
//////////you want to serve up new.html from the location of ./public
////////public is now the current working directory and from the current working directory, serve up new.html
app.get('/new', function(request, response) {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...3 and  4 are the numbers of the full-stack-diagram.png image correspond to.  The method of the article.js is interacting with this particular piece of server.js is Article.fetchAll(); The part of CRUD being enacted by this particular piece of code is Read.
  response.sendFile('new.html', {root: './public'});
});


// REVIEW: Routes for making API calls to use CRUD Operations on our database
/////////////make a get request to /articles
////////////get = read in CRUD
//////////this is a get request to /articles
/////////the request comes in and we'll see some spots where we're pulling things from the request and eventually we need to resend a response to the place that made that request, the request response cycle; request comes in, response goes out; there are 2 processes going on here
/////////article.js is being served up from express.static, which is the server running from the local host; we want to make a request back to that same server at /articles where we have set up a route for that to respond all.

//////here we are setting up what we do when someone makes a request to localhost 3000 /articles
////////if we say from the client side, make a get request /articles; it will make a get request from wherever slash articles is being served up from
app.get('/articles', function(request, response) {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...3 and  4 are the numbers of the full-stack-diagram.png image correspond to.  The method of the article.js is interacting with this particular piece of server.js is Article.fetchAll(); The part of CRUD being enacted by this particular piece of code is Read.
  ///////////client is coming from that call to PG client, then call client.connect
  ///////////now when we have requests coming in we are calling client.query and making a specific sql query
  ///////////query takes in 1 parameter and it's a string
  ///////////goint to be almost the exact query that you want to send to postgres
  ///////////below is an asynchronous request/////we don't know when this query is going to resolve//////it's an asynchronous query that we're making back to the db//////we start the request we're not sure when exactly we're goint to get that data back////but when it does come back we're either going to call this .then(function) or .catch(function)////the same we have click event or the hover environment///we are making this query back to the db we're not sure when we're going to a response but when we get a response then call .then or .catch
  client.query('SELECT * FROM articles')/////this is how you create sql query from js
  //////client.query is hitting number 3 and 4
  .then(function(result) {
    response.send(result.rows); ////hitting number 5
    ////////when you get the data back and not an error///we got this into the server's code but we have not yet sent it back to the client////so we do response.send to send back to the client
    ////////result.rows  .rows bc the results contain a lot of meta information about the kind of requests we send
    ////////Metadata summarizes basic information about data, which can make finding and working with particular instances of data easier.
    ////////if we just want the actual data back then use .rows; get the exact rows from sql and convert into json, a js object in this case
    //////correspond to the article.js fetch all method
  })
  .catch(function(err) {
    console.error(err)
  })
});

////////getting all of the fields for all of the articles inside our database
app.post('/articles', function(request, response) {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...3 and 4 are the numbers of the full-stack-diagram.png image correspond to the following line of code.  The method of article.js is interacting with this particular piece of 'server.js' is Article.prototype.insertRecord. CREATE IS THE CRUD OPERATION POST REFERS TO

  ///////////with pg, we can't just directly plug into it values/////what is going into client.query////what kind of thing are we passing into it? a template string//the main reason we are doing as a main template string is not so that we can actually plug in values directly into it bc pg already provides us with a way of doing that///the reason is that we can actually split it up on the multiple line
  /////if we were doing this as a nortmal string where I would have to do the plus and not function
  //////what table are we inserting something into? into the articles table and we then specify to in that insert; we want to specify what values we want to write to that table and so we're saying we want to write: title, author, authorUrl, category, publishedOn, body////sql itself does not distinguish bt lowercase and uppercase
  client.query(
    `INSERT INTO
    articles(title, author, "authorUrl", category, "publishedOn", body)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.put('/articles/:id', function(request, response) {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...3 and  4 are the numbers of the full-stack-diagram.png image correspond to.  The method of the article.js is interacting with this particular piece of server.js is Article.prototype.updateRecord; The part of CRUD being enacted by this particular piece of code is update.
  client.query(
    `UPDATE articles
    SET
      title=$1, author=$2, "authorUrl"=$3, category=$4, "publishedOn"=$5, body=$6
    WHERE article_id=$7;
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body,
      request.params.id
    ]
  )
  .then(function() {
    response.send('update complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.delete('/articles/:id', function(request, response) {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...
  client.query(
    `DELETE FROM articles WHERE article_id=$1;`,
    [request.params.id]
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

app.delete('/articles', function(request, response) {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...
  client.query(
    'DELETE FROM articles;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

// COMMENT: What is this function invocation doing?
// Put your response here...
loadDB();

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadArticles() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...
  client.query('SELECT COUNT(*) FROM articles')
  .then(result => {
    // REVIEW: result.rows is an array of objects that Postgres returns as a response to a query.
    //         If there is nothing on the table, then result.rows[0] will be undefined, which will
    //         make count undefined. parseInt(undefined) returns NaN. !NaN evaluates to true.
    //         Therefore, if there is nothing on the table, line 151 will evaluate to true and
    //         enter into the code block.
    if(!parseInt(result.rows[0].count)) {
      fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
        JSON.parse(fd.toString()).forEach(ele => {
          client.query(`
            INSERT INTO
            articles(title, author, "authorUrl", category, "publishedOn", body)
            VALUES ($1, $2, $3, $4, $5, $6);
          `,
            [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, ele.body]
          )
        })
      })
    }
  })
}

function loadDB() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Put your response here...
  client.query(`
    CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      "authorUrl" VARCHAR (255),
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL);`
    )
    .then(function() {
      loadArticles();
    })
    .catch(function(err) {
      console.error(err);
    }
  );
}
