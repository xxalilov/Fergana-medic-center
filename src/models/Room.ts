import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db";

class Room extends Model {
  declare id: string;
  declare roomNumber: string;
  declare room_cost: string;
  declare isFull: boolean;
}

Room.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roomNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomFee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFull: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    patientsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "room",
    sequelize,
  }
);

export default Room;
