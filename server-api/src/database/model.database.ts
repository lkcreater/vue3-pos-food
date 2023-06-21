import { Sequelize } from 'sequelize';
import * as config from '../config/sequelize.config';

const sequelize = new Sequelize(
    config.default.DB_NAME,
    config.default.DB_USERNAME,
    config.default.DB_PASSWORD,
    {
        host: config.default.DB_HOST,
        dialect: config.default.DIALECT,
        port: config.default.PORT
    }
);

export class ModelDatabase {
    private static sequelize: Sequelize = sequelize;

    public static connection = async (): Promise<void> => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
    
            await sequelize.sync({ force: true });
        } catch (err) {
            console.error('Unable to connect to the database:', err);
            throw err;
        }         
    }
}

export default sequelize;