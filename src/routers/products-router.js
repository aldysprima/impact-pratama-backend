// Import Library
const routers = require("express").Router();
// Import Controller
const { products } = require("../controllers");
//Define Routes For Products
routers.get("/products", products.getProducts);
routers.get("/product/:productId", products.getProductById);
routers.post("/addproduct", products.addProduct);
//Export Module
module.exports = routers;
