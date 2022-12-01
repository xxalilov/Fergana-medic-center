import {Model, DataTypes, ForeignKey} from "sequelize";
import sequelize from "../utils/db";
import Sore from "./Sore";

class Reservation extends Model {
    declare id: string;
    declare type: string;
    declare fee: string;
    declare queue: number;
    declare paymentType: [string];
    declare doctor: string;
    declare doctorName: string;
    declare room: string;
    declare cashier: string;
    declare isPaid: boolean;
    declare isQueue: boolean;
    declare soreId: ForeignKey<Sore["id"]>
}

Reservation.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    room: {
        type: DataTypes.STRING,
        allowNull: true
    },
    queue: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isQueue: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    paymentType: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        values: ['card', 'cash'],
    },
    doctor: {
        type: DataTypes.UUID,
        allowNull: false
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cashier: {
        type: DataTypes.UUID,
    }
}, {
    tableName: "reservation",
    sequelize
});

export default Reservation;