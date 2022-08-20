const router = require('express').Router();

const {
    getAllThoughts, getThoughtById, createThought, removeThought, editThought, addReaction, deleteReaction
} = require('../../controllers/thought-controller');


router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought)
    

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .delete(removeThought)
    .put(editThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)
 

module.exports = router;    