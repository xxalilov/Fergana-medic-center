import {Model, DataTypes, ForeignKey} from "sequelize";
import User from "./User";
import sequelize from "../utils/db";

class Sore extends Model {
    declare id: string;
    declare name: string;
    declare phone: string;
    declare room: string;
    declare doctor: ForeignKey<User["id"]>;
}

Sore.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false
    },
    queue: {
        type: DataTypes.INTEGER
    },
    isQueue: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: "sore",
    sequelize
})

export default Sore;