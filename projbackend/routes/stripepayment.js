const express = require("express");
const router = express.Router();
const {
    makeStripePayment
} = require("../controllers/stripepayment");

//  ROUETS
router.post("/stripe/payment",makeStripePayment);

module.exports = router;