const router = require('express').Router()

const {
    getAllThoughts,
    getThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
    createThought
} = require('../../controllers/thoughtController')


router.route('/').get(getAllThoughts)
router.route('/:thoughtId').get(getThought).delete(deleteThought).put(updateThought)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:userId').post(createThought)



module.exports = router 