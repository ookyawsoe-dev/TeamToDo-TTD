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
    connection.query('SELECT article.article_id, article.userid, article.article_content, article.article_role, article.article_created_date, user.user_name,user.user_role FROM article INNER JOIN user ON article.userid=user.user_id', (err, result)=>{ 
        if(err){
            console.log(err);
        }else{
            callback(err, result);
        }
    });
};

// add article
exports.addarticle = (params, callback) => {
   connection.query(`INSERT INTO article(article_id, userid, article_content,article_role, article_created_date) VALUES (null, ${ params.userid }, ${ params.article_content }, "todo", CURRENT_TIMESTAMP())`, (err, results) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
    }
   });
};

// delete article
exports.deletearticle = (article_id, callback) => {
    connection.query(
        `DELETE FROM article WHERE article_id = ? `, [article_id],
        (err, result) => {
            if(err) {
                console.log(err);
            }
            
            callback(err, result);
        }
    );
}

