import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined;

const dialect: Dialect = process.env.DB_DIALECT as Dialect || 'postgres';

const database = new Sequelize({
  dialect,
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database_name',
});

export default database;