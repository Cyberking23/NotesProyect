const jwt = require('jsonwebtoken');

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Get the token from the Authorization header

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Attach user data to the request
        next();
    });
}



// Export the authenticateToken function
module.exports = {
    authenticateToken,
};
