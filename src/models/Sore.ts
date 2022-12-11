import {Model, DataTypes, HasManyCreateAssociationMixin} from "sequelize";
import sequelize from "../utils/db";
import Reservation from "./Reservation";
import RoomReservation from "./RoomReservation";

class Sore extends Model {
    declare id: string;
    declare name: string;
    declare phone: string;
    declare idNumber: number;
    // declare roomReservation: HasManyCreateAssociationMixin<RoomReservation, "id">;
    declare createReservation: HasManyCreateAssociationMixin<Reservation, "id">;
}

Sore.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "sore",
    sequelize
})

export default Sore;