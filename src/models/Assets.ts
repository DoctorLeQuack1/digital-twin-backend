import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    ForeignKey,
} from 'sequelize';

import { User } from './User';


export class Asset extends Model<
    InferAttributes<Asset>,
    InferCreationAttributes<Asset>
> {
    declare id: CreationOptional<number>;
    declare user_id: ForeignKey<User["id"]>
    declare asset_link: string;
}

export function AssetFactory(sequelize: Sequelize) {
    Asset.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // nombre del modelo relacionado
                    key: 'id',
                },
            },
            asset_link: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Asset link is required',
                    },
                },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'assets',
            tableName: 'assets'
        }
    );

    return Asset;
}