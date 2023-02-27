var express = require('express');
var router = express.Router();
const {dbName,mongoDb,dbUrl,MongoClient}=require("../config/dbConfig")

let users = [
  {
    name: "Vishnu",
    email: "vishnu@gmail.com",
    batch: "B38wet",
  },
  {
    name: "Ajeeth",
    email: "ajee@gmail.com",
    batch: "B40wet",
  },
  {
    name: "All",
    email: "all@gmail.com",
    batch: "B36wet",
  },
];



router.get("/", async(req, res) => {
  const client=new MongoClient(dbUrl)
  client.connect()
  try{
    let db=await client.db(dbName)
    let user=await db.collection('users').find().sort({name:1}).toArray()
    res.send({
    message:"Data received successfully",
    user
    
    });
  }catch(err){
console.log(err);
res.send({
  message:"Internal server error",
  err
})
  }finally{
client.close()
  }
 
});

router.get("/:id", async(req, res) => {
  const client=new MongoClient(dbUrl)
  client.connect()
  try{
    let db=await client.db(dbName)
    let user=await db.collection('users').findOne({_id:new mongoDb.ObjectId(req.params.id)})
    res.send({
      user
    })
  }catch(err){
console.log(err);
res.send({
  message:"Internal server error"
})
  }finally{
client.close();
  }
 
  
});

router.post("/",async(req, res) => {
  const client=new MongoClient(dbUrl)
  client.connect();
  try{
    let db=await client.db(dbName)
    let users=await db.collection("users").findOne({email:req.body.email})
    if(!users){
      let user=await db.collection("users").insertOne(req.body)
      res.send({
        message:"data added successfully",
        user
      })
    }else{
      res.status(400).send({
        message:"Email Id already exists!!!"
      })
    }
   
  }catch(err){
    console.log(err);
    res.send({
      message:"Internal server error",
      err
    })
  }finally{
    client.close();
  }
  
});

router.put("/:id", async(req, res) => {
 const client=new MongoClient(dbUrl)
 client.connect()
 try{
   let db=await client.db(dbName);
   let user=await db.collection('users').updateOne({_id:new mongoDb.ObjectId(req.params.id)},{$set:req.body})
   res.status(200).send({
    message:"User updated successfully",
    user
   })
 }catch(err){
  console.log(err);
  res.status(500).send({
    message:"Internal server error",
    err
  })
 }finally{
  client.close()
 }
  
});

router.delete("/:id",async(req, res) => {
  const client=new MongoClient(dbUrl)
  client.connect()
  try{
   let db=await client.db(dbName)
   let user=await db.collection('users').deleteOne({_id:new mongoDb.ObjectId(req.params.id)})
   res.status(200).send({
    message:"User deleted successfully",
    user
   })
  }catch(err){
    console.log(err);
    res.status(500).send({
      message:"Internal server error",
      err
    })
  }finally{
    client.close()
  }
});


module.exports = router;
