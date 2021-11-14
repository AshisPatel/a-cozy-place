const router = require('express').Router();
const quoteRoutes = require('./quoteRoutes');

router.use('/quotes', quoteRoutes);

module.exports = router; 