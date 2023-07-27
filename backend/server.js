const express= require("express");
const cors=require("cors");
const dotenv= require("dotenv");

const res = require("express/lib/response");

const {chats} = require("./data/data");
const connectDB = require("./config/db");
const userRoutes= require("./routes/userRoutes");
const chatRoutes= require("./routes/chatRoutes");

dotenv.config();
connectDB();
const app= express();
app.use(cors("*"));
app.use(express.json());


app.get('/',(req,res)=>{
    res.send(chats);
});


app.get('/api/chat/:id',(req,res)=>{
    const singleChat = chats.find((c)=> c._id == req.params.id);
    res.send(singleChat);

});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{console.log('Server running on port 3001 ')});