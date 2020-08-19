const express = require('express')
const app = express()
const hbs=require('hbs')
const path = require('path')
const paypal = require('paypal-rest-sdk');


const {add_itemToUserCart, delete_itemFromUserCart}=require('./database/userCartCollection')
const {edit_userPhoneNo, edit_userAddress}=require('./database/userCollection')
const {get_itemInfo}=require('./database/itemCollection')

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AQZQB8xhuJwsAKnudvLa9DuhqIBP0axwA-W7dwBv6f0WILOPpuEExrVgaEp8p1uzfJy0EhohUKreP-pn',
  'client_secret': 'EPsXFUjkiOZ1Zc3_bJw_S0M3Z8BXf1i_86COPvJ_-jYU_OZVIUggzO7BkqmVEwPfmtxgRYfW82KPDuQF'
});


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
    console.log("re.user is  ",req.user)
    
    let cartItems=[]
    const promises = []  // Empty array 
    

    const tOut = (t) => { 
        return new Promise((resolve, reject) => { 
            resolve(get_itemInfo(t)) 
        }) 
    }

    async function findValues(){
        let c = await req.user.cart.map((id) => { 
                promises.push(tOut(id))  
            }) 
        
        let f= await Promise.all(promises)
        .then(result => {
            cartItems=result
            console.log("cart items : ",cartItems)
        })
        res.render('dashboard',{user: req.user,cartItems})
    }
    findValues()



    
})

app.post('/dashboard/editUserPhoneNo',checkAuth,(req,res)=>{
    console.log('edit phone number of user ',req.body)
    edit_userPhoneNo(req.user.sub,req.body.number)
    .then(as=>{
        console.log('phone number updated...')
    })
    res.sendStatus(200);
})


app.post('/dashboard/editUserAddress',checkAuth,(req,res)=>{
    console.log('edit Address of user ',req.body)
    edit_userAddress(req.user.sub,req.body.address)
    .then(as=>{
        console.log('address updated...')
    })
    res.sendStatus(200);
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
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": `${req.body.name}`,
                    "sku": "001",
                    "price": `${req.body.price}`,
                    "currency": "INR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "INR",
                "total": `${req.body.price}`
            },
            "description": `${req.body.summary}`
        }]
        };
        
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
                }
            }
        }
    });
})


app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "INR",
              "total": "100"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
    });
});
  

app.get('/cancel', (req, res) => {
    res.send('Cancelled')
});

module.exports=app