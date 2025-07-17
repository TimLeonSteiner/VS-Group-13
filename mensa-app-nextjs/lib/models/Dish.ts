import { Schema, model, models } from 'mongoose';

const dishSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    category: {
        type: String,
        enum: ['vegan', 'vegetarian', 'meat'],
        required: true
    },
    allergens: [String]
});

const Dish = models.Dish || model('Dish', dishSchema);

export default Dish;