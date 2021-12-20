var userModel = require('../model/userModel')

// user list
exports.user = (req, res, next) => {
    userModel.user((err, results) => {
        if(err){
            console.log(err);
        }else{
            res.render('user_list', {data : results});
        }
    });
};


// register
exports.register = (req, res, next) => {
    var params = req.body;
    if(req.method == "GET"){
        res.render('register',{layout : false});
    }else{
        userModel.register(params, (err, results) => {
            if(err) {
                console.log(err);
            }else{
                console.log("Testing Redirect");
                res.redirect('/');
            }
        });
    }
   
}

// login
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
                    console.log(req.session);
                    req.session.user = results[0];
                    req.session.isLoggedIn = true;
                    console.log(req.session);
                    res.redirect('/');
                }else{
                    res.render('login',{ layout: false , message : "Username or Password is incorrect"})
                }  
            }
        })
    } 
}

// logout
exports.logout = (req, res) => {
    req.session.destroy();
    console.log("Session", req.session);
    res.redirect('/login');
}

// delete user
exports.delete = (req, res) => {
    const id = req.params.id;
    userModel.delete(id, (err, results) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/user');
        }
    });
}


// edit user data
exports.edit = (req, res) => {
    const id = req.params.id;
    if(req.method == "GET") {
        userModel.editForm(id, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.render('edit _user', { layout : false, user : results[0] } )
            }
        })
    }else{
        var params = {
            user_name : req.body.user_name,
            email : req.body.email,
            password : req.body.password,
            user_role : req.body.user_role
        }
        if(params.password){
            params.password = req.body.password
        }
        userModel.edit(id,params, (err, results) => {
            if(err){
                console.log(err);
            }else{
                res.redirect('/user');
            }
        });
    }
}