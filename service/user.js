//return all users
const User = require("../models/user");

exports.getUsers = function (req, res) {
    const users = User.find()
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });

    return users;
};

//return a single user by its _id and populated thought and friend data

exports.getUserById = function (req, res) {
    User.findOne({ _id: req.params.userId })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
};

//createUser

exports.createUser = function (req, res) {
    User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
};

//updateUser by its _id

exports.updateUser = function (req, res) {
    //get username and email from json request body
    const { username, email } = req.body;
    //create a new object with username and email
    const user = { username, email };
    //update user
    User.findOneAndUpdate({ _id: req.params.userId }, user, {
        new: true,
        runValidators: true,
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
};

//deleteUser by its _id

exports.deleteUser = function (req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
};

//
// ● POST to add a new friend to a user's friend list
// ● DELETE to remove a friend from a user's friend list

//addFriend

exports.addFriend = function (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
}

//deleteFriend

exports.deleteFriend = function (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
}


