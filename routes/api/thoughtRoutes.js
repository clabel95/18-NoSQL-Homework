const router = require('express').Router()

const {
    getAllThoughts,
    getThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
    createThought
} = require('../../controllers/thoughts-controller')


router.route('/').get(getAllThoughts)
router.route('/:id').get(getThought).delete(deleteThought).put(updateThought)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:userId').post(createThought)



module.exports = router 