import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import database from '../db.ts'; 

interface UserAttributes {
  id: string;
  name: string;
  age: number;
  job: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public age!: number;
  public job!: string;
  public createdAt?: string;
  public updatedAt?: string;

}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: 'users',
    modelName: 'User', 
  }
);

export default User;