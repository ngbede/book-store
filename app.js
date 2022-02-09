const express = require('express');
const db = require("./db")
const app = express()

app.use(express.json()) // Json middleware
const errorResponse = {
    reason: "An error occured from our end",
    statusCode: 500,
    errorMsg: ""
}

// get all the books in the store
app.get("/books", (req, res) => { 
    db.execute("SELECT * FROM books")
    .then(data => { // sql returns an array of 2 elements index 0 contains the data
        res.send(data[0])
    }).catch(error => {
        errorResponse.errorMsg = error.message
       res.status(500).send(errorResponse)
    })
})

app.get("/books/:id", (req, res) => {
    // console.log(req.params);
    const id = req.params.id // get id from param object
    db.execute(`SELECT * FROM books WHERE id=?`, [id])
    .then(data => {
        if (data[0].length === 0) return res.status(404).send({data: `book with id ${id} doesn't exist on the DB.`, code: 404})
        else return res.send(data[0][0]);
    }).catch(error => {
        errorResponse.errorMsg = error.message
        res.status(500).send(errorResponse)
    })
}) 

app.post("/books", (req, res) => {
    const newBook = req.body // new data is contained in request body
    // console.log(newBook)
    // INSERT INTO `book-store`.`books` (`id`, `title`, `author`, `pages`, `publisher`, `onShelf`, `price`, `language`, `year`) VALUES ('2', 'The Maid', 'Nita Prose', '304', 'Random House Publishing Group', '1', '8300', 'French', '2022');
    db.execute(`INSERT INTO books ( title, author, pages, publisher, onShelf, price, language, year) VALUES (?,?,?,?,?,?,?,?)`,
    [newBook.title, newBook.author, newBook.pages, newBook.publisher, newBook.onShelf, newBook.price, newBook.language, newBook.year])
    .then(data => {
        res.send({
            message: "Success: data has been saved to the DB", 
            status: 200
        })
    }).catch(error => {
        errorResponse.errorMsg = error.message
        res.status(500).send(errorResponse)
    })

})

// DELETE FROM `book-store`.`books` WHERE (`id` = '6');
// Delete books based on a given ID
app.delete("/books/:id", (req, res) => {
    const id = req.params.id
    
    db.execute("DELETE FROM books WHERE id=?", [id])
    .then(data => {
        res.send({
            message: `Book with id ${id} was successfully deleted from the DB`,
            status: 200
        })
    }).catch(error => {
        errorResponse.errorMsg = error.message
        res.status(500).send(errorResponse)
    })
})

app.put("/books/:id", (req, res) => {
    const id = req.params.id
    const success = { message: "", status: 200, notUpdated: null }
    // There has to be a better way, please forgive me
    if (req.body.title) db.execute("UPDATE books SET title=? WHERE id=?", [req.body.title, id])
    .then(data => {
        success.message += "title,"
    }).catch(error => {
        success.notUpdated += "title,"
    })
    if (req.body.author) db.execute("UPDATE books SET author=? WHERE id=?", [req.body.author, id])
    .then(data => {
        success.message += "author,"
    }).catch(error => {
        success.notUpdated += "author,"
    })
    if (req.body.pages) db.execute("UPDATE books SET pages=? WHERE id=?", [req.body.pages, id])
    .then(data => {
        success.message += "pages,"
    }).catch(error => {
        success.notUpdated += "pages,"
    })
    if (req.body.publisher) db.execute("UPDATE books SET publisher=? WHERE id=?", [req.body.publisher, id])
    .then(data => {
        success.message += "publisher,"
    }).catch(error => {
        success.notUpdated += "publisher,"
    })
    if (req.body.onShelf) db.execute("UPDATE books SET onShelf=? WHERE id=?", [req.body.onShelf, id])
    .then(data => {
        success.message += "onShelf,"
    }).catch(error => {
        success.notUpdated += "onShelf,"
    })
    if (req.body.price) db.execute("UPDATE books SET price=? WHERE id=?", [req.body.price, id])
    .then(data => {
        success.message = "price,"
    }).catch(error => {
        success.notUpdated += "price,"
    })
    if (req.body.language) db.execute("UPDATE books SET language=? WHERE id=?", [req.body.language, id])
    .then(data => {
        success.message += "language,"
    }).catch(error => {
        success.notUpdated += "language,"
    })
    if (req.body.year) db.execute("UPDATE books SET year=? WHERE id=?", [req.body.year, id])
    .then(data => {
        success.message = "Updaed"
    }).catch(error => {
        success.notUpdated += "year,"
    })
    
console.log(success.message);
    // once done with incremental updates return response
    if (success.message === ""){
        success.message = "No updates were made, check your request body"
        success.status = 404
        return res.status(404).send(success)
    } else {
        success.message += ` was updated successfully on id ${id}`
        return res.send(success)
    }
     
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))