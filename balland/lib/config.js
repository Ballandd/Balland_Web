import mongoose from "mongoose"

const uri = process.env.NEXT_PUBLIC_MONGODB_URI

const connect = () =>{
    mongoose.connect(uri,{
        dbName : "balland"
    })
    .then(() => {
        console.log('MongoDB conected')
    }
        )
    .catch((err) => {
        console.log(err);
    });
  
};

mongoose.connection.on('error', (error)=>{
    console.log('mongodb connect error', error);
});
mongoose.connection.on('disconnected',()=>{
    console.log('mongodb id disconnected. Tying to connect again');
    connect();
});

export default connect
