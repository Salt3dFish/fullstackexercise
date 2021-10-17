const mongoose=require('mongoose')

const url=process.env.MONGODB_URI

console.log('connecting...')

mongoose.connect(url).then(
    result=>{console.log('Connected!')}
).catch(
    error=>{console.log('error:',error.message)}
)

const personSchema=new mongoose.Schema({
    name:String,
    number:String
})

personSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('person',personSchema)