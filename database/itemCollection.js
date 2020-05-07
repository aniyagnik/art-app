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
    .then(db=>db.collection('itemListCollection'))
    .catch(err=>console.log('error in accessing in collection list ',err))
    .then(collection=>collection.insertOne(obj))
    .then(ha=>{console.log('doc added :',ha.ops[0]);return true})
    .catch(err=>console.log('error in saving in collection itemList ',err))

//accessing collection to get all item list
const get_allItemList=()=>{
    return get_db()
    .then(db=>db.collection('itemListCollection'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.find())
    .catch(err=>console.log('error in finding all documents'))
    .then(cursor=>cursor.toArray())
    .catch(err=>console.log('error in fetching '))

}


//update document from collection 
const update_itemInList=(obj)=>
    get_db()
    .then(db=>db.collection('itemListCollection'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.update(
        {_id:mongodb.ObjectID(`${obj.Uid}`)},
        {   $set:{    
                name:obj.Uname,
                summary:obj.Usummary,
                type:obj.Utype,
                price:obj.Uprice,
                image:obj.Uimage,
                status:obj.Ustatus
            }
        },
        {upsert:true}
    ))
    .catch(err=>console.log('error in finding types documents'))
    .then(cursor=>{
        return cursor.toArray()              
    })
    .catch(err=>console.log('error in fetching '))    
    
//delete item in list
const delete_itemInList=(id)=>
    get_db()
    .then(db=>db.collection('itemListCollection'))
    .catch(err=>console.log('error in accessing in collection list ',err))
    .then(collection=>collection.deleteOne({ "_id" : mongodb.ObjectId(`${id}`) }))
    .then(ha=>{console.log('doc deleted :',ha.result);return true})
    .catch(err=>console.log('error in deleting in collection itemList ',err))
    
//accessing collection to get specific item list
const get_specificItemList=(req_type)=>
    get_db()
    .then(db=>db.collection('itemListCollection'))
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

const get_itemInfo=(id)=>
    get_db()
    .then(db=>db.collection('itemListCollection'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.findOne({
        _id:mongodb.ObjectID(`${id}`)
    }))
    .catch(err=>console.log('error in finding req document'))
    .then(doc=>{
        console.log('document recived get_itemInfo')
        return doc
    })
    .catch(err=>console.log('error in fetching '))
    
//insert item type
const insert_itemType=(type)=>
    get_db()
    .then(db=>db.collection('itemTypeCollection'))
    .catch(err=>console.log('error in accessing in item types ',err))
    .then(collection=>collection.insertOne({type:type}))
    .then(ha=>{console.log('type added :',ha.ops[0]);return true})
    .catch(err=>console.log('error in saving in collection itemType ',err))


   
//accessing collection to get specific item list
const get_allItemType=()=>
    get_db()
    .then(db=>db.collection('itemTypeCollection'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.find())
    .catch(err=>console.log('error in finding types documents'))
    .then(cursor=>{
        return cursor.toArray()              
    })
    .catch(err=>console.log('error in fetching '))


//delete item Type
async function delete_itemType (type){
    let v = await  get_db()
            .then(db=>db.collection('itemListCollection'))
            .catch(err=>console.log('error in collection itemList'))
            .then(collection=>collection.findOne({ type:type}))
            .catch(err=>console.log('error in finding item list documents'))
            .then(cursor=>{
                if(cursor==null){
                    return false
                }
                else{
                    return true
                }
            })
            .catch(err=>console.log('error in fetching '))
    if(v){        
        let k = await get_db()
        .then(db=>db.collection('itemTypeCollection'))
        .catch(err=>console.log('error in accessing in collection list ',err))
        .then(collection=>collection.deleteOne({type:type }))
        .then(ha=>{console.log('doc deleted :',ha.result);return true})
        .catch(err=>console.log('error in deleting in collection itemList ',err))

    }
    else{return false}
}


const save_thumbnails=(obj)=>
    get_db()
    .then(db=>db.collection('itemThumbnailsCollection'))
    .catch(err=>console.log('error in accessing in collection list ',err))
    .then(collection=>collection.insertOne(obj))
    .then(ha=>{console.log('thumbnails added :',ha.ops[0]);return true})
    .catch(err=>console.log('error in saving in collection itemThumbnailCollection ',err))

const get_savedThumbnails=()=>
    get_db()
    .then(db=>db.collection('itemThumbnailsCollection'))
    .catch(err=>console.log('error in collection itemList'))
    .then(collection=>collection.findOne({ id:"456"}))
    .catch(err=>console.log('error in finding item list documents'))
    .then(cursor=>{
        console.log('document recived get_savedThumbnails ',cursor)
        return cursor
    })
    .catch(err=>console.log('error in fetching '))

module.exports={
    insert_itemInList,
    get_allItemList,
    update_itemInList,
    delete_itemInList,
    get_specificItemList,
    get_itemInfo,
    insert_itemType,
    get_allItemType,
    delete_itemType,
    save_thumbnails,
    get_savedThumbnails
}
