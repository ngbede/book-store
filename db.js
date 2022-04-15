const {Sequelize} = require("sequelize")
require("dotenv").config()

// Amazon RDS credentials are stored in .env
const sequelize = new Sequelize(
    {
        username: process.env.db_user,
        password: process.env.db_password,
        dialect: "mysql",
        database: process.env.db,
        host: process.env.db_host,
        ssl: "Amazon RDS",
        logging: console.log,
        
    }
)

module.exports = sequelize // return a promise