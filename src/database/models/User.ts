import { Model, DataTypes } from "sequelize";
import database from "../db";

class User extends Model {
    job: string;
    age: number;
    name: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

User.init(
    {
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
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: 'users',
        modelName: 'User'
    }
)

export default User