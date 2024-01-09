import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

export interface IUser {
    name: string;
    avatar: string;
    login: string;
    uuid: string;
}
export const userModel: ModelAttributes<Model, IUser> = {
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataType.STRING,
    },
    login: {
        type: DataType.STRING,
        allowNull: false,
    },
    uuid: {
        type: DataType.STRING,
        allowNull: false,
    },
};
