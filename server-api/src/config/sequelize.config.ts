import { Dialect } from 'sequelize';

export default {
    DB_NAME: 'db_food_app', 
    DB_USERNAME: 'root', 
    DB_PASSWORD: 'root', 
    DB_HOST: 'localhost',
    DIALECT: <Dialect>'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    PORT: 3306
}