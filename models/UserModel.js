const mongoose = require("mongoose");

// now the in user schema have the following fields:
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    CNIC: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter',
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});


// Create user model, it creates the collection name with the plural of user which is users
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;