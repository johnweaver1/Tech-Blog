const router = require('express').Router();
const dRoutes = require('./dRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dRoutes);
module.exports = router;
