const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thoughts-routes');
// in the url, /user will refer to my user routes and /thoughts will refer to my thoughts routes to recieve their functionality
router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);



module.exports = router;