/**
 * A higher-order function that wraps an Express request handler to handle asynchronous operations.
 * It ensures that any promises returned by the handler are resolved, and catches any errors,
 * passing them to the next middleware (typically an error handler) in the Express chain.
 * This is useful for writing async route handlers without try-catch blocks everywhere.
 *
 * @param {Function} requestHandler - The asynchronous request handler function to wrap.
 *   It should take (req, res, next) as arguments and may return a Promise.
 * @returns {Function} A wrapped handler that can be used in Express routes.
 *
 * @example
 * const getUser = asyncHandler(async (req, res, next) => {
 *   const user = await User.findById(req.params.id);
 *   res.json(user);
 * });
 *
 * app.get('/users/:id', getUser);
 */
const asyncHandler = (requestHandler) => {
    // Return an arrow function that acts as the middleware
    return (req, res, next) => {
        // Resolve the promise returned by the requestHandler (or wrap synchronous results in a promise).
        // This handles both async and sync handlers uniformly.
        Promise.resolve(requestHandler(req, res, next))
            // Catch any errors from the promise rejection and pass them to the next middleware.
            .catch((error) => {
                next(error);
            }
            );
    }
}

export default asyncHandler;


// const asyncHandler = (func) => async() => {}

// const asyncHandler = (fun) => async(req, res, next) => {
//     try {
//         await fun(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }