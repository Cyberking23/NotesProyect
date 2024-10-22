const express = require("express");
const app = express();
const port = 3000

app.get('/',(req,res)=>{
    res.json("Hola desde el servidor")
})


app.listen(port,()=>{
    console.log(`Puerto Siendo Escuchado en ${port}`)
})