const { getProductsService, createProductService } = require("../services/product.services")

exports.getProducts = async(req, res, next) =>{
    try {
        const products = getProductsService();

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
      // save or create
      const result = await createProductService(req.body)
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