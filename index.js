const express = require('express')
const app = express()
const hbs=require('hbs')
const http = require('http') 
const path = require('path')

const {insert_itemInList, get_allItemList, update_itemInList, delete_itemInList, get_specificItemList, get_itemInfo, insert_itemType, get_allItemType, delete_itemType}=require('./database/itemCollection')

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
    res.sendFile(path.join(__dirname,'public/htmlPages/index.html'))
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/htmlPages/login.html'))
})


app.get('/admin',(req,res)=>{
    let itemList;
    get_allItemList()
    .then(docs=>{
        itemList=docs
        return get_allItemType()
    })
    .then(itemType=>{
        console.log('itemList ',itemList)
        console.log('itemType ',itemType)
        res.render('adminPage',{itemList,itemType})
    })
})

app.post('/admin/addItem',(req,res)=>{
    // let char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    // let length = 32
    // var result = '';
    // for (var i = length; i > 0; --i){
    //     result += chars[Math.round(Math.random() * (chars.length - 1))];
    // }
    // let item={...req.body,eventId:result }
    insert_itemInList(req.body)
    .then(s=>{
        console.log('sc ',s)
        res.redirect('/admin')
    })
    
})


app.post('/admin/updateItem',(req,res)=>{
    console.log(req.body)
    update_itemInList(req.body)
    .then(s=>{
        console.log('sc ',s)
        res.redirect('/admin')
    })
    
})

app.post('/admin/deleteItem',(req,res)=>{
    console.log('delete item',req.body)
    delete_itemInList(req.body.id)
    .then(s=>{
        res.send('item is deleted')
    })
})


app.post('/admin/addType',(req,res)=>{
    console.log('add item',req.body)
    insert_itemType(req.body.type)
    .then(s=>{
        res.send('item type added')
    })
    
})


app.post('/admin/deleteType',(req,res)=>{
    console.log('delete type',req.body)
    const {type}=req.body
    delete_itemType()
    .then(s=>{
        if(s)
            res.send(type+' type is deleted')
        else res.send('failed to deleted type as item with type already exists')     
    })
})

app.get('/item',(req,res)=>{
    console.log('accessing one item ')
    const {id}=req.query
    console.log('id of element ',id)
    //get all items
    get_itemInfo(id)
    .then(item=>{
        res.render('singleItem',{item})
    })
})


app.get('/itemsList',(req,res)=>{
    console.log('accessing item list ')
    const {type}=req.query
    console.log('type is ',type)
    if(type=='all'){
        //get all items
        get_allItemList()
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