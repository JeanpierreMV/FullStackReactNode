import express, { json } from 'express'
import router from './routes/index.mjs';
import {corsMiddaleaware } from '../middlewares/cors.mjs'



const app= express()

app.use(json())
app.disable('x-powered-by')
app.use(corsMiddaleaware())

app.use('/KoalaVet', router)



const PORT = process.env.PORT?? 1234

app.listen(PORT, ()=>{
    console.log(`server listening on PORT http://localhost:${PORT}`)
})
