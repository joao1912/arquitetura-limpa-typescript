import { Sequelize } from 'sequelize-typescript';
import { env } from '..';

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined;

const dialect: Dialect = process.env.DB_DIALECT as Dialect || 'postgres';

const database = new Sequelize({
  dialect,
  host: env?.DB_HOST,
  username: env?.DB_USERNAME,
  password: env?.DB_PASSWORD,
  database: env?.DB_NAME,
  models: [__dirname + '/src/database/models']
});

(async function(){
  await database.sync()
})()

export default database;