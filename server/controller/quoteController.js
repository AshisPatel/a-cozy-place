const { Quote } = require('../models');

module.exports = {
    async getAllQuotes(req, res) {
        Quote.find({})
            .select('-__v')
            .then(quoteData => {
                res.status(200).json(quoteData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    async getSingleQuote(req, res) {
        try {
            // find all quotes
            const allQuotes = await Quote.find({}).select('-__v');
            // grab random quote
            const singleQuote = allQuotes[Math.round(Math.random() * allQuotes.length)];
            // return single quote
            res.status(200).json(singleQuote);

        } catch (err) {
            console.log(err);
            res.status(500).json(err); 
        }


    },

    async addQuote({ body }, res) {
        // body will include the user's username, should they choose to include or a default and a message
        Quote.create(body)
            .then(quoteData => {
                quoteData ?
                    res.status(200).json(quoteData) :
                    res.status(404).json({ message: "There was a problem with creating your quote!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}