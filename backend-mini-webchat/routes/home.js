const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Home screen');
});

module.exports = router;
