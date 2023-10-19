const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const exp = require('constants')
const app=express()

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT||8080

//schema

const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{
    timestamps:true
})

//create a user model

const userModel=mongoose.model("user",schemaData)


mongoose.connect("mongodb://localhost:27017/crudoperation")

.then(()=>console.log("connect to DB"))
.catch(()=>console.log(error))


// read
app.get('/',async(req,res)=>{
    const data=await userModel.find({})
    res.json({success:true,data:data})
})

 

// create data// save data in mongodb

app.post('/create',async(req,res)=>{


    console.log(req.body)

    const data=new userModel(req.body)
    await data.save()
    res.send({success:true, message:'data save successfully',data:data})
})


// update data

app.put('/update',async(req,res)=>{

    console.log(req.body)

    const {_id,...rest}=req.body
    console.log(rest)
   const data= await userModel.updateOne({_id:_id},rest)
    
    res.send({success:true,message:'data update successfully',data:data})
})

//delete

app.delete('/delete/:id',async(req,res)=>{


const id=req.params.id
console.log(id)
const data=await userModel.deleteOne({_id:id})

res.send({success:true,message:'data delete successfully',data:data})
})


app.listen(PORT,()=>console.log("server is running"))