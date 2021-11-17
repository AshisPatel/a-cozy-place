const { Sound } = require('../models');

module.exports = {
    async getAllSounds(req, res) {
        try {
            const sounds = await Sound.find({}).select('-__v');
            sounds ? res.status(200).json(sounds) : res.status(400).json({ message: "Problem retrieving sounds "})
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addSound({ body }, res) {
        try {
            const sound = await Sound.create(body);
            sound ? res.status(200).json(sound) : res.status(404).json({ message: 'Could not create sound! '});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}