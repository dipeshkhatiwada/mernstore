const express = require("express");
const router = express.Router();

const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require("../controllers/order");
const {
    updateStock
} = require("../controllers/product");
const {
    isSignedIn,
    isAdmin,
    isAuthenticated,
} = require("../controllers/auth");
const {
    getUserById,
    pushOrderInPurchaseList,
} = require("../controllers/user");

// PARAMS
router.param("userId", getUserById)
router.param("orderId", getOrderById)

// ACUTAL ROUTS
router.post(
    "/order/create/:userId",
    isSignedIn, isAuthenticated,
    pushOrderInPurchaseList, updateStock,
    createOrder
);

router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

// STATUS ROUTE
router.get(
    "/order/status/:userId",
    isSignedIn, isAuthenticated, isAdmin,
    getOrderStatus
);
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn, isAuthenticated, isAdmin,
    updateStatus
);

module.exports = router;