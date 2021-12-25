'use strict';


module.exports = (req, res, next) => {
    console.log("Auth Session",req.session);
    if (req.session.isLoggedIn) {
        next();
    }
    else{
        return res.redirect('/login');
    }
    
};