import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

interface Topic {
    title: string;
    text: string;
}

export const topicModel: ModelAttributes<Model, Topic> = {
    title: {
        type: DataType.TEXT,
        allowNull: false,
    },
    text: {
        type: DataType.TEXT,
        allowNull: false,
    },
};
