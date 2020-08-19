const express = require('express')
const app = express()
const hbs=require('hbs')
const path = require('path')
const fs = require('fs')

const {insert_itemInList, get_allItemList, update_itemInList, delete_itemInList, get_specificItemList, get_itemInfo, insert_itemType, get_allItemType, delete_itemType, save_thumbnails, get_savedThumbnails}=require('./database/itemCollection')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'));

app.get('/',(req,res)=>{
    console.log(' accessing admin page')
    let itemList,itemType,thumbId; 
    let thumbi=[]
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
            return get_allItemList()
        })
        .then(docs=>{
            itemList=docs
            return get_allItemType()
        })
        .then(type=>{
            itemType=type
        })


        
        let f= await Promise.all(promises)
        .then(result => {
            thumbi=result
            console.log("as : ",result )
        })
        res.render('adminPage',{itemList,itemType,thumbi})
    }
    findValues()
})

app.post('/addItem',(req,res)=>{
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


app.post('/updateItem',(req,res)=>{
    console.log('updating item from admin page')
    console.log(req.body)
    update_itemInList(req.body)
    .then(s=>{
        console.log('sc ',s)
        res.redirect('/admin')
    })
    
})

app.post('/deleteItem',(req,res)=>{
    console.log('deleting item from admin page')
    delete_itemInList(req.body.id)
    .then(s=>{
        res.send('item is deleted')
    })
})


app.post('/addType',(req,res)=>{
    console.log('add type',req.body)
    insert_itemType(req.body.type)
    .then(s=>{
        res.send('item type added')
    })
    
})


app.post('/deleteType',(req,res)=>{
    console.log('delete type',req.body)
    const {type}=req.body
    delete_itemType(type)
    .then(s=>{
        console.log("dfgh ",s)
        if(s)
            res.sendStatus(200)
        else res.sendStatus(201)
    })
})



app.post('/saveThumbnails',(req,res)=>{
    console.log('save thumbnails',req.body)
    const thumbId=req.body.ids.map(id=>{
        return id.substring(2)
    })
    save_thumbnails(thumbId)
    .then(s=>{
        if(s)
            res.send("saved")
        else res.send('failed to save thumbnails')     
    })
})



app.post('/deleteSelected',(req,res)=>{
    console.log('delete select ',req.body)
    let promises=[]
    const tOut = (t) => { 
        return new Promise((resolve, reject) => { 
            resolve(delete_itemInList(t)) 
        }) 
    }

    async function findValues(){
        let c = await req.body.selectedItems.map((id) => { 
            promises.push(tOut(id))  
        }) 

        let f= await Promise.all(promises)
        .then(result => {
            cartItems=result
            console.log("result of deletion : ",result)
        })
        res.sendStatus(200)
    }
    findValues()
})
module.exports=app