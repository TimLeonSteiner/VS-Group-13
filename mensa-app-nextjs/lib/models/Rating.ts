// lib/models/Rating.ts
import { Schema, model, models } from 'mongoose';

const ratingSchema = new Schema({
    menuEntry: {
        type: Schema.Types.ObjectId,
        ref: 'MenuEntry',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String,
    timestamp: { type: Date, default: Date.now }
});

const Rating = models.Rating || model('Rating', ratingSchema);

export default Rating;