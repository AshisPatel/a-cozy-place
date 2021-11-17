const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET; 
const expiration = '2h';

module.exports = {

    authMiddleware: function(req, res, next) {
        // allows token to be sent via req.query or headers
        let token = req.query.token || req.headers.authorization; 
        // ["Bearer", "<tokenvalue>"] is the form of that the token is passed into 
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if(!token) {
            return res.status(400).json({ message: "No token identified :(" });
        }

        // verify token and get user data from it 
        try {
            // creates data from the verification of the token 
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            // adds the data from the token to the request object under the key of 'user'
            req.user = data; 
        } catch(err) {
            console.log('Invalid token');
            return res.status(400).json({ message: 'Invalid token' });
        }

        // continue to next endpoint
        next();
    },

    signToken: function({ username, _id, email }){
        const payload = { username, _id, email }; 
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};