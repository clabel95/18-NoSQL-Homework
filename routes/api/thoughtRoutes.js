const router = require('express').Router()

//here I am defining all the functions that I made in my controllers for the thoughts and reactions
const {
    getAllThoughts,
    getThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
    createThought
} = require('../../controllers/thoughtController')


//here I am routing all the functions to where they are supposed to go 
router.route('/').get(getAllThoughts)
router.route('/:thoughtId').get(getThought).delete(deleteThought).put(updateThought)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:userId').post(createThought)



module.exports = router 