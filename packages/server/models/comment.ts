import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

export interface IComment {
    text: string;
}
export const commentModel: ModelAttributes<Model, IComment> = {
    text: {
        type: DataType.STRING,
        allowNull: false,
    },
};
