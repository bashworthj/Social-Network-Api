const router = require ('express').Router();
// all of these methods will refer to my thoughts controller where theyre define

const {
  getAllThoughts,
  getThoughtsById,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thoughts-controller');
// get all and post to all methods
router.route('/').get(getAllThoughts).post(newThought);
// get by id update by id and remove by id methods
router.route('/:id').get(getThoughtsById).put(updateThought).delete(deleteThought);
// adding and deleting reaction methods
router.route('/:thoughtsId/reactions').post(newReaction).delete(deleteReaction);

module.exports = router;

