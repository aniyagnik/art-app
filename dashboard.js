const express = require('express')
const app = express()
const hbs=require('hbs')
const path = require('path')

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


module.exports=app