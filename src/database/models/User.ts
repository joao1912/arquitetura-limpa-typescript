import { Model, DataTypes } from "sequelize";
import database from "../db";

class User extends Model {
    public id!: string;
    public name!: string;
    public age!: number;
    public job!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

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