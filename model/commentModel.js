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

// read comment
exports.readComment = (callback) => {
    connection.query('SELECT comment.comment_id,comment.user_id,comment.article_id,comment.comment_content, user.user_name,user.user_role FROM comment INNER JOIN user ON comment.user_id = user.user_id', (err, result)=>{ 
        if(err){
            console.log(err);
        }else{
            callback(err, result);
        }
    });
};

//add new comment
exports.addComment = ( {articleId, userId, content }, callback) => {
    connection.query(`INSERT INTO comment(user_id,article_id,comment_content,comment_created_date) VALUES(?,?,?,CURRENT_TIMESTAMP())`,[userId,articleId,content], (err, results) =>{
        if(err){
            console.log(err);
        }else{
            callback(err, results);
        }
    })
}

//delete comment 
exports.deleteComment = (commentId, callback) => {
    connection.query(`DELETE FROM comment WHERE comment_id = ?`, [commentId], (err, results) => {
        if(err){
            console.log(err);
        }else{
            callback(err, results);
        }
    })
}

//editComment
exports.editComment = (commentId, content, callback) => {
    connection.query(`UPDATE comment SET comment_content=? WHERE comment_id=?`, [content, commentId], (err, results) => {
        if(err){
            console.log(err);
        }else{
            callback(err, results);
        }
    })
}
