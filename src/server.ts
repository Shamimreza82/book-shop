import mongoose from "mongoose";
import app from "./app";
import { envFile } from "./config";


async function main() {
  try {
    mongoose.connect(envFile.dataBase_url as string)

    app.listen(envFile.port, async () => {
        console.log(`server listen on port ${envFile.port} `);
    })
  } catch (error) {
    console.log(error);
  }  
    

}

main()