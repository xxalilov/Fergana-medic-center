import sequelize from "./db";
import User from "../models/User";
import Sore from "../models/Sore";

const db = async function () {
    User.hasMany(Sore, {
        sourceKey: "id",
        foreignKey: "sore",
        as: "sore"
    })

    try {
        await sequelize.sync({force: false});
        console.log("Connected Postgres!");
    } catch (error) {
        console.log(error);
    }
}

export default db;