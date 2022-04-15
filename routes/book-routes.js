const express = require("express")
const router = express.Router()
const Book = require("../model/book")
const {v4: uuidv4} = require("uuid")

const errorResponse = {
    reason: "An error occured from our end",
    statusCode: 500,
    errorMsg: ""
}

// get all the books in the store
router.get("/books", (req, res) => { 
    Book.findAll()
    .then(data => { // sql returns an array of 2 elements index 0 contains the data
        if (data.length == 0) return res.status(200).json({statusCode: 200, message: "No data exist's on the DB"})
        else {
            let response = []
            data.forEach(item => {
                response.push(item.dataValues)
            })
            return res.status(200).json({statusCode: 200, message: "SUCCESS",books: data})
        }
    }).catch(error => {
        errorResponse.errorMsg = error.message
        res.status(500).json(errorResponse)
    })
})

router.get("/books/:id", (req, res) => {
    const id = req.params.id // get id from param object
    const parseId = parseInt(id)
    Book.findByPk(parseId)
    .then(data => {
        if (!data) return res.status(404).json({message: `book with id ${id} doesn't exist on the DB.`, statusCode: 404})
        else return res.json(data);
    }).catch(error => {
        errorResponse.errorMsg = error.message
        res.status(500).json(errorResponse)
    })
}) 

router.post("/books", (req, res) => {
    const newBook = req.body // new data is contained in request body
    const uuid = uuidv4()
    Book.create({
        uuid: uuid,
        title: newBook.title,
        subtitle: newBook.subtitle,
        uri: newBook.uri,
        author: newBook.author,
        datePublished: newBook.datePublished,
        publisher: newBook.publisher,
        year: newBook.year,
        pages: newBook.pages,
        price: newBook.price,
        onShelf: newBook.onShelf,
        chapters: newBook.chapters,
        copiesSold: newBook.copiesSold,
        language: newBook.language
    })
    .then(data => {
        res.json({
            message: "Success: data has been saved to the DB",
            id: data.dataValues.id,
            uuid: uuid, 
            status: 200
        })
    }).catch(error => {
        errorResponse.errorMsg = error.message
        res.status(500).json(errorResponse)
    })
})

router.delete("/books/:id", (req, res) => {
    const id = req.params.id
    const parseId = parseInt(id)
    Book.destroy({where: {id: parseId}})
    .then(data => {
        if (data) return res.status(200).json({ message: `Book with id ${id} was successfully deleted from the DB`,status: 200})
        else return res.status(404).json({statusCode:404, message: `Book with ID ${id} doesn't exist on the DB`})
    }).catch(error => {
        errorResponse.errorMsg = error.message
        res.status(500).json(errorResponse)
    })
})

router.patch("/books/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const parseId = parseInt(id)

    if(Object.keys(payload).length !== 0){
        const book = await Book.findByPk(id)
        if(book){
            Book.update({
                title: payload.title ?? book.title,
                subtitle: payload.subtitle ?? book.subtitle,
                uri: payload.uri ?? book.uri,
                author: payload.author ?? book.author,
                datePublished: payload.datePublished ?? book.datePublished,
                publisher: payload.publisher ?? book.publisher,
                year: payload.year ?? book.year,
                pages: payload.pages ?? book.pages,
                price: payload.price ?? book.price,
                onShelf: payload.onShelf ?? book.onShelf,
                chapters: payload.chapters ?? book.chapters,
                copiesSold: payload.copiesSold ?? book.copiesSold,
                language: payload.language ?? book.language
            }, {
                where: {
                    id: parseId
                }
            }).then(result => {
                return res.status(200).json({
                    message: `Book with id ${parseId} successfully updated`, 
                    statusCode: 200
                })
            }).catch(err => {
                errorResponse.errorMsg = error.message
                res.status(500).json(errorResponse)
            })
        }
        else return res.status(404).json({message: `book with id ${id} doesn't exist on the DB.`, statusCode: 404})
    }
    else res.status(404).json({message: "Invalid request: send a valid JSON body", statusCode: 404}) 
})

module.exports = router
