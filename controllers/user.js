const express = require('express');
const router = express.Router();
const {getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend} = require('../service/user');

// /api/users
// ● GET all users
// ● GET a single user by its _id and populated thought and friend
// data
// ● POST a new user:


router
    .route('/')
    .get(getUsers)
    .post(createUser)

// /api/users/:id
// ● GET a single user by its _id and populated thought and friend
// data
// ● PUT to update a user by its _id
// ● DELETE to remove user by its _id

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// /:userId/friends/:friendId
// ● POST to add a new friend to a user's friend list
// ● DELETE to remove a friend from a user's friend list

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)
    

// /api/users/:userId/friends/:friendId
// ● POST to add a new friend to a user's friend list
// ● DELETE to remove a friend from a user's friend list
module.exports = router;
