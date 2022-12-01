import {Model, DataTypes, ForeignKey} from "sequelize";
import slug from "slug";
import sequelize from "../utils/db";
import Statistic from "./Statistic";

class Category extends Model {
    declare id: string;
    declare category: string;
    declare slug: string;
    declare statisticId: ForeignKey<Statistic['id']>
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
    },
    slug: {
        type: DataTypes.STRING
    }
}, {
    tableName: "category",
    sequelize
});

Category.beforeSave(async (category) => {
    category.slug = slug(category.category);
})

export default Category