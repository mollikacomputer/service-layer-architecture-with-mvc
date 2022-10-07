const Product = require("../models/Product");

exports.getProduct = async(req, res, next) =>{
    try {
        // show all name and quantity
        // mongoose vs mongodb
        const products = await Product.find({});
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
      // const product = new Product(req.body)
      // const result = await product.save()
      const result = await Product.create(req.body)

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