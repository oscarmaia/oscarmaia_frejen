import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import User from "./user";
import State from "./state";
import Department from "./department";
class Ticket extends Model<InferAttributes<Ticket>, InferCreationAttributes<Ticket>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare created_by: ForeignKey<User["id"]>;
  declare updated_by: ForeignKey<User["id"]>;
  declare id_state: ForeignKey<State["id"]>;
  declare id_department: ForeignKey<Department["id"]>;
  declare observacoes: CreationOptional<string>;

  static initTicket(sequelize: Sequelize) {
    Ticket.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        created_by: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        updated_by: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        id_state: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "states",
            key: "id",
          },
        },
        id_department: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "departments",
            key: "id",
          },
        },
        observacoes: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, // Enable timestamps
        createdAt: "created_at", // Specify the custom column name
        updatedAt: "updated_at", // Specify the custom column name
        tableName: "tickets",
      }
    );
  }
}

export default Ticket;
