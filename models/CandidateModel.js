const mongoose = require("mongoose");

// now the in candidate schema have the following fields:
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    party: {
        type: String,
        requied: true
    },
    age: {
        type: Number,
        requied: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()

            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
});


// Create candidate model, it creates the collection name with the plural of candidate which is candidates
const candidateModel = mongoose.model("candidate", candidateSchema);
module.exports = candidateModel;