const router = require("express").Router();
//here I am defining all the functions that I made in my controllers for the user and friend
 
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addNewFriend,
  removeFriend
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/:id/friends/:friendId").post(addNewFriend).delete(removeFriend);

module.exports = router;