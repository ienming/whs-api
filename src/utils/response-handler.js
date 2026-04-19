export const sendSuccessResponse = (response, data, status = 200) => {
    return response.status(status).json({
        status: 'success',
        data
    });
}

export const sendErrorResponse = (response, error, customMessage = 'An unexpected error occurred', status = 500) => {
    console.error(`[${new Date().toISOString()}] ${customMessage}:`, error);
    return response.status(status).json({
        status: 'error',
        error: customMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
}