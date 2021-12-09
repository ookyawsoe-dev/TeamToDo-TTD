const articleModel = require('../model/articleModel');

//  read article
exports.readarticle = (req, res, next) => {
    articleModel.readarticle((err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render('readarticles', {data : results});
        }
    });
};