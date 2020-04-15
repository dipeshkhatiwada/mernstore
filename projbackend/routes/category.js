const express = require("express");
const router = express.Router();

const {
    getCategorybyId,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory
} = require("../controllers/category");
const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth");
const {
    getUserById
} = require("../controllers/user");

// PARAMS
router.param("userId", getUserById);
router.param("categoryId", getCategorybyId);


// ACTUAL ROUTES are here!!

router.post(
    "/category/create/:userId",
    isSignedIn, isAdmin, isAuthenticated,
    createCategory
);

router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)

router.put(
    "/category/:categoryId/:userId",
    isSignedIn, isAdmin, isAuthenticated,
    updateCategory
);

router.delete(
    "/category/:categoryId/:userId",
    isSignedIn, isAdmin, isAuthenticated,
    removeCategory
);


module.exports = router;