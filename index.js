const express = require('express')
const app = express()
const hbs=require('hbs')
const http = require('http') 
const path = require('path')
const cookieSession=require('cookie-session')
const passport=require('passport')
const keys=require('./keys')

const {insert_itemInList, get_allItemList, update_itemInList, delete_itemInList, get_specificItemList, get_itemInfo, insert_itemType, get_allItemType, delete_itemType}=require('./database/itemCollection')

var server = http.createServer(app);

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'));

app.use('/',express.static(path.join(__dirname,'public')))
app.use('/pictures',express.static(path.join(__dirname,'public/pictures')))
app.use('/database',express.static(path.join(__dirname,'database')))

app.use(function (req,res,next){
    console.log('handling request : ',req.url+" with method "+req.method);
    next();
})

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys: [keys.session.cookieKey],
  })
)

app.use(passport.initialize())   //tells express app to use/initialize passport
app.use(passport.session())     //tells express to user sessions with passport

app.get('/',(req,res)=>{
    console.log('accessing home page')
    let userId=null
    if(req.user){
        userId=req.user._id
        console.log('user id is ',userId)
    }
    res.render('index',{userId})
})

app.get('/login',(req,res)=>{
    console.log(' accessing login page')
    let userId=null
    if(req.user){
        userId=req.user._id
    }
    res.render('login',{userId})
})

app.get('/admin',(req,res)=>{
    console.log(' accessing admin page')
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
    console.log('adding item from admin page')
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
    console.log('updating item from admin page')
    console.log(req.body)
    update_itemInList(req.body)
    .then(s=>{
        console.log('sc ',s)
        res.redirect('/admin')
    })
    
})

app.post('/admin/deleteItem',(req,res)=>{
    console.log('deleting item from admin page')
    delete_itemInList(req.body.id)
    .then(s=>{
        res.send('item is deleted')
    })
})


app.post('/admin/addType',(req,res)=>{
    console.log('add type',req.body)
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
    let userId=null,status=null
    if(req.user){
        userId=req.user._id
        status=req.user.cart.includes(id)
    }
    console.log('id of element ',id)
    //get all items
    get_itemInfo(id)
    .then(item=>{
        res.render('singleItem',{item,userId,status})
    })
})


app.get('/itemsList',(req,res)=>{
    console.log('accessing item list ')
    const {type}=req.query
    let userId=null
    if(req.user){
        userId=req.user._id
    }
    console.log('type is ',type)
    if(type=='all'){
        //get all items
        get_allItemList()
        .then(itemList=>{
            res.render('itemsList',{itemList, userId})
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


app.use('/auth',require('./passport'))
app.use('/user',require('./dashboard'))

var port =  process.env.PORT ||8080;
server.listen(port,()=>{console.log('listening at ',port)})