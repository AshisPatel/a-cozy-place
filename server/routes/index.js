const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.use('/api', apiRoutes);

// catch all route
router.use((req, res) => {
    res.status(404).send('<h1> You seem to be lost friend! I would navigate back to the campsite.</h1>')
});

// serve up react front-end in production
// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

module.exports = router; 