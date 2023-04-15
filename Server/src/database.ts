import mongoose from "mongoose";
import colorPrint from "./ColorPrint";

async function ConnectToDataBase()
{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions

    try  {
        colorPrint(94,93,"MongoDB Handler", "> Trying to Connect ");
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.DATABASE_URL, connectionParams);
        colorPrint(94,35,"MongoDB Handler", "> Connected ");

        mongoose.connection.on("error", err => {
            colorPrint(31,30,"MongoDB Handler", `> ${err}`);
        });
        
    } catch(error)
    {
        colorPrint(31,30,"MongoDB Handler", `> ${error} `);
        colorPrint(31,30,"MongoDB Handler", "> Couldnt Connect to Server ");
    }
}

export default ConnectToDataBase;