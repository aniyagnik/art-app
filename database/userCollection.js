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
        console.log('login exist ',result)
        if(result===null)
        {return false}
        else{return result}  
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
        console.log('user saved ',result.ops[0])
        if(result===null)
        {return false}
        else{return true}  
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
        console.log('user recieved ',document)
      if(document==null){
        console.log('error in finding userlogin ')
        return null
      }  
      else{      
      console.log('username matched')
            return document
      }
    })    
module.exports={
    check_userLogin,
    insert_userLogin,
    get_userLogin
}