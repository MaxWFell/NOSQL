const express = require('express');

const router = express.Router();

const { getThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../service/thought');

// /api/thoughts
// ● GET to get all thoughts
// ● POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

router
    .route('/')
    .get(getThoughts)
    .post(createThought)

// /api/thoughts/:id
// ● GET to get a single thought by its _id
// ● PUT to update a thought by its _id
// ● DELETE to remove a thought by its _id

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
// ● POST to create a reaction stored in a single thought's reactions array field

router
    .route('/:thoughtId/reactions')
    .post(createReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
// ● DELETE to pull and remove a reaction by the reaction's reactionId value

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;