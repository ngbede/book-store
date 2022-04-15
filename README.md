# Simple book store API
This repo contains code for a simple book store API built with node, express and mysql for the database. Its part of my simple projects as I proceed in learning Backend Development in the near future. It implements typical CRUD operations.

### Setup guide
- clone the repo
- navigate to project directory and run `npm i` in terminal
- have mysql setup on your device
- create a new schema called `book-store`
- create a table called `books` to store all the book information
- connect to db by adding your mysql credentials to the `db.js` config file
- run via `npm start`

### API Endpoints
- GET /books => returns a list of all the books
- GET /books/:id => returns a book with a given id if it exsist
- POST /books => Adds a new book to the sql backend. Sample request body should contain the below fields
    ```JSON
            {
                "title": "Essentialism",
                "subtitle": "The Disciplined Pursuit of Less",
                "uri": "https://books.google.com.ng/books/about/Essentialism.html?id=pK7PBQAAQBAJ&source=kp_book_description&redir_esc=y",
                "language": "English",
                "author": "Greg McKeown",
                "datePublished": "15 April, 2014",
                "publisher": "Virgin Books",
                "year": 2014,
                "pages": 260,
                "price": 7473.8,
                "onShelf": true,
                "copiesSold": 1000000,
                "chapters": 20,
            }
    ```
- DELETE /books/:id => Deletes the specified book id if it exists on the DB
- PATCH /books/:id => Updates a given book via its ID

Below is a sample JSON of how a book object looks like when retreived from the DB

```JSON
{
    "id": 7,
    "uuid": "e21dde82-c61d-4c96-893d-5f5e3776c5c4",
    "title": "Essentialism",
    "subtitle": "The Disciplined Pursuit of Less",
    "uri": "https://books.google.com.ng/books/about/Essentialism.html?id=pK7PBQAAQBAJ&source=kp_book_description&redir_esc=y",
    "language": "English",
    "author": "Greg McKeown",
    "datePublished": "15 April, 2014",
    "publisher": "Virgin Books",
    "year": 2014,
    "pages": 260,
    "price": 7473.8,
    "onShelf": true,
    "copiesSold": 1000000,
    "chapters": 20,
    "createdAt": "2022-04-15T19:40:16.000Z",
    "updatedAt": "2022-04-15T19:40:16.000Z"
}
```
### APIS's MySQL DB is hosted on Amazon's RDS

### Deployed to https://book-store-ex.herokuapp.com/