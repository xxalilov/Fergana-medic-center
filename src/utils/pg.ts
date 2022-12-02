import sequelize from "./db";
import Sore from "../models/Sore";
import Reservation from "../models/Reservation";

const db = async function () {
  Sore.hasMany(Reservation, {
    sourceKey: "id",
    foreignKey: "soreId",
    as: "reservation",
  });

  Reservation.belongsTo(Sore, {
    foreignKey: "soreId",
    as: "sore",
  });

  try {
    await sequelize.sync({ force: false });
    console.log("Connected Postgres!");
  } catch (error) {
    console.log(error);
  }
};

export default db;
