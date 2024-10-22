const express = require("express");
const app = express();
const port = 3000


app.get('/',(req,resp)=>{
    resp.json("Hello desde el server")
})

app.listen(port,()=>{
    console.log(`Puerto siendo escuchado en ${port}`)
})