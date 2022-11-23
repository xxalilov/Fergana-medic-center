import {Model, DataTypes, HasManyCreateAssociationMixin} from "sequelize";
import Sore from './Sore';
import sequelize from "../utils/db";
import {Password} from "../utils/password";

class User extends Model {
    declare id: string;
    declare name: string;
    declare login: string;
    declare password: string;
    declare birthday: string;
    declare degree: string;
    declare workExperience: string;
    declare image: string;
    declare profession: string;
    declare consultationFee: string;
    declare salary: string;
    declare role: string;
    declare soreQueue: number;
    declare createSore: HasManyCreateAssociationMixin<Sore, "id">;
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
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: true
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: true
        },
        workExperience: DataTypes.STRING,
        image: DataTypes.STRING,
        profession: DataTypes.STRING,
        consultationFee: DataTypes.STRING,
        salary: DataTypes.STRING,
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        soreQueue: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
