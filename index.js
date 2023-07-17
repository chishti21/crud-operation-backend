const express = require('express')
const app = express()
const hbs=require('hbs');
const path=require('path')
const port = 80
require('./db/create')
const Creates=require('./models/creates')
const templatesPath=path.join(__dirname,'templates/views');
app.set('view engine', 'hbs')
app.set('views', templatesPath)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/', (req, res) => {
  res.render('index')
})

// sending to create
app.post('/create',(req,res)=>
{
    res.render('create');
})

// deleting data
app.post('/delete',async(req,res)=>
{
    try{
        const id=req.body;
      //  console.log(id);
        const del=await Creates.findByIdAndDelete(id);
       // console.log(del);
        const data=await Creates.find();
        res.render('show');
    }catch(error)
    {
        console.log("error")
    }
})
// now geeting update data
app.post('/updated',async(req,res)=>
{
    try{
        const id=req.body.id;
        console.log(id);
        const name=req.body.name;
        const email=req.body.email;
        const update=await Creates.findByIdAndUpdate(id,{name:name});
        const update1=await Creates.findByIdAndUpdate(id,{email:email});
        res.render('show');
    }catch(error)
    {
        console.log("eroor");
    }
})
// updating data
app.post('/update',async(req,res)=>
{
    try{
        const id=await req.body.id;
        console.log(id);
        const up=await Creates.findByIdAndUpdate(id,{name:"kulli"});
        const up1=await Creates.findByIdAndUpdate(id,{email:"kulli@f"});
        res.render('update',{id});
    }catch(error)
    {
        console.log("error");
    }
})
// getting data of form
app.post('/form',async(req,res)=>
{
    try{
        const creates=await new Creates(req.body);
        //console.log(creates);
        creates.save();
        res.render('show')
    }catch(error)
    {
        console.log("error");
    }
})
app.get('/form',async(req,res)=>
{
    try{
        const data=await Creates.find();
        res.send(data);
    }catch(error)
    {
        console.log("error");
    }

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})