const Product = require("../models/Product");

exports.getProductsService = async() =>{
    const products = await Product.find({});
    return products;
}

exports.createProductService = async(data) =>{
    // was wrong Product / product
    const product = await Product.create(data);
    return product;
}