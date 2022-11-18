import {Model, DataTypes} from "sequelize";
import sequelize from "../utils/db";
import {Password} from "../utils/password";

class User extends Model {
    declare id: string;
    declare name: string;
    declare phone: number;
    declare login: string;
    declare password: string;
    declare role: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "users",
        sequelize,
    }
);

User.beforeCreate(async (user, option) => {
    const hashedPassword = await Password.toHash(user.password);
    user.password = hashedPassword;
});

export default User;
