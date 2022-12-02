import {Model, DataTypes, HasManyCreateAssociationMixin} from "sequelize";
import sequelize from "../utils/db";
import Category from "./Category";

class Statistic extends Model {
    declare id: string;
    declare users: number;
    declare balance: number;
    declare patients: number;
    // declare createCategory: HasManyCreateAssociationMixin<Category, "id">
}

Statistic.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    users: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    patients: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    tableName: "statistic",
    sequelize
})

export default Statistic;