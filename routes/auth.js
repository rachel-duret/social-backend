const express = require('express');
const router = express.Router()
const { validateToken} = require('../middlewares/auth')
const authCtrl = require('../controllers/auth')

router.get('/', validateToken, authCtrl.auth)


module.exports = router