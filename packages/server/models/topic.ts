import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

export interface ITopic {
    title: string;
    text: string;
}
export const topicModel: ModelAttributes<Model, ITopic> = {
    title: {
        type: DataType.STRING,
        allowNull: false,
    },
    text: {
        type: DataType.STRING,
        allowNull: false,
    },
};
