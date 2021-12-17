const commentModel = require('../model/commentModel');
const auth = require('../Middleware/checkAuth');

exports.add =(req, res, next) => {
    const articleId = req.params.id;
    const userId = req.session.user.user_id;
    const content = req.body.content
    commentModel.add({articleId, userId}, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
}