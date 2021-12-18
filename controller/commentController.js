const commentModel = require('../model/commentModel');
const auth = require('../Middleware/checkAuth');

exports.addComment =(req, res, next) => {
    const articleId = req.params.id;
    const userId = req.session.user.user_id;
    const content = req.body.comment_content;
    commentModel.addComment({articleId, userId, content}, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
}

exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
    commentModel.deleteComment(commentId, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
}