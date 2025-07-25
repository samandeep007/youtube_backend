/**
 * Custom error class for API-related errors.
 * Extends the built-in Error class to include additional properties like HTTP status code,
 * success flag, and optional error details. This is useful in backend APIs (e.g., Node.js/Express)
 * for standardized error responses, making it easier to handle and return errors to clients.
 *
 * @example
 * throw new ApiError(404, 'Resource not found');
 */
class ApiError extends Error {
    /**
     * Creates a new ApiError instance.
     *
     * @param {number} statusCode - The HTTP status code associated with the error (e.g., 400 for Bad Request, 500 for Internal Server Error).
     * @param {string} [message="Something went wrong!"] - A descriptive error message. Defaults to a generic message if not provided.
     * @param {Array} [errors=[]] - An optional array of additional error details or validation errors.
     * @param {string} [stack=""] - An optional custom stack trace string. If provided, it overrides the automatic stack trace capture.
     */
    constructor(
        statusCode, 
        message = "Something went wrong!", 
        errors = [], 
        stack = ""
    ) {
        // Call the parent Error constructor to set the base message and initialize the error.
        super(message);
        
        // Assign the HTTP status code for easy reference in error handlers.
        this.statusCode = statusCode;
        
        // Placeholder for any data that might be associated with the error response (e.g., null by default, but can be set later if needed).
        this.data = null;
        
        // Store additional error details, such as validation failures or sub-errors.
        this.errors = errors;
        
        // Explicitly set the message property (redundant with super() but ensures clarity/overridability).
        this.message = message;
        
        // Flag to indicate the operation was not successful (useful for JSON responses in APIs).
        this.success = false;
        
        // Handle the stack trace:
        // If a custom stack is provided, use it directly (e.g., for serialized errors or testing).
        if(stack){
            this.stack = stack;
        } else {
            // Otherwise, capture a clean stack trace using V8's method.
            // This excludes the constructor from the stack trace for better debugging focus on the actual error origin.
            // See: https://v8.dev/docs/stack-trace-api for more details.
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

/*
ApiError class extends from the default node js Error class, and further enhances it by adding some standardisation to the errors.
The ApiError class constructor has to have four compulsory fields: message (because the default constructor of the Error class needs it and you need to pass it to the super constructor)
It also needs to have statusCode(equal to or greater than 400), stack (string), and errors(array), success(boolean), data(set to null --> because we don't send any data when we encounter any error in any of our APIs)

stack --> where the error is

*/


export default ApiError;