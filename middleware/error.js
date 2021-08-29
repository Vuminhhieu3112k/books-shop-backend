var ErrorResponse = require('../utils/ErrorResponse')
var notify = require('../configs/notify')

function errorHandler (err, req, res, next) {
    let error = {...err}
    console.log(err.name.yellow);
    if(err.name ==="CastError"){
        let message = notify.ERROR_CAST;
        error = new ErrorResponse(400,message)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message : error.message || "SEVER ERORR"
    })
}
module.exports = errorHandler;