const mongoose = require('mongoose')

if ( process.argv.length>5 ) {
   console.log('Format: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fs:${password}@fullstack.is65e.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)


const personSchema=new mongoose.Schema({
  name:String,
  number:String
})
const Person=mongoose.model('Person',personSchema)

if (process.argv.length===5){
  const person=new Person({
    name:process.argv[3],
    number:process.argv[4]
  })

  p1.save().then(
    result=>{
      console.log('success')
      mongoose.connection.close()
    }
  ).catch(()=>{console.log('error')})
}
else{
  Person.find({})
  .then(
    persons=>{
      console.log('phonebook:')
      persons.forEach(
        person=>{console.log(person)}
      )
      mongoose.connection.close()
    }
  )
}