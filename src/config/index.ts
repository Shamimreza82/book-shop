import dotenv from 'dotenv'
import path from 'path'


dotenv.config({path: path.join(process.cwd(), '.env')})

export const envFile = {
    port: process.env.PORT,
    dataBase_url: process.env.DATABASE_URL
}