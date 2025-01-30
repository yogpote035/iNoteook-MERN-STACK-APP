const User = require("../models/User")
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// jwt secret


const jwt_secret = "Shr@dDH@";

module.exports.signup = async (request, response) => {

    const results = validationResult(request);
    if (!results.isEmpty()) {
        return response.status(400).json({ results: results.array() });
    }
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    if (existingUser) {
        return response.status(500).json({ error: "This Email User Already Exist" });
    }

    try {
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        await newUser.save();
        const data = {
            user: {
                id: newUser.id,

            }
        }

        const authToken = jwt.sign(data, jwt_secret);

        response.json({ authToken });
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error User Not Created" });
    }
}


module.exports.login = async (request, response) => {
    const results = validationResult(request);

    if (!results.isEmpty()) {
        return response.status(400).json({ results: results.array() });
    }

    const { email, password } = request.body;

    try {
        const userFind = await User.findOne({ email });

        if (!userFind) {
            return response.status(404).json({ error: "Try to Login With Correct Credentials or Signup" });
        }


        const passwordCompare = await bcryptjs.compare(password, userFind.password);

        if (!passwordCompare) {
            return response.status(400).json({ error: "Try to Login With Correct Credentials or Signup" });
        }
        const data = {
            user: {
                id: userFind.id,
            }
        }

        const authToken = jwt.sign(data, jwt_secret);

        response.json({ authToken });

    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });

    }
}


module.exports.getUser = async (request, response) => {
    try {
        const userId = request.user.id;
        const user = await User.findById( userId ).select("-password");
        response.send(user)
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
}