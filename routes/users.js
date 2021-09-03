const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const User = require('../models/User');



router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/:id', userCtrl.findOneUser );
router.get('/', userCtrl.getOneUser)
router.get('/friends/:userId', userCtrl.findFriends)
router.put('/:id/followers', userCtrl.followOneUser);
router.put('/:id/unfollowers', userCtrl.unfollowOneUser);




module.exports = router