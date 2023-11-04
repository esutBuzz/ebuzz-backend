const isAuth = (req, res, next) => {
    if(req.session.isLoggedIn){
        return next();
    }
    return res.send({error:'User must be logged in to perform this action'})
}


module.exports = isAuth