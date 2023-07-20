import {responseStatuses} from "../constants.ts"
import { ErrorRequestHandler } from 'express';
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const status = res.statusCode? res.statusCode : 500
    switch (status) {
        case responseStatuses.VALIDATION_ERROR:  return res.json({title: "Validation failed", message: error.message, trace: error.trace})
        case responseStatuses.NOT_FOUND: return res.json({title: "Not found exeption", message: error.message, trace: error.trace})
        case responseStatuses.UNAUTHORIZED: return res.json({title: "UnAuthorized", message: error.message, trace: error.trace})
        case responseStatuses.FORBIDDEN: return res.json({title: "Forbidden", message: error.message, trace: error.trace})
        case responseStatuses.SERVER_ERROR: return res.json({title: "Server error", message: error.message, trace: error.trace})
        default: 
            console.log('OOps, Something went wrong!')
            return res.json({title: "Error", message: error.message, trace: error.trace})
    }
}

export default errorHandler