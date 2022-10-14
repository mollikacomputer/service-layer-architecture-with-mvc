const { 
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService
} = require("../services/product.services")


exports.getProduct = async(req, res, next) =>{
    try {
        // show all name and quantity
        // mongoose vs mongodb
        const products = await getProductService()
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

      const result = await createProductService(req.body);

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


  // update product

  exports.updateProduct = async(req, res, next) => {
      try {
        const {id} = req.params;
        const result = await updateProductService(id, req.body);
        res.status(200).json({
          status: "success",
          message: "Successfully update the product"
        })
      } catch (error) {
        res.status(400).json({
          status:'fail',
          message:'could not update the product',
          error: error.message
        })
      }
  }

  // bulk update

  exports.bulkUpdateProduct = async(req, res, next) => {
    try {
      const result = await bulkUpdateProductService(req.body);
      res.status(200).json({
        status: "success",
        message: "Successfully update the product"
      })
    } catch (error) {
      res.status(400).json({
        status:'fail',
        message:'could not update the product',
        error: error.message
      })
    }
}