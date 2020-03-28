const express = require('express')
const app = express()
const hbs=require('hbs')
const path = require('path')
const {add_itemToUserCart, delete_itemFromUserCart}=require('./database/userCartCollection')
const checkAuth=(req,res,next)=>{
    if(!req.user){
        //user not logged in
        res.redirect('/login')
    }
    else{
        //user logged in
        next()
    }
}


app.use(express.urlencoded({extended: true}))
app.use(express.json())
hbs.registerPartials(path.join(__dirname,'/partials'))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'));

app.get('/dashboard',checkAuth,(req,res)=>{
    console.log(' accessing dashboard page')
    res.render('dashboard',{user: req.user})
})

app.get('/logout',checkAuth,(req,res)=>{
    console.log('logging out user')
    req.logout()
    res.redirect('/')
})


app.post('/addToCart',checkAuth,(req,res)=>{
    console.log('adding to cart ',req.body)
    add_itemToUserCart(req.body.itemId,req.body.userId)
    .then(as=>{
        console.log('added item to cart')
    })
    res.send('added to cart')
})


app.post('/deleteFromCart',checkAuth,(req,res)=>{
    console.log('deleting from cart ',req.body)
    delete_itemFromUserCart(req.body.itemId,req.body.userId)
    .then(as=>{
        console.log('deleted item from cart')
    })
    res.send('deleted from cart')
})


app.post('/buyNow',checkAuth,(req,res)=>{
    console.log('buy items ',req.body)
    res.send('item bought')
})

module.exports=app