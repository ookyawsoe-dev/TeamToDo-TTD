const articleModel = require('../model/articleModel');

//  read article
exports.readarticle = (req, res, next) => {
    articleModel.readarticle((err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render('list_article', {data : results});
        }
    });
};

// add article
exports.addarticle = (req, res, next) => {
    var params = req.body;
    if(req.method == "GET"){
        res.render('add_article',{layout : false});
    }else{
        articleModel.addarticle(params, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.redirect('/', { data : results });
            }
        });
    }
   
}

// delete article
exports.deletearticle = (req, res) => {
    const article_id = req.params.article_id;
    console.log("Method Name: ", req.method);
    if(req.method == "GET") {
        articleModel.readarticle(article_id, (err, result) => {
            res.render('delete_article', { title: "Article Delete", detail: result});
        })
    }else {
        articleModel.deletearticle(id, (err, result) => {
            res.redirect('/article');
        });
    }
}