const router = require ('express').Router();

const {
  getAllUsers,
  getUserById,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend

} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(newUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:id/friends/:friendsId').post(addFriend).delete(deleteFriend);

module.exports = router;