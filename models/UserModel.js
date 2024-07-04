const mongoose = require("mongoose");
const bcrypt  =  require("bcrypt")

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

userSchema.pre('save' ,  async function(next){
     let user = this

     if(!user.isModified('password')) return next()

        try {
            const salt  = await bcrypt.genSalt(10) ; 
            const hashpassword  =   await bcrypt.hash(user.password , salt)
            user.password  =  hashpassword ; 
            next()
        } catch (error) {
            console.log(error.message);
             return next();
        }
})


userSchema.methods.comparePassword  =  async function  (credientialPassword){
    try {
        const isMatch = await bcrypt.compare(credientialPassword, this.password);
        return isMatch;
    
        // how bcrypt.compare() method works
        // it takes argument
        // 1st argument =  assume --> password
        // 2nd argument =  assume --> ispassword
    
        // isPassword -----> find salt
        // password   -----> adding salt in this and make hash password and then match
      } catch (error) {
        console.log("Compare Password", error.message);
      }
}
// Create user model, it creates the collection name with the plural of user which is users
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;