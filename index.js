const express = require('express')
const app = express()
const hbs=require('hbs')
const http = require('http') 
const path = require('path') 

const {get_allItemList,get_specificItemList,get_itemShowList}=require('./database/itemCollection')

var server = http.createServer(app);

app.use(express.urlencoded({extended: true}))
app.use(express.json())
hbs.registerPartials(path.join(__dirname,'/partials'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'));

app.use('/',express.static(path.join(__dirname,'public')))
app.use('/pictures',express.static(path.join(__dirname,'public/pictures')))
app.use('/item',express.static(path.join(__dirname,'public/oneItem')))
app.use('/itemsList',express.static(path.join(__dirname,'public/itemList')))
app.use('/database',express.static(path.join(__dirname,'database')))

app.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/mainPage/index.html'))
})


app.get('/itemsList',(req,res)=>{
    console.log('accessing item list ',req.query)
    const {type}=req.query
    console.log('type is ',type)
    if(type=='all'){
        //get all items
        get_allItemList(type)
        .then(itemList=>{
            res.render('itemsList',{itemList})
        })
    }
    else{
        //get specific items
        get_specificItemList(type)
        .then(doc=>{
            console.log('specific item list ' + type+' : ',doc)
            return doc
        })
    }
})


var port =  process.env.PORT ||8080;
server.listen(port,()=>{console.log('listening at ',port)})