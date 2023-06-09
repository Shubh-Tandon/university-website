import mongoose from 'mongoose';

const Connection = async () =>{
    const URL = `mongodb://127.0.0.1:27017/university`;



    try {
      await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
       console.log(`Database connected successfully`);
    } catch(error) {
        console.log(`Error while connecting the database`, error);
    }
}

export default Connection;
