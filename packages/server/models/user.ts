import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

interface User {
    name: string;
    avatar: string;
    login: string;
}
export const userModel: ModelAttributes<Model, User> = {
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
};
