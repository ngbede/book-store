const Sequelize = require("sequelize")
const sequelize = require("../db")

const Book = sequelize.define("book", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid:{
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subtitle: Sequelize.STRING,
    uri: Sequelize.STRING,
    language: Sequelize.STRING,
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datePublished: Sequelize.STRING,
    publisher: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: Sequelize.INTEGER,
    pages: Sequelize.INTEGER,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    onShelf: {
        type:Sequelize.BOOLEAN,
        allowNull: false
    },
    copiesSold: Sequelize.INTEGER,
    chapters: Sequelize.INTEGER
})

module.exports = Book