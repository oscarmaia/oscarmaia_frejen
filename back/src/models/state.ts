import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export type StatesTitle =
  | "Pendente"
  | "Recusado"
  | "Em tratamento"
  | "Finalizado";

export type StatesID = "PENDENTE" | "RECUSADO" | "TRATAMENTO" | "FINALIZADO";

class State extends Model<
  InferAttributes<State>,
  InferCreationAttributes<State>
> {
  declare id: StatesID;
  declare title: StatesTitle;
  static initState(sequelize: Sequelize) {
    State.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        tableName: "states",
      }
    );
  }
}
export default State;
