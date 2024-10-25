const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; // Acceso corregido al encabezado
    const token = authHeader && authHeader.split(" ")[1]; // Asegúrate de que el token esté presente

    if (!token) return res.sendStatus(401); // Sin token, devuelve 401

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Si hay un error en la verificación, devuelve 403
        req.user = user; // Almacena el usuario en el objeto de solicitud
        next(); // Continúa con el siguiente middleware
    });
}

module.exports = {
    authenticateToken,
};
