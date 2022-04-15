require("dotenv/config")
const express = require('express');
const sequelize = require("./db");
const bookRoute = require("./routes/book-routes")
const app = express()

app.use(express.json()) // Json middleware

// Disable CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next()
})

app.use("", bookRoute)

const PORT = process.env.PORT || 3000

sequelize.sync().then(res => {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`))
}).catch(err => {
    console.log("error",err)
})
