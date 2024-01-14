import type { ModelAttributes } from 'sequelize/types';
import { DataType, Model } from 'sequelize-typescript';

interface Comment {
    text: string;
}
export const commentModel: ModelAttributes<Model, Comment> = {
    text: {
        type: DataType.STRING,
        allowNull: false,
    },
};
