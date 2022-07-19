// My user controller gives function to all of my crud methods that are on full display in video tutorial

const { User } = require("../models");
const userCont = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "frineds", select: "-__v" },
      ])
      .select("-__v")
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

  newUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
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

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
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

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
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
};

module.exports = userCont;
