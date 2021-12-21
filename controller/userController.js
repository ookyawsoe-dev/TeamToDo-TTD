var userModel = require('../model/userModel')

exports.login = (req, res, next) => {
    if(req.method === 'GET'){
        res.render('login', {layout : false, message : ''});
    }else{
        var params = req.body;
        userModel.login(params, (err, results) => {
            if(err){
                console.log(err);
            }else{
                if(results[0]){
                    
                    req.session.user = results[0];
                    req.session.isLoggedIn = true;
                    console.log('post login', req.session);
                    res.redirect('/');
                }else{
                    res.render('login',{ layout: false , message : "Username or Password is incorrect"})
                }  
            }
        })
    } 
}

exports.logout = (req, res) => {
    req.session.destroy();
    console.log("Session", req.session);
    res.redirect('/login');
}