# Simple book store API
This repo contains code for a simple book store API built with node, express and mysql for the database. Its part of my simple projects as I proceed in learning Backend Development in the near future. It implements typical CRUD operations.

### Setup guide
- clone the repo
- navigate to project directory and run `npm i` in terminal
- have mysql setup on your device
- create a new schema called `book-store`
- create a table called `books` to store all the book information
- connect add your mysql password to the `db.js` config file
- run npm start

### API Endpoints
- GET /books => returns a list of all the books
- GET /books/:id => returns a book with a given id if it exsist
- POST /books => Adds a new book to the sql backend.
- DELETE /books/:id => Deletes the specified book id if it exists on the DB
- PUT /books/:id => Updates a given book via its ID

Below is a sample JSON of how a book object looks like as well as how the request body should be formatted.

```JSON
{
    "id":1,
    "title":"12 Rules for Life: An Antidote to Chaos",
    "author":"Dr. Jordan B. Peterson",
    "pages":448,
    "publisher":"Random House Canada",
    "onShelf":1,
    "price":5000,
    "language":"English",
    "year":2018
}
```
