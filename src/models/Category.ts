import {Model, DataTypes} from "sequelize";
import sequelize from "../utils/db";

class Category extends Model {
    declare id: string;
    declare category: string;
}

Category.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "category",
    sequelize
});

export default Category