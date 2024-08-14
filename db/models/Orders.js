import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderNumber:{
        type:String,
        required:true,
        unique:true
    },
    paperName:{
        type:String,
        required:true,
    },
    paperLink:{
        type:String,
        required:true,
        unique:true 
    },
    paperDoi:{
        type:String,
        required:true,
        unique:true 
    },
    orderedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
    },
    orderedAt:{
        type:Date,
        default: Date.now
    },
    orderStatus:{
        type:String,
        required:true,
        default:"In Progress"
    },
    numofCitation:{
        type:Number,
        required:true, 
    },
    amount:{
        type:Number,
        required:true, 
    },
    transactionStatus:{
        type:String,
        default:"Initiated",
    }
})


const Order = mongoose.model('Order', orderSchema);

export { Order };