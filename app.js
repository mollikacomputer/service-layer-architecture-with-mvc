const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const port = process.env.PORT || 5000;
// const colors = require('colors');

// middleware
app.use(express.json());
app.use(cors());

// schema desigh
const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Provide a name for this product"],
        trim: true, // first and last unnacessary space
        unique:[true, "Name must be unique"],
        minLength:[3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"]
    },
    description:{
        type:String,
        required:[true, "Please provide a name for this product"]
    },
    price:{
        type: Number,
        required:true,
        min:[0, "Price can't be negative"]
    },
    unit:{
        type: String,
        required:true,
        enum:{
            values:["kg", "liter","pcs"],
            message:"unit value can't be {VALUE}, MUSTBE kg/liters/pcs"
        }
    },
    quantity:{
        type: Number,
        required: true,
        min: [0, "quantity can not be negative"],
        validate:{
            validator: (value) =>{
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true
                }else{
                    return false
                }
            }
        },
        message:"Quantity must be an integer"
    },
// have some problem status section
    status:{
            type: String,
            required:true,
            enum:{
                values: ['in-stock', "out-of-stock", "discontinued"],
                message:"Status can't be {VALUE}"
        }
    },
    // have some problem categories
    // categories have some problem i do not find out
    // categories:[{
    //     name:{
    //         type:String,
    //         required:true
    //     },
    //     _id:mongoose.Schema.Types.ObjectId
    // }]

//     categories:[{
//         name:{
//             type: String,
//             required:true
//         },
//         _id: mongoose.Schema.Types.ObjectId,
//     }],
//     supplier:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"Supplier or user collection"
//     }
// },
// {
    // timestamps:true,
}
);
// mongoose middlewares for saving data: pre/post
productSchema.pre('save', function(next){
    console.log('Before saving data');

    // this keyword
    if(this.quantity == 0){
        this.status = 'out-of-stock'
    }

    next()
});

// mongoose middleware post
productSchema.post('save', function(doc, next){
    console.log('After saving data');

    next()
});

productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}, price is: ${this.price}`);
}
// schema patern
// SCHEMA --> MODEL --> QUERY
// model name first letter must be will Capital letter
const Product = mongoose.model('Product', productSchema);


// app.post('/api/v1/product', async(req, res, next) =>{
//     // res.send('it is working');
//     // console.log(req.body);
//     try {
//         const product = new Product(req.body);

//    const result = await product.save();
//    res.status(200).json({
//     status:'success',
//     message:'Data inserted successfully',
//     data:result
//    })
//     } catch (error) {
//      res.status(400).json({
//         status:'fail',
//         message:'Data is not inserted',
//         error:error.message
//      })   
//     }
    
// });

app.get('/', (req, res) =>{
    res.send('schema design App is running')
});

// for test post
app.post("/api/v1/product", async(req, res, next)=>{
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
  });

  app.get("/api/v1/product", async(req, res, next) =>{
    try {
        // get all data
        // const products = await Product.find({})
        // get single data
        // const products = await Product.find({_id:"633727b3ea2dfa148e5c7bd7"})
        // const products = await Product.find({
        //     status:{
        //         $ne:"out-of-stok"
        //     }
        //     use in operator
        //     name:{
        //         $in:["Mobile3", "Mobile"]
        //     }
        // })
        // show all name and quantity
        // const products = await Product.find({}, "name quantity");
        // without name and quantity show all data
        // const products = await Product.find({}, "-name -quantity");
        // const products = await Product.find({}).limit(1);
        // const products = await Product.find({}).sort({quantity:-1});
        // const products = await Product.find({}).select({name:1});
        // mongoose vs mongodb
        // const products = await Product
        // .where("name").equals(/\w/)
        // .where("quantity").gt(-1).lt(6)
        // .limit(2).sort({quantity:-1})
        
        // mongoose vs mongodb
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

  })

module.exports = app;