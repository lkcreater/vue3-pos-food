import sequelize from '../../../database/model.database';
import { Model, DataTypes, CreateOptions } from 'sequelize';

export class Menu extends Model {
    id!: number;  
    order!: number;
    title!: string;  
    desc!: string;
    isDateRange!: boolean;
    dateStart!: Date;
    dateEnd!: Date;
    createdAt!: Date;  
    UpdatedAt!: Date;
}

Menu.init({
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
    isDateRange:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    dateStart: {
        type: DataTypes.DATE
    },
    dateEnd:{
        type: DataTypes.DATE
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'tb_restaurant_menu',
    freezeTableName: true,
});