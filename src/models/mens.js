import express from "express";

import mongoose from "mongoose";

const menSchema =  new mongoose.Schema({
    ranking: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    dob: {
        type: Date,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    Score: {
        type: Number,
        required: true,
        trim: true
    },
    event: {
        type: String,
        default: "100 m"
    },


})

// we are creating a new collection
const MensRanking = new mongoose.model("MenRanking", menSchema)

export default MensRanking;