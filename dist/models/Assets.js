import { Model, DataTypes, } from 'sequelize';
export class Asset extends Model {
}
export function AssetFactory(sequelize) {
    Asset.init({
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
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'assets',
        tableName: 'assets'
    });
    return Asset;
}
