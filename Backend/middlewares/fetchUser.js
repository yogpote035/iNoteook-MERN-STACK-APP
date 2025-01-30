const jwt = require("jsonwebtoken");

const jwt_secret = "Shr@dDH@";



const fetchUser = (request, response, next) => {
    // d-encrypt token 

    const token = request.header("auth-token");

    if (!token) {
        return response.status(401).send("Please Authenticate Using valid token");
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        request.user = data.user
        next();
    } catch (error) {
        response.status(400).send("Internal Server Error");
    }
}


module.exports = fetchUser;