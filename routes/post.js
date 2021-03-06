const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment')


// create a post
router.post('/', postCtrl.createOnePost);

// update a post
router.put('/:id', postCtrl.updateOnePost);
// delete a post
router.delete('/:id', postCtrl.deleteOnePost);
// like a post
router.put('/:id/like', postCtrl.likeOnePost);
// dislike a post
// get a post
router.get('/:id', postCtrl.getOnePost);
// get timeline post
router.get('/timeline/:userId', postCtrl.timeline)
// get all user post
router.get('/profile/:userId', postCtrl.userAllPost)
//upload image

//coment






module.exports = router