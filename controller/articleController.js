
const articleModel = require('../model/articleModel');
const commentModel = require('../model/commentModel');
const auth = require('../Middleware/checkAuth');
const { param } = require('../routes');



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

exports.showarticle = (req, res, next) => {
    articleModel.showarticle((err, results) => {
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
        var id = req.session.user.user_id;
        articleModel.addarticle(id,params, (err, results) => {
            if(err) {
                console.log(err);
            }else{
                console.log("Testing Redirect");
                res.redirect('/');
            }
        });
    }
   
}

// delete article
// exports.deletearticle = (req, res) => {
//     const article_id = req.params.article_id;
//     console.log("Method Name: ", req.method);
//     if(req.method == "GET") {
//         articleModel.articleDetail(article_id, (err, result) => {
//             res.render('delete_article', { title: "Article Delete", detail: result});
//         });
//     }else {
//         articleModel.deletearticle(id, (err, result) => {
//             res.redirect('/');
//         });
//     }
// }


// to do 
exports.todo = (req, res) => {
    const id = req.params.id;
    articleModel.todo(id, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    });
}

// process
exports.process = (req, res) => {
    const id = req.params.id;
    articleModel.process(id, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    });
}


// done
exports.done = (req, res) => {
    const id = req.params.id;
    articleModel.done(id, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    });
}

// delete
exports.delete = (req, res) => {
    const id = req.params.id;
    articleModel.delete(id, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
}

// edit
exports.edit = (req, res) => {
    const id = req.params.id;
    if(req.method == "GET") {
        articleModel.editForm(id, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('update_article', { layout : false, article : results[0] } )
            }
        })
    }else{
        articleModel.edit(id, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        });
    }
}