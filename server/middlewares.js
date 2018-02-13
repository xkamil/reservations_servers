const User = require('./models/user');
const mongoose = require('mongoose');

module.exports.authorization = (req, res, next) => {
    let user;

    try{
        user = JSON.parse(req.cookies.user)
    }catch(e){}

    if (!user) return res.status(401).send();

    User.findOne({email: user.email})
        .then(user => {
            if(user){
                req.user = user;
                next();
            }else{
                res.status(401).send()
            }
        })
        .catch(err => next(err));
};

module.exports.cors = (req,res,next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
   // res.header('Access-Control-Allow-Headers', '*');
    next();
};

module.exports.databaseConnectionCheck = (req, res, next) => {
    const connected = mongoose.connection.readyState;

    connected ? next() : next('Database connection lost');
};


