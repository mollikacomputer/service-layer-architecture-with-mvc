const mongoose = require('mongoose');
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
    // // have some problem status section
    // status:{
    //     type: String,
    //     required:true,
    //     enum:{
    //         values: ['in-stock', "out-of-stock", "discontinued"],
    //         message:"Status can't be {VALUE}"
    //         }
    //     },
}
);
// mongoose middlewares for saving data: pre/post
productSchema.pre('create', function(next){
    console.log('Before saving data');

    // this keyword
    if(this.quantity == 0){
        this.status = 'out-of-stock'
    }

    next()
});

// mongoose middleware post
productSchema.post('create', function(doc, next){
    console.log('After posting data');

    next()
});

productSchema.methods.logger = function(){
    console.log(`Data posting for ${this.name}, price is: ${this.price}`);
}
// schema patern
// SCHEMA --> MODEL --> QUERY
// model name first letter must be will Capital letter
const Product = mongoose.model('Product', productSchema);

module.exports = Product;