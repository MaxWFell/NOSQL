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

