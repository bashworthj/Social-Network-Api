const router = require("express").Router();
// all of these methods will refer to my user controller where theyre define
const {
  getAllUsers,
  getUserById,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");
// get all and post to all methods
router.route("/").get(getAllUsers).post(newUser);
// get by id update by id and remove by id methods
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// adding and deleting friends methods
router.route("/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router;
