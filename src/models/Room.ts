import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/db";

class Room extends Model {
  declare id: string;
  declare roomNumber: string;
  declare roomFee: number;
  declare isFull: boolean;
  declare patientsCount: number;
  declare maxPatientsCount: number;
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
      type: DataTypes.INTEGER,
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
    maxPatientsCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "room",
    sequelize,
  }
);

export default Room;
