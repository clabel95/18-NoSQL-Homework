const { Thought, User } = require("../models");

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
    },

  // Get a thought
  getThought(req, res) {
    //find an object using a given id
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      //then takes what is returned and checks to see if an object was returned
      .then((thought) =>
        !thought
          //if there was nothing with that id then it will return the following message and a 404 status.
          ? res.status(404).json({ message: 'No thought with that ID' })
          //if something was found then it will return that object
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      //find an object using a given id and then update it with the provided req.body
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      //then takes what is returned and checks to see if an object was returned
      .then((thought) =>
        !thought
          //if there was nothing with that id then it will return the following message and a 404 status.
          ? res.status(404).json({ message: 'No thought with this id!' })
          //if something was found then it will update that object
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

 // Delete a thought
 deleteThought(req, res) {
   //find an object using a given id and then delete it
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    //then takes what is returned and checks to see if an object was returned
      .then((thought) =>
        !thought
          //if there was nothing with that id then it will return the following message and a 404 status.
          ? res.status(404).json({ message: 'No thought with that ID' })
          //if something was found then it will delete that object
          : thought.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  //Create reaction to a thought
  createReaction(req, res) {
    //find an object using a given id and then update it with the provided req.body
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        //the addToSet means instead of overwriting whatever is already there we are just adding something else.
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      )
      //then takes what is returned and checks to see if an object was returned
      .then((thought) =>
        !thought
          //if there was nothing with that id then it will return the following message and a 404 status.
          ? res.status(404).json({ message: 'No thought with this id!' })
          // otherwise it will add a reaction to that object.
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

   // Remove reaction from a user
   removeReaction(req, res) {
     //find an object using a given id and then remove a reaction from it.
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      //then takes what is returned and checks to see if an object was returned.
      .then((user) =>
        !user
          //if there was nothing with that id then it will return the following message and a 404 status.
          ? res.status(404).json({ message: 'No user found with that ID.' })
          //otherwise it will update the desired reaction.
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add an thought to a user
  createThought(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);
    //find a user by id and then update the user with the provided req.body.
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          //if there was nothing with that id then it will return the following message and a 404 status.
          ? res.status(404).json({ message: 'No user found with that ID ' })
          //otherwise it will create the desired thought and attach it to the user.
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};