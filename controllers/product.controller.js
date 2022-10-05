const Product = require("../models/Product");

exports.getProducts = async(req, res, next) =>{
    try {
        const products = await Product.findById("63320832bb5aa4d6e45b1716");
        res.status(200).json({
            status:"success",
            data:products
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get Data",
            error:error.message,
        })
    }
  }

  exports.createProduct = async(req, res, next)=>{
    // console.log(req.body);
    try{
      const product = new Product(req.body)
      const result = await product.save()
    // logger call here
        result.logger()

      res.status(200).json({
        status:'success',
        message:'Data inserted successfully',
        data:result
      })
    }catch(error){
      res.status(400).json({
        status:'fail',
        message:'Data is not inserted',
        error: error.message
      })
    }
    
    // res.send('successfully data post')
  }