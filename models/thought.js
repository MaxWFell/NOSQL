// Thought
// ● thoughtText
// ○ String
// ○ Required
// ○ Must be between 1 and 280 characters
// ● createdAt
// ○ Date
// ○ Set default value to the current timestamp
// ○ Use a getter method to format the timestamp on query
// ● username (The user that created this thought)
// ○ String
// ○ Required
// ● reactions (These are like replies)

// ○ Array of nested documents created with the
// reactionSchema

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the
// thought's reactions array field on query.
const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./reaction');


const dateFormat = (date) => {
    return date.toLocaleDateString();
};

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        // array of nested documents created with the reactionSchema
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


