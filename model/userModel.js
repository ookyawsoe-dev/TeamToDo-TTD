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

// show user list
exports.user = (callback) => {
    connection.query('SELECT * FROM user', (err, result)=>{ 
        if(err){
            console.log(err);
        }else{
            callback(err, result);
        }
    });
};


// register
exports.register = (params, callback) => {
    connection.query(`INSERT INTO user(user_name,name, email, profile, password,user_role, user_created_date) VALUES ("${ params.username }","${ params.full_name }","${ params.email }","${ params.profile }","${ params.password}","${ params.user_role }", CURRENT_TIMESTAMP())`, 
    (err, results) => {
     if(err){
         console.log(err);
     }else{
         console.log(results);
         callback(err,results);
     }
    });
 };


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

// delete user
exports.deleteuser = (id, callback) => {
    connection.query(
        `DELETE from user WHERE user_id = ?`, [id],
        (err, results) => {
            if(err){
                console.log(err);
            }else{
                callback(err, results);
            }
        }
    )
}