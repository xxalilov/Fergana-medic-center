import {Model, DataTypes, ForeignKey} from "sequelize";
import sequelize from "../utils/db";
import Sore from "./Sore";

class Diagnosis extends Model {
    declare id: string;
    declare title: string;
    declare doctor: string;
    declare soreId: ForeignKey<Sore["id"]>
}

Diagnosis.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    doctor: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    tableName: "diagnosis",
    sequelize
});

export default Diagnosis;