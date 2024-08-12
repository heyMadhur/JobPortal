import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app= express();

// Adding Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corOptions = {
    origin: 'http//localhost:5173',
    credentials: true
}
app.use(cors(corOptions));



const PORT= 3000
app.listen(PORT, ()=>{
    console.log(`The server is running at port: ${PORT}`);
    
})