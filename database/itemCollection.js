const mongodb=require('mongodb')
const { MongoClient }=mongodb
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
//insert item in list
const insert_itemInList=(obj)=>
    get_db()
    .then(db=>db.collection('itemList'))
    .catch(err=>console.log('error in accessing in collection list ',err))
    .then(collection=>collection.insertOne(obj))
    .then(ha=>{console.log('doc added :',ha.ops[0]);return true})
    .catch(err=>console.log('error in saving in collection itemList ',err))

//accessing collection to get all item list
const get_allItemList=(req_type)=>{
    return get_db()
    .then(db=>db.collection('itemList'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.find())
    .catch(err=>console.log('error in finding all documents'))
    .then(cursor=>cursor.toArray())
    .catch(err=>console.log('error in fetching '))

}

//delete item in list
const delete_itemInList=(id)=>
    get_db()
    .then(db=>db.collection('itemList'))
    .catch(err=>console.log('error in accessing in collection list ',err))
    .then(collection=>collection.deleteOne({ "_id" : mongodb.ObjectId(`${id}`) }))
    .then(ha=>{console.log('doc deleted :',ha.result);return true})
    .catch(err=>console.log('error in deleting in collection itemList ',err))
    
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
    .then(cursor=>cursor.toArray())
    .catch(err=>console.log('error in fetching '))


const get_itemInfo=(id)=>
    get_db()
    .then(db=>db.collection('itemList'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.findOne({itemId:id}))
    .catch(err=>console.log('error in finding req document'))
    .then(doc=>{
        console.log('document recieved is ',doc)
        return doc
    })
    .catch(err=>console.log('error in fetching '))
    
module.exports={
    insert_itemInList,
    get_allItemList,
    delete_itemInList,
    get_specificItemList,
    get_itemShowList,
    get_itemInfo
}
