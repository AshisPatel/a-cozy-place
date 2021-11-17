const router = require('express').Router();
const { 
    getAllQuotes,
    getSingleQuote,
    addQuote,
    updateQuote,
    deleteQuote
} = require('../../controller/quoteController');

router.route('/')
    .get(getAllQuotes)
    .post(addQuote);

router.route('/random')
    .get(getSingleQuote);

router.route('/:_id')
    .put(updateQuote)
    .delete(deleteQuote);

module.exports = router; 