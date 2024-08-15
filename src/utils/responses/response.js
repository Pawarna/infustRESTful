const sendSuccessResponse = (res, message, result, statusCode = 200) => {
    res.status(statusCode).json({
        status: 'success',
        message,
        result
    })
}

const sendErrorResponse = (res, message, error, statusCode = 500) => {
    res.status(statusCode).json({
        status: 'error',
        message,
        error
    })
}


export {
    sendSuccessResponse,
    sendErrorResponse,
}