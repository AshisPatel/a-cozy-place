const router = require('express').Router();
const quoteRoutes = require('./quoteRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/quotes', quoteRoutes);

module.exports = router; 