const articleModel = require('../model/articleModel');
const commentModel = require('../model/commentModel')


// index file rendering
exports.readarticle = (req, res, next) => {
    articleModel.readarticle((err, article) => {
        if(err){
            console.log(err);
        }else{
            commentModel.readComment((err, comment) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(article);
                    console.log(comment);
                    var profile = req.session.user;
                    res.render('index', { article: article, comment : comment, profile : profile, layout : false});
                }
            })
        }
    })
}

// exports.readarticle = (req, res, next) => {
//     articleModel.readarticle((err, results) => {
//         if(err){
//             console.log(err);
//         }else{
//             res.render('readarticles', {data : results});
//         }
//     });
// };