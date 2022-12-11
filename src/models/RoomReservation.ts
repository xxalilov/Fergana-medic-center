import { DataTypes, ForeignKey, Model } from "sequelize";
import sequelize from "../utils/db";
import Sore from "./Sore";


class RoomReservation extends Model {
    declare id: string;
    declare roomNumber: string;
    declare fee: number;
    declare paymentType: [string];
    declare isPaid: boolean;
    declare soreId: string;
    // declare soreId: ForeignKey<Sore["id"]>
}

RoomReservation.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    roomNumber: {
        type: DataTypes.STRING
    },
    fee: {
        type: DataTypes.INTEGER
    }, 
    paymentType: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        values: ['card', 'cash'],
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    soreId: {
        type: DataTypes.UUID
    }
    
}, {
    tableName: "roomreservation",
    sequelize
})

export default RoomReservation;