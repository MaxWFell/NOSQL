const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const thoughtSchema = require('./thought');

// User
// ● username
// ○ String
// ○ Unique
// ○ Required
// ○ Trimmed
// ● email
// ○ String
// ○ Required
// ○ Unique
// ○ Must match a valid email address (look into Mongoose's
// matching validation)

// ● thoughts
// ○ Array of _id values referencing the Thought model
// ● friends
// ○ Array of _id values referencing the User model
// (self-reference)


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = mongoose.model('User', userSchema);


module.exports = User;


