import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

export interface User {
    name: string;
    avatar: string;
    login: string;
    isSSO: boolean;
}

export const userModel: ModelAttributes<Model, User> = {
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataType.TEXT,
    },
    login: {
        type: DataType.STRING,
        allowNull: false,
    },
    isSSO: {
        type: DataType.BOOLEAN,
    },
};
