import express from "express"
import { config } from "dotenv"
import { modelsInitial } from "./config/models.initial.js"
//------------------------------------------


const app = express()
config()
//------------------------------------------


app.use(express.json())
app.use(express.urlencoded({extended:true}))
//------------------------------------------







//------------------------------------------
app.use((req , res , next)=>{
    return res.status(404).json({
        message : "route not found"
    })
})

app.use((err, req , res , next)=>{
    const status = err?.status ?? 500
    const message = err?.message ?? "internal server error"
    return res.status(status).json({
        message : message
    })
})

app.listen(3001,async()=>{
    try{
        await modelsInitial()
        console.log("server running http://localhost:3001");
    }catch(err){
        console.log(err);
    }  
})
