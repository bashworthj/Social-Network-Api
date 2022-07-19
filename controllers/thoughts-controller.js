//  My thoughts controller gives function to all of my crud methods that are on full display in video tutorial
const { Thoughts, User } = require("../models");

const thoughtsCont = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "User with this ID does not exist" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  newThought({ body }, res) {
    Thoughts.create(body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User with this ID does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "User with this ID does not exist" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "User with this ID does not exist" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  newReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "User with this ID does not exist" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  deleteReaction({ params }, res) {
    Thoughts.findByIdAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },
};

module.exports = thoughtsCont;
