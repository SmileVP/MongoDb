const dbName='b38wet'
const mongoDb=require('mongodb')
const dbUrl=`mongodb+srv://Vishnupriya:Vishnu12345@cluster0.x4j7bh9.mongodb.net/${dbName}`
const MongoClient=mongoDb.MongoClient
module.exports={dbName,mongoDb,dbUrl,MongoClient}