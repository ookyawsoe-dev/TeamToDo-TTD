var userModel = require('../model/userModel');
var path = require('path'); 
var multer = require('multer');


const storage = multer.diskStorage({
    destination: ((req, file, callback) => {
        callback(null, 'public/uploads/' + file.fieldname);
    }),
    filename: ((req, file, callback) => {
        var uniqueSuffix = Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname ( file.originalname));
        console.log(file.fieldname);
    })
})

var uploads = multer({storage : storage});
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
exports.register = [ uploads.single('profile'), (req, res, next) => {
    
    if(req.method == "GET"){
        res.render('register',{layout : false});
    }else{
        console.log('i m here');
        var params = req.body;
        var pp= req.body.profile;
        console.log(pp);
        if(req.file){
        params.profile =path.join("/uploads/", req.file.fieldname,req.file.filename);
        console.log(params.profile);
      }
      console.log(params);
        userModel.register(params, (err, results) => {
            if(err) {
                console.log(err);
            }else{
                console.log("Testing Redirect");
                res.redirect('/user');
            }
        });
    }
}]

// login
exports.login = (req, res, next) => {
    if(req.method === 'GET'){
        res.render('login', {layout : false, message : ''});
    }else{
        var params = req.body;
        console.log(params);
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


// logout
exports.logout = (req, res) => {

    console.log("Logout routes " , req.session);

    req.session.destroy((err) => {
        if(err){
            console.log("Your Session Data cannot delete");
        }else{
            console.log("SSSSS", req.session);
            res.redirect('/login');
        }
    });
   
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