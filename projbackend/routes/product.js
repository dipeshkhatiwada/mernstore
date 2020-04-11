const express = require("express");
const router = express.Router();

const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    removeProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");
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
router.param("productId", getProductById);
// ACTUAL ROUTES are here!!
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get("/product/:productId", getProduct);
//  MIDDLEWARE
router.get("/product/photo/:productId", photo);

router.put(
    "/product/:productId/:userId",
    isSignedIn, isAdmin, isAuthenticated,
    updateProduct
);

router.delete(
    "/product/:productId/:userId",
    isSignedIn, isAdmin, isAuthenticated,
    removeProduct
);
// listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;