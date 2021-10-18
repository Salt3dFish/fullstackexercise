const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')

const url=process.env.MONGODB_URI

console.log('connecting...')

mongoose.connect(url).then(
    result=>{console.log('Connected!')}
).catch(
    error=>{console.log('error:',error.message)}
)

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        unique:true
    },
    number:{
        type:String,
        minlength:8
    }
})

personSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('person',personSchema)