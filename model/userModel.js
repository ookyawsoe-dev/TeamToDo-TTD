const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements : true
});

// //connection testing
// connection.connect((error) => {
//     if (error) {
//         console.log("Connect Error", error);
//     } else {
//         console.log("The Database is Connected.");
//     }
// });

// login 
exports.login = ( params , callback) => {
    connection.query(`SELECT * FROM user WHERE  user_name=? and password=?`,[params.username, params.password], (err, results) => {
        if(err){
            console.log(err);
        }else{
            callback(err, results);
        }
    })
}