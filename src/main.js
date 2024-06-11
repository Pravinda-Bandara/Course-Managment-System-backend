import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const app = express();
dotenv.config()

const MONGODB_URI =process.env.MONGODB_URI || 'mongodb://localhost:27017/courseDB'
mongoose.set('strictQuery', true)
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(() => {
        console.log('error mongodb')
    })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*app.use('/api/v1/users', userRoutes);
app.use('/api/v1/contacts', contactRoutes);*/


const PORT = process.env.PORT || 5050;
app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
});