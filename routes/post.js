const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');


// create a post
router.post('/', postCtrl.createOnePost);

// update a post
router.put('/:id', postCtrl.updateOnePost);
// delete a post
router.delete('/:id', postCtrl.deleteOnePost);
// like a post
// dislike a post
// get a post
// get timeline post







module.exports = router