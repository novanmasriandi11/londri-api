exports.ProductMiddleware = (req, res, next) =>{
    req.params.id = parseInt(req.params.id);
    console.log();
    next();
}