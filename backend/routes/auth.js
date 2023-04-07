const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "Thisismysecret";

// ROUTE 1
// Create a user using: POST "/api/auth/createuser". No login required
router.post(
    "/createuser",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Enter a valid password").isLength({ min: 5 }),
    ],
    async (req, res) => {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        console.log(req.body);

        try {
            // Check whether the user with this email exists already
            var user = await User.findOne({ email: req.body.email });

            if (user) {
                return res
                    .status(400)
                    .json({ success, error: "Sorry a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ success, message: "Some error occurred" });
        }
    }
);

// ROUTE 2
// Authenticate a User using: POST "/api/auth/login".
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ success, error: "Please login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({ success, error: "Please login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id,
                },
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({success, message: "Some internal error occurred"});
        }
    }
);


// ROUTE 3: Get logged in user details using POST "/api/auth/getuser". Login required. 
router.get('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send({success, user});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({success, message: "Some internal error occurred"});   
    }
})


module.exports = router;
