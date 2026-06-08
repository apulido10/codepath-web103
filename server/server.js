import express from 'express';
import keyboarRouter from './route/route.js'
import keyboards from './keyboards.js';
const app = express();

app.use(express.static('public'))
app.use('/keyboard',keyboarRouter)

app.listen(3000,()=>{
  console.log("I did it")
})