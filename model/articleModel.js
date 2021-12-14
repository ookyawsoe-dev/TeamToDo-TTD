const mysql = require('mysql2');
const { connect } = require('../routes');
require('dotenv').config();
// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
  })

//connection testing
connection.connect((error) => {
    if (error) {
        console.log("Connect Error", error);
    } else {
        console.log("The Database is Connected.");
    }
});

// read article
exports.readarticle = (callback) => {
    connection.query(
        `SELECT article_id, userid, article_content, article_role, DATE_FORMAT(article_created_date, "%Y-%m-%d") as article_created_date FROM article`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
            callback(err, results);
        }
    );

};

// add article
exports.addarticle = (callback) => {
    connection.query(
        `INSERT INTO article (article_id, userid, article_content, article_role, article_created_date) VALUES ( ?, ?, ?, ?, CURRENT_TIMESTAMP())`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(results);
            callback(err, results);
        }
    );

};