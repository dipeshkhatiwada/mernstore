var express = require('express');
var router = express.Router();
const { check, validationResult} = require('express-validator');
const {signout,signup}= require("../controllers/auth");

router.post(
    "/signup",
    [
        check("name","Name must be of 3 at leastchatarater").isLength({ min: 3 }),
        check("email","Email is required").isEmail(),
        check("password","Password must be of 3 at leastchatarater").isLength({min:3}),
    ],
signup
);
router.get("/signout",signout)

module.exports = router;