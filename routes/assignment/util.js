module.exports = {
    userIsAuthenticated(req, res, next) {
        if(!req.isAuthenticated()) {
            res.status(401).send();
        } else {
            next();
        }
    }
};
