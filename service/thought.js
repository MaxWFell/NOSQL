const Thought = require('../models/thought');
const User = require('../models/user');

// //get all thoughts
exports.getThoughts = function (req, res) {
    const thoughts = Thought.find()
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });

    return thoughts;
}

// //get a single thought by its _id and populated reactions
exports.getThoughtById = function (req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
}


// POST to create a new thought (don't forget to push the created
// thought's _id to the associated user's thoughts array field)

// // example data
// {
// "thoughtText": "Here's a cool thought...",
// "username": "lernantino",
// "userId": "5edff358a0fcb779aa7b118b"

// }

exports.createThought = function (req, res) {
    const { thoughtText, username, userId } = req.body;
    const thought = { thoughtText, username};
    Thought.create(thought)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }
        )
        .catch((err) => res.status(400).json(err));
    

}

// //update thought by its _id

exports.updateThought = function (req, res) {
    //get username and email from json request body
    const { thoughtText } = req.body;
    //create a new object with username and email
    const thought = { thoughtText };
    //update user
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, thought, {
        new: true,
        runValidators: true,
    })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
}

// //delete thought by its _id

exports.deleteThought = function (req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((deletedThought) => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
}

// /api/thoughts/:thoughtId/reactions
// ● POST to create a reaction stored in a single thought's
// reactions array field

// // example data
// reactionId: {
//     type: Schema.Types.ObjectId,
//     default: () => new Types.ObjectId()
// },
// reactionBody: {
//     type: String,
//     required: true,
//     maxlength: 280
// },
// username: {
//     type: String,
//     required: true
// },
// createdAt: {
//     type: Date,
//     default: Date.now,
//     get: (createdAtVal) => dateFormat(createdAtVal)
// }

exports.createReaction = function (req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
    )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
}

//delete reaction by its _id

exports.deleteReaction = function (req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
}


