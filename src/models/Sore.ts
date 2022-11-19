import {Model, DataTypes} from "sequelize";
import sequelize from "../utils/db";

class Sore extends Model {
    declare id: string;
    declare name: string;
    declare phone: string;
    declare room: string;
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
    room: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "sore",
    sequelize
})

export default Sore;