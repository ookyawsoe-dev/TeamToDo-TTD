const mysql = require('mysql2');
const dotenv = require('dotenv');
const { done } = require('../controller/articleController');
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

// show article
exports.showarticle = (callback) => {
    connection.query('SELECT * from article', (err, result)=>{ 
        if(err){
            console.log(err);
        }else{
            callback(err, result);
        }
    });
};  

// add article
exports.addarticle = (id, params, callback) => {
   console.log("User ID ", id);
   connection.query(`INSERT INTO article(userid, article_content,article_role, article_created_date) VALUES ( "${id }", "${ params.article_content }", "todo", CURRENT_TIMESTAMP())`, (err, results) => {
    if(err){
        console.log(err);
    }else{
        console.log(results);
        callback(err,results);
    }
   });
};

exports.articleDetail = (id,article_id, callback) => {
    connection.query(
        `SELECT article_id, userid, article_content, article_role, article_created_date FROM article WHERE article_id = ? `,
        [article_id],
        (err, result) => {
            if(err) {
                console.log(err);
            }
            var row = null;
            if(result.length > 0) {
                row = result[0];
            }
            callback(err, row);
        }
    );
}


// to do
exports.todo = (id, callback) => {
    connection.query(
        `UPDATE article SET article_role="todo" WHERE article_id = ?`, [id],
        (err, results) => {
            if(err){
                console.log(err);
            }else{
                callback(err, results);
            }
        }
    )
}

// process
exports.process = (id, callback) => {
    connection.query(
        `UPDATE article SET article_role="process" WHERE article_id = ?`, [id],
        (err, results) => {
            if(err){
                console.log(err);
            }else{
                callback(err, results);
            }
        }
    )
}

// done
exports.done = (id, callback) => {
    connection.query(
        `UPDATE article SET article_role="done" WHERE article_id = ?`, [id],
        (err, results) => {
            if(err){
                console.log(err);
            }else{
                callback(err, results);
            }
        }
    )
}

// delete
exports.delete = (id, callback) => {
    connection.query(
        `DELETE from article WHERE article_id = ?`, [id],
        (err, results) => {
            if(err){
                console.log(err);
            }else{
                callback(err, results);
            }
        }
    )
}
// edit form 
exports.editForm =(id, callback)=>{
    connection.query(`SELECT * FROM article WHERE article_id =?`,[id], (err, results) =>{
        if(err){
            console.log(err);
        }else{
            callback(err, results);
        }
    })
}
// edit
exports.edit = (id,article_content, callback) => {
    connection.query(
        `UPDATE article SET article_content = ? WHERE article_id = ?`,[article_content,id],
        (err, results) => {
            if(err){
                console.log(err);
            }else{
                callback(err, results);
            }
        }
    )
}
