import { Sequelize } from "sequelize";
import { config } from "dotenv";
config()
const sequelize = new Sequelize({
    dialect : "mysql",
    host : "localhost",
    port : 3306,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    logging : false
})



export default sequelize