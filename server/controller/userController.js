const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {

    async getAllUsers(req, res) {
        const users = await User.find({}).select('_id username email')
        res.json(users);
    },
    // req.user will exist if a token currently exists and thus we can find the user by using the req.user key
    async getSingleUser({ user = null, params }, res) {
        // if the user token exists and passed through the authentication middelware, then the user object will exist
        // if it does exist, we can find the current user by looking for the user._id
        // alternatively, we can find the user by the requested username or _id passed in through the parameters 
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params._id}, { username: params.username}]
        }).select('-__v -password');

        if (!foundUser) {
            return res.status(400).json({ message: "Cannot find a user by this id!" });
        }

        res.json(foundUser);
    }, 

    // create a user, sign a token and return an object containing the { user, token }
    async createUser({ body }, res) {
        // body will include {username, password, email}
        const user = await User.create(body);

        if(!user) {
            return res.status(400).json({ message: "Something went wrong in creating the user!" });
        }
        // the created user object will have the _id and the username, which we will pass to the signToken function to sign and encode in a jwt
        const token = signToken(user);
        res.json({ token, user });
    },
    // login a user, sign a token, and reutn an object containing the { user, token }
    // body will come from a form that contains a {username, password, maybe email}
    async login({ body }, res) {
        const user = await User.findOne({username: body.username});
        if (!user) {
            return res.status(400).json({ message: "Can't find this user!" });
        }
        // access the isCorrectPassword of the User method to use bcrypt to check the password
        const correctPw = await user.isCorrectPassword(body.password);

        if(!correctPw) {
            return res.status(400).json({ message: 'Incorrect credentials!' });
        }

        const token = signToken(user);
        res.json({ token, user });
    }
}