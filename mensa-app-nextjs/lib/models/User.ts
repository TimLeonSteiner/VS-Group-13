import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'manager', 'admin', 'guest'],
        required: true
    },
    email: String,
    preferences: { type: Schema.Types.Mixed }
});

const User = models.User || model('User', userSchema);

export default User;