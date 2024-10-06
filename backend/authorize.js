const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract token
        const decodedToken = jwt.verify(token, 'your_jwt_secret'); // Verify token
        req.userId = decodedToken.userId; // Attach userId to request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized request' });
    }
};
