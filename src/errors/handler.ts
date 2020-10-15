//imports
    import {ErrorRequestHandler, response} from 'express';
    import {ValidationError} from 'yup'

interface validationErrors{
    [key: string]: string[]
}

//Error Handling
const errorHandler: ErrorRequestHandler = (error, req, res, next) =>{
    if(error instanceof ValidationError){
        let errors: validationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return res.status(400).json({message: 'Validation fails', errors})
    }
    console.log(error);
    return response.status(500).json({message: 'Internal server error'})
}

export default errorHandler;