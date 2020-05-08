const express = require('express')
const app = express()
const hbs=require('hbs')
const http = require('http') 
const path = require('path')
const cookieSession=require('cookie-session')
const passport=require('passport')
const keys=require('./keys')

const {get_allItemList,get_specificItemList, get_itemInfo,get_savedThumbnails}=require('./database/itemCollection')

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

    let thumbnails=[]
    const promises = []  // Empty array 
    

    const tOut = (t) => { 
        return new Promise((resolve, reject) => { 
            resolve(get_itemInfo(t)) 
        }) 
    }

    async function findValues(){
        let k= await get_savedThumbnails()
        .then(result=>{
            thumbId=result.thumbnails
            thumbId.map((id) => { 
                promises.push(tOut(id))  
            }) 
            return true
        })
        
        let f= await Promise.all(promises)
        .then(result => {
            console.log("result  ",result)
            thumbnails=result
        })
        res.render('index',{userId,thumbnails})
    }
    findValues()

})

app.get('/login',(req,res)=>{
    console.log(' accessing login page')
    let userId=null
    if(req.user){
        userId=req.user._id
    }
    res.render('login',{userId})
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
app.use('/admin',require('./adminIndex'))

var port =  process.env.PORT ||8000;
server.listen(port,()=>{console.log('listening at ',port)})