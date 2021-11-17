const { Quote } = require('../models');

module.exports = {
    getAllQuotes(req, res) {
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

    addQuote({ body }, res) {
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
    },

    updateQuote({ params, body }, res) {
        Quote.findByIdAndUpdate(
            params._id,
            body,
            {
                new: true,
                runValidators: true
            }
        )
        .then(dbQuoteData => {
            dbQuoteData ? 
                res.status(200).json(dbQuoteData) :
                res.status(404).json({ message: "Couldn't find a quote by that id!" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
    },

    deleteQuote({ params }, res) {
        Quote.findByIdAndDelete(params._id)
            .then(dbQuoteData => {
                dbQuoteData ?
                    res.status(200).json(dbQuoteData) :
                    res.status(404).json({ message: "Couldn't find a quite with that id!" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            });
    }
}