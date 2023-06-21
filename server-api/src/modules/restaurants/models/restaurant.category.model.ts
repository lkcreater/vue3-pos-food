import sequelize from '../../../database/model.database';
import { Model, DataTypes, CreateOptions } from 'sequelize';

export class RestaurantCategory extends Model {
    id!: number;  
    order!: number;
    title!: string;  
    desc!: string;
    createdAt!: Date;  
    UpdatedAt!: Date;
}

RestaurantCategory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'tb_restaurant_category',
    freezeTableName: true,
});