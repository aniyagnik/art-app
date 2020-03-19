const express = require('express')
const app = express()
const http = require('http') 
const path = require('path') 

var server = http.createServer(app);

app.use(express.urlencoded({extended: true}))
app.use('/',express.static(path.join(__dirname,'public')))

app.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})

app.get('/itemsList',(req,res)=>{
    console.log('sdf')
    res.sendFile(path.join(__dirname,'public/itemList.html'))
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})

var port =  process.env.PORT ||8080;
server.listen(port,()=>{console.log('listening at ',port)})