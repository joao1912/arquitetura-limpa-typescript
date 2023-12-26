import { Sequelize } from 'sequelize-typescript';


//type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined;

//const dialect: Dialect = process.env.DB_DIALECT as Dialect || 'postgres';

const database = new Sequelize({
  dialect:'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'angelica125',
  database: 'arquiteturaLimpa',
  models: [__dirname + '/src/database/models']
});

(async function(){
  await database.sync()
})()


export default database;