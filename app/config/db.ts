//importing modules
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

  //details from the env
const dbName = 'typescriptData2base'

//connection string to mongo atlas

const connectionString = "mongodb+srv://samantaanuva1:PytjvKlPJUVBhanH@cluster0.pgq4txz.mongodb.net/typescriptBlog"


//db connection
export const db = mongoose.connect(connectionString)
.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${dbName}`)
    }
    
}).catch(err => {
    console.log(err)
})
