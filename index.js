//Express
var  express= require('express');
var app=express();
//Middleware and Server Files
var server = require('./server.js');
var Middleware = require('./middleware.js');
//MongoDB
const Mongo=require('mongodb').MongoClient;
const url="mongodb://127.0.0.1/27017";
const yoyo='hospitalManagement';

//Bodyparser
const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//To Fetch hospitals by name, returns all hospitals if no name is mentioned.
app.get('/hospitals',Middleware.checkToken,function(req,res)
{
    Mongo.connect(url,{ useUnifiedTopology: true },function(err,datab){
        if(!err)
        {
            const database =datab.db(yoyo);
            const hcollection = database.collection('hospitalDetails');
            var hname=req.body.name;
            var b;
            if(hname===undefined)
            {
                b={};
            } 
            else
            {
              b={'name':new RegExp(hname, 'i')} 
            }
              hcollection.find(b).toArray(function(err,result){
            if(!err)
            {
                res.send(result);
                console.log("Hospital Details obtained.");
            }
        });
        }
    })
});
//To Fetch Ventilator details, when status or hosp name is given. If none is given, All the ventilator details will be given.
app.get('/ventilators',Middleware.checkToken, function(req,res)
{
    Mongo.connect(url, {useUnifiedTopology: true},function(err,datab)
    {
        var sta =req.body.status;
        var name = req.body.hname;
        var que;
    const database=datab.db(yoyo);
    const collection=database.collection('VentilatorDetails');
        if(sta!==undefined && name==undefined)
        {
            que={'status':new RegExp(sta,'i')}
        }
        else if(name!=undefined && sta==undefined)
        {
            que={'hname':new RegExp(name,'i')}
        } 
        else{
            que={};
        }
        collection.find(que).toArray(function(err,result){ 
              if(!err){
                  res.send(result);
                  console.log("Ventilator details obtained.");
              }
          });
        });
});
//Update Ventilators' status
app.patch('/ventilators',Middleware.checkToken,function(req,res)
{
    Mongo.connect(url,{useUnifiedTopology: true},function(err,patchingdata)
    { 
        if(err){console.log("error");}
        else
        { 
            var vid= req.body.ventilatorId;
            var s = req.body.status;
            const database = patchingdata.db(yoyo);
            const collection = database.collection('VentilatorDetails');
            collection.updateOne({ventilatorId:vid},{$set:{status:s}});
            res.send("Status updated successfully.");
        }
    });
});
//DELETE a Ventilator by the given id
app.delete('/ventilators',Middleware.checkToken,function(req,res)
{
    Mongo.connect(url,{useUnifiedTopology: true},function(err,patchingdata)
    { 
        if(err){console.log("error");}
        else
        { 
            var vid= req.query.ventilatorId;
            const database = patchingdata.db(yoyo);
            const collection = database.collection('VentilatorDetails');
            collection.deleteOne({ventilatorId:vid});
            res.send("Deleted Succesfully.")
        }
    });
});
//Adds a new ventilator
app.post('/ventilators', Middleware.checkToken,function(req,res)
{
    Mongo.connect(url,{useUnifiedTopology: true},function(err,addingdata)
    { 
        if(err){console.log("error");}
        else
        { 
            var hid=  req.query.hid; 
            var vid= req.query.ventilatorId;
            var s= req.query.status;
            var hname= req.query.hname;
            const database = addingdata.db(yoyo);
            const collection = database.collection('VentilatorDetails');
            collection.insertOne({hid:hid,ventilatorId:vid,status:s,hname:hname});
            console.log("New Ventilator added");
            res.send("Ventilator added successfully.");
        }
    });
});
app.listen(3000);