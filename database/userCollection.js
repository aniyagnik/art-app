const mongodb=require('mongodb')
const { MongoClient }=mongodb

//accessing database test 
const get_db=()=>{       
    const db=client.db('artAppDatabase')
    return new Promise(function(resolve, reject){
        resolve(db);
    });
}  

//check user in collection
const check_userLogin=(id)=>
    get_db()
    .then(db=>db.collection('userLoginCollection'))
    .catch(err=>{
        console.log('error in collection 1')
        return false    
    })
    .then(collection=>collection.findOne({sub:id}))
    .then(result=>{
        if(result===null){
            console.log('login checked, doesn"t exist in collection')
            return false}
        else{
            console.log('login checked, already exist in collection')
            return result
        }  
    })
    .catch(err=>{
        console.log('error in collection 2')
        return false   
    })

//insert user login    
const insert_userLogin=(userInfo)=>
    get_db()
    .then(db=>db.collection('userLoginCollection'))
    .catch(err=>{
        console.log('error in collection 1')
        return false    
    })
    .then(collection=>collection.insertOne(userInfo))
    .then(result=>{
        console.log('user is now saved in collection ',result.ops[0])
        if(result===null)
        {return false}
        else{return result.ops[0]}  
    })
    .catch(err=>{
        console.log('error in collection 2')
        return false   
    })


//get one login account requested by client through userId
const  get_userLogin =(id)=>
    get_db()
    .then(db=>db.collection('userLoginCollection'))
    .catch(err=>{
        console.log('error in collection to get userlogin')
    })
    .then(collection=>{
      //  console.log(collection)
        return collection.findOne({_id:mongodb.ObjectID(`${id}`)})
    })  
    .then(document=>{
      if(document==null){
        console.log('error in finding userlogin ')
        return null
      }  
      else{      
      //console.log('user matched while finding through userId')
            return document
      }
    })    


const edit_userPhoneNo=(userId,value)=>
    get_db()
    .then(db=>db.collection('userLoginCollection'))
    .catch(err=>{
        console.log('error in collection')
        res.send('error1')    
    })
    .then(collection=>{
        return collection.findOneAndUpdate(
            { sub:userId },
            {
            $set: { phoneNo: value },
            },
            {returnNewDocument: true}
        )
    })  
    .then(document=>{
        console.log('phone number changed : ',document.value)
        return document
    })
    .catch(err=>{
        console.log('error in finding the account')
        return err
    })
   

    
const edit_userAddress=(userId,value)=>
    get_db()
    .then(db=>db.collection('userLoginCollection'))
    .catch(err=>{
        console.log('error in collection')
        res.send('error1')    
    })
    .then(collection=>{
        return collection.findOneAndUpdate(
            { sub :userId },
            {
            $set: { address: value },
            
            }
        )
    })  
    .then(document=>{
        console.log("address changed : ",document.value)
        return document.value
    })
    .catch(err=>{
        console.log('error in finding the account')
        return err
    })
   

module.exports={
    check_userLogin,
    insert_userLogin,
    get_userLogin,
    edit_userPhoneNo,
    edit_userAddress
}