import sequelize from "./db";

const db = async function () {
    try {
        await sequelize.sync({force: true});
        console.log("Connected Postgres!");
    } catch (error) {
        console.log(error);
    }
}

export default db;