const router = require('express').Router();
const { 
    getAllQuotes,
    getSingleQuote,
    addQuote
} = require('../../controller/quoteController');

router.route('/')
    .get(getAllQuotes)
    .post(addQuote);

router.route('/random')
    .get(getSingleQuote);

module.exports = router; 