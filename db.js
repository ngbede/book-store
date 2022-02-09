const sqlDB = require('mysql2');

// password is part of env variable
// on linux just do 'export password=your-sql-password'
const dbPassword = process.env.dbPassword 

const pool = sqlDB.createPool({
    host: "localhost",
    user: "root",
    database: "book-store",
    password: dbPassword
}  
)

module.exports = pool.promise() // return a promise