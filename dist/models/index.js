import { sequelize } from '../config/connections.js';
import { AssetFactory } from './Assets.js';
import { UserFactory } from './User.js';
const User = UserFactory(sequelize);
const Asset = AssetFactory(sequelize);
User.hasMany(Asset, {
    foreignKey: 'user_id',
    as: 'assets',
    onDelete: 'CASCADE',
});
Asset.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'CASCADE',
});
export { sequelize, User, Asset };
