// Import Library
const routers = require("express").Router();
// Import Controller
const { products } = require("../controllers");
//Define Routes For Products
routers.get("/products", products.getProducts);
routers.get("/product/:productId", products.getProductById);
routers.post("/addproduct", products.addProduct);
routers.delete("/deleteproduct/:productId", products.deleteProduct);
routers.patch("/updateproduct/:productId", products.updateProduct);
//Export Module
module.exports = routers;
