import { Sequelize } from 'sequelize-typescript';


type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined;

const dialect: Dialect = process.env.DB_DIALECT as Dialect || 'postgres';

const database = new Sequelize({
  dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [__dirname + '/src/database/models'],
  logging: false
});

(async function(){
  await database.sync()
})()

export default database;