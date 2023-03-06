import  express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()
const app=express()

app.get('/',(req,res)=>{
    res.send('APi is running....')
})

app.get('/api/products',(req,res)=>{
    res.json(products) //convert into json content 
})

app.get('/api/products/:id',(req,res)=>{
    const product=products.find((p)=>p._id===req.params.id)
    res.json(product) //convert into json content 
})
const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))