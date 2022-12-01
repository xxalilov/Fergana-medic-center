import sequelize from "./db";
import Sore from "../models/Sore";
import Reservation from "../models/Reservation";
import Statistic from "../models/Statistic";
import Category from "../models/Category";

const db = async function () {
    Statistic.hasMany(Category, {
        sourceKey: "id",
        foreignKey: "statisticId",
        as: "category"
    });
    Category.belongsTo(Statistic, {
        foreignKey: "statisticId",
        as: "statistic"
    });

    Category.hasMany(Reservation, {
        sourceKey: 'id',
        foreignKey: 'slug',
        as: 'reservation'
    });
    Reservation.belongsTo(Category, {
        foreignKey: 'slug',
        as: 'category'
    })

    Sore.hasMany(Reservation, {
       sourceKey: "id",
       foreignKey: "soreId",
       as: "reservation" 
    });

    Reservation.belongsTo(Sore, {
        foreignKey: 'soreId',
        as: 'sore'
    });

    try {
        await sequelize.sync({force: false});
        console.log("Connected Postgres!");
    } catch (error) {
        console.log(error);
    }
}

export default db;