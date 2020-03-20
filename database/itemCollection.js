const { MongoClient }=require('mongodb')
//var mongoUrl=process.env.MONGOLAB_URI
var mongoUrl="mongodb://project:projectQ12@cluster0-shard-00-00-6zit8.mongodb.net:27017,cluster0-shard-00-01-6zit8.mongodb.net:27017,cluster0-shard-00-02-6zit8.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
client=new MongoClient(mongoUrl || 'mongodb://localhost:27017/project',{ useUnifiedTopology: true })
client.connect()

//accessing database test 
const get_db=()=>{       
        const db=client.db('artAppDatabase')
        return new Promise(function(resolve, reject){
            resolve(db);
        });
    }

    
//accessing collection to get all item list
const get_allItemList=(req_type)=>{
    return get_db()
    .then(db=>db.collection('itemList'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.find())
    .catch(err=>console.log('error in finding all documents'))
    .then(cursor=>cursor.toArray())
    .then(doc=>{
        console.log('all documents are ',doc)
        return doc
    })
    .catch(err=>console.log('error in fetching '))

}

    
//accessing collection to get specific item list
const get_specificItemList=(req_type)=>
    get_db()
    .then(db=>db.collection('itemList'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.aggregate(
        [ { $match : { type : req_type } } ]
    ))
    .catch(err=>console.log('error in finding '+type+ ' documents'))
    .then(cursor=>{
        console.log(cursor.toArray())
        return cursor              
    })
    .catch(err=>console.log('error in fetching '))




//get item show list
const get_itemShowList=()=>
    get_db()
    .then(db=>db.collection('showItems'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.find())
    .catch(err=>console.log('error in finding show list documents'))
    .then(cursor=>{
        console.log(cursor.toArray())
        return cursor              
    })
    .catch(err=>console.log('error in fetching '))

module.exports={
    get_allItemList,
    get_specificItemList,
    get_itemShowList
}
