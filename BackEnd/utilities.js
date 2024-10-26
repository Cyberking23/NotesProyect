const jwt = require('jsonwebtoken');

// Función para generar el token
function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
}

// Middleware para autenticar el token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    console.log("Secret used for verification:", process.env.ACCESS_TOKEN_SECRET); // Debugging

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification error:", err.message);
            return res.status(403).json({ error: "Token verification failed", details: err.message });
        }
        console.log("Decoded user from token:", user); // Verifica qué contiene el usuario decodificado
        req.user = user; // Adjunta los datos del usuario a la solicitud
        next();
    });
}

// Ejemplo de uso
const user = { _id: 123, name: 'John Doe' }; // Cambiado a _id
const token = generateToken(user); // Genera un token
console.log("Generated Token:", token); // Imprime el token generado

module.exports = {
    authenticateToken,
};
