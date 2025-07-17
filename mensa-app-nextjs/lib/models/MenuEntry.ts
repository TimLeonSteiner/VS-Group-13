import { Schema, model, models } from 'mongoose';

const menuEntrySchema = new Schema({
    date: { type: Date, required: true },
    dish: {
        type: Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    canteenId: { type: String, required: true },
    mealTime: {
        type: String,
        enum: ['lunch', 'dinner'],
        required: true
    },
    estimatedWaitTime: Number
});

const MenuEntry = models.MenuEntry || model('MenuEntry', menuEntrySchema);

export default MenuEntry;