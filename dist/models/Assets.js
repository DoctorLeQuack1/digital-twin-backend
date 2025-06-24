import { Schema, model } from 'mongoose';
;
const assetsSchema = new Schema({
    asset_link: {
        type: String,
        required: true,
        unique: true
    }
});
const Assets = model('assets', assetsSchema);
export default Assets;
