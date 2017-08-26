#### Single-line Summary
**Today, David and Cole paired together. It took about 2 hours**

#### Reflect and summarize on your process for each `TODO` item :  
  1. <!--TODO: Install and require the NPM Postgres package 'pg' into your server.js, and ensure that it is then listed as a dependency in your package.json -->
  Installed NPM Postgres package 'pg'.

  2. <!-- TODO: Complete the connection string for the url that will connect to your local postgres database
  Windows and Linux users; You should have retained the user/pw from the pre-work for this course.
  Your url may require that it's composed of additional information including user and password
  const conString = 'postgres://USER:PASSWORD@HOST:PORT/DBNAME'; -->
  Added @ to the postgres url, but not sure where to retrieve user name and poassword.

  3. <!-- TODO: Our pg module has a Client constructor that accepts one argument: the conString we just defined.
  This is how it knows the URL and, for Windows and Linux users, our username and password for our
  database when client.connect is called on line 26. Thus, we need to pass our conString into our
  pg.Client() call. -->
  Called constring into the pg constructor.

  4. <!-- comments, all the comments -->
  Completed all the comments by referring to the diagram and referring to methods in server.js and article.js, and finally labeling which step in the CRUD we were using.

  5. <!-- TODO: Since we will now be pushing our new articles directly into the database, we do not need the copy/paste JSON any longer. Delete the code here, and also the related JavaScript in articleView.js. There is not a TODO item for this task in that file. Find and delete the line of code on your own.  -->
  Deleted json stuff in new.html and relevant json stuff in articleView.js.

#### Checklist (before submitting, fill in each set of square brackets with an 'x')
- [x] We have titled the Pull Request similar to our branch name (ex: 'brian-rick').
- [x] This PR includes commits from both myself and my partner; e.g. We followed good pair programming practices by switching driver/navigator roles.
- [x] There is no extraneous, unrelated code included in this PR.
- [x] We have summarized our `TODO:` process above.
