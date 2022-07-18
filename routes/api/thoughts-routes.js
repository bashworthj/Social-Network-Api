const router = require ('express').Router();

const {
  getAllThoughts,
  getThoughtsById,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts).post(newThought);

router.route('/:id').get(getThoughtsById).put(updateThought).delete(deleteThought);

router.route('/:thoughtsId/reactions').post(newReaction).delete(deleteReaction);

module.exports = router;