const mongoose = require('mongoose')

const connectionString="mongodb+srv://meenukrishnann:meenukrishnann@cluster0.butncwg.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString).then((res)=>{
    console.log('mongodb connected successfully');
    
}).catch((err)=>{
    console.log('mongodb connection failed');
    
})