require("dotenv/config")
const express = require('express');
const sequelize = require("./db");
const bookRoute = require("./routes/book-routes")
const app = express()

app.use(express.json()) // Json middleware
app.use("", bookRoute)

const PORT = process.env.PORT || 3000

sequelize.sync().then(res => {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`))
}).catch(err => {
    console.log("error",err)
})
