import sequelize from '../database/model.database';
import { Model, DataTypes, CreateOptions } from 'sequelize';

export class Category extends Model {
    id!: number;  
    order!: number;
    title!: string;  
    desc!: string;
    createdAt!: Date;  
    UpdatedAt!: Date;
}
  
Category.init({
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
},
{
    sequelize,
    tableName: 'tb_category',
    freezeTableName: true,
});

export interface InterfaceModel {
    id?: number;  
    order?: number;
    title: string;  
    desc?: string;
    createdAt?: Date;  
    UpdatedAt?: Date;
}

export type InterfaceModelOmit = Omit<InterfaceModel, "id" | "order" | "desc" | "createdAt" | "UpdatedAt">;

export const GetModelFindAll = async () => {
    return await Category.findAll();
}

export const CreateModel = async (attribs: InterfaceModelOmit) => {
    return await Category.create(attribs); 
}
