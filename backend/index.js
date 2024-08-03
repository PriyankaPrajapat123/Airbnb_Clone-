const express = require('express');
require('./db/config');
const mongoose = require('mongoose')
var cors = require('cors')


const data = require('./db/item')
const User = require('./db/User')
const app = express();
app.use(cors());
app.use(express.json());


// const connectDB = async()=>{
//     mongoose.connect('mongodb://localhost:27017/E-com');
//     const itemSchema = new mongoose.Schema({
//         label:String,
//         price:Number
//     });
//     const item = mongoose.model('ecom',itemSchema);
//     const data = await item.find({});
//     console.warn(data);
// }
// app.get('/"',async (req,resp)=>{

//     let items = await data.find();



//     resp.send(items)

// })
app.get('/', async(req,resp)=>{
  let items = await data.find({});
  resp.send(items);
})
app.get('/search/:key',async(req,resp)=>{
  console.log(req.params.key);
  let data = await data.findOne(
    {
      "$or":[
        {"minimum_nights":{$regex:req.params.key}}
      ]
    }
  )
  resp.send(data)
})

//loginand register
app.post('/register',async(req,resp)=>{
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result)
})

app.post('/login',async(req,resp)=>{
  if(req.body.password&&req.body.email){
    let user = await User.findOne(req.body).select("-password");
    if(user){
      resp.send(user)
    }
    else{
      resp.send({result:"no user found"})
    }

  }
  else{
    resp.send({result:"no user found"})
  }

})
app.listen(5000)