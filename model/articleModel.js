const mysql = require('mysql2');

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'staff',
//     password: 'Staff!@#$%67890',
//     database: 'user',
// });

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
        'SELECT article_id, article_name, about_article, creater_name, DATE_FORMAT(created_date, "%Y-%m-%d") as created_date FROM `article`',
        (err, results) => {
            if (err) {
                console.log(err);
            }
            callback(err, results);
        }
    );

};