var mongoose=require('mongoose')

const incomeschema=new mongoose.Schema({
    userid:{

    },
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    incdate:{
        type:String,
        required:true
    }
})
const income=mongoose.model('income',incomeschema)

module.exports=income