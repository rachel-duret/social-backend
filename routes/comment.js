const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');


// get one the comments
router.get('/:id', commentCtrl.getOneComment)

// write a comment
router.post('/', commentCtrl.createOneComment)

//delete a commet
router.delete('/:id', commentCtrl.deleteOneComment)

//like a commet

// dislike a commet


module.exports = router