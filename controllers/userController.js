const { User } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    //find all users.
    User.find()
      //if there are users then it will return all of them
      .then((user) => res.json(user))
      //if there are no users then it will give an error.
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user
  getSingleUser(req, res) {
    //find a single user using a provided user Id
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          //if no user with the provided id can be found then it will return a 404 error with the message no user with that ID.
          ? res.status(404).json({ message: 'No user with that ID' })
          // If the response from the find one includes a valid user then it will return that user
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    //this will create a User with the information provided in the req.body 
    User.create(req.body)
      //if there are no errors then the user will be created.
      .then((user) => res.json(user))
      //if there is an error then you will get a 500 status.
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and associated apps
  deleteUser(req, res) {
    //this will search for a user by id and then delete them.
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          //if a user is not found with the provided id then it will return an error.
          ? res.status(404).json({ message: 'No user with that ID' })
          //if a user is found with the provided id then it will delete that user.
          : user.deleteMany({ _id: { $in: user } })
      )
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update user '_id'
  updateUser(req, res) {
    //this will search for a ;user by id and then update that user with the provided req.body.
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          //if the user id is not found then it will return a 404 error
          ? res.status(404).json({ message: 'No user with this id!' })
          //if the user is found then it will update that user with the provided req.body.
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add an new friend to the user
  addNewFriend(req, res) {
    //updates a user by adding a friend with the provided user id.
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          // If there is no user with the provided id then return a 404
          ? res.status(404).json({ message: 'No user found with that ID ' })
          //if there is a user with the provided id then update that user with the new friend.
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove friend from a user
  removeFriend(req, res) {
    //updates a user by removing a friend with a provided id.
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          //if there is no user with the provided id then return a 404
          ? res.status(404).json({ message: 'No user found with that ID' })
          //if there is a user with the provided id then update the user by removing the desired friend.
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};