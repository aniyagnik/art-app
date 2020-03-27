const mongodb=require('mongodb')
const { MongoClient }=mongodb

//accessing database test 
const get_db=()=>{       
    const db=client.db('artAppDatabase')
    return new Promise(function(resolve, reject){
        resolve(db);
    });
}  

const add_itemToUserCart=(itemId,userId)=>
    get_db()
        .then(db=>db.collection('userLoginCollection'))
        .catch(err=>console.log('error in collection itemList'))
        .then(collection=>collection.updateOne(
            { _id:mongodb.ObjectID(`${userId}`) },
            { '$addToSet':{ cart:itemId } },
            { upsert : true }
        ))
        .catch(err=>console.log('error in finding types documents'))
        .then(result=>{
            console.log('item addes to user cart ',result.result)
            return true
        })
        .catch(err=>console.log('error in fetching '))

const delete_itemFromUserCart=(itemId,userId)=>
    get_db()
        .then(db=>db.collection('userLoginCollection'))
        .catch(err=>console.log('error in collection itemList'))
        .then(collection=>collection.updateOne(
            { _id:mongodb.ObjectID(`${userId}`) },
            { '$pull':{ cart:itemId } }
        ))
        .catch(err=>console.log('error in finding types documents'))
        .then(result=>{
            console.log('item deleted from user cart ',result.result)
            return true
        })
        .catch(err=>console.log('error in fetching '))

module.exports={
    add_itemToUserCart,
    delete_itemFromUserCart
}