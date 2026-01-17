/**
 * Response Utility
 * Standardized response helpers for controllers
 */

const successResponse = (res, message, result = null, code = 200) => {
    return res.status(code).json({
        code: 'SUCCESS',
        message,
        result
    });
};

const errorResponse = (res, message, code = 400) => {
    return res.status(code).json({
        code: 'ERROR',
        message
    });
};

module.exports = {
    successResponse,
    errorResponse
};
