import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'javier',
    database: 'blog_db',
    password: 'psswrd',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3007
})

export default pool
