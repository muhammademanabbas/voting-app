const express = require("express");
let router = express.Router();
const { jwtAuthMiddleware, GenerateToken } = require('../jwt.js')
const UserModel = require('../models/UserModel.js')

router.post('/signup', async (req, res) => {

    try {
        let user = req.body;
        let response = await UserModel.create(user )
        let payload = {
            id: response.id,
        }

        let token = GenerateToken(payload)
        console.log("Token is : ", token)

        console.log("Your Data Has Been Saved SuccesFully");
        res.status(200).json({ response, token });
    } catch (error) {
        console.log("Error While Saving user Data!!");
        res.status(500).json({ error: "Inernal Server Error!!" });
        console.log(error);
    }
})

router.post('/login', async (req, res) => {

    try {
        let { CNIC, password } = req.body;
        let user = await UserModel.findOne({ CNIC: CNIC })
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ error: "Invalid Username or Password" });
            console.log("Invalid Username or Password");
        }
        const payload = {
            id: user.id,
            CNIC: user.CNIC
        }

        let token = GenerateToken(payload)

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        let payload = req.userPayload;
        console.log("User Payload is : ", payload);

        const userID = payload.id;
        let user = await UserModel.findById(userID);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {

    try {
        let userId = req.userPayload.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        }

        let user = await UserModel.findById(userId)

        if (!userId || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' , errorMessage : err.message });
    }
})

module.exports = router;