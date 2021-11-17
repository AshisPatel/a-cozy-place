const router = require('express').Router();
const { 
    getAllUsers, 
    getSingleUser,
    createUser,
    login
} = require('../../controller/userController');
// imported and included in any route that requires user authentication 
const { authMiddleware } = require('../../utils/auth');

router.route('/login').post(login);

router.route('/signup').post(createUser); 

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/').get(getAllUsers);

module.exports = router; 